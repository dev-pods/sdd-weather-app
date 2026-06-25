// Renderizador de cada módulo: carrega os arquivos markdown de `workshop/`.
(function () {
  const modules = window.WORKSHOP_MODULES || [];
  const TAB_FILES = {
    README: 'README.md',
    challenge: 'challenge.md',
    prompts: 'prompts.md',
    solution: 'solution.md',
  };

  // Resolve a base da pasta `workshop/` em todos os cenários de hospedagem:
  // - Produção (GitHub Pages): `docs/*` é publicado na raiz do site e `workshop/`
  //   fica ao lado de `step.html` (mesmo sob `/<repo>/`).
  // - Local servindo a raiz do repositório: `step.html` está em `/docs/` e
  //   `workshop/` é irmã de `docs/`.
  function workshopBase() {
    const path = window.location.pathname;
    const docsIdx = path.lastIndexOf('/docs/');
    if (docsIdx !== -1) {
      return `${path.slice(0, docsIdx + 1)}workshop/`;
    }
    return `${path.replace(/[^/]*$/, '')}workshop/`;
  }

  // Easter egg: modal secreto exibido após os confetes.
  function showEasterEgg() {
    const overlay = document.createElement('div');
    overlay.id = 'easter-egg-overlay';
    overlay.innerHTML = `
      <div id="easter-egg-card" role="dialog" aria-modal="true" aria-labelledby="easter-egg-title">
        <div class="egg-badge">🏆</div>
        <p class="egg-eyebrow">Achievement Unlocked</p>
        <p class="egg-body">
          Você não só <strong>concluiu</strong> o treinamento —<br>
          você entendeu o porquê de cada etapa.<br><br>
          <em>Brief → Spec → Plan → Tasks → Code → Test → Review → Ship</em><br><br>
          Esse é o fluxo. Agora ele é seu.
        </p>
        <p class="egg-secret">😎 Só chega aqui quem tem disciplina para ir até o fim,<br>foco para aprender com intenção e coragem para construir com método.</p>
        <button class="egg-close" aria-label="Fechar">✕</button>
      </div>`;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('egg-visible'));

    function close() {
      overlay.classList.remove('egg-visible');
      overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    }

    overlay.querySelector('.egg-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });
  }

  // Dispara uma chuva de confetes para celebrar a conclusão do workshop.
  function celebrate() {
    if (typeof window.confetti !== 'function') {
      window.location.href = 'index.html';
      return;
    }
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#6d7cff', '#8b9bff', '#ffffff', '#22d3ee', '#facc15'];

    // Rajadas laterais contínuas.
    (function frame() {
      window.confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });
      window.confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Explosão central inicial.
    window.confetti({
      particleCount: 200,
      spread: 120,
      startVelocity: 45,
      origin: { y: 0.6 },
      colors,
    });

    // Easter egg: aparece após os confetes terminarem.
    setTimeout(showEasterEgg, duration + 200);
  }

  const params = new URLSearchParams(window.location.search);
  const stepParam = params.get('step') || (modules[0] && modules[0].step);
  const index = Math.max(
    0,
    modules.findIndex((m) => m.step === stepParam),
  );
  const current = modules[index] || modules[0];

  const contentEl = document.getElementById('content');
  const selectEl = document.getElementById('module-select');
  const progressEl = document.getElementById('progress-label');
  const prevLink = document.getElementById('prev-link');
  const nextLink = document.getElementById('next-link');
  const tabs = Array.from(document.querySelectorAll('.tab'));

  let activeTab = 'README';

  // Preenche o seletor de módulos.
  modules.forEach((m, i) => {
    const opt = document.createElement('option');
    opt.value = m.step;
    opt.textContent = `${String(i + 1).padStart(2, '0')} · ${m.title}`;
    if (m.step === current.step) opt.selected = true;
    selectEl.appendChild(opt);
  });
  selectEl.addEventListener('change', (e) => {
    window.location.search = `?step=${e.target.value}`;
  });

  // Progresso e paginação.
  progressEl.textContent = `Módulo ${index + 1} de ${modules.length}`;
  const prev = modules[index - 1];
  const next = modules[index + 1];
  if (prev) {
    prevLink.href = `step.html?step=${prev.step}`;
    prevLink.textContent = `← ${prev.title}`;
  } else {
    prevLink.href = 'index.html';
    prevLink.textContent = '← Início';
  }
  if (next) {
    nextLink.href = `step.html?step=${next.step}`;
    nextLink.textContent = `${next.title} →`;
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.SDD.markComplete(current.step);
      window.location.search = `?step=${next.step}`;
    });
  } else {
    nextLink.href = 'index.html';
    nextLink.textContent = 'Concluir';
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();
      celebrate();
    });
  }

  async function loadTab(tab) {
    activeTab = tab;
    tabs.forEach((t) => t.classList.toggle('active', t.dataset.tab === tab));
    contentEl.innerHTML = '<p class="loading">Carregando…</p>';

    const url = `${workshopBase()}${current.id}/${TAB_FILES[tab]}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const md = await res.text();
      // Alguns servidores devolvem o index.html (fallback SPA) com status 200
      // quando o arquivo não existe. Detecta esse caso para não renderizar HTML.
      const looksLikeHtml = /^\s*<(?:!doctype|html)\b/i.test(md);
      if (looksLikeHtml) throw new Error('fallback HTML recebido');
      contentEl.innerHTML = window.marked.parse(md);
      contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      contentEl.innerHTML = `
        <div class="error-box">
          <h3>Conteúdo indisponível</h3>
          <p>Não foi possível carregar <code>${url}</code>.</p>
          <p class="hint">Se estiver rodando localmente, sirva a raiz do repositório
          com um servidor estático para que a pasta <code>workshop/</code> fique
          acessível. O jeito mais simples é <code>pnpm site</code> (abre o site em
          <code>/docs/</code>).</p>
        </div>`;
    }
  }

  tabs.forEach((t) => t.addEventListener('click', () => loadTab(t.dataset.tab)));

  // Gate: bloqueia o último módulo se os anteriores não foram concluídos.
  if (index === modules.length - 1 && window.SDD.isLastLocked(modules)) {
    tabs.forEach((t) => { t.disabled = true; t.style.opacity = '0.4'; t.style.cursor = 'not-allowed'; });
    nextLink.removeEventListener('click', nextLink._celebrateHandler);
    nextLink.setAttribute('aria-disabled', 'true');
    nextLink.removeAttribute('href');
    nextLink.style.opacity = '0.35';
    nextLink.style.cursor = 'not-allowed';
    nextLink.style.pointerEvents = 'none';
    contentEl.innerHTML = `
      <div class="gate-box">
        <h2>Módulo bloqueado</h2>
        <p>Conclua todos os módulos anteriores para desbloquear <strong>${current.title}</strong>.</p>
        <a href="index.html" class="btn btn-primary">Voltar ao início</a>
      </div>`;
  } else {
    // Documento inicial.
    loadTab(activeTab);
  }
})();
