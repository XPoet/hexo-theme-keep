# hexo-theme-ils

[![Github Author](https://img.shields.io/badge/author-XPoet-orange.svg)](https://github.com/XPoet)
[![Github Release](https://img.shields.io/github/release/XPoet/hexo-theme-ils.svg)](https://github.com/XPoet/hexo-theme-ils/releases)
[![Github License](https://img.shields.io/github/license/XPoet/hexo-theme-ils.svg)](https://github.com/XPoet/hexo-theme-ils/blob/master/LICENSE)
[![Hexo Version](https://img.shields.io/badge/hexo-%3E=4.2.0-blue.svg?&logo=hexo&longCache=true)](https://nodejs.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E=12.0-green.svg?logo=Node.js&longCache=true)](https://hexo.io)

**一款简约漂亮的 Hexo 主题。**  
**A simple and beautiful theme for Hexo.**

![Preview Image](https://user-images.githubusercontent.com/24516169/82140521-ae324080-9861-11ea-809f-ea73d09e24ad.jpg)

<details>

<summary>点击展开，查看更多预览图。</summary>

- 样式一：

  ![Preview Image](https://user-images.githubusercontent.com/24516169/82140654-e8501200-9862-11ea-8013-935897635d17.png)

  ![Preview Image](https://user-images.githubusercontent.com/24516169/82140673-10d80c00-9863-11ea-9b2e-9fcf575e9aef.png)

- 样式二：

  ![Preview Image](https://user-images.githubusercontent.com/24516169/82140717-5d234c00-9863-11ea-85cc-99d15e6960fe.png)

  ![Preview Image](https://user-images.githubusercontent.com/24516169/82140755-9a87d980-9863-11ea-868b-00de092aa64e.png)

- 样式三：

  ![Preview Image](https://user-images.githubusercontent.com/24516169/82919586-cd8b4500-9fa8-11ea-8d14-4510f5500c09.png)

  ![Preview Image](https://user-images.githubusercontent.com/24516169/82919636-dc71f780-9fa8-11ea-8d67-84d57cc217f9.png)

</details>

**Online Preview 在线预览**

> 如果你在使用该主题，欢迎 [PR](https://juejin.im/post/6844903856971710477) 将你的网站链接填写在下方，获得更多展示机会。

- [XPoet's Blog](https://xpoet.cn)
- [ILS 官网](https://ils.xpoet.cn)
- ...
- ...

---

如你所见，ILS 界面设计十分简洁、清爽，但功能齐全、不失优雅，这正是 ILS 的开发理念。也曾尝试过花里胡哨，发现不仅使用繁琐、而且审美疲劳，背驰了写博客的初衷，记录生活、展示文字，应该才是搭建博客网站的最终追求，为此 ILS 应运而生。简约轻快、突出内容、化繁为简、配置简单、长期维护，如果你也喜欢或认可这些主题特点，一起来探索吧~

关于主题名称 **"ILS"** 的由来：在主题开发之初，作者想到的几个名字都已被用，词穷了，后来干脆将名字取自 **"I Like Simple「我喜欢简单」"** 首字母，就是这么简单。

同时，非常欢迎感兴趣的同学 [Pull Request](https://juejin.im/post/6844903856971710477) 加入到该主题的开发中（成为该项目的贡献者），按你的意愿来打磨 ILS。

## Features 功能特性

### Completed 已完成

- [x] 恰到好处的留白，简约大气。
- [x] 响应式设计，适配多种终端。
- [x] 日间/夜间模式自由切换。
- [x] 多种代码高亮方案。
- [x] 语言国际化，支持中/英文。
- [x] 内置多款评论插件。
- [x] 支持全站文章搜索。
- [x] 支持文章顶置。
- [x] 代码块一键复制。
- [x] TOC 目录结构。
- [x] RSS 订阅。
- [x] 网站 UV 和 PV 统计。
- [x] 文章阅读次数统计。
- [x] 文章字数统计。
- [x] 文章阅读时长统计。
- [x] 页面滚动进度条提示。
- [x] 一键快速回到顶部。
- [x] 无 jQuery，代码精简。

### Unfinished 未完成

- [ ] 图片懒加载
- [ ] 大图查看器
- [ ] 文章点赞功能
- [ ] 文章版权信息
- [ ] 在线更改字体和字号
- [ ] 打赏功能
- [ ] ......

## Get start 快速开始

**在开始使用主题之前，强烈建议你先阅读 「Easy Hexo 团队」撰写的 Hexo 教程！**  
**链接：https://easyhexo.com/**

### Install 安装

- 使用 Git SSH

  ```bash
  git clone --depth=1 git@github.com:XPoet/hexo-theme-ils.git themes/ils
  ```

  该方式获取的是 Master 分支最新代码，包含该主题最新的功能，但无法保证完全稳定。

- 下载 Release 版本

  [点击此处进入该主题 Releases 版本下载页面](https://github.com/XPoet/hexo-theme-ils/releases) 请优先下载最新版本，下载完成后解压到 Hexo 博客目录的 themes 文件夹里面并重命名为 `ils`。

### Enable 启用

Modify `theme` setting in `_config.yml` to `ils`.  
修改 Hexo 根目录下的 `_config.yml` 配置文件，将 `theme` 设置为 `ils` 。

```yml
theme: ils
```

### Update 更新

- 使用 Git SSH
  ```bash
  cd themes/ils
  git pull
  ```
- 下载 [主题最新 Release 版本](https://github.com/XPoet/hexo-theme-ils/releases) 。

## How to use 如何使用

### Configuration 配置

以下是主题配置文件的详细说明，建议多看几遍，并且对照着来修改自己的配置文件，边修改边查看界面效果。
  
如遇到无法解决的问题，可以给我提 [Issues](https://github.com/XPoet/hexo-theme-ils/issues) 。

```yml
# ---------------------------------------------------------------------------------------
#  Your basic info
#  你的基本信息，请正确填写，将显示在主题中。
# ---------------------------------------------------------------------------------------
base_info:
  title: ILS
  author: XPoet
  email: i@xpoet.cn
  url: https://ils.xpoet.cn/

# ---------------------------------------------------------------------------------------
# Theme style settings
# 主题样式设置
# ---------------------------------------------------------------------------------------
style:
  # Theme primary color
  # 主颜色，修改为自己喜欢的颜色即可，支持 rgb、十六进制格式。
  # 建议使用 Web 安全色，https://www.bootcss.com/p/websafecolors/
  primary_color: "#0066CC"

  # favicon
  # 网站图标，把 "/source/images/" 目录下的 "favicon.png"，换成自己的图片即可。
  favicon: images/favicon.png

  # avatar
  # 头像图片，把 "/source/images/" 目录下的 "avatar.png"，换成自己的图片即可。
  avatar: images/avatar.png

# ---------------------------------------------------------------------------------------
# Navigation menu
# 导航菜单
# 如需新增导航页，请按下面格式填写，同时需要创建相对应的 Hexo 页面。
# 如何新增页面，请参考下面的教程：“Add page 添加页面”。
# ---------------------------------------------------------------------------------------
menu:
  Home: /
  Archives: /archives
  # Categories: /categories
  # Tags: /tags
  # Links: /links
  # About: /about
  # ...

# ---------------------------------------------------------------------------------------
# RSS
# Dependencies: hexo-generator-feed
# See: https://github.com/hexojs/hexo-generator-feed
# RSS 订阅，如需启用，请先安装 Hexo 插件：hexo-generator-feed。
# 具体步骤，参考下面的教程：“RSS 订阅”。
# ---------------------------------------------------------------------------------------
rss:
  enable: false

# ---------------------------------------------------------------------------------------
# Comment plugin
# 评论插件
# 主题内置了 Valine 和 Gitalk，只能使用其中一款。
# ---------------------------------------------------------------------------------------
comment:
  # Valine
  # See: https://github.com/xCss/Valine
  # 如何使用 Valine，请参考官方教程：https://github.com/xCss/Valine
  # 获取必要的参数，在下面填写。
  valine:
    enable: false
    appid: # your leancloud application appid
    appkey: # your leancloud application appkey
    meta: # comment input meta, type: Array, values: ['nick','mail','link']
    placeholder: # your placeholder

  # Gitalk
  # See: https://github.com/gitalk/gitalk
  # 如何使用 Gitalk，请参考官方教程：https://github.com/gitalk/gitalk
  # 获取必要的参数，在下面填写。
  gitalk:
    enable: false
    github_id: # GitHub repo owner
    repository: # Repository name to store issues
    client_id: # GitHub Application Client ID
    client_secret: # GitHub Application Client Secret

# ---------------------------------------------------------------------------------------
# Website count
# 网站计数
# ---------------------------------------------------------------------------------------
website_count:
  # busuanzi
  # See: http://ibruce.info/2015/04/04/busuanzi/
  # 主题内置“不蒜子”计数，无需额外配置，选择你要开启的计数项即可。
  # site_uv 访问人数计数
  # site_pv 总访问量计数
  # page_pv 文章阅读量计数
  busuanzi_count:
    enable: false
    site_uv: false
    site_pv: false
    page_pv: false

# ---------------------------------------------------------------------------------------
# Local Search
# Dependencies: hexo-generator-searchdb
# See: https://github.com/theme-next/hexo-generator-searchdb
# 本地搜索，如需启用，请先安装 Hexo 插件：hexo-generator-searchdb。
# 具体步骤，参考下面的教程：“Local search 本地搜索”。
# ---------------------------------------------------------------------------------------
local_search:
  enable: true

  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  # trigger 搜索触发方式，输入关键字后会触发搜索，可选 auto（自动）或 manual（手动）。
  ### auto 每输入或删除一个字符后，自动触发搜索。
  ### manual 每输入或删除一个字符后，需要按回车键触发搜索。
  trigger: auto # values: auto | manual

  # Unescape html strings to the readable one.
  # # 转义 HTML 字符串为可读字符串。
  unescape: false

  # Preload the search data when the page loads.
  # 在页面加载时预加载搜索数据。
  preload: false

# ---------------------------------------------------------------------------------------
# Post word count
# Dependencies: hexo-wordcount
# See: https://github.com/willin/hexo-wordcount
# 文章字数统计 & 阅读时长统计
# 如需启用，请先安装 Hexo 插件：hexo-wordcount。
# 在博客根目录下使用 npm 命令安装: npm i hexo-wordcount --save
# ---------------------------------------------------------------------------------------
post_wordcount:
  enable: false
  wordcount: false # word count, one article
  min2read: false # time to read, one article

# ---------------------------------------------------------------------------------------
# Home page article block display settings
# 首页文章块底部的显示设置，可配置显示分类和标签。
# limit 显示分类或标签的最大个数。
# ---------------------------------------------------------------------------------------
home_article:
  category:
    enable: false # show category in home page article block
    limit: 3 # max number of categories shown in home page article block
  tag:
    enable: false # show tags in home page article block
    limit: 5 # max number of tags shown in home page article block

# ---------------------------------------------------------------------------------------
# Code copy
# 代码复制，代码块的复制风格可选 default | flat | mac。
# ---------------------------------------------------------------------------------------
code_copy:
  enable: true
  style: flat # values: default | flat | mac

# ---------------------------------------------------------------------------------------
# Sidebar tools
# 侧边栏工具（搜索按钮、昼夜模式切换按钮、RSS按钮、TOC显示切换按钮）
# ---------------------------------------------------------------------------------------
side_tools:
  enable: false

# ---------------------------------------------------------------------------------------
# Back to top
# 回到顶部
# ---------------------------------------------------------------------------------------
back2top:
  enable: false

# ---------------------------------------------------------------------------------------
# Table of Contents in the Sidebar
# 文章目录结构
# ---------------------------------------------------------------------------------------
toc:
  enable: false

  # Automatically add list number to toc.
  # 给文章目录自动加上序号。
  number: true

  # If true, all level of TOC in a post will be displayed, rather than the activated part of it.
  # 是否展开所有目录。
  expand_all: true

# ---------------------------------------------------------------------------------------
# Magic
# magic 启用后，主题将以简约的卡片形式显示。
# 可分别配置缩放效果、阴影效果。
# ---------------------------------------------------------------------------------------
magic:
  enable: true
  scale: false # scale effect when the mouse hover
  shadow: false # shadow effect when the mouse hover
```

### Comment 评论

主题内置了 Valine 和 Gitalk 两款评论插件，你只能使用其他一款，如果两款评论插件的 enable 都设为了 true，将使用 Valine。

#### Valine

前往 https://github.com/xCss/Valine 查看 Valine 如何使用，获取必要的参数，填写在配置文件里。

#### Gitalk

1. 在自己的 GitHub 账号下创建新的 OAuth App，链接：https://github.com/settings/applications/new ，Homepage URL 和 Authorization callback URL 均填写自己的域名即可。
2. 在自己的 GitHub 账号下创建新的 repository 并打开 Issues，用于存储评论内容。
3. 把自己的 GitHub 用户名称、repository 名称 、OAuth App 的 Client ID 、Client Secret 分别填写在主题配置文件里。

前往 https://github.com/gitalk/gitalk 查看 Gitalk 更多信息。

### Post sticky 文章顶置

实现文章顶置功能，需在文章页添加 **`sticky`** 属性，**`sticky`** 值越大，顶置的文章越靠前，参考如下。

```markdown
---
title: 千呼万唤始出来，Hexo 主题 ILS 正式发布
date: 2020-04-07 21:55:14
tags: [Hexo]
categories: [Hexo]
sticky: 9999
---
```

### Local search 本地搜索

1. 启用本地搜索功能，需在 Hexo 博客根目录下安装插件 **`hexo-generator-searchdb`**。

   ```bash
   npm install hexo-generator-searchdb
   ```

2. 在 Hexo 配置文件 `_config.yml` 增加如下配置。

   ```yml
   # Search
   ## https://github.com/theme-next/hexo-generator-searchdb
   search:
     path: search.json
     field: post
     content: true
     format: striptags
   ```

3. 修改主题配置文件 `_config.yml`。

   ```yml
   local_search:
     enable: true
     trigger: auto # values: auto | manual
     unescape: false
     preload: true
   ```

### RSS 订阅

1. 启用 RSS 订阅功能，需先在 Hexo 博客根目录下安装插件 **`hexo-generator-feed`**。

   ```bash
   npm install hexo-generator-feed
   ```

2. 在 Hexo 配置文件 `_config.yml` 增加如下配置。

   ```yml
   # Feed Atom
   # npm install hexo-generator-feed
   feed:
     type: atom
     path: atom.xml
     limit: 20
   ```

3. 修改主题配置文件 `_config.yml`。

   ```yml
   rss:
     enable: true
   ```

### Add page 添加页面

**Hexo 初始并没有 categories（分类）、about（关于）、links（友链）、tags（标签） 等页面，需要自己手动创建。**

以创建「关于」页面为例：

1. 在 Hexo 博客目录下执行命令，即可生成 `about` 文件夹。
   ```bash
   hexo new page about
   ```
2. 创建成功后，打开博客目录下 `/source/about/index.md` 文件，即可填写自己的内容。
   支持 Markdown 和 HTML 格式；`comment: true` 表示该页面开启评论功能。

   参考如下示例：

   ```markdown
   ---
   title: about
   date: 2020-03-19 14:59:53
   comment: true
   ---

   ## About me

   - XPoet「 X 诗人 」...
     ...
     ...
     ...
   ```

3. 在主题配置文件启用 `about` 导航菜单。
   ```yml
   # navigation menu
   menu:
     Home: /
     Archives: /archives
     # Category: /category
     # Links: /links
     About: /about
     # ...
   ```

其他页面的生成方式跟「关于」页面类似，此处不再赘述。

### MathJax 数学公式

如果要在文章中显示数学公式，可以使用插件 **`hexo-filter-mathjax`**，详情参考：https://github.com/next-theme/hexo-filter-mathjax/ 。  
或按下列步骤完成相关配置：

1. 在 Hexo 博客根目录下安装插件 **`hexo-filter-mathjax`**。

   ```bash
   npm install hexo-filter-mathjax --save
   ```

2. 在 Hexo 配置文件 `_config.yml` 增加如下配置。

   ```yml
   mathjax:
     tags: none # or 'ams' or 'all'
     single_dollars: true # enable single dollar signs as in-line math delimiters
     cjk_width: 0.9 # relative CJK char width
     normal_width: 0.6 # relative normal (monospace) width
     append_css: true # add CSS to every page
     every_page: false # if true, every page will be rendered by mathjax regardless the `mathjax` setting in Front-matter of each article
   ```

3. 在文章页添加 `mathjax: true`，至此，就可以在该页面中写公式了。

   ```yml
   ---
   title: MathJax Test
   date: 2020-09-12 16:02:07
   tags: MathJax
   categories: MathJax
   mathjax: true
   ---
   $$
   i\hbar\frac{\partial}{\partial t}\psi=-\frac{\hbar^2}{2m}\nabla^2\psi+V\psi
   $$
   ```

## Contribution 贡献

欢迎各种形式的贡献，包括但不限于：美化样式、增加功能、改进代码、 修复 Bug 等。

## Feedback 反馈

在使用该主题过程中，如果遇到问题，请仔细阅读使用文档，或者给作者提 `Issue`。

## Licence 许可

[MIT](https://github.com/XPoet/hexo-theme-ils/blob/master/LICENSE) Copyright (c) 2020 XPoet
