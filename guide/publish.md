---
outline: deep
---

## 建立链接（本地测试）

首先将本地ts项目打包


::: code-group

```sh [npm]
$ npm run build
```

```sh [pnpm]
$ pnpm run build
```

```sh [yarn]
$ yarn run build
```
:::

接下来测试前面编码的功能。一般的，我们是发包到 npm 上，然后安装使用。为了方便开发测试，不采用这种方式，而是通过软链接到全局执行环境然后使用。
用 npm link 命令可以将该 npm 包与命令软链接到全局执行环境，从而在任意位置可直接使用该命令。

在项目目录下执行 npm link

```bash
npm link
```

## 发布到npm上（本地测试）

```bash
npm run build
npm run release
```

 
