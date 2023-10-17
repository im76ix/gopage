# gopage

[![NPM version](https://img.shields.io/npm/v/gopage?color=a1b858&label=)](https://www.npmjs.com/package/gopage)
[![NPM downloads](https://img.shields.io/npm/dm/gopage.svg?style=flat)](https://www.npmjs.com/package/gopage)

> 这是一款基于 `TypeScript` 编写的 `Uni-app` 路由跳转插件包。它提供了**优雅简洁的功能**，帮助你轻松实现页面间的流畅跳转。无论是简单的页面跳转，还是带参数传递的复杂页面跳转，该插件包都能满足你的需求。
> 使用该插件包，你只需简单配置几个参数，即可实现路由的跳转和传参操作。同时，它还支持页面栈的管理，可以方便地实现页面间的前进、后退等操作。
> 该插件包的代码结构清晰，易于阅读和维护。它使用了最新的技术和最佳实践，保证了性能和稳定性。无论是在开发小程序、H5 还是 APP 等平台，都可以无缝集成使用。
> 该插件包不仅提供了简单易用的 API，还附带了详细的文档和示例，帮助你快速上手和解决问题。
> 无论你是初学者还是有经验的开发者，该插件包都能为你提供便利，加速你的开发过程。快来尝试吧，让你的 `Uni-app` 项目更加高效和强大！

---

## 安装

> `npm i gopage`

## 导入

```typescript
import { Page } from 'gopage'
```

## 使用

0. 类型介绍

```typescript
interface Page {
  go: (
    url: string,
    options?: GopageOptions,
    complete?: ((err: GopageCompleteResult) => void) | undefined
  ) => void

  back: (delta?: number) => void
}
```

1. 简单跳转

```typescript
// 简单跳转默认使用 navigateTo
Page.go('page/home/index')
```

2. 指定跳转类型

```typescript
// 1. navigateTo
Page.go('page/home/index', { type: 'navigateTo' })

// 2. redirectTo
Page.go('page/home/index', { type: 'redirectTo' })

// 3. reLaunch
Page.go('page/home/index', { type: 'reLaunch' })

// 4. switchTab
Page.go('page/home/index', { type: 'switchTab' })
```

3. 携带 **基本数据类型** 参数跳转
   > 基本数据类型传递因为是通过字符串传递，数字参数会 toString()化，这种情况可使用第四种方法解决或自行解决

```typescript
// 传递
const people = {
  name: 'im76ix',
  age: 18,
  birthday: '1999-08-10 12:00:00',
}
Page.go('page/home/index', { type: 'navigateTo', params: people })

// 接收
onLoad((options) => {
  console.log(options, 'options')
  // {name: "im76ix", age: "18", birthday: "1999-08-10 12:00:00"}
})
```

4. 携带 **复杂数据类型** 参数跳转

```typescript
// 形式1
// 传递
const people = {
  name: 'im76ix',
  age: 18,
  birthday: '1999-08-10 12:00:00',
  hobby: ['唱', '跳', 'rap', '篮球'],
  friend: {
    name: 'scanf',
    age: 19,
  },
}

Page.go('pages/other/index', {
  type: 'navigateTo',
  params: people,
  encoded: true,
})

// 接收 注意，这里获取方式有点区别
onLoad((options) => {
  const params = JSON.parse(decodeURIComponent(options.params))
  console.log(params, 'params')
  // {name: "im76ix", age: 18, birthday: "1999-08-10 12:00:00", hobby: ['唱', '跳', 'rap', '篮球'], friend: { name: 'scanf', age: 19, } }
})

// 形式2
// 传递
Page.go('pages/other/index', {
  type: 'navigateTo',
  params: ['唱', '跳', 'rap', '篮球'],
  encoded: true,
})

// 接收同上
onLoad((options) => {
  const params = JSON.parse(decodeURIComponent(options.params))
  console.log(params, 'params')
  // ['唱', '跳', 'rap', '篮球']
})
```

5. 获取跳转成功或失败回调

```typescript
Page.go('pages/other/index', { type: 'reLaunch', params: { name: 'im76ix' } }, (res) => {
  if (!res.errMsg.endsWith('ok')) {
    // 跳转失败
    return
  }
  // 成功
})
```

6. 返回

```typescript
// 默认返回1页，如果返回多页传入参数即可
Page.back()

// 返回2页
Page.back(2)
```

7. GopageOptions 参数介绍
   - `type` `?:` "navigateTo" | "redirectTo" | "reLaunch" | "switchTab" 默认 navigateTo
   - `params` `?:unknown` 需要传递参数，任意数据结构
   - `encoded` `?:boolean` 复杂数据类型传递时对参数进行编码
