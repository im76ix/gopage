# Getting started

## Install

`npm i oopsoh`

## Setup

### Vue3

#### 安装

> `npm i gopage`

#### 导入

```typescript
import { Page } from 'gopage'
```

#### 使用

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

````

## Typescript definitions

Add the `oopsoh` types definition file to your tsconfig file.

```json
{
  "compilerOptions": {
    "types": ["oopsoh"]
  }
}
````
