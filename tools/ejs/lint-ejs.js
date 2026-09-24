const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const ejsLint = require('ejs-lint').default

const root = path.resolve(__dirname, '../..')
const layoutRoot = path.join(root, 'layout')
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

const files = requestedFiles.length
  ? requestedFiles.map((file) => path.resolve(file))
  : collectEjsFiles(layoutRoot)

let hasErrors = false

for (const file of files) {
  if (!fs.existsSync(file) || path.extname(file) !== '.ejs') {
    throw new Error(`Expected an existing .ejs file: ${file}`)
  }

  const source = fs.readFileSync(file, 'utf8')
  let hasFileError = false

  try {
    ejs.compile(source, { filename: file })
  } catch (error) {
    hasErrors = true
    hasFileError = true
    const location = error.line ? `:${error.line}` : ''
    console.error(`${path.relative(root, file)}${location}: ${error.message.split('\n')[0]}`)
  }

  const error = ejsLint(source)

  if (!error) {
    continue
  }

  hasErrors = true
  if (hasFileError) {
    continue
  }

  const location = `${error.line || '?'}:${error.column || '?'}`
  console.error(`${path.relative(root, file)}:${location}: ${error.message}`)
}

if (hasErrors) {
  process.exitCode = 1
}
