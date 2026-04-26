# P端 BI 需求管理工作台

实时协作的需求管理看板，支持多人同时编辑，数据实时同步。

## 🚀 快速部署

### 方案 1：部署到 Railway（推荐）

1. 访问 [Railway](https://railway.app/)
2. 点击 "Start a New Project"
3. 选择 "Deploy from GitHub repo"
4. 选择这个仓库
5. Railway 会自动检测并部署
6. 部署完成后，点击生成的域名即可访问

### 方案 2：部署到 Render

1. 访问 [Render](https://render.com/)
2. 点击 "New +" → "Web Service"
3. 连接你的 GitHub 仓库
4. 配置如下：
   - **Name**: bi-demand-board
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. 点击 "Create Web Service"
6. 等待部署完成，访问生成的 URL

### 方案 3：本地运行

```bash
# 安装依赖
npm install

# 启动服务器
npm start

# 访问 http://localhost:3000
```

## 🌟 功能特性

- ✅ 实时协作：多人同时编辑，数据自动同步
- ✅ WebSocket 连接：断线自动重连
- ✅ 数据持久化：服务器端保存数据
- ✅ 筛选搜索：按排期周、状态、优先级筛选
- ✅ 导出 CSV：支持导出数据

## 📝 使用说明

1. **新增需求**：点击"新增需求"按钮填写表单
2. **编辑需求**：点击表格中的"编辑"按钮
3. **删除需求**：点击表格中的"删除"按钮
4. **实时同步**：所有操作会自动同步到其他用户

## 🔧 技术栈

- 前端：原生 HTML/CSS/JavaScript
- 后端：Node.js + Express + WebSocket
- 部署：Railway / Render

## 📄 文件说明

- `server.js` - 后端服务器（WebSocket + API）
- `index-realtime.html` - 实时协作版前端（推荐）
- `bi-demand-board.html` - 完整功能版（本地存储）
- `data.json` - 数据存储文件
- `package.json` - 项目配置

## 🌐 访问地址

部署完成后，将生成的 URL 分享给同事即可。

例如：
- Railway: `https://your-app.railway.app`
- Render: `https://your-app.onrender.com`

## 💡 提示

- 首次部署后，数据为空，需要手动添加
- 建议先从 bi-demand-board.html 导出现有数据的 CSV
- 连接状态显示在右上角，绿色表示已连接
- 所有用户的操作会实时同步到其他人
