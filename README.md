# hexo-theme-ils

[![Github Author](https://img.shields.io/badge/author-XPoet-orange.svg)](https://github.com/XPoet)
[![Hexo Version](https://img.shields.io/badge/hexo->=4.2.0-red.svg)](https://hexo.io)
[![Github Release](https://img.shields.io/github/release/XPoet/hexo-theme-ils.svg)](https://github.com/XPoet/hexo-theme-ils/releases)
[![Github License](https://img.shields.io/github/license/XPoet/hexo-theme-ils.svg)](https://github.com/XPoet/hexo-theme-ils/blob/master/LICENSE)

**一款简约轻快的 Hexo 主题。**  
**A simple and light theme for Hexo.**

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
> 如果你在使用该主题，欢迎 PR 将站点链接放置此处。
- [XPoet Blog](https://xpoet.cn)
- ...
***

如你所见，ILS 界面设计十分简洁、清爽，但功能齐全、不失优雅，这正是 ILS 的开发理念。也曾尝试过花里胡哨，发现不仅容易审美疲劳，而且背驰了写博客的初衷，记录生活、展示文字，应该才是搭建博客网站的最终追求，为此 ILS 应运而生。简约大气、不缺美感、突出内容、化繁为简、配置简单、长期维护，如果你也喜欢或认可这些主题特点，一起来折腾吧~

关于主题名称 **"ILS"** 的由来：在主题开发之初，作者想到的几个名字都被已被用，词穷了，后来干脆将名字取自 **"I Like Simple「我喜欢简单」"** 首字母，就是这么简单。

同时，非常欢迎感兴趣的同学 Pull Request 加入到该主题的开发中，共同打造极致 ILS。

## Features 功能特性

### Completed 已完成

- [x] 恰到好处的留白，简约大气；
- [x] 响应式设计，适配多种终端；
- [x] 日间/夜间模式自由切换；
- [x] 多种代码高亮方案；
- [x] 语言国际化，支持中/英文；
- [x] 内置多款评论插件；
- [x] 支持全站文章搜索；
- [x] 支持文章顶置；
- [x] 代码块一键复制；
- [x] TOC 目录结构；
- [x] RSS 订阅；
- [x] 网站 UV 和 PV 统计；
- [x] 文章阅读次数统计；
- [x] 页面滚动百分比提示；
- [x] 一键快速回到顶部；
- [x] 代码精简高效，去 jQuery 化；

### Unfinished 未完成

- [ ] 文章版权信息；
- [ ] 文章字数统计；
- [ ] 文章阅读时长；
- [ ] 文章支持显示公式；
- [ ] 在线更改字体和字号
- [ ] 打赏功能
- [ ] ......

## Get start 快速开始

在开始使用主题之前，强烈建议你先阅读 「Easy Hexo 团队」撰写的 Hexo 教程！
链接：https://easyhexo.com/

### Install 安装

- 使用 Git SSH
  ```bash
  git clone --depth=1 git@github.com:XPoet/hexo-theme-ils.git themes/ils
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
# 主题基本信息，无需改动。
theme_info:
  name: ILS
  version: 1.1.1
  author: XPoet
  repository: https://github.com/XPoet/hexo-theme-ils

# favicon
# 网站图标，请在 "/source/images/" 目录，换成自己的即可。
favicon: images/favicon.png

# avatar
# 头像图片，请在 "/source/images/" 目录，换成自己的即可。
avatar: images/avatar.png

# navigation menu
# 导航菜单，如需新增导航，请按下面格式填写，同时需要添加对应的 Hexo 页面。
# 新增页面，请参考往下的教程："Add page 添加页面"。
menu:
  Home: /
  Archives: /archives
  # About: /about
  # Links: /links
  # ...

# RSS
# RSS 订阅，如需启用，请先安装 Hexo 插件：hexo-generator-feed。
rss:
  enable: true

# comment plugin
# 评论插件，主题内置了 Valine 和 Gitalk，只能使用其中一款，如果 enable 都设为了 true，将使用 Valine。
comments:
  # Valine https://github.com/xCss/Valine
  # 如何使用 Valine 请参考：https://github.com/xCss/Valine
  valine:
    enable: false
    appid:   # leancloud appid
    appkey:  # leancloud appkey
    meta: ['nick', 'mail', 'link']
    placeholder: 😜尽情吐槽吧~

  # Gitalk https://github.com/gitalk/gitalk
  # 如何使用 Gitalk 请参考：https://github.com/gitalk/gitalk
  gitalk:
    enable: false
    github_id:      # GitHub repo owner
    repository:     # Repository name to store issues
    client_id:      # GitHub Application Client ID
    client_secret:  # GitHub Application Client Secret

# website count
# 网站计数
website_count:
  # busuanzi http://ibruce.info/2015/04/04/busuanzi/
  busuanzi_count:
    enable: false
    site_uv: false
    site_pv: false
    page_pv: false

# Local Search
# Dependencies: https://github.com/theme-next/hexo-generator-searchdb
# 本地搜索，如需启用，请先安装 Hexo 插件：hexo-generator-searchdb。
local_search:
  enable: true

  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  # 输入关键字后的触发搜索，可选 自动 auto 或 手动 manual。
  # auto 每输入或删除一个字符后，自动触发搜索。
  # manual 每输入或删除一个字符后，需要按回车键触发搜索。
  trigger: auto  # values: auto | manual

  # Unescape html strings to the readable one.
  # 转义 HTML 字符串为可读字符串。
  unescape: false

  # Preload the search data when the page loads.
  # 在页面加载时预加载搜索数据
  preload: true

# Code Copy
# 代码复制，复制风格可选 default | flat | mac。
code_copy:
  enable: true
  style: flat  # values: default | flat | mac

# sidebar tools
# 侧边栏工具，位置可选 left | right。
side_tools:
  enable: true
  position: right  # values: left | right

# back to top
# 回到顶部，位置可选 left | right。
back2top:
  enable: true
  position: right  # values: left | right

# Table of Contents in the Sidebar
# 文章目录结构
toc:
  enable: true

  # Automatically add list number to toc.
  # 给文章目录自动加上序号。
  number: true

  # If true, all level of TOC in a post will be displayed, rather than the activated part of it.
  # 是否展开所有目录
  expand_all: true

# magic
# magic 为 v1.1.0 增加的新特性，如果启用，主题样式将发生较大的改变。 
magic:
  enable: true
  sidebar:
    enable: false
    fixed: true
    position: right  # values: left | right
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

### Post top 文章顶置

实现文章顶置功能，需在 Hexo 博客根目录下安装插件 **hexo-generator-index-pin-top**。

```bash
npm install hexo-generator-index-pin-top
```

然后在 `_posts` 文件夹里的需要顶置的文章页添加 `top` 属性，**top** 值越大，顶置越靠前，参考如下。

```markdown
---
title: 千呼万唤始出来，Hexo 主题 ILS 正式发布
date: 2020-04-07 21:55:14
tags: [Hexo]
categories: [Hexo]
top: 9999
---
```

### Add page 添加页面

**Hexo 初始化没有 about、links、tag、category 等页面，需要自己手动创建。**  
例如创建「关于」页面：

1. 在 Hexo 博客目录下执行命令
   ```bash
   hexo new page about
   ```
2. 创建成功后，打开博客目录下 `/source/about/index.md` 文件，即可填写内容。  
   如下示例：

   ```markdown
   ---
   title: about
   date: 2020-03-19 14:59:53
   comments: true
   ---
   ## About me
   - XPoet「 X诗人 」... 
   ...
   ...
   ...
   ```

## Feedback 反馈

在使用该主题过程中，如果遇到问题，请仔细阅读使用文档，或者给作者提 `issue`。

## Licence 许可

[MIT](https://github.com/XPoet/hexo-theme-ils/blob/master/LICENSE) Copyright (c) 2020 XPoet
