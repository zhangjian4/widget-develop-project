# 组件开发文档

## 一、配置开发环境

### 1、下载nodejs并安装

### 2、设置镜像

在控制台中执行

```bash
npm config set registry http://172.28.92.1:9000/repository/npm_sc
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```


### 3、安装angular-cli

在控制台中执行

```bash
npm install -g @angular/cli
```

### 4、下载vscode或webstorm并安装

## 二、创建项目

### 1、克隆项目

打开任意目录，在目录下执行


```bash
git clone https://github.com/zhangjian4/widget-develop-project.git
cd widget-develop-project
```

用vscode或webstorm打开项目

### 2、安装依赖

在当前目录执行

```bash
npm install
```

### 3、创建组件库

在当前目录执行

```bash
ng g library 组件库名称
```

如

```bash
ng g library my-widgets
```

修改根目录下的tsconfig.json

```diff
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      "my-widgets": [
-        "dist/my-widgets/my-widgets",
-        "dist/my-widgets"
+        "projects/my-widgets/src/public-api"
      ]
    }
  },
  ...
}
```

其中`my-widgets`为自己的组件库名称

**注:这步的目的是为了在不打包组件库的情况下也能看到效果**

在`AppModule`中添加模块

```typescript
import { MyWidgetsModule } from 'my-widgets';

@NgModule({
  imports: [
    MyWidgetsModule
  ]
})
export class AppModule {}
```

在当前目录执行

```bash
ng serve
```
或运行`package.json`中的`start`脚本

浏览器打开 http://localhost:4200

## 三、添加组件

### 1、创建组件
在当前目录执行

```bash
ng g component test-widget --project=my-widgets
```

其中`test-widget`为组件名称，`my-widgets`为组件库名称

在`projects/my-widgets/src/lib/test-widget/test-widget.component.ts`中添加`@Widget`装饰器

```typescript
import { Component, OnInit } from '@angular/core';
import { Widget } from 'widget-base';

@Component({
  selector: 'lib-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css']
})
@Widget('测试组件')
export class TestWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

```

其中`测试组件`为组件的显示名称


在`projects/my-widgets/src/lib/my-widgets.module.ts`中注册组件

```typescript
import { NgModule } from '@angular/core';
import { MyWidgetsComponent } from './my-widgets.component';
import { TestWidgetComponent } from './test-widget/test-widget.component';
import { WidgetService } from 'widget-base';

@NgModule({
  declarations: [MyWidgetsComponent, TestWidgetComponent],
  imports: [],
  exports: [MyWidgetsComponent],
})
export class MyWidgetsModule {
  constructor(private widgetService: WidgetService) {
    widgetService.register(TestWidgetComponent);
  }
}

```

浏览器会重新加载，左侧导航栏如果出现了`测试组件`则说明组件添加成功





