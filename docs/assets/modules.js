// Lista central de módulos do workshop.
// Cada `id` corresponde a uma pasta em `workshop/<id>/`.
window.WORKSHOP_MODULES = [
  { id: 'module-01-setup', step: '01-setup', title: 'Setup', duration: '30 min' },
  {
    id: 'module-02-discovery',
    step: '02-discovery',
    title: 'Understanding the Problem',
    duration: '45 min',
  },
  {
    id: 'module-03-spec',
    step: '03-spec',
    title: 'Writing the Specification',
    duration: '50 min',
  },
  {
    id: 'module-04-plan',
    step: '04-plan',
    title: 'Creating the Technical Plan',
    duration: '45 min',
  },
  {
    id: 'module-05-tasks',
    step: '05-tasks',
    title: 'Breaking Down Tasks',
    duration: '40 min',
  },
  {
    id: 'module-06-ui',
    step: '06-ui',
    title: 'Building the UI',
    duration: '60 min',
  },
  {
    id: 'module-07-api',
    step: '07-api',
    title: 'Integrating APIs',
    duration: '60 min',
  },
  {
    id: 'module-08-testing',
    step: '08-testing',
    title: 'Testing',
    duration: '55 min',
  },
  {
    id: 'module-09-hardening',
    step: '09-hardening',
    title: 'Hardening',
    duration: '50 min',
  },
  {
    id: 'module-10-review',
    step: '10-review',
    title: 'Pull Request Review',
    duration: '45 min',
  },
  {
    id: 'module-11-delivery',
    step: '11-delivery',
    title: 'Delivery (GitHub Pages)',
    duration: '30 min',
  },
];

// Utilitários de progresso — compartilhados entre app.js e step.js.
window.SDD = (function () {
  const KEY = 'sdd:completed';

  function getCompleted() {
    try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); }
    catch { return new Set(); }
  }

  function markComplete(step) {
    const done = getCompleted();
    done.add(step);
    try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch { /* quota */ }
  }

  // Retorna true se o último módulo ainda não pode ser acessado
  // (algum dos módulos anteriores não foi concluído).
  function isLastLocked(modules) {
    if (!modules || modules.length < 2) return false;
    const done = getCompleted();
    return modules.slice(0, -1).some((m) => !done.has(m.step));
  }

  return { getCompleted, markComplete, isLastLocked };
})();
