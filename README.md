# hexo-theme-ils

[![Github Author](https://img.shields.io/badge/author-XPoet-orange.svg)](https://github.com/XPoet)
[![Github Release](https://img.shields.io/github/release/XPoet/hexo-theme-ils.svg)](https://github.com/XPoet/hexo-theme-ils/releases)
[![Github License](https://img.shields.io/github/license/XPoet/hexo-theme-ils.svg)](https://github.com/XPoet/hexo-theme-ils/blob/master/LICENSE)

**一款简约大气的Hexo主题。**  
**A simple and atmospheric theme for Hexo.**

> 关于主题名称 __"ILS"__： 在主题开发之初，作者想到的几个名字都被用了，词穷，后来将名字取自 **"I Like Simple「我喜欢简约」"** 首字母。  
> 如果你也喜欢简约大气风格的主题，一起来折腾吧~  

- [Preview 预览](https://xpoet.cn)

## Features 功能特性
- [x] 恰到好处的留白，简约大气；
- [x] 响应式设计，适配多种终端；
- [x] 日间/夜间模式自由切换；
- [x] 多种代码高亮方案；
- [x] 内置多语言（目前仅支持中英文）；
- [x] 内置评论插件；
- [x] 支持全站文章搜索；
- [x] 网站访问统计和文章阅读统计；
- [x] 代码简洁高效，无jQuery；
- [x] 配置简单，配置项均有详细注释；

## Get start 快速开始

### Install 安装
- 使用 Git SSH
  ``` bash
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
  ``` bash
  cd themes/ils
  git pull
  ```
- 下载[主题最新 release 版本](https://github.com/XPoet/hexo-theme-ils/releases)  
  下载后解压到 Hexo 博客目录下 themes 文件夹里面并重命名为 `ils`。
  
  
## Configuration 配置
```yml
# theme basic info
# 该主题的基本信息，此处不用改动。
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

# RSS
# RSS 订阅，当前版本未实现（欢迎RP）。
rss: /atom.xml

# favicon
# 网站 icon 图标，换成自己的图片即可。
favicon: images/favicon.png

# comment plugin
# 评论插件，
# 当前版本只内置只支持 Valine，欢迎参与贡献代码，增加其他评论插件。
comments:
  # Valine.
  # more info please open https://github.com/xCss/Valine
  # 如何使用 Valine, 请前往 https://github.com/xCss/Valine
  valine:
    enable: false
    appid:    # your leancloud application appid
    appkey:   # your leancloud application appkey
    notify: false # mail notifier, https://github.com/xCss/Valine/wiki
    verify: false # Verification code
    placeholder: 填写昵称和邮箱才能收到回复通知哦~

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
```

## Add page 添加页面
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
   
   这里写正文，支持 Markdown, HTML
   ```
   

## Feedback 反馈
在使用主题过程中，如果遇到问题，请仔细阅读文档，或者提 `issue`。

## Licence 许可证
[MIT](https://github.com/XPoet/hexo-theme-ils/blob/master/LICENSE) Copyright (c) 2020 XPoet