# 方案A实施计划：支持Page Bundle资源作为featureImage

## 修改文件清单

### 1. 模板文件修改（2个文件）

**文件1：** `layouts/news/list.html`
- **修改位置：** 第24行
- **修改内容：** 将简单的 `absURL` 处理改为支持Page Bundle资源的智能查找
- **修改前：** `<img src="{{ .Params.featureImage | absURL }}" alt="news-images">`
- **修改后：** 添加资源查找逻辑，优先使用Page Bundle资源，fallback到原方式

**文件2：** `layouts/news/single.html`
- **修改位置：** 第17行
- **修改内容：** 同上，支持Page Bundle资源
- **修改前：** `<img src="{{ .Params.featureImage | absURL}}" alt="feature-image">`
- **修改后：** 添加资源查找逻辑

### 2. 内容文件修改（2个文件）

**文件3：** `content/news/2025wmc/index.md`
- **修改位置：** 第4行
- **修改前：** `featureImage: content\news\2025wmc\01.jpg`
- **修改后：** `featureImage: 01.jpg`

**文件4：** `content/news/newplace/index.md`
- **修改位置：** 第4行
- **修改前：** `featureImage: images/news/newplace01.jpg`
- **修改后：** `featureImage: all.PNG`（使用newplace目录下的封面图）

## 实施步骤

### 步骤1：备份现有文件
- 备份 `layouts/news/list.html`
- 备份 `layouts/news/single.html`
- 备份 `content/news/2025wmc/index.md`
- 备份 `content/news/newplace/index.md`

### 步骤2：修改模板文件
- 修改 `layouts/news/list.html` 第24行
- 修改 `layouts/news/single.html` 第17行

### 步骤3：修改内容文件
- 修改 `content/news/2025wmc/index.md` 的 featureImage
- 修改 `content/news/newplace/index.md` 的 featureImage

### 步骤4：测试验证
- 检查新闻列表页显示
- 检查新闻详情页显示
- 验证不同类型新闻的兼容性

## 潜在风险及规避措施

**风险1：** 修改模板后，使用static目录路径的新闻可能失效
**规避：** 实现fallback机制，如果Page Bundle中找不到资源，则使用原方式

**风险2：** 图片文件名大小写不匹配
**规避：** 使用 `GetMatch` 的通配符匹配，不区分大小写

**风险3：** 现有新闻的featureImage路径可能不正确
**规避：** 修改前先检查所有新闻的featureImage设置

## 测试验证方法

1. 访问新闻列表页 `/news/`，检查所有新闻的封面图是否正常显示
2. 点击进入新闻详情页，检查封面图是否正常显示
3. 检查浏览器控制台是否有404错误
4. 验证图片加载速度和响应式效果