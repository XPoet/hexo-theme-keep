const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '../..')
const layoutRoot = path.join(root, 'layout')
const checkOnly = process.argv.includes('--check')
const requestedFiles = process.argv.filter((argument) => argument.endsWith('.ejs'))

function collectEjsFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      return collectEjsFiles(entryPath)
    }

    return entry.isFile() && entry.name.endsWith('.ejs') ? [entryPath] : []
  })
}

function getIndentUnit(lines) {
  // Existing templates mix legacy four-space indentation with two-space files.
  const widths = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^[ \t]*/)[0].replace(/\t/g, '    ').length)
  const changes = new Map()

  for (let index = 1; index < widths.length; index += 1) {
    const change = Math.abs(widths[index] - widths[index - 1])

    if (change > 0) {
      changes.set(change, (changes.get(change) || 0) + 1)
    }
  }

  const twoSpaceChanges = changes.get(2) || 0
  const fourSpaceChanges = [...changes.entries()].reduce((total, [change, count]) => {
    return change >= 4 && change % 4 === 0 ? total + count : total
  }, 0)

  if (twoSpaceChanges !== fourSpaceChanges) {
    return twoSpaceChanges > fourSpaceChanges ? 2 : 4
  }

  const nonzeroWidths = widths.filter(Boolean)
  return nonzeroWidths.length && Math.min(...nonzeroWidths) <= 2 ? 2 : 4
}

function normalizeIndent(width, indentUnit) {
  if (width === 0) {
    return 0
  }

  if (indentUnit === 4) {
    return Math.max(1, Math.round(width / 4)) * 2
  }

  return Math.max(1, Math.round(width / 2)) * 2
}

function stripEjsTags(line) {
  return line.replace(/<%[=-]?[\s\S]*?%>/g, '')
}

function getLeadingHtmlTag(line) {
  return stripEjsTags(line).match(/^\s*<\s*(\/?)\s*([a-z][\w:-]*)\b/i)
}

function getHtmlTags(line) {
  return [...stripEjsTags(line).matchAll(/<\s*(\/?)\s*([a-z][\w:-]*)\b[^>]*>/gi)].map((match) => ({
    closing: Boolean(match[1]),
    name: match[2].toLowerCase(),
    selfClosing: /\/\s*>$/.test(match[0])
  }))
}

function isVoidHtmlTag(name) {
  return new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]).has(name)
}

function getEjsControl(line) {
  const match = line.match(/^\s*<%\s*([\s\S]*?)\s*%>\s*$/)

  if (!match || /^[=#-]/.test(match[1].trim())) {
    return null
  }

  const statement = match[1].trim()
  const closes = /^}/.test(statement)
  const opens =
    /\{\s*$/.test(statement) && /^(?:if|for|while|switch|try|catch|else|do)\b|^}/.test(statement)

  return closes || opens ? { closes, opens } : null
}

function countCurlyBraces(line) {
  const source = stripEjsTags(line)
  let quote = null
  let escaped = false
  let lineComment = false
  let blockComment = false
  let change = 0

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]
    const next = source[index + 1]

    if (lineComment) {
      break
    }

    if (blockComment) {
      if (character === '*' && next === '/') {
        blockComment = false
        index += 1
      }
      continue
    }

    if (quote) {
      if (escaped) {
        escaped = false
      } else if (character === '\\') {
        escaped = true
      } else if (character === quote) {
        quote = null
      }
      continue
    }

    if (character === '/' && next === '/') {
      lineComment = true
      break
    }

    if (character === '/' && next === '*') {
      blockComment = true
      index += 1
      continue
    }

    if (character === "'" || character === '"' || character === '`') {
      quote = character
      continue
    }

    if (character === '{') {
      change += 1
    } else if (character === '}') {
      change -= 1
    }
  }

  return change
}

function formatPluginCodeBlock(lines) {
  const indentUnit = getIndentUnit(lines.slice(1, -1))

  return lines.map((line, index) => {
    if (index === 0 || index === lines.length - 1) {
      return line.trim()
    }

    if (!line.trim()) {
      return ''
    }

    const prefix = line.match(/^[ \t]*/)[0]
    const width = prefix.replace(/\t/g, '    ').length

    return `${' '.repeat(normalizeIndent(width, indentUnit))}${line.slice(prefix.length)}`
  })
}

function formatCommentPlugin(source) {
  const lines = source.split(/\r?\n/)
  const output = []
  const htmlStack = []
  let ejsDepth = 0
  let scriptContext = null
  let pendingTag = null

  function popHtmlTag(name) {
    for (let index = htmlStack.length - 1; index >= 0; index -= 1) {
      if (htmlStack[index] === name) {
        htmlStack.splice(index, 1)
        return
      }
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) {
      output.push('')
      continue
    }

    if (/^<%\s*$/.test(trimmed)) {
      const blockEnd = lines.findIndex(
        (candidate, candidateIndex) => candidateIndex > index && /^\s*%>\s*$/.test(candidate)
      )

      if (blockEnd !== -1) {
        output.push(...formatPluginCodeBlock(lines.slice(index, blockEnd + 1)))
        index = blockEnd
        continue
      }
    }

    const control = getEjsControl(line)
    const closesControl = Boolean(control?.closes)
    const lineEjsDepth = Math.max(0, ejsDepth - (closesControl ? 1 : 0))

    if (scriptContext) {
      const leadingTag = getLeadingHtmlTag(line)

      if (leadingTag?.[1] && leadingTag[2].toLowerCase() === 'script') {
        scriptContext = null
      } else {
        const leadingClosers = (trimmed.match(/^}+/) || [''])[0].length
        const jsDepth = Math.max(0, scriptContext.depth - leadingClosers)
        const indentDepth = lineEjsDepth + htmlStack.length + jsDepth
        output.push(`${'  '.repeat(indentDepth)}${trimmed}`)
        scriptContext.depth = Math.max(0, scriptContext.depth + countCurlyBraces(line))
        continue
      }
    }

    const leadingTag = getLeadingHtmlTag(line)
    const closesLeadingTag = Boolean(leadingTag?.[1])

    if (closesLeadingTag) {
      popHtmlTag(leadingTag[2].toLowerCase())
    }

    let indentDepth

    if (pendingTag) {
      const completesTag = /[>]/.test(stripEjsTags(line))
      indentDepth = pendingTag.indentDepth + (completesTag ? 0 : 1)
      output.push(`${'  '.repeat(Math.max(0, indentDepth))}${trimmed}`)

      if (completesTag) {
        if (!isVoidHtmlTag(pendingTag.name)) {
          htmlStack.push(pendingTag.name)
        }

        const tags = getHtmlTags(line)
        for (const tag of tags) {
          if (tag.closing) {
            popHtmlTag(tag.name)
          } else if (!tag.selfClosing && !isVoidHtmlTag(tag.name) && tag.name !== pendingTag.name) {
            htmlStack.push(tag.name)
          }
        }

        if (pendingTag.name === 'script' && htmlStack.includes('script')) {
          scriptContext = { depth: 0 }
        }

        pendingTag = null
      }

      ejsDepth = lineEjsDepth + (control?.opens ? 1 : 0)
      continue
    }

    indentDepth = lineEjsDepth + htmlStack.length
    output.push(`${'  '.repeat(Math.max(0, indentDepth))}${trimmed}`)

    const tags = getHtmlTags(line)
    const openingTag =
      leadingTag && !leadingTag[1]
        ? { name: leadingTag[2].toLowerCase() }
        : tags.find((tag) => !tag.closing)
    const hasCompletedOpeningTag = openingTag && /[>]/.test(stripEjsTags(line))

    if (openingTag && !hasCompletedOpeningTag) {
      pendingTag = { indentDepth, name: openingTag.name }
    } else {
      for (let tagIndex = 0; tagIndex < tags.length; tagIndex += 1) {
        const tag = tags[tagIndex]

        if (closesLeadingTag && tagIndex === 0 && tag.closing) {
          continue
        }

        if (tag.closing) {
          popHtmlTag(tag.name)
        } else if (!tag.selfClosing && !isVoidHtmlTag(tag.name)) {
          htmlStack.push(tag.name)
        }
      }

      if (openingTag?.name === 'script' && htmlStack.includes('script')) {
        scriptContext = { depth: 0 }
      }
    }

    ejsDepth = lineEjsDepth + (control?.opens ? 1 : 0)
  }

  return output.join(source.includes('\r\n') ? '\r\n' : '\n')
}

function format(source, file) {
  if (file && file.startsWith(path.join(layoutRoot, '_partial/comment/plugins') + path.sep)) {
    return formatCommentPlugin(source)
  }

  const newline = source.includes('\r\n') ? '\r\n' : '\n'
  const lines = source.split(/\r?\n/)
  const indentUnit = getIndentUnit(lines)

  return lines
    .map((line) => {
      if (!line.trim()) {
        return ''
      }

      const prefix = line.match(/^[ \t]*/)[0]
      const width = prefix.replace(/\t/g, '    ').length
      const normalizedWidth = normalizeIndent(width, indentUnit)

      return `${' '.repeat(normalizedWidth)}${line.slice(prefix.length)}`
    })
    .join(newline)
}

const files = requestedFiles.length
  ? requestedFiles.map((file) => path.resolve(file))
  : collectEjsFiles(layoutRoot)

let hasUnformattedFiles = false

for (const file of files) {
  if (!fs.existsSync(file) || path.extname(file) !== '.ejs') {
    throw new Error(`Expected an existing .ejs file: ${file}`)
  }

  const source = fs.readFileSync(file, 'utf8')
  const formatted = format(source, file)

  if (formatted === source) {
    continue
  }

  hasUnformattedFiles = true

  if (checkOnly) {
    console.error(`${path.relative(root, file)} needs EJS indentation formatting.`)
    continue
  }

  fs.writeFileSync(file, formatted)
  console.log(`Formatted ${path.relative(root, file)}`)
}

if (checkOnly && hasUnformattedFiles) {
  process.exitCode = 1
}
