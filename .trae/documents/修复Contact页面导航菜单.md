# 实施计划：对contact.html进行Hugo模板化改造

## 目标

将`layouts/contact/contact.html`从独立HTML文件改造为Hugo模板，集成到主题系统中。

## 改造内容

1. **移除完整HTML文档结构** - 删除`<!DOCTYPE html>`、`<html>`、`<head>`、`<body>`标签
2. **使用Hugo模板语法** - 添加`{{define "main"}}`和`{{end}}`
3. **保留原有内容** - 保留top-grid、coop-grid、social-section、footer-map等主要内容
4. **保留内联CSS** - 保留所有自定义样式
5. **自动集成主题** - 自动继承header、footer、head等partial

## 预期效果

* ✅ 自动引入顶部导航菜单（logo + 6个菜单项）

* ✅ 自动引入底部页脚（logo + 地址 + 社交媒体 + 版权信息）

* ✅ 自动引入元数据和主题样式

* ✅ 保留原有的主要内容结构和功能

* ✅ 符合Hugo模板规范

## 操作步骤

1. 改造`layouts/contact/contact.html`文件
2. 清除`public`目录
3. 运行`hugo server`重新构建
4. 验证页面正常渲染

