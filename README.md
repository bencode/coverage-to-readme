coverage-to-readme
===

一个简单的工具脚本，用于将[istanbul](https://github.com/gotwarlost/istanbul)生成的coverage信息添加到项目的README.md

## 使用方法

1. 安装

```
npm install --save-dev coverage-to-readme
```

2. 在README.md需要添加单元测试覆盖率的地方打个标

```
```coverage
```
```

3. 运行`istanbul cover`生成信息文件


4. 运行命令

```
node node_modules/coverage-to-readme
```

## 参数

### --report

指定不同格式，如 `text`, `text-summary`， 默认为`text-summary`

```
node node_modules/coverage-to-readme --report text
```

### --root

指定不同的coverage信息目录，会传递给istanbul report --root

### --output

默认的ouput为README.md，可以修改成需要的文件
