const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 使用持久化存储目录（Railway Volume）
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const DATA_FILE = path.join(DATA_DIR, 'data.json');

// 初始化数据文件
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// 读取数据
function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

// 保存数据
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// 广播给所有客户端
function broadcast(message, excludeWs = null) {
  wss.clients.forEach(client => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// 静态文件服务
app.use(express.static(__dirname));
app.use(express.json({ limit: '10mb' }));

// 默认路由指向完整版实时协作界面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'bi-demand-board-realtime.html'));
});

// API: 获取数据
app.get('/api/data', (req, res) => {
  res.json(loadData());
});

// API: 保存数据
app.post('/api/data', (req, res) => {
  const data = req.body;
  saveData(data);
  broadcast({ type: 'data_update', data });
  res.json({ success: true });
});

// WebSocket 连接
wss.on('connection', (ws) => {
  console.log('新客户端连接');

  // 发送当前数据
  ws.send(JSON.stringify({
    type: 'init',
    data: loadData()
  }));

  ws.on('message', (message) => {
    try {
      const msg = JSON.parse(message);

      if (msg.type === 'update') {
        saveData(msg.data);
        broadcast({ type: 'data_update', data: msg.data }, ws);
      }
    } catch (e) {
      console.error('消息解析错误:', e);
    }
  });

  ws.on('close', () => {
    console.log('客户端断开');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://0.0.0.0:${PORT}`);
  console.log(`内网访问: http://<你的内网IP>:${PORT}`);
});
