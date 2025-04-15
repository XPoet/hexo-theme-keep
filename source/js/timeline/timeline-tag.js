/**
 * 时间轴标签插件
 * 
 * 用于在文章中创建时间轴
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

function timeline(args, content) {
  const timeline = content
    .replace(/^\s*/, '')
    .replace(/\s*$/, '');

  return `<div class="keep-timeline">${timeline}</div>`;
}

function timenode(args, content) {
  const date = args[0] || '';
  const text = content
    .replace(/<p>|<\/p>/g, '')
    .replace(/^\s*/, '')
    .replace(/\s*$/, '');

  return `
    <div class="keep-timeline-item">
      <div class="keep-timeline-date">${date}</div>
      <div class="keep-timeline-dot"></div>
      <div class="keep-timeline-content">
        <div class="keep-timeline-card">
          ${text}
        </div>
      </div>
    </div>
  `;
}

// 注册标签
hexo.extend.tag.register('timeline', timeline, { ends: true });
hexo.extend.tag.register('timenode', timenode, { ends: true });
