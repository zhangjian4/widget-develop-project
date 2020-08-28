# 组件开发文档

## 配置开发环境

### 安装Nodejs

下载[Nodejs](https://nodejs.org/zh-cn)并安装

### 设置镜像

在控制台中执行

```bash
npm config set registry http://172.28.92.1:9000/repository/npm_sc
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```


### 安装angular-cli

在控制台中执行

```bash
npm install -g @angular/cli
```

### 下载vscode或webstorm并安装

## 创建项目

### 克隆项目

打开任意目录，在目录下执行


```bash
git clone https://github.com/zhangjian4/widget-develop-project.git
cd widget-develop-project
```

用vscode或webstorm打开项目

### 安装依赖

在当前目录执行

```bash
npm install
```

### 创建组件库

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

## 添加组件

### 创建组件
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
![](/doc/img/create-widget1.jpg)

### 添加属性

下面将为测试组件添加一个颜色的属性

* component

```typescript
import { Component, OnInit } from '@angular/core';
import { Widget, Property } from 'widget-base';

@Component({
  selector: 'lib-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css'],
})
@Widget('测试组件')
export class TestWidgetComponent implements OnInit {
  @Property('颜色', { format: 'color' })
  color = '#000000';

  constructor() {}

  ngOnInit(): void {}
}

```

* html

```html
<p [style.color]="color">test-widget works!</p>
```

`@Property`的第一个参数为显示的名称,第二个参数为[@delon/form](https://ng-alain.com/form/getting-started/zh)中的JSON Schema格式。

**第一个参数相当于JSON schema中的`title`**

此时将会看到浏览器中出现颜色的属性，修改属性组件的颜色将会跟着改变
![](/doc/img/property1.jpg)

### 添加事件

下面将为测试组件添加点击事件

* component

```typescript
import { Component, OnInit } from '@angular/core';
import { Widget, Property, Event } from 'widget-base';

@Component({
  selector: 'lib-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css'],
})
@Widget('测试组件')
export class TestWidgetComponent implements OnInit {
  @Property('颜色', { format: 'color' })
  color = '#000000';

  constructor() {}

  ngOnInit(): void {}

  @Event('点击')
  onClick() {}
}

```

* html
  
```html
<p [style.color]="color" (click)="onClick()">test-widget works!</p>
```

`@Event`的第一个参数为事件的名称。

**在组件中只负责触发事件,事件内部不用写任何代码,触发事件后的操作将会通过配置去执行**

点击浏览器中的组件将会看到点击事件被触发的消息
![](/doc/img/event1.jpg)

#### 添加事件参数

* component

```typescript
import { Component, OnInit } from '@angular/core';
import { Widget, Property, Event, EventParam } from 'widget-base';

@Component({
  selector: 'lib-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css'],
})
@Widget('测试组件')
export class TestWidgetComponent implements OnInit {
  @Property('颜色', { format: 'color' })
  color = '#000000';

  constructor() {}

  ngOnInit(): void {}

  @Event('点击')
  onClick(@EventParam('参数1') param1: string) {}
}

```

* html
  
```html
<p [style.color]="color" (click)="onClick('test')">test-widget works!</p>
```

再次点击浏览器中的组件将会看到传入的参数值
![](/doc/img/event2.jpg)

### 添加数据

* component
```typescript
import { Component, OnInit } from '@angular/core';
import { Widget, Data } from 'widget-base';

@Component({
  selector: 'lib-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css'],
})
@Widget('测试组件')
export class TestWidgetComponent implements OnInit {
  @Data({
    properties: {
      text: { type: 'string' },
    },
  })
  data = [{ text: '这是一段文本' }];

  constructor() {}

  ngOnInit(): void {}
}
```

* html
```html
<p>{{ data[0]?.text }}</p>
```

`@Data`的参数也是JSON Schema的格式,里面可以定义多个字段

**数据目前只支持Array&lt;Object&gt;格式**

此时组件上呈现的文本将会变成数据中的文本

![](/doc/img/data1.jpg)

修改数据组件上也会跟着改变

![](/doc/img/data2.jpg)

### 交互
组件可以将某个值绑定到全局变量，由此来实现跟其他组件之间的交互。

给组件增加一个`EventEmitter`类型的字段,并加上`@DataOutput()`装饰器,在需要传出值的时候调用该字段的`emit`方法。

* component
```typescript
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Widget, Data, DataOutput } from 'widget-base';

@Component({
  selector: 'lib-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css'],
})
@Widget('测试组件')
export class TestWidgetComponent implements OnInit {
  @Data({
    properties: {
      text: { type: 'string' },
    },
  })
  data = [{ text: '这是一段文本' }];

  @DataOutput('传出的值')
  output = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
```

* html

```html
<p (click)="output.emit(data[0]?.text)">{{ data[0]?.text }}</p>
```

先将变量绑定到全局变量`a`，然后点击组件，再点击查看全局变量，可以看到传出去的值已经绑定到了全局变量中的`a`
![](/doc/img/output1.jpg)

![](/doc/img/output2.jpg)


### 添加方法

* component
```typescript
import { Component, OnInit } from '@angular/core';
import { Widget, Method, Param } from 'widget-base';

@Component({
  selector: 'lib-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css'],
})
@Widget('测试组件')
export class TestWidgetComponent implements OnInit {
  size: number;

  constructor() {}

  ngOnInit(): void {}

  @Method('设置字体大小')
  setSize(@Param('字体大小') size: number) {
    this.size = size;
  }
}
```

* html

```html
<p [style.fontSize.px]="size">这是一段文本</p>
```

`@Method`定义方法名称,`@Param`定义方法的参数

可以点击模拟触发来调试方法

![](/doc/img/method1.jpg)

![](/doc/img/method2.jpg)

![](/doc/img/method3.jpg)

当然这个例子中通过属性也可以去改变字体大小

### 如何捕获属性或数据的改变

可以通过`angular`生命周期中的`ngOnChanges`来捕获属性或数据的改变

* component

```typescript
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Widget, Property, Event, Data, Method, Param } from 'widget-base';

@Component({
  selector: 'lib-test-widget',
  templateUrl: './test-widget.component.html',
  styleUrls: ['./test-widget.component.css'],
})
@Widget('测试组件')
export class TestWidgetComponent implements OnInit, OnChanges {
  @Property('颜色', { format: 'color' })
  color = '#000000';

  @Data({
    properties: {
      text: { type: 'string' },
    },
  })
  data = [{ text: '这是一段文本' }];

  size: number;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  @Event('点击')
  onClick() {}

  @Method('设置字体大小')
  setSize(@Param('字体大小') size: number) {
    this.size = size;
  }
}
```

此时我们再去修改属性或数据将会在控制台输出改变的信息

![](/doc/img/change1.jpg)

### 如何引入第三方的依赖

这个功能目前还在测试阶段，如果你的组件库中用到第三方依赖，请联系笨笨君的开发人员

## 发布

### 编译

在项目的根目录下执行
```bash
ng build my-widgets
```

### 上传

在笨笨君中点击导入组件

![](/doc/img/publish1.jpg)

选择`/dist/my-widgets/bundles/my-widgets.umd.min.js`

![](/doc/img/publish2.jpg)


**一个组件库中可以定义多个组件，但是不能上传两个相同名称的组件库。比如两个人都开发了一个组件库叫做`my-widgets`，那个这两个人只有其中一个能上传。**