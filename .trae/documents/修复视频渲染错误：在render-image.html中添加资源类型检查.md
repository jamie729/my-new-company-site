# 修复视频渲染错误的方案

## 问题分析

错误原因：
1. Hugo的Markdown渲染器将 `![机器人介绍](sinxbot.mp4)` 识别为图片链接
2. Hugo尝试使用 `render-image.html` 处理这个链接
3. `render-image.html` 中的代码对资源调用 `Resize` 方法
4. `Resize` 方法只能用于图片资源，不能用于视频（.mp4）
5. 导致错误：`this method is only available for image resources`

## 解决方案

**方案1：修改 render-image.html，添加资源类型检查（推荐）**

修改 `layouts/_default/_markup/render-image.html`，在调用 `Resize` 之前检查资源类型：
- 如果资源是视频（.mp4, .webm, .ogg），直接输出链接
- 如果资源是图片，正常调用 `Resize` 处理

**优点：**
- 保持Markdown语法 `![描述](文件.mp4)` 的简洁性
- 自动区分图片和视频
- 不影响现有图片处理逻辑

## 实施步骤

1. 修改 `layouts/_default/_markup/render-image.html`
   - 添加资源类型检查
   - 视频资源直接输出，不调用 `Resize`
   - 图片资源保持原有逻辑

2. 删除 `layouts/_default/_markup/render-video.html`
   - 不再需要单独的视频渲染Hook
   - 简化代码结构

3. 保持 `content/news/2025wmc/index.md` 中的视频引用不变
   - 继续使用 `![机器人介绍](sinxbot.mp4)`

## 代码修改

在 `render-image.html` 中添加类型检查：
```go
{{ if $res }}
  {{ if or (in $res.MediaType.Type "video") (in $res.MediaType.SubType "video") }}
    <img src="{{ $res.RelPermalink }}" alt="{{ $alt }}" title="{{ $title }}" class="{{ $class }}" loading="lazy" />
  {{ else }}
    {{ $small := $res.Resize "600x" }}
    {{ $large := $res.Resize "1024x" }}
    <img src="{{ $large.RelPermalink }}" srcset="{{ $small.RelPermalink }} 600w, {{ $large.RelPermalink }} 1024w" sizes="(max-width:1024px) 100vw, 1024px" alt="{{ $alt }}" title="{{ $title }}" class="{{ $class }}" loading="lazy" />
  {{ end }}
{{ end }}
```

## 预期效果

- ✅ 视频文件通过 `![ ]` 语法正常渲染
- ✅ 图片文件继续享受响应式优化
- ✅ 网站正常启动，无构建错误
- ✅ 保持CSS样式和播放控件