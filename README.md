# Poem

A simple and beautiful theme for Hexo.

- [Preview](https://github.com/XPoet/hexo-theme-poem)

## Installation

### Install

``` bash
$ git clone git@github.com:XPoet/hexo-theme-poem.git themes/poem
```

### Enable

Modify `theme` setting in `_config.yml` to `poem`.

### Update

``` bash
cd themes/poem
git pull
```

## Configuration

``` yml
# Header
menu:
  Home: /
  Archives: /archives
rss: /atom.xml

# Content
excerpt_link: Read More
fancybox: true

# Sidebar
sidebar: right
widgets:
- category
- tag
- tagcloud
- archives
- recent_posts

# Miscellaneous
google_analytics:
favicon: /favicon.png
twitter:
google_plus:
```