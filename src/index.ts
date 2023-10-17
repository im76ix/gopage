const toString = Object.prototype.toString

/**
 *
 * @param val 判断是否为指定参数类型
 * @param type 类型
 * @returns
 */
export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`
}

/**
 * 判断是否是函数
 * @param val 函数体
 * @returns 是或否
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function')
}

interface GopageCompleteResult {
  errMsg: string
}

export interface GopageOptions {
  type: 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'
  params?: Record<string | number | symbol, unknown> | unknown
  encoded?: boolean
}

export class Page {
  /**
   * 注意：如果携带参数需要在接收参数页通过 onLoad 钩子函数接收参数，type为switchTab时传递参数无效
   * @param url 需要跳转的应用内非 tabBar 的页面的路径，开头可以不带 “/”
   * @param options 配置参数 （非必填）👇
   * @param options.type 页面跳转类型
   * @param options.params 需要传递参数，任意数据结构
   * @param options.encoded 复杂数据类型传递时对参数进行编码
   * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）返回成功状态或失败原因
   */
  static go(
    url: string,
    options?: GopageOptions,
    complete?: ((err: GopageCompleteResult) => void) | undefined
  ) {
    if (!url.startsWith('/')) url = `/${url}`
    if (!options) {
      uni.navigateTo({ url })
      return
    }

    let navigateURL: string
    if (!options.encoded) {
      if (!is(options.params, 'String')) {
        const queryString = Object.entries(options?.params || {})
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
        navigateURL = queryString ? `${url}?${queryString}` : url
      } else {
        navigateURL = `${url}?${options.params}`
      }
    } else {
      navigateURL = `${url}?params=${encodeURIComponent(JSON.stringify(options.params))}`
    }

    switch (options?.type) {
      case 'navigateTo':
        uni.navigateTo({ url: navigateURL, complete: complete })
        break
      case 'reLaunch':
        uni.reLaunch({ url: navigateURL, complete: complete })
        break
      case 'redirectTo':
        uni.redirectTo({ url: navigateURL, complete: complete })
        break
      case 'switchTab':
        uni.switchTab({ url: navigateURL, complete: complete })
        break
      default:
        console.error('路由配置传入错误', options?.type)
    }
  }

  /**
   *
   * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页，默认为1
   */
  static back(delta?: number) {
    uni.navigateBack({ delta: delta || 1 })
  }
}
