# Admin Template with React, Redux, and React-Router
This is an Admin Template with React, Redux, and React-Router!
You can use validated email & password to login.

## Requirements
* node `^5.0.0`
* yarn `^0.23.0` or npm `^3.0.0`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project based on `thsi-react-admin` by doing the following:

```bash
$ git clone https://github.com/EricThsi/thsi-react-admin.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Running the Project

### 前端测试开发
使用 dev.js 配置文件

```bash
npm run start
```
### 后端测试开发
使用 pre_dev.js 配置文件

```bash
NODE_ENV=predev npm run start
```

### 预发布测试环境编辑
使用 pre_test.js 配置文件

```bash
npm run pretest
```

### 线上生成环境编辑
使用 prod.js 配置文件

```bash
npm run build
```
