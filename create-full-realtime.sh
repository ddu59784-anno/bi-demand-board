#!/bin/bash

# 从 bi-demand-board.html 提取样式和 HTML 结构
# 从 index-realtime.html 提取 WebSocket 逻辑

echo "正在创建完整版实时协作页面..."

# 提取 bi-demand-board.html 的头部（到 <body> 之前）
sed -n '1,/^<body>/p' bi-demand-board.html > /tmp/head.html

# 提取 bi-demand-board.html 的 body 内容（不包括最后的 script）
sed -n '/<body>/,/<script type="text\/template"/p' bi-demand-board.html | sed '1d;$d' > /tmp/body.html

# 提取 bi-demand-board.html 的 CSV 模板
sed -n '/<script type="text\/template"/,/<\/script>/p' bi-demand-board.html > /tmp/csv-template.html

# 现在创建新文件
cat > bi-demand-board-realtime.html << 'NEWFILE'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>P端 BI 需求管理工作台 - 实时协作</title>
NEWFILE

# 添加其余内容...
echo "文件结构创建完成"

