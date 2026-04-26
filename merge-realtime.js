const fs = require('fs');

console.log('读取文件...');
let content = fs.readFileSync('bi-demand-board.html', 'utf-8');

// 1. 修改标题
content = content.replace(
  '<title>P端 BI 需求管理工作台</title>',
  '<title>P端 BI 需求管理工作台 - 实时协作</title>'
);

// 2. 在 var rawData = []; 后添加 WebSocket 变量
content = content.replace(
  'var rawData = [];',
  `var rawData = [];
  var ws = null;
  var reconnectTimer = null;`
);

// 3. 在 normalizePastWeeksStatus 函数前添加 WebSocket 函数
const wsCode = `
  // ========== WebSocket 实时同步 ==========
  function connectWebSocket() {
    var protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    var wsUrl = protocol + '//' + window.location.host;
    
    ws = new WebSocket(wsUrl);
    
    ws.onopen = function() {
      console.log('WebSocket 连接成功');
      updateOnlineStatus(true);
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };
    
    ws.onmessage = function(event) {
      try {
        var msg = JSON.parse(event.data);
        if (msg.type === 'init' || msg.type === 'data_update') {
          rawData = msg.data || [];
          normalizePastWeeksStatus();
          fillSelects();
          applyFilters();
          updateLandingWarning();
          $("dataScopeHint").textContent = "实时同步 · 共 " + rawData.length + " 条";
        }
      } catch (e) {
        console.error('消息解析错误:', e);
      }
    };
    
    ws.onerror = function(error) {
      console.error('WebSocket 错误:', error);
      updateOnlineStatus(false);
    };
    
    ws.onclose = function() {
      console.log('WebSocket 连接关闭');
      updateOnlineStatus(false);
      reconnectTimer = setTimeout(function() {
        console.log('尝试重新连接...');
        connectWebSocket();
      }, 5000);
    };
  }
  
  function sendUpdate(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'update',
        data: data
      }));
    } else {
      toast('连接已断开，请刷新页面', true);
    }
  }
  
  function updateOnlineStatus(connected) {
    var indicator = $("onlineIndicator");
    if (indicator) {
      indicator.className = 'online-indicator ' + (connected ? 'connected' : 'disconnected');
      var statusText = indicator.querySelector('.status-text');
      if (statusText) {
        statusText.textContent = connected ? '实时同步中' : '连接断开';
      }
    }
  }

`;

content = content.replace(
  'function normalizePastWeeksStatus()',
  wsCode + '  function normalizePastWeeksStatus()'
);

// 4. 替换所有 localStorage.setItem 为 sendUpdate
content = content.replace(
  /try \{ localStorage\.setItem\(STORAGE_KEY, JSON\.stringify\(rawData\)\); \} catch \(e\) \{\}/g,
  'sendUpdate(rawData);'
);

// 5. 替换初始化代码
const oldInit = `try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) rawData = JSON.parse(stored);
  } catch (e) {}
  normalizePastWeeksStatus();
  fillSelects();
  updateLandingWarning();
  render();`;

const newInit = `// 初始化 WebSocket 连接
  connectWebSocket();
  updateLandingWarning();`;

content = content.replace(oldInit, newInit);

// 保存文件
fs.writeFileSync('bi-demand-board-realtime.html', content, 'utf-8');
console.log('✓ 文件创建成功: bi-demand-board-realtime.html');
console.log('✓ 已集成 WebSocket 实时同步功能');
