# My Vue Project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
### 学习Vue的过程
1. 熟悉Vue框架的语法、组件、API，多看[官方文档](https://cn.vuejs.org/v2/guide/instance.html#ad)

### 本项目使用的插件
- vue-router
- vue-resource
- element-ui
- vuex

### 版本
Vue：2.9.6
nodejs:v10.15.1

[npm:6.4.1](registry.npmjs.org)


### note
#### computed与watch、methods的区别
- computed是一个function，需要return一个值，结果会被缓存，除非依的响应式属性变化采用重新计算，主要**当作属性使用**
- watch也是一个function，无需return一个值。computed和methods的结合体。键是要观察的表达式，值是对应回调函数
- method方法表示一个具体的操作，主要编写业务逻辑

### [webpack（前端项目构架工具）](webpack.js.org)

1. 合并、压缩（精灵图、图片的base64编码）
2. 使用requireJS或webpack（基于整个项目构建）
3. 使用Gulp，基于task任务
