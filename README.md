# hexo-theme-ils

[![Github Author](https://img.shields.io/badge/author-XPoet-orange.svg)](https://github.com/XPoet)
[![Github Release](https://img.shields.io/github/release/XPoet/hexo-theme-ils.svg)](https://github.com/XPoet/hexo-theme-ils/releases)
[![Github License](https://img.shields.io/github/license/XPoet/hexo-theme-ils.svg)](https://github.com/XPoet/hexo-theme-ils/blob/master/LICENSE)

**一款简约大气的 Hexo 主题。**  
**A simple and atmospheric theme for Hexo.**

**[Online Preview 在线预览](https://xpoet.cn)**

如你所见，ILS 界面设计十分简洁、清爽，但功能齐全、不失优雅，这正是 ILS 的开发理念。也曾尝试过花里胡哨，发现不仅容易审美疲劳，而且背驰了写博客的初衷，记录生活、展示文字，应该才是搭建博客网站的最终追求，为此 ILS 应运而生。简约大气、不缺美感、突出内容、化繁为简、配置简单、长期维护，如果你也喜欢或认可这些主题特点，一起来折腾吧~

关于主题名称 **"ILS"** 的由来：在主题开发之初，作者想到的几个名字都被已被用，词穷了，后来干脆将名字取自 **"I Like Simple「我喜欢简单」"** 首字母，就是这么简单。

同时，非常欢迎感兴趣的同学 Pull Request 加入到该主题的开发中，共同打造极致 ILS。

## Features 功能特性

### Completed 已完成

- [x] 恰到好处的留白，简约大气；
- [x] 响应式设计，适配多种终端；
- [x] 日间/夜间模式自由切换；
- [x] 多种代码高亮方案；
- [x] 语言国际化，已支持中/英文；
- [x] 内置多款评论插件；
- [x] 支持全站文章搜索；
- [x] 支持文章顶置；
- [x] 代码块一键复制；
- [x] TOC 目录结构；
- [x] RSS 订阅；
- [x] 网站访问统计和文章阅读统计；
- [x] 页面滚动百分比提示；
- [x] 一键快速回到顶部；
- [x] 代码精简高效，无 jQuery；
- [x] 配置项简单，有详细注释；

### Unfinished 未完成

- 文章版权信息
- 字数统计 & 阅读时长
- 支持公式
- 在线更改字体/字号
- 打赏功能
- ......

## Get start 快速开始

在开始使用主题之前，强烈建议你先阅读 「Easy Hexo 团队」撰写的 Hexo 教程！
链接：https://easyhexo.com/

### Install 安装

- 使用 Git SSH
  ```bash
  git clone --depath=1 git@github.com:XPoet/hexo-theme-ils.git themes/ils
  ```
- 下载主题 release 版本  
  请优先下载 [最新 release 版本](https://github.com/XPoet/hexo-theme-ils/releases)，master 分支无法保证稳定。  
  下载后解压到 Hexo 博客目录下 themes 文件夹里面并重命名为 `ils`。

### Enable 启用

Modify `theme` setting in `_config.yml` to `ils`.  
找到博客目录下的 `_config.yml` 文件，将 `theme` 设置为 `ils` 。

### Update 更新

- 使用 Git SSH
  ```bash
  cd themes/ils
  git pull
  ```
- 下载 [主题最新 release 版本](https://github.com/XPoet/hexo-theme-ils/releases)  
  下载后解压到 Hexo 博客目录下 themes 文件夹里面并重命名为 `ils`。

## How to use 如何使用

### Configuration 配置

```yml
# theme basic info
# 该主题的基本信息，无需改动。
theme_info:
  name: ILS
  version: 1.0.0
  author: XPoet
  repository: https://github.com/XPoet/hexo-theme-ils

# navigation menu
# 导航菜单，如需增加，请按下面格式填写。
menu:
  Home: /
  Archives: /archives
  About: /about
  Links: /links
  ...

# RSS
# 若要启用 RSS 订阅功能，需安装 Hexo 插件 hexo-generator-feed。
rss:
  enable: false

# favicon
# 网站 icon 图标，换成自己的图片即可。
favicon: images/favicon.png

# comment plugin
# 评论插件，内置 Valine 和 Gitalk
comments:
  # Valine.
  # more info please open https://github.com/xCss/Valine
  # 如何使用 Valine, 请前往 https://github.com/xCss/Valine
  valine:
    enable: false
    appid: # your leancloud application appid
    appkey: # your leancloud application appkey
    notify: false # mail notifier, https://github.com/xCss/Valine/wiki
    verify: false # Verification code
    placeholder: your placeholder

  # Gitalk
  # For more information: https://gitalk.github.io, https://github.com/gitalk/gitalk
  # 如何使用 gitalk, 请前往 https://github.com/gitalk/gitalk
  gitalk:
    enable: false
    github_id:     # GitHub repo owner
    repository:    # Repository name to store issues
    client_id:     # GitHub Application Client ID
    client_secret: # GitHub Application Client Secret
    distraction_free_mode: false # Facebook-like distraction free mode


# Show PV/UV of the website/page with busuanzi.
# 不蒜子计数插件
# Get more information on http://ibruce.info/2015/04/04/busuanzi/
busuanzi_count:
  # count values only if the other configs are false
  enable: false

  # custom uv span for the whole site
  # 网站访问人数统计
  site_uv: false

  # custom pv span for the whole site
  # 网站总访问量统计
  site_pv: false

  # custom pv span for one page only
  # 文章页面阅读次数统计
  page_pv: false

# Local Search
# Dependencies: https://github.com/theme-next/hexo-generator-searchdb
# 全站文章搜索功能，默认不开启，如需开启，请先在 Hexo 博客目录下安装 hexo-generator-searchdb
# 详情请参考：https://github.com/theme-next/hexo-generator-searchdb
local_search:
  enable: fales
  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  trigger: auto
  # Show top n results per article, show all results by setting to -1
  top_n_per_article: 1
  # Unescape html strings to the readable one.
  unescape: false
  # Preload the search data when the page loads.
  preload: false

# Code Block
codeblock:
  style: flat  # Available values: default | flat | mac
  copy_button:
    enable: true

# Table of Contents in the Sidebar
# Front-matter variable (unsupport wrap expand_all).
toc:
  enable: true
  # Automatically add list number to toc.
  number: true
  # If true, all words will placed on next lines if header width longer then sidebar width.
  wrap: false
  # If true, all level of TOC in a post will be displayed, rather than the activated part of it.
  expand_all: false
  # Maximum heading depth of generated toc.
  max_depth: 6
```

### Comment function 评论功能

主题内置了 Valine 和 Gitalk 两款评论插件，你只能使用其他一款，如果两款评论插件的 enable 都设为了 true，将使用 Valine。

#### Valine 用法

前往 https://github.com/xCss/Valine 查看 Valine 如何使用，获取必要的参数，填写在配置文件里。

#### Gitalk 用法

1. 在自己的 GitHub 账号下创建新的 OAuth App ，传送门：https://github.com/settings/applications/new，Homepage URL 和 Authorization callback URL 均填写自己的域名。
2. 在自己的 GitHub 账号下创建新的 repository 并打开 Issues，用于存储评论内容。
3. 把 自己的 GitHub 用户名称、repository 名称 、OAuth App 的 Client ID 、Client Secret 分别填写在主题配置文件里。

**前往 https://github.com/gitalk/gitalk 查看 Gitalk 用法的更多信息。**

### Post top 文章顶置

实现文章顶置功能，需在 Hexo 博客根目录下安装插件 **hexo-generator-index-pin-top**

```bash
npm install hexo-generator-index-pin-top
```

然后在 `_posts` 文件夹里的需要顶置的文章页添加 `top` 属性，**top** 值越大，顶置越靠前，参考如下。

```markdown
---
title: 千呼万唤始出来，hexo-theme-ils v1.0.0 正式分布
date: 2020-04-07 21:55:14
tags: [hexo]
categories: [hexo]
top: 999
---
```

### Add page 添加页面

**Hexo 初始化没有 about、links、tag、category 等页面，需要自己手动创建。**  
例如创建「关于」页面：

1. 在 Hexo 博客目录下执行命令
   ```bash
   hexo new page about
   ```
2. 创建成功后，编辑博客目录下 `/source/about/index.md`，添加 `layout: about` 属性。  
   修改后的文件示例如下：

   ```bash
   title: about
   date: 2020-04-08 16:29:00
   layout: about
   ---

   这里写正文内容，支持 Markdown, HTML
   ```

## Feedback 反馈

在使用主题过程中，如果遇到问题，请仔细阅读文档，或者提 `issue`。

## Licence 许可证

[MIT](https://github.com/XPoet/hexo-theme-ils/blob/master/LICENSE) Copyright (c) 2020 XPoet
