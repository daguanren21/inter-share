---
outline: deep
---

## 初始化项目

* 下载github ts基础模板
  

```bash
npx giget@latest gh:daguanren21/starter-cli myProject
```

* 安装项目依赖

```bash
npm install 
pnpm install
yarn add
```

**脚本文件**
1. bin目录下

```js {4}
#!/usr/bin/env node 表明该文件是可执行文件。
import '../dist/cli.mjs'

```
2. package.json

```json 
"bin": {
    "jx-cli": "./bin/index.mjs"
  }
```

## 实现 jx-cli

1. 构建命令行
```ts {4}
import cac from 'cac'
import c from 'picoc'
const cli = cac('jx-cli')
cli.option('-l, --list <fileName>', 'create list components', )
cli.option('-d, --detail <fileName>', 'create detail components', )

```

2. 实现run函数

```ts{4}
import c from 'picocolors'
const argv = cli.parse()
run()

async function run() {
  try {
    //获取cli参数
    const arg = argv.options.list || argv.options.detail
    if (arg) {
        console.log(c.bold(c.blue(`Jx CLI V1.0.0`)))
        create(arg)
    } else {
        console.log(`js-cli 发生错误，错误原因${c.red('请输入想生成的文件')}`)
    }

  } catch (error) {
    console.log(`js-cli 发生错误，错误原因${c.red(error as string)}`)
    if (!argv.options.warn) process.exit(1)
  }
}
```

3. 实现create函数
   
```ts{4}
export interface PromptOptions {
  filePath: string, 
  fileName: string, 
}
async function getOptions(): Promise<PromptOptions> {
  let options: PromptOptions = {

    filePath: '',
    fileName: ''

  }; 
  options.filePath = await prompts([

    {
      name: 'path',
      type: 'text',
      message: c.green('请提供文件目录？'),
    },

  ]).then(r => r.path)
  options.fileName = await prompts([

    {
      name: 'name',
      type: 'text',
      message: c.green('您要生成的目录名称？'),
    },

  ]).then(r => r.name)
  return options
}

async function create(pathStr: string) {
  //获取选项内容
  let options = await getOptions()
  //获取文件路径
  let file = path.resolve(process.cwd(), options.filePath)
  // 读取JSON文件
  fs.readFile(file, 'utf8', (err, data) => {

    if (err) {
      console.error('读取文件时发生错误：', err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      createListTemplate(jsonData, options, pathStr)
    } catch (error) {
      console.error('解析JSON时发生错误：', error);
    }

  }); 
}

```

4. 实现createListTemplate函数

```ts {4}
import Handlebars from 'handlebars'
import jsonToTS from 'json-to-ts'
import { PromptOptions } from '.'
import fs from 'fs'
function createListTemplate(data: Record<string, any>, options: PromptOptions, pathStr: string) {
  //json数据转为ts interface 类型
  let inter = jsonToTS(data, {
    rootName: options.fileName
  })
  let columns: any = []
  Object.entries(data).forEach(column => {
    let [key] = column
    columns.push({
      title: key,
      key: key,
      align: "center",  
    })
  })
  let [first, ...rest] = options.fileName
  const template = `
  <script setup lang="ts">
  // Auto-generated file
  import { DataTableColumns }  from "naive-ui";
   export {{type}}
   const columns:DataTableColumns<${first.toUpperCase()}${rest.join('')}>=${JSON.stringify(columns)}
   let {
    loading,
    loadData,
    renderCell,
    handleResetSearch,
    searchParams,
    tableRef,
    handleChangePage,
    handleUpdateFilter,
    handleChangePageSize,
    handleUpdateSorter,
    pagination,
    tableData,
  } = useTable({ fetch: fetchDevices, params: initParams });
  </script>
  <template>
      <n-data-table
      :row-key="(item) => item.id"
      ref="tableRef"
      @update:filters="handleUpdateFilter"
      :renderCell="renderCell"
      :loading="loading"
      @update:page="handleChangePage"
      @update:page-size="handleChangePageSize"
      remote
      :pagination="pagination"
      @update:sorter="handleUpdateSorter"
      :data="tableData"
      class="w-full flex-1"
      :columns="columns"></n-data-table>
  </template>  
  `;
  // 编译模板
  const compiledTemplate = Handlebars.compile(template);
  const fileContent = compiledTemplate({ data: columns, type: inter });
  const directoryPath = options.fileName + '/' + pathStr

  // fs.writeFileSync(`${options.fileName}.vue`, fileContent);
  // 创建多层目录
  fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`无法创建目录: ${err}`);
    } else {
      console.log(`已创建目录: ${directoryPath}`);

      // 创建文件并写入内容
      fs.writeFile(directoryPath + '/index.vue', fileContent, (err) => {
        if (err) {
          console.error(`无法创建文件: ${err}`);
        } else {
          console.log(`已创建文件: ${directoryPath}`);
        }
      });
    }
  });
}

```

