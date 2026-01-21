## 修复 Banner 页面灰色背景未完全铺满首屏的问题

**问题根源：**
在 `static/css/custom.css` 文件第 149 行，`background-size: 34% auto` 导致背景图片宽度仅为容器宽度的 34%，无法完全覆盖首屏。

**解决方案：**
将 `background-size` 从 `34% auto` 修改为 `cover`，使背景图片自动缩放以完全覆盖整个首屏区域。

**具体修改：**
文件：`d:\my-new-company-site\static\css\custom.css`

* 第 149 行：将 `background-size: 34% auto !important;` 改为 `background-size: cover !important;`

**预期效果：**

* 灰色背景将 100% 覆盖浏览器可视区域的第一屏

* 保持背景图片的宽高比，不会变形

* 在不同屏幕尺寸和分辨率下都能保持背景铺满效果

