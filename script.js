/**
 * ===================================================================
 * LUXURY MODERN PORTFOLIO CONTROLLER
 * Midnight Cobalt & Electric Blue Edition
 * Web Developer & Automation Architect - Viryo Fabrellino Kudjinona
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons if Lucide is present
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Set Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------------------------
  // 3. LUXURY THEME SWITCHER (Instant & Synchronous Color Transition)
  // -----------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or infer from system
  const savedTheme = localStorage.getItem('viryo_portfolio_theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    applyTheme('light', false);
  } else {
    applyTheme('dark', false);
  }

  function applyTheme(theme, animate = true) {
    // Disable all CSS transitions temporarily so all colors switch simultaneously
    htmlRoot.classList.add('theme-switching');

    if (theme === 'light') {
      htmlRoot.setAttribute('data-theme', 'light');
      localStorage.setItem('viryo_portfolio_theme', 'light');
    } else {
      htmlRoot.removeAttribute('data-theme');
      localStorage.setItem('viryo_portfolio_theme', 'dark');
    }

    // Force style recalculation (reflow) so the theme applies instantly across all elements
    void htmlRoot.offsetWidth;

    // Safe delay so DOM paint cycle completes instantly before hover transitions resume
    setTimeout(() => {
      htmlRoot.classList.remove('theme-switching');
    }, 60);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = htmlRoot.getAttribute('data-theme') === 'light';
      applyTheme(isCurrentlyLight ? 'dark' : 'light', true);
    });
  }

  // -----------------------------------------------------------------
  // 4. MOUSE SPOTLIGHT / HALO EFFECT
  // -----------------------------------------------------------------
  window.addEventListener('pointermove', (e) => {
    htmlRoot.style.setProperty('--mouse-x', `${e.clientX}px`);
    htmlRoot.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // -----------------------------------------------------------------
  // 5. NAVBAR SCROLL EFFECT
  // -----------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar backdrop elevation
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active link highlighting
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Update Back to Top & Scroll Progress Ring
    updateScrollProgress();
  });

  // -----------------------------------------------------------------
  // 6. BACK TO TOP & CIRCULAR SCROLL PROGRESS
  // -----------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressCircle = document.querySelector('.progress-ring__circle');
  const radius = progressCircle ? progressCircle.r.baseVal.value : 21;
  const circumference = 2 * Math.PI * radius;

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
  }

  function updateScrollProgress() {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / scrollHeight, 1);

    if (progressCircle) {
      const offset = circumference - (progress * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }

    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -----------------------------------------------------------------
  // 7. ENHANCED MOBILE MENU DRAWER TOGGLE
  // -----------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer a');

  if (mobileMenuBtn && mobileDrawer) {
    const menuIcon = mobileMenuBtn.querySelector('i');

    function toggleMenu(forceOpen) {
      const isOpen = typeof forceOpen === 'boolean' 
        ? forceOpen 
        : !mobileDrawer.classList.contains('open');

      if (isOpen) {
        mobileDrawer.classList.add('open');
        if (menuIcon) {
          menuIcon.className = 'ri-close-line text-cyan-400';
        }
      } else {
        mobileDrawer.classList.remove('open');
        if (menuIcon) {
          menuIcon.className = 'ri-menu-line';
        }
      }
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    mobileDrawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close when tapping outside the mobile drawer
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (mobileDrawer.classList.contains('open')) {
          toggleMenu(false);
        }
      }
    });

    // Close mobile menu on resize to desktop view
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // -----------------------------------------------------------------
  // 8. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // -----------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // -----------------------------------------------------------------
  // 9. ANIMATED STATS COUNTER
  // -----------------------------------------------------------------
  const counterElements = document.querySelectorAll('.counter-val');
  let countersStarted = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  const metricsContainer = document.querySelector('.metrics-container');
  if (metricsContainer) {
    counterObserver.observe(metricsContainer);
  }

  function animateCounters() {
    counterElements.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const isFloat = counter.getAttribute('data-float') === 'true';
      const duration = 2000;
      const startTime = performance.now();

      function updateNumber(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // EaseOutQuad
        const ease = 1 - (1 - progress) * (1 - progress);
        const currentVal = ease * target;

        if (isFloat) {
          counter.textContent = currentVal.toFixed(1) + suffix;
        } else {
          counter.textContent = Math.floor(currentVal).toLocaleString() + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = (isFloat ? target.toFixed(1) : target.toLocaleString()) + suffix;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  // -----------------------------------------------------------------
  // 10. INTERACTIVE CODE TERMINAL TABS & RUN WORKFLOW
  // -----------------------------------------------------------------
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalBody = document.getElementById('terminalCodeBody');
  const runWorkflowBtn = document.getElementById('runWorkflowBtn');
  const terminalOutput = document.getElementById('terminalOutput');
  const copyCodeBtn = document.getElementById('copyCodeBtn');

  const snippets = {
    'viryo-developer.ts': `<p><span class="code-keyword">const</span> <span class="code-var">developer</span> = {</p>
<p class="pl-4"><span class="code-key">name:</span> <span class="code-string">'Viryo Fabrellino Kudjinona'</span>,</p>
<p class="pl-4"><span class="code-key">role:</span> <span class="code-string">'Website Developer &amp; Automation Architect'</span>,</p>
<p class="pl-4"><span class="code-key">coreStack:</span> [<span class="code-string">'Code Igniter 3'</span>, <span class="code-string">'n8n'</span>, <span class="code-string">'PostgreSQL'</span>, <span class="code-string">'Docker'</span>],</p>
<p class="pl-4"><span class="code-key">philosophy:</span> <span class="code-string">'Automate everything repeatable with high fidelity'</span>,</p>
<p class="pl-4"><span class="code-key">status:</span> <span class="code-string">'Available for Projects'</span>,</p>
<p class="pl-4"><span class="code-var">executeMission</span>: () =&gt; {</p>
<p class="pl-8 text-cyan-400"><span class="code-keyword">return</span> <span class="code-string">"10x Business Agility via Robust Code &amp; AI Automations"</span>;</p>
<p class="pl-4">}</p>
<p>};</p>`,

    'workflow-n8n.json': `<p><span class="code-keyword">{</span></p>
<p class="pl-4"><span class="code-key">"workflow"</span>: <span class="code-string">"Enterprise-Lead-Sync"</span>,</p>
<p class="pl-4"><span class="code-key">"nodes"</span>: [</p>
<p class="pl-8">{ <span class="code-key">"name"</span>: <span class="code-string">"Webhook Trigger"</span>, <span class="code-key">"type"</span>: <span class="code-string">"n8n-nodes-base.webhook"</span> },</p>
<p class="pl-8">{ <span class="code-key">"name"</span>: <span class="code-string">"OpenAI Analysis"</span>, <span class="code-key">"model"</span>: <span class="code-string">"gpt-4o"</span>, <span class="code-key">"action"</span>: <span class="code-string">"score_lead"</span> },</p>
<p class="pl-8">{ <span class="code-key">"name"</span>: <span class="code-string">"Laravel API"</span>, <span class="code-key">"endpoint"</span>: <span class="code-string">"/api/v1/crm/ingest"</span> },</p>
<p class="pl-8">{ <span class="code-key">"name"</span>: <span class="code-string">"WhatsApp Dispatcher"</span>, <span class="code-key">"status"</span>: <span class="code-bool">true</span> }</p>
<p class="pl-4">],</p>
<p class="pl-4"><span class="code-key">"active"</span>: <span class="code-bool">true</span></p>
<p><span class="code-keyword">}</span></p>`,

    'stack-metrics.sh': `<p><span class="code-keyword">#!/bin/bash</span></p>
<p><span class="code-func">echo</span> <span class="code-string">"== System Performance Diagnostic =="</span></p>
<p><span class="code-var">UPTIME</span>=$(uptime -p)</p>
<p><span class="code-func">echo</span> <span class="code-string">"Docker Engine: 12 Microservices [HEALTHY]"</span></p>
<p><span class="code-func">echo</span> <span class="code-string">"Code Igniter 3: Fast & Optimized PHP"</span></p>
<p><span class="code-func">echo</span> <span class="code-string">"n8n Automated Jobs: 104,280 processed this month"</span></p>
<p><span class="code-func">echo</span> <span class="code-string">"Status: 100% Ready for Enterprise Integration"</span></p>`
  };

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const fileName = tab.getAttribute('data-file');
      if (snippets[fileName] && terminalBody) {
        terminalBody.innerHTML = snippets[fileName];
      }
    });
  });

  // Run Workflow Simulation
  if (runWorkflowBtn && terminalOutput) {
    runWorkflowBtn.addEventListener('click', () => {
      runWorkflowBtn.disabled = true;
      runWorkflowBtn.innerHTML = `<i class="ri-loader-4-line w-3.5 h-3.5 animate-spin"></i> <span>Running...</span>`;

      terminalOutput.classList.remove('show');

      setTimeout(() => {
        terminalOutput.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="text-cyan-400 font-bold">✔ [SUCCESS]</span>
            <span>n8n pipeline connected to Backend API. Latency: <strong>18ms</strong>. 0 errors detected.</span>
          </div>
        `;
        terminalOutput.classList.add('show');
        runWorkflowBtn.disabled = false;
        runWorkflowBtn.innerHTML = `<i class="ri-play-fill w-3.5 h-3.5"></i> <span>Jalankan Workflow</span>`;
      }, 1200);
    });
  }

  // Copy Code Button
  if (copyCodeBtn && terminalBody) {
    copyCodeBtn.addEventListener('click', () => {
      const codeText = terminalBody.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        copyCodeBtn.innerHTML = `<i class="ri-check-line w-4 h-4 text-cyan-400"></i>`;
        setTimeout(() => {
          copyCodeBtn.innerHTML = `<i class="ri-file-copy-line w-4 h-4"></i>`;
        }, 2000);
      });
    });
  }

  // -----------------------------------------------------------------
  // 11. PROJECTS FILTER SYSTEM
  // -----------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat === filterCategory) {
          card.classList.remove('hidden');
          // Smooth fade in
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // -----------------------------------------------------------------
  // 12. PROJECT QUICK VIEW / CASE STUDY MODAL
  // -----------------------------------------------------------------
  const modalBackdrop = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalBody = document.getElementById('modalProjectBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const caseStudyTriggers = document.querySelectorAll('.case-study-trigger');

  const caseStudies = {
    'leadpulse': {
      title: 'LeadPulse Automation Hub - Arsitektur & Studi Kasus',
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p><strong>Tantangan Klien:</strong> Tim sales menerima lebih dari 300 inquiries per hari dari WhatsApp, formulir web, dan iklan Meta, namun proses validasi data memakan waktu hingga 4 jam per lead.</p>
          <div style="background:var(--tag-bg); padding:1.25rem; border-radius:1rem; border:1px solid var(--border-medium);">
            <h4 style="color:var(--text-primary); font-weight:700; margin-bottom:0.5rem;">Solusi Teknis yang Dibangun:</h4>
            <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem; font-size:0.92rem;">
              <li>Membangun pipeline event-driven di <strong>n8n Self-Hosted</strong> dengan webhook listener berkecepatan tinggi.</li>
              <li>Mengintegrasikan modul <strong>OpenAI GPT-4o Mini</strong> untuk analisis sentimen, penentuan budget, dan scoring prioritas secara instan.</li>
              <li>Mengalirkan lead terverifikasi ke <strong>CRM Code Igniter 3</strong> dengan relasi PostgreSQL terindeks dan notifikasi real-time via WhatsApp Cloud API.</li>
            </ul>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem; margin-top:0.5rem;">
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(37,99,235,0.15); border:1px solid rgba(59,130,246,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-blue-light);">92%</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Pengurangan Waktu Respons</div>
            </div>
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(14,165,233,0.15); border:1px solid rgba(56,189,248,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-cyan-light);">+140%</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Konversi Closing Sales</div>
            </div>
          </div>
        </div>
      `
    },
    'payflow': {
      title: 'PayFlow Invoice Engine - Billing SaaS Multi-Tenant',
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p><strong>Tantangan Klien:</strong> Bisnis skala menengah membutuhkan software tagihan mandiri tanpa biaya langganan bulanan mahal, serta memerlukan rekonsiliasi otomatis saat invoice lunas.</p>
          <div style="background:var(--tag-bg); padding:1.25rem; border-radius:1rem; border:1px solid var(--border-medium);">
            <h4 style="color:var(--text-primary); font-weight:700; margin-bottom:0.5rem;">Solusi Teknis yang Dibangun:</h4>
            <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem; font-size:0.92rem;">
              <li>Arsitektur Multi-Tenant berbasis <strong>Code Igniter 3</strong> dengan isolasi database dan autentikasi aman.</li>
              <li>Integrasi Webhook <strong>Midtrans & Xendit</strong> dengan background jobs Redis untuk retry policy yang tahan terhadap kegagalan jaringan.</li>
              <li>Generator PDF otomatis dengan antrian asinkron serta delivery invoice otomatis ke bot Telegram dan email pelanggan.</li>
            </ul>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem; margin-top:0.5rem;">
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(14,165,233,0.15); border:1px solid rgba(56,189,248,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-cyan-light);">&lt; 3 Detik</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Kecepatan Rekonsiliasi Otomatis</div>
            </div>
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(37,99,235,0.15); border:1px solid rgba(59,130,246,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-blue-light);">99.98%</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Uptime Sistem Billing</div>
            </div>
          </div>
        </div>
      `
    },
    'documind': {
      title: 'DocuMind Workflow Sync - Ekstraksi Dokumen & AI',
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p><strong>Tantangan Klien:</strong> Pengolahan dokumen invoice fisik dan kontrak PDF secara manual membutuhkan 15 staff administrasi dan kerap terjadi human error.</p>
          <div style="background:var(--tag-bg); padding:1.25rem; border-radius:1rem; border:1px solid var(--border-medium);">
            <h4 style="color:var(--text-primary); font-weight:700; margin-bottom:0.5rem;">Solusi Teknis yang Dibangun:</h4>
            <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem; font-size:0.92rem;">
              <li>Pipa ekstraksi OCR dan struktur JSON berbasis <strong>Claude 3.5 Sonnet & OpenAI</strong> via webhook n8n orkestrasi.</li>
              <li>Penyimpanan data terstruktur langsung ke relational storage dengan visual audit trail di dashboard aplikasi.</li>
              <li>Sistem enkripsi end-to-end untuk proteksi kerahasiaan data finansial perusahaan.</li>
            </ul>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem; margin-top:0.5rem;">
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-indigo-light);">10x Lebih Cepat</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Pemrosesan Kontrak</div>
            </div>
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(14,165,233,0.15); border:1px solid rgba(56,189,248,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-cyan-light);">0% Error</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Dalam Validasi Format Angka</div>
            </div>
          </div>
        </div>
      `
    }
  };

  caseStudyTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const studyKey = trigger.getAttribute('data-study');
      if (caseStudies[studyKey] && modalBackdrop && modalTitle && modalBody) {
        modalTitle.textContent = caseStudies[studyKey].title;
        modalBody.innerHTML = caseStudies[studyKey].html;
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // -----------------------------------------------------------------
  // 13. CONTACT FORM INTERACTIVE SUBMISSION
  // -----------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm && submitBtn && formSuccessAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Mengirim Pesan...</span> <i class="ri-loader-4-line w-4 h-4 animate-spin"></i>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Pesan Terkirim!</span> <i class="ri-check-line w-4 h-4 text-cyan-400"></i>`;
        formSuccessAlert.classList.remove('hidden');
        formSuccessAlert.classList.add('success');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = `<span>Kirim Pesan Sekarang</span> <i class="ri-send-plane-fill w-4 h-4"></i>`;
        }, 3500);
      }, 1200);
    });
  }
});
