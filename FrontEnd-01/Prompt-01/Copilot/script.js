/* 
  EcoAware Scripts
  - Smooth scroll CTA
  - Sticky navbar mobile menu toggle
  - IntersectionObserver fade-in on scroll
  - Hover and minor animations handled via CSS
  - Interactive comparison table (sortable)
  - Simple local poll with animated result bars
*/

// Utilities
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Current year in footer
(() => {
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

// Smooth scroll CTA to Health section (awareness)
(() => {
  const btn = $('#cta-awareness');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = $('#health');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

// Mobile hamburger menu toggle
(() => {
  const hamburger = $('.hamburger');
  const mobileMenu = $('#mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggleMenu = () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      mobileMenu.setAttribute('hidden', '');
      mobileMenu.style.maxHeight = '';
    } else {
      mobileMenu.removeAttribute('hidden');
      // Little slide-down animation
      mobileMenu.style.maxHeight = '0px';
      requestAnimationFrame(() => {
        mobileMenu.style.transition = 'max-height 250ms ease';
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        setTimeout(() => {
          mobileMenu.style.transition = '';
          mobileMenu.style.maxHeight = '';
        }, 280);
      });
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  $$('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('hidden', '');
    });
  });
})();

// Reveal on scroll using IntersectionObserver
(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('.reveal').forEach(el => observer.observe(el));
})();

// Interactive comparison table
(() => {
  const data = [
    {
      material: 'Stainless steel',
      sustainability: 4,     // 1-5
      durability: 5,
      heat: 5,
      weight: 3,             // lower is lighter? We'll sort ascending for weight
      cost: 3                // 1=low, 5=high
    },
    {
      material: 'Ceramic',
      sustainability: 4,
      durability: 4,
      heat: 5,
      weight: 4,
      cost: 2
    },
    {
      material: 'Bamboo',
      sustainability: 5,
      durability: 3,
      heat: 3,
      weight: 2,
      cost: 2
    }
  ];

  const tbody = $('#table-body');
  const prioritySel = $('#priority');

  if (!tbody || !prioritySel) return;

  const render = (rows) => {
    tbody.innerHTML = '';
    rows.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.material}</td>
        <td>${'★'.repeat(row.sustainability)}${'☆'.repeat(5-row.sustainability)}</td>
        <td>${'★'.repeat(row.durability)}${'☆'.repeat(5-row.durability)}</td>
        <td>${'★'.repeat(row.heat)}${'☆'.repeat(5-row.heat)}</td>
        <td>${row.weight === 2 ? 'Light' : row.weight === 3 ? 'Medium' : 'Heavy'}</td>
        <td>${row.cost === 1 ? '$' : row.cost === 2 ? '$$' : row.cost === 3 ? '$$$' : '$$$$'}</td>
      `;
      tbody.appendChild(tr);
    });
  };

  const sortData = (key) => {
    const rows = [...data];
    if (key === 'weight' || key === 'cost') {
      rows.sort((a, b) => a[key] - b[key]); // ascending
    } else {
      rows.sort((a, b) => b[key] - a[key]); // descending for better is more stars
    }
    render(rows);
  };

  // Initial render
  sortData(prioritySel.value);

  // On change
  prioritySel.addEventListener('change', (e) => {
    sortData(e.target.value);
  });
})();

// Awareness poll with local storage
(() => {
  const form = $('#poll-form');
  const fills = {
    yes: $('.fill[data-key="yes"]'),
    sometimes: $('.fill[data-key="sometimes"]'),
    no: $('.fill[data-key="no"]')
  };
  const percents = {
    yes: $('.percent[data-key="yes"]'),
    sometimes: $('.percent[data-key="sometimes"]'),
    no: $('.percent[data-key="no"]')
  };

  if (!form || !fills.yes) return;

  const LS_KEY = 'ecoaware_poll';
  const getState = () => {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { yes: 0, sometimes: 0, no: 0 };
  };
  const setState = (state) => localStorage.setItem(LS_KEY, JSON.stringify(state));

  const updateUI = () => {
    const state = getState();
    const total = state.yes + state.sometimes + state.no;
    const pct = (n) => total === 0 ? 0 : Math.round((n / total) * 100);

    // Animate bars
    Object.keys(state).forEach((k) => {
      const p = pct(state[k]);
      fills[k].style.width = p + '%';
      percents[k].textContent = p + '%';
    });
  };

  // Initial UI
  updateUI();

  // Handle submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = new FormData(form).get('use');
    if (!val) {
      // Small visual nudge
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 300);
      return;
    }
    const state = getState();
    state[val] += 1;
    setState(state);
    updateUI();

    // Scroll to results smoothly for feedback
    $('.results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

/* Optional: subtle shake animation on invalid submit */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    .shake { animation: shake 300ms ease; }
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      50% { transform: translateX(4px); }
      75% { transform: translateX(-3px); }
      100% { transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);
})();
