---
title: Vue3 + Quill 富文本编辑器内容无法清空问题解决
date: 2026-03-05
tags:
  - Vue3
  - Element Plus
  - Quill
  - 前端开发
description: 解决 @vueup/vue-quill 富文本编辑器在 Vue3 项目中无法正确清空内容的问题，并总结几种稳定的解决方案。
---

# Vue3 + Quill 富文本编辑器内容无法清空问题解决

在使用 `@vueup/vue-quill` 作为富文本编辑器时，经常会遇到这样的问题：

> 当表单重置或新增文章时，富文本编辑器内容没有被正确清空。

例如在 **新增文章抽屉组件** 中：

```vue
<quill-editor
  theme="snow"
  v-model:content="formModel.content"
  ref="editorRef"
  content-type="html"
/>
```

虽然已经重置了数据：

```js
formModel.value.content = ''
```

但编辑器里的内容仍然存在。

本文总结几种 **稳定可靠的解决方案**。

---

# 一、问题原因

`@vueup/vue-quill` 的编辑器内部维护了 **Quill Instance 状态**。

即使 Vue 的 `v-model` 数据被清空：

```js
formModel.value.content = ''
```

Quill 内部的 DOM 内容 **不会立即同步更新**。

因此需要 **同时操作 Vue 数据 + Quill 实例**。

---

# 二、解决方案一（推荐）

## 同时清空数据 + 清空编辑器实例

```js
formModel.value.content = ''

editorRef.value?.setHTML('')
```

完整示例：

```js
const openDrawer = (row = {}) => {
  visibleDrawer.value = true

  if (row.id) {
    console.log('编辑回显')
  } else {
    console.log('添加文章')

    formModel.value = {
      title: '',
      cate_id: '',
      cover_img: '',
      content: '',
      state: ''
    }

    imgUrl.value = ''

    // 清空富文本
    formModel.value.content = ''
    editorRef.value?.setHTML('')
  }
}
```

---

# 三、解决方案二（推荐稳定版）

有时候 `editorRef` 在组件渲染前还未挂载，需要使用 `nextTick`。

```js
import { nextTick } from 'vue'

formModel.value.content = ''

nextTick(() => {
  editorRef.value?.setHTML('')
})
```

封装函数写法：

```js
const resetEditor = async () => {
  formModel.value.content = ''

  await nextTick()

  editorRef.value?.setHTML('')
}
```

调用：

```js
resetEditor()
```

---

# 四、解决方案三（企业项目常用）

## 直接销毁并重新渲染编辑器

很多团队在实际项目中会使用 **条件渲染** 来强制刷新组件。

```vue
<quill-editor
  v-if="visibleDrawer"
  v-model:content="formModel.content"
  ref="editorRef"
  theme="snow"
  content-type="html"
/>
```

当抽屉关闭时：

```js
visibleDrawer.value = false
```

再次打开时：

```
编辑器重新挂载
```

这样可以 **100%保证内容为空**。

---

# 五、推荐最佳实践

在真实项目中，推荐使用：

```
Vue数据清空 + nextTick + 清空Quill实例
```

代码示例：

```js
import { nextTick } from 'vue'

const resetEditor = async () => {
  formModel.value.content = ''

  await nextTick()

  editorRef.value?.setHTML('')
}
```

这样可以避免：

- 编辑器未挂载
- 数据不同步
- DOM 未更新

等问题。

---

# 六、完整总结

| 方案 | 稳定性 | 推荐 |
|-----|------|------|
| 仅清空 `formModel.content` | ❌ 不稳定 | 不推荐 |
| `setHTML('')` | ✅ 稳定 | 推荐 |
| `nextTick + setHTML` | ⭐ 最稳定 | 强烈推荐 |
| `v-if 销毁重建编辑器` | ⭐⭐⭐ | 企业项目常用 |

---

# 七、参考技术栈

本文技术环境：

- Vue3
- Element Plus
- @vueup/vue-quill
- Vite
- VitePress

---

# 八、总结

当使用 `@vueup/vue-quill` 时，如果发现 **富文本内容无法清空**，通常是因为：

```
Vue数据状态 ≠ Quill内部状态
```

解决思路：

```
同步清空 Vue 数据 + Quill 编辑器实例
```

推荐最终写法：

```js
formModel.value.content = ''

nextTick(() => {
  editorRef.value?.setHTML('')
})
```

这样可以确保编辑器内容 **稳定清空**。