# 修复视频渲染为正确HTML标签的方案

## 问题确认

当前 `render-image.html` 生成的是 `<img>` 标签，导致视频无法播放。需要改为生成 `<video>` 标签。

## 解决方案

**方案：修改 render-image.html，为视频生成 <video> 标签**

在 `layouts/_default/_markup/render-image.html` 中：
1. 检测资源是否为视频（通过文件扩展名或MediaType）
2. 如果是视频，生成 `<video>` 标签，带播放控件
3. 如果是图片，继续生成 `<img>` 标签，保持响应式优化

## 实施步骤

1. 修改 `layouts/_default/_markup/render-image.html`
   - 添加视频检测逻辑
   - 为视频生成 `<video>` 标签
   - 为图片保持 `<img>` 标签

2. 保持 `content/news/2025wmc/index.md` 不变
   - 继续使用 `![机器人介绍](sinxbot.mp4)`

3. 验证网站正常启动
   - 检查生成的HTML是否为 `<video>` 标签
   - 测试视频是否可以播放

## 预期效果

- ✅ 视频文件放在新闻目录中（已完成）
- ✅ Markdown引用视频文件（已完成）
- ✅ 生成 `<video>` 标签，带播放控件
- ✅ 应用响应式CSS样式
- ✅ 视频可以正常播放