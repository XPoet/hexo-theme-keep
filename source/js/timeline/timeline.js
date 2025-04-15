/* 时间轴JavaScript功能 */
KEEP.initTimeline = () => {
  // 获取所有时间轴元素
  const timelines = document.querySelectorAll('.keep-timeline');
  
  if (timelines.length === 0) return;
  
  // 为每个时间轴添加滚动动画效果
  timelines.forEach(timeline => {
    const timelineItems = timeline.querySelectorAll('.keep-timeline-item');
    
    // 初始状态设置
    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 创建Intersection Observer来监测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          // 元素显示后，不再需要观察
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // 当10%的元素可见时触发
      rootMargin: '0px 0px -50px 0px' // 提前触发
    });
    
    // 开始观察每个时间轴项目
    timelineItems.forEach(item => {
      observer.observe(item);
    });
  });
  
  // 可折叠功能（可选）
  const timelineCards = document.querySelectorAll('.keep-timeline-card');
  timelineCards.forEach(card => {
    // 检查内容高度，如果超过一定高度，添加折叠功能
    if (card.scrollHeight > 300) {
      card.classList.add('keep-timeline-card-collapsible');
      card.style.maxHeight = '200px';
      card.style.overflow = 'hidden';
      
      // 添加展开/折叠按钮
      const toggleButton = document.createElement('button');
      toggleButton.className = 'keep-timeline-toggle';
      toggleButton.textContent = '展开更多';
      toggleButton.style.display = 'block';
      toggleButton.style.margin = '0.5rem auto 0';
      toggleButton.style.padding = '0.25rem 0.75rem';
      toggleButton.style.backgroundColor = 'var(--primary-color, #0066cc)';
      toggleButton.style.color = '#fff';
      toggleButton.style.border = 'none';
      toggleButton.style.borderRadius = '4px';
      toggleButton.style.cursor = 'pointer';
      
      // 添加点击事件
      toggleButton.addEventListener('click', () => {
        if (card.style.maxHeight === 'none') {
          // 折叠
          card.style.maxHeight = '200px';
          toggleButton.textContent = '展开更多';
        } else {
          // 展开
          card.style.maxHeight = 'none';
          toggleButton.textContent = '收起';
        }
      });
      
      // 将按钮添加到卡片后面
      card.parentNode.insertBefore(toggleButton, card.nextSibling);
    }
  });
};
