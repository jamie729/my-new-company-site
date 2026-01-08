# 指南：在此代码库中作为 AI 编码代理的快速上手要点

目的：帮助 AI 代理快速理解本仓库的架构、关键文件、常见约定和常用开发流程，以便安全、准确地修改站点内容与主题。

1) 大局（Big picture）
- 这是一个基于 Hugo 的静态网站（主题 `coHub`）。站点配置位于根目录的 `hugo.toml`，主题在 `themes/coHub`。
- 内容与渲染：`content/` 存放文章与页面，`layouts/` 和 `themes/coHub` 提供模板。生成结果在 `public/`（已提交的构建产物）——通常不要直接编辑 `public/`。

2) 关键文件与示例（直接可查阅）
- 站点级配置：`hugo.toml`（站点菜单、`params`、联系方式与第三方 key）。示例：`params.map.APIkey`、`params.social`。
- 主题配置：`themes/coHub/config.toml`（分页 `paginate`、默认主题参数）。
- 模板示例：
  - 列表页：`layouts/news/list.html` 使用 `.Paginator.Pages`、`.Params.featureImage`、`.Summary`。
  - 组合/局部：`layouts/partials/gallery.html` 使用 `data/gallery.yml`（通过 `.Site.Data.gallery` 访问，字段如 `enable`、`galleryImage`、`title`）。
- 静态与资源：`static/`（直接复制到站点根的静态资源）、`assets/`、`resources/`（Hugo 管线与编译产物）。

3) 常见开发与构建命令（在本仓库可直接使用）
- 本地预览：`hugo serve`（在站点根运行，会自动读取 `hugo.toml`）。
- 生产构建：`hugo`（将生成到 `public/`）。
- 主题示例：`themes/coHub/README.md` 建议将 `exampleSite` 的内容复制到站点根以复现示例。

4) 项目特有约定 / 模式
- 前端内容与 meta：文章通常在 `content/blog/` 或 `content/news/`；列表模板期望文章 front matter 包含 `featureImage` 和可被 `.Summary` 截断的文本。
- 数据驱动片段：画廊使用 `data/gallery.yml`，模板检查 `enable` 开关；修改图像或文本时优先编辑 `data/`。
- 菜单由 `hugo.toml` 的 `[[menu.Main]]` 定义；若修改导航请更新该文件（或主题内的 `config.toml`，视具体部署而定）。
- 注意：`public/` 是构建产物，仓库中已有历史内容。对源代码（`content/`、`layouts/`、`themes/`、`static/`）进行修改并重新运行 `hugo`。

5) 集成点与外部依赖
- 第三方服务：FabForm (`params.fabFormURL`) 和 Google Analytics (`params.googleAnalytics`)、Google Maps API (`params.map.APIkey`) 通过 `hugo.toml` 参数注入。
- 主题依赖：Bootstrap、AOS、jQuery 等在 `public/vendor/` 或 `themes/coHub` 中；修改 JS/CSS 时留意是否需要 rebuild（`hugo` 会处理 `assets/`/`resources/`）。

6) 修改示例（快速示范）
- 添加新闻项：在 `content/news/` 新建 Markdown文件，front matter 示例包含 `title`、`date`、`featureImage`。渲染受 `layouts/news/list.html` 控制。
- 修改画廊：编辑 `data/gallery.yml`，确保 `enable: true` 并为 `galleryImage` 项提供 `image` 和 `description`。

7) 安全与作业边界
- 不要直接修改 `public/`（构建输出）。备份重要第三方 keys（不要把敏感凭证公开提交）。

8) 发现问题时优先级策略
- UI/样式问题：查 `themes/coHub/assets/`、`static/css/custom.css`、`layouts/partials/*`。
- 内容 / 路由问题：检查 `content/` front matter、`hugo.toml` 菜单与 `permalink` 设置。

9) 询问用户时要指出的信息
- 需要确认的常见问题：部署环境是否会覆盖 `hugo.toml`、是否允许修改 `themes/coHub` 原始文件、是否有私钥或 API key 不应提交。

如果你希望我把这合并到仓库（添加为 `.github/copilot-instructions.md`），我可以直接提交并展示变更；或者请指出哪些部分需要展开或本地化（例如中文/英文示例、Hugo 版本约束）。

*** 请告知是否合并，或指出需要补充/更精确的运行命令与约束。***
