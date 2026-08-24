let tooltipElements = [];

export function initTooltips() {
  const links = document.querySelectorAll('a[data-tooltip-key]');
  
  // Clear existing tooltips
  tooltipElements.forEach(t => t.element.remove());
  tooltipElements = [];
  
  links.forEach(link => {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    document.body.appendChild(tooltip);
    
    const tooltipKey = link.getAttribute('data-tooltip-key');
    
    tooltipElements.push({
      element: tooltip,
      link: link,
      key: tooltipKey
    });

    link.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });

    link.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });

    link.addEventListener('mousemove', (e) => {
      tooltip.style.left = `${e.clientX + 15}px`;
      tooltip.style.top = `${e.clientY - 40}px`;
    });
  });
}

export function updateTooltips(jsonData) {
  if (!jsonData.tooltips) return;
  
  tooltipElements.forEach(item => {
    const text = jsonData.tooltips[item.key];
    if (text) {
      item.element.textContent = text;
    }
  });
}
