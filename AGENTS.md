# 项目协作说明

Keep 是供 Hexo 站点安装的主题，本仓库不是独立的 Hexo 站点。修改时以现有实现和配置契约为准，保持改动范围最小。

## 项目结构

- `_config.yml`：主题默认配置及配置项说明。
- `layout/`：EJS 页面、局部模板和按页面类型加载的资源；`layout/layout.ejs` 是外层模板。
- `source/css/`：Stylus 样式，入口为 `source/css/style.styl`；新增样式文件需要从入口引入。
- `source/js/`：浏览器端脚本；公共初始化在 `main.js`、`utils.js`，页面和文章脚本分别在 `page/`、`post/`。
- `scripts/`：由 Hexo 加载的事件、辅助函数、过滤器、生成器和标签插件，不属于浏览器端脚本。
- `languages/`：`en`、`zh-CN`、`zh-TW` 的主题文案；
- `docs/` 和根目录 README 是使用说明。

## 修改约定

- 遵循 `.editorconfig`、`.prettierrc` 和 `.stylelintrc.js`。新增及修改内容使用 2 空格缩进；不要为统一格式而重排无关代码。
- 新增或调整主题配置时，检查 `_config.yml`、使用该配置的 EJS/Hexo 脚本/浏览器脚本及相关文档。保留既有配置项的含义和默认行为。
- `scripts/events/init-config.js` 在生成前合并站点数据配置；
- `scripts/helpers/export-config.js` 将主题配置和浏览器文案注入 `KEEP`。涉及配置传递时检查服务端与浏览器端是否一致。
- 修改页面行为时，检查 `layout/_partial/scripts.ejs` 的资源加载条件。涉及 PJAX 的交互还需检查首次加载和页面切换后的初始化。
- 新增用户可见文案时，同步检查三个 `languages/*.yml` 文件。EJS 输出文章、配置等动态内容时，按 HTML 上下文正确转义。
- 新增或修改界面时，不使用 `aria-*` 属性；交互控件使用原生 HTML 元素。
- `source/js/libs/` 中的压缩库及 `source/font/` 中的字体属于第三方资源；不要直接手改。

## 验证与交付

- `package.json` 没有独立的 `test`、`build` 或只读 `lint` 脚本，不要把它们写成已通过的检查。
- 对改动的 JavaScript 可运行 `npx prettier --check <文件>`；
- 对改动的 Stylus 可运行 `npx stylelint <文件>`。
- 仓库现有的 `npm run format` 和 `npm run lint:style` 会修改文件，使用前先确认其作用范围。
- 涉及渲染、配置或交互时，在已配置 Keep 主题的 Hexo 站点中运行 `hexo generate`，并检查受影响的页面与功能开关；需要浏览器行为验证时再使用 `hexo server`。
- 交付前运行 `git diff --check`，检查 `git status` 与实际改动；说明已执行的验证和尚未验证的部分。
- 如需提交，遵循 `.commitlintrc.js` 的 Conventional Commit 类型；只暂存本次任务涉及的文件。
