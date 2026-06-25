// Renderiza a lista de módulos na página inicial.
(function () {
  const list = document.getElementById('module-list');
  if (!list || !window.WORKSHOP_MODULES) return;

  window.WORKSHOP_MODULES.forEach((mod, index) => {
    const isLast = index === window.WORKSHOP_MODULES.length - 1;
    const locked = isLast && window.SDD && window.SDD.isLastLocked(window.WORKSHOP_MODULES);
    const li = document.createElement('li');
    li.className = locked ? 'module-item locked' : 'module-item';
    li.innerHTML = `
      <a href="${locked ? '#' : `step.html?step=${mod.step}`}"${locked ? ' aria-disabled="true"' : ''}>
        <span class="module-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="module-body">
          <span class="module-title">${mod.title}</span>
          <span class="module-duration">${mod.duration}</span>
        </span>
        <span class="module-arrow">→</span>
      </a>
    `;
    list.appendChild(li);
  });
})();
