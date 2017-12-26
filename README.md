## react-mobx-boilerplate

一个基于react16 + react-router4 + mobx + less 的项目脚手架，用于快速搭建react项目。

## 一些特性

- 热加载
- ES6/7
- less
- 可控的loading状态
- 简化项目，只提供基本的示例

## 使用
```
安装模块：npm install  

开发模式：npm start  

打包：npm run build

访问地址：http://localhost:3000
```
## 部署
nginx主要配置，网上都有哈哈
```
location / {
	root   html;
	index  index.html index.htm;
	try_files $uri /index.html;
}
```

## 注意
项目提供的loading状态使用可参照 src/stores/HomeState和src/pages/Home。
首先在组件的构造函数中进行设置，例如：
`this.store = this.props.store.home;`
然后可以通过
`this.store.loading`
或者
`this.store.loadingEffect.xxx`(xxx代表当前用到loading的方法)
第一种方式写法简单，用于同一时间只有一个loading的时候，当页面同时可能出现多个loading时需要用第二种方式进行区分。