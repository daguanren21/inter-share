# Cli是什么

CLI 是一种与计算机系统进行交互的方式，用户可以通过输入文本命令来执行各种操作和任务，而不是依赖于图形用户界面（GUI）。

1. 文本界面：CLI 通常以纯文本形式呈现，用户通过键盘输入命令，并在终端窗口中看到命令的输出结果。
2. 脚本支持：CLI 支持脚本编写，用户可以编写脚本来自动化一系列任务，从而提高效率。
3. 远程操作：CLI 可以通过网络协议进行远程访问，允许管理员和开发人员在远程服务器上执行命令。
4. 更高效的控制：对于熟练的用户，CLI 提供更精确的控制，因为用户可以直接输入命令和参数，而不必依赖于图形界面中提供的选项。
5. 脱离图形界面的依赖：在某些情况下，CLI 可能更加适用，尤其是在服务器管理、编程开发、自动化和系统维护等领域。

## 学习Cli能收获什么

* 常用工具的使用实现交互式友好提示界面
* 学习手脚架工作过程，可以自己DIY的手脚架工具

## 构建Cli包的作用以及使用

### Cac

Command And Conquer 是一个用于构建 CLI 应用程序的 JavaScript 库。

也可以采用commander库，但cac更轻量级

**Input**
```ts{4}
import cac from 'cac'; 
const cli = cac('new-cli'); 
cli.option('--type <type>', 'Choose a project type', {
    default:'node'
}); 
const argv = cli.parse()

```
**Output**
<img src="https://user-images.githubusercontent.com/8784712/48981576-2a871000-f112-11e8-8151-80f61e9b9908.png" alt="Image Description" width="100%" height="100">

**Input**

```ts{4}
import cac from 'cac';
const cli = cac('new-cli');
cli.option('--type <type>','Choose a project type',{
    default:'node'
});
cli.command('lint [...files]', 'Lint files').action((files, options) => {
  console.log(files, options)
})
// 查看Cli 所有命令
cli.help()
//定义Cli 的版本号
cli.version()
const argv = cli.parse()
```

**Output**

<img src="https://user-images.githubusercontent.com/8784712/48979012-acb20d00-f0ef-11e8-9cc6-8ffca00ab78a.png" alt="Image Description" width="100%" height="100">

### prompts

轻巧、美观且用户友好的交互式提示

**用法**

1. 基础用法
```ts{4}
import prompts from 'prompts'; 
(async () => {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message: 'How old are you?',
    validate: value => value < 18 ? `Nightclub is 18+ only` : true
  }); 
  console.log(response); // => { value: 24 }
})(); 
```
2. Prompt Chain

```ts{4}
import prompts from 'prompts';
const questions = [
  {
    type: 'text',
    name: 'username',
    message: 'What is your GitHub username?'
  },
  {
    type: 'number',
    name: 'age',
    message: 'How old are you?'
  },
  {
    type: 'text',
    name: 'about',
    message: 'Tell something about yourself',
    initial: 'Why should I?' //默认值
  }
];

(async () => {
  const response = await prompts(questions);
  console.log(response); // => { username,age,about}
})();   
```
3. Dynamic Prompts

```ts{4}
import prompts from 'prompts';
const questions = [
  {
    type: 'text',
    name: 'dish',
    message: 'Do you like pizza?'
  },
  {
    type: prev => prev == 'pizza' ? 'text' : null,
    name: 'topping',
    message: 'Name a topping'
  }
];
(async () => {
  const response = await prompts(questions);
})();
```

4. Override
   
通过传递带有 答案 prompts.override 的对象来预回答问题。与过程参数结合使用时功能强大。

```ts{4}
import prompts from 'prompts';
// prompts.override(require('yargs').argv);
prompts.override({
  twitter: 'zqg',
  color: ['#ff0000', '#0000ff']
});
(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'twitter',
      message: `What's your twitter handle?`
    },
    {
      type: 'multiselect',
      name: 'color',
      message: 'Pick colors',
      choices: [
        { title: 'Red', value: '#ff0000' },
        { title: 'Green', value: '#00ff00' },
        { title: 'Blue', value: '#0000ff' }
      ],
    }
  ]);
  console.log(response);
})();
```
5. Inject
   
以编程方式注入响应。这使您能够提前准备响应。如果找到任何注入值，则会立即使用注入值解决提示。此功能仅用于测试。

```ts{4}
import prompts from 'prompts';
prompts.inject([ '@terkelg', ['#ff0000', '#0000ff'] ]);
(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'twitter',
      message: `What's your twitter handle?`
    },
    {
      type: 'multiselect',
      name: 'color',
      message: 'Pick colors',
      choices: [
        { title: 'Red', value: '#ff0000' },
        { title: 'Green', value: '#00ff00' },
        { title: 'Blue', value: '#0000ff' }
      ],
    }
  ]);
  console.log(response); //{ twitter: '@terkelg', color: [ '#ff0000', '#0000ff' ] }
})();
```

### picocolors

一个终端字符串美化工具。

使用：c.blue 表字体蓝色，c.red 表字体红色，c.underline 表下划线，c.bgRed 表背景红色

```ts {4}
import c from 'picocolors'
console.log(`${c.blue('hello')}, ${c.red('this')} ${c.underline('is')} ${c.bgRed('chalk')}!`);
```
---

<!-- **Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown). -->
