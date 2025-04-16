/**
 * 时间轴标签插件
 * 
 * 用于在文章中创建时间轴。 需要安装marked：  ` npm install marked@4.0.0 --save `
 * 
 * 使用方法:
 * {% timeline %}
 *   {% timenode 2024-04-15 %}
 *     内容...
 *   {% endtimenode %}
 *   
 *   {% timenode 2024-04-16 %}
 *     内容...
 *   {% endtimenode %}
 * {% endtimeline %}
 */


'use strict';

const marked = require('marked');

// 设置marked选项
marked.setOptions({
  breaks: true,
  smartLists: true,
  gfm: true
});

// 主时间轴标签
hexo.extend.tag.register('timeline', function(args, content) {
  return `<div class="keep-timeline">${content}</div>`;
}, { ends: true });

// 时间节点标签
hexo.extend.tag.register('timenode', function(args, content) {
  const date = args[0] || '';
  
  // 使用marked渲染Markdown内容
  const renderedContent = marked.parse(content);
  
  return `
    <div class="keep-timeline-item">
      <div class="keep-timeline-date">${date}</div>
      <div class="keep-timeline-dot"></div>
      <div class="keep-timeline-content">
        <div class="keep-timeline-card">
          ${renderedContent}
        </div>
      </div>
    </div>
  `;
}, { ends: true });

