# 部署指南

## 📦 准备工作

你的项目已经准备好部署了！包含以下文件：

- ✅ `server.js` - 后端服务器（支持 WebSocket 实时同步）
- ✅ `index-realtime.html` - 实时协作版前端
- ✅ `package.json` - 项目依赖配置
- ✅ `railway.json` - Railway 部署配置
- ✅ `data.json` - 数据存储文件

## 🚀 方案一：部署到 Railway（最简单，推荐）

### 步骤：

1. **访问 Railway**
   - 打开 https://railway.app/
   - 使用 GitHub 账号登录

2. **创建新项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 如果是第一次，需要授权 Railway 访问你的 GitHub

3. **连接仓库**
   - 选择你的仓库（需要先把代码推送到 GitHub）
   - Railway 会自动检测到 Node.js 项目

4. **等待部署**
   - Railway 会自动安装依赖并启动服务
   - 大约 2-3 分钟完成

5. **获取访问地址**
   - 部署完成后，点击 "Settings" → "Generate Domain"
   - 会生成一个类似 `https://your-app.up.railway.app` 的地址
   - 把这个地址分享给同事即可！

### Railway 优点：
- ✅ 完全免费（每月 $5 额度，足够小团队使用）
- ✅ 自动 HTTPS
- ✅ 自动重启
- ✅ 支持 WebSocket

---

## 🌐 方案二：部署到 Render

### 步骤：

1. **访问 Render**
   - 打开 https://render.com/
   - 使用 GitHub 账号登录

2. **创建 Web Service**
   - 点击 "New +" → "Web Service"
   - 连接你的 GitHub 仓库

3. **配置项目**
   ```
   Name: bi-demand-board
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **选择免费计划**
   - 选择 "Free" 计划
   - 点击 "Create Web Service"

5. **等待部署**
   - 大约 5 分钟完成
   - 会生成一个 `https://your-app.onrender.com` 地址

### Render 注意事项：
- ⚠️ 免费版会在 15 分钟无活动后休眠
- ⚠️ 首次访问可能需要等待 30 秒唤醒
- ✅ 适合低频使用的场景

---

## 💻 方案三：本地测试

如果想先在本地测试：

```bash
# 1. 进入项目目录
cd /xclaw/projects/binbin.du_at_ximalaya.com_matrix.xmlyoa.com/443b4e6a-9a4b-489f-b665-15f607f5910e

# 2. 安装依赖（已安装可跳过）
npm install

# 3. 启动服务器
npm start

# 4. 浏览器访问
# http://localhost:3000
```

---

## 📤 推送到 GitHub

如果还没有推送到 GitHub：

```bash
# 1. 初始化 Git（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "初始化 BI 需求管理看板"

# 4. 关联远程仓库（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/bi-demand-board.git

# 5. 推送
git push -u origin main
```

---

## ✅ 部署后的使用

1. **分享地址**
   - 把部署后的 URL 发给同事
   - 例如：`https://your-app.railway.app`

2. **实时协作**
   - 任何人打开网页都能看到最新数据
   - 一个人新增/编辑需求，其他人会实时看到更新
   - 右上角显示连接状态（绿色=已连接）

3. **数据持久化**
   - 数据保存在服务器的 `data.json` 文件中
   - 重启服务器不会丢失数据

---

## 🔧 常见问题

### Q: 部署后数据是空的？
A: 首次部署数据为空是正常的。可以：
   - 手动添加需求
   - 或从 `bi-demand-board.html` 导出 CSV，然后手动导入

### Q: 连接状态显示"未连接"？
A: 检查：
   - 浏览器是否支持 WebSocket
   - 是否使用了 HTTPS（Railway/Render 自动提供）
   - 刷新页面重试

### Q: Railway 免费额度够用吗？
A: 每月 $5 额度，对于小团队（10人以内）完全够用

### Q: 如何备份数据？
A: 点击"导出 CSV"按钮，定期备份即可

---

## 🎉 推荐部署方案

**最佳选择：Railway**
- 简单快速
- 免费额度充足
- 支持 WebSocket
- 自动 HTTPS

立即开始：https://railway.app/

---

有问题随时问我！
