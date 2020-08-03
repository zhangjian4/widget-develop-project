组件开发文档
====
## 一、配置开发环境

### 1、下载nodejs并安装

### 2、设置镜像

在控制台中执行

`npm config set registry http://172.28.92.1:9000/repository/npm_sc`

`npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass`

### 3、安装angular-cli

在控制台中执行

`npm install -g @angular/cli`

### 4、下载vscode或webstorm并安装

## 二、创建项目

### 1、克隆项目

打开任意目录，在目录下执行

`git clone https://github.com/zhangjian4/widget-develop-project.git`

用vscode或webstorm打开项目

### 2、安装依赖

在项目文件夹中执行

`npm install`

### 3、创建组件库

在项目文件夹中执行命令

`ng g library 组件库名称`

如

`ng g library my-widgets`