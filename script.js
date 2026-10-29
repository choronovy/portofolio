/**
 * ===================================================================
 * LUXURY MODERN PORTFOLIO CONTROLLER
 * Midnight Cobalt & Electric Blue Edition
 * Backend Developer & Web Specialist (PHP, Python, Code Igniter 3) - Viryo Fabrellino Kudjinona
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
  // 10. INTERACTIVE CODE EDITOR (PHP & PYTHON LIVE TYPING)
  // -----------------------------------------------------------------
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const codeEditorInput = document.getElementById('codeEditorInput');
  const editorLineNumbers = document.getElementById('editorLineNumbers');
  const runWorkflowBtn = document.getElementById('runWorkflowBtn');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalPromptPrefix = document.getElementById('terminalPromptPrefix');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const resetCodeBtn = document.getElementById('resetCodeBtn');

  // Default Code Templates for PHP and Python
  const defaultSnippets = {
    'developer.php': `<?php
// Profil Backend Developer - Viryo Fabrellino
class BackendDeveloper {
    public string $name = "Viryo Fabrellino Kudjinona";
    public string $role = "Backend & Web Specialist";
    public array $techStack = [
        "PHP 8.3",
        "Code Igniter 3",
        "Python",
        "MySQL",
        "REST API"
    ];

    public function executeMission(): string {
        return "Membangun sistem backend tangguh, RESTful API cepat, & database terstruktur!";
    }
}

$developer = new BackendDeveloper();
echo $developer->executeMission();
`,
    'developer.py': `# Profil Backend Developer - Viryo Fabrellino
class BackendDeveloper:
    def __init__(self):
        self.name = "Viryo Fabrellino Kudjinona"
        self.role = "Backend & Python Developer"
        self.tech_stack = [
            "Python 3",
            "PHP",
            "Code Igniter 3",
            "MySQL",
            "REST API"
        ]

    def execute_mission(self) -> str:
        return f"Mengembangkan script otomasi data, web scraping, & backend handal dengan {self.tech_stack[0]}!"

developer = BackendDeveloper()
print(developer.execute_mission())
`
  };

  // State to preserve user typing per tab
  const userCode = {
    'developer.php': defaultSnippets['developer.php'],
    'developer.py': defaultSnippets['developer.py']
  };

  let activeFile = 'developer.php';

  function updateLineNumbers() {
    if (!codeEditorInput || !editorLineNumbers) return;
    const lines = codeEditorInput.value.split('\n').length;
    let numsHtml = '';
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      numsHtml += `<span>${i}</span>`;
    }
    editorLineNumbers.innerHTML = numsHtml;
  }

  function loadFileContent(fileName) {
    activeFile = fileName;
    if (codeEditorInput) {
      codeEditorInput.value = userCode[fileName] || defaultSnippets[fileName];
      updateLineNumbers();
    }
    if (terminalPromptPrefix) {
      terminalPromptPrefix.textContent = fileName === 'developer.php' ? '$ php developer.php' : '$ python developer.py';
    }
    if (terminalOutput) {
      terminalOutput.classList.remove('show');
    }
  }

  // Initialize line numbers & code
  if (codeEditorInput) {
    loadFileContent('developer.php');

    // Sync line numbers on user typing
    codeEditorInput.addEventListener('input', () => {
      userCode[activeFile] = codeEditorInput.value;
      updateLineNumbers();
    });

    // Support Tab key indentation (2 spaces)
    codeEditorInput.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeEditorInput.selectionStart;
        const end = codeEditorInput.selectionEnd;
        codeEditorInput.value = codeEditorInput.value.substring(0, start) + '  ' + codeEditorInput.value.substring(end);
        codeEditorInput.selectionStart = codeEditorInput.selectionEnd = start + 2;
        userCode[activeFile] = codeEditorInput.value;
        updateLineNumbers();
      }
    });

    // Sync scroll between textarea and line numbers
    codeEditorInput.addEventListener('scroll', () => {
      if (editorLineNumbers) {
        editorLineNumbers.scrollTop = codeEditorInput.scrollTop;
      }
    });
  }

  // Switch between PHP and Python tabs
  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const fileName = tab.getAttribute('data-file');
      loadFileContent(fileName);
    });
  });

  // Reset Code Button
  if (resetCodeBtn && codeEditorInput) {
    resetCodeBtn.addEventListener('click', () => {
      userCode[activeFile] = defaultSnippets[activeFile];
      codeEditorInput.value = defaultSnippets[activeFile];
      updateLineNumbers();
      resetCodeBtn.innerHTML = `<i class="ri-check-line w-4 h-4 text-cyan-400"></i>`;
      setTimeout(() => {
        resetCodeBtn.innerHTML = `<i class="ri-restart-line w-4 h-4"></i>`;
      }, 1500);
    });
  }

  // Copy Code Button
  if (copyCodeBtn && codeEditorInput) {
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeEditorInput.value).then(() => {
        copyCodeBtn.innerHTML = `<i class="ri-check-line w-4 h-4 text-cyan-400"></i>`;
        setTimeout(() => {
          copyCodeBtn.innerHTML = `<i class="ri-file-copy-line w-4 h-4"></i>`;
        }, 1500);
      });
    });
  }

  // Run Code Simulation
  if (runWorkflowBtn && terminalOutput && codeEditorInput) {
    runWorkflowBtn.addEventListener('click', () => {
      runWorkflowBtn.disabled = true;
      const isPhp = activeFile === 'developer.php';
      runWorkflowBtn.innerHTML = `<i class="ri-loader-4-line w-3.5 h-3.5 animate-spin"></i> <span>Menjalankan ${isPhp ? 'PHP 8.3' : 'Python 3'}...</span>`;

      terminalOutput.classList.remove('show');

      setTimeout(() => {
        const currentCode = codeEditorInput.value;
        let outputText = '';

        // Extract any custom print / echo statements if typed by user
        const echoMatch = currentCode.match(/echo\s+(["'])(.*?)\1/i);
        const printMatch = currentCode.match(/print\s*\((["'])(.*?)\1\)/i);

        if (isPhp) {
          if (echoMatch) {
            outputText = echoMatch[2];
          } else {
            outputText = "Membangun sistem backend tangguh, RESTful API cepat, & database terstruktur!";
          }
        } else {
          if (printMatch) {
            outputText = printMatch[2];
          } else {
            outputText = "Mengembangkan script otomasi data, web scraping, & backend handal dengan Python 3!";
          }
        }

        terminalOutput.innerHTML = `
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; line-height:1.6;">
            <div style="color:#10b981; font-weight:700; margin-bottom:0.25rem;">
              ✔ [EXECUTION SUCCESSFUL] Process finished with exit code 0
            </div>
            <div style="color:var(--text-muted); font-size:0.75rem; margin-bottom:0.4rem;">
              Runtime: ${isPhp ? 'PHP 8.3.6 (Zend Engine)' : 'Python 3.12.3'} | Memory: 2.4 MB | Latency: 0.038s
            </div>
            <div style="padding:0.5rem 0.75rem; border-radius:0.4rem; background:rgba(255,255,255,0.06); color:#f8fafc; border-left: 3px solid var(--brand-cyan-light);">
              ${outputText}
            </div>
          </div>
        `;
        terminalOutput.classList.add('show');
        runWorkflowBtn.disabled = false;
        runWorkflowBtn.innerHTML = `<i class="ri-play-fill w-3.5 h-3.5"></i> <span>Jalankan Kode</span>`;
      }, 800);
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
      title: 'LeadPulse CRM & WhatsApp Portal - Arsitektur CI3',
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p><strong>Tantangan Klien:</strong> Tim sales menerima lebih dari 300 pesan calon pelanggan per hari, namun proses pencatatan dan distribusi kontak ke customer service dilakukan manual sehingga respons lambat.</p>
          <div style="background:var(--tag-bg); padding:1.25rem; border-radius:1rem; border:1px solid var(--border-medium);">
            <h4 style="color:var(--text-primary); font-weight:700; margin-bottom:0.5rem;">Solusi Teknis yang Dibangun:</h4>
            <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem; font-size:0.92rem;">
              <li>Membangun aplikasi portal CRM modular berbasis <strong>Code Igniter 3 (PHP 8)</strong> dengan database relasional MySQL teroptimasi.</li>
              <li>Integrasi webhook <strong>WhatsApp Gateway API</strong> untuk menangkap pesan masuk secara instan dan mengirimkan auto-responder ke pelanggan.</li>
              <li>Sistem manajemen antrian dan dashboard analitik interaktif untuk memonitor status prospek secara real-time.</li>
            </ul>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem; margin-top:0.5rem;">
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(37,99,235,0.15); border:1px solid rgba(59,130,246,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-blue-light);">95%</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Pengurangan Waktu Respons</div>
            </div>
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(14,165,233,0.15); border:1px solid rgba(56,189,248,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-cyan-light);">+150%</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Efisiensi Penanganan Lead</div>
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
      title: 'PyData Extractor & ETL - Scripting Engine Python & MySQL',
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p><strong>Tantangan Klien:</strong> Perusahaan perlu mengumpulkan dan menyaring data katalog produk serta harga dari berbagai sumber web dan file data format CSV/JSON yang berjumlah puluhan ribu baris setiap hari.</p>
          <div style="background:var(--tag-bg); padding:1.25rem; border-radius:1rem; border:1px solid var(--border-medium);">
            <h4 style="color:var(--text-primary); font-weight:700; margin-bottom:0.5rem;">Solusi Teknis yang Dibangun:</h4>
            <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem; font-size:0.92rem;">
              <li>Script otomasi berbasis <strong>Python 3</strong> dengan library pemrosesan data untuk mengekstrak dan membersihkan format data secara otomatis.</li>
              <li>Validasi skema dan deduplikasi data secara efisien sebelum disimpan ke relational database <strong>MySQL</strong>.</li>
              <li>Penjadwalan cron job di server Linux dengan sistem logging status terpusat untuk monitoring berkala tanpa intervensi manual.</li>
            </ul>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem; margin-top:0.5rem;">
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-indigo-light);">8x Lebih Cepat</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Pengolahan Data Ekstraksi</div>
            </div>
            <div style="padding:1rem; border-radius:0.75rem; background:rgba(14,165,233,0.15); border:1px solid rgba(56,189,248,0.35);">
              <div style="font-size:1.5rem; font-weight:800; color:var(--brand-cyan-light);">100% Akurat</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Integritas Data Relasional</div>
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

  // -----------------------------------------------------------------
  // FLOATING TECH BUBBLE CLICK EXPLANATION
  // -----------------------------------------------------------------
  const techBubbles = document.querySelectorAll('.tech-scatter-bubble');
  const techDetailContainer = document.getElementById('techDetailContainer');
  const detailIcon = document.getElementById('detailIcon');
  const detailBadge = document.getElementById('detailBadge');
  const detailTitle = document.getElementById('detailTitle');
  const detailSubtitle = document.getElementById('detailSubtitle');
  const detailDesc = document.getElementById('detailDesc');
  const detailPoints = document.getElementById('detailPoints');
  const closeTechDetailBtn = document.getElementById('closeTechDetailBtn');

  const techDetailsData = {
    'ci3': {
      title: 'Code Igniter 3',
      subtitle: 'Framework Backend Utama & Arsitektur MVC',
      badge: 'Primary Framework',
      badgeClass: 'badge-orange',
      iconHtml: '<i class="ri-fire-fill text-orange-500"></i>',
      iconBg: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(234, 88, 12, 0.1))',
      borderGlow: 'rgba(249, 115, 22, 0.6)',
      desc: 'Framework PHP favorit yang saya andalkan untuk membangun web aplikasi berkecepatan tinggi dengan footprint ringan. Berpengalaman merancang arsitektur MVC yang bersih, modular controller, query builder teroptimasi, serta integrasi custom library dan RESTful API.',
      points: [
        'Arsitektur MVC terstruktur rapi & mudah dirawat',
        'Query Builder efisien untuk relasi data kompleks',
        'Proteksi keamanan built-in (CSRF, XSS, SQLi)',
        'Integrasi fleksibel dengan WhatsApp API & Payment Gateway'
      ]
    },
    'php': {
      title: 'PHP 8',
      subtitle: 'Server-Side Core Engine & OOP',
      badge: 'Core Backend Language',
      badgeClass: 'badge-indigo',
      iconHtml: '<i class="ri-php-line text-indigo-400"></i>',
      iconBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.1))',
      borderGlow: 'rgba(99, 102, 241, 0.6)',
      desc: 'Bahasa pemrograman utama di sisi server yang saya gunakan untuk merancang logika bisnis yang kokoh. Memanfaatkan fitur modern PHP 8 seperti constructor property promotion, match expressions, tipe data ketat (type safety), dan penanganan error yang presisi.',
      points: [
        'Pemrograman Berorientasi Objek (OOP) terstandar',
        'Manajemen sesi aman & autentikasi berbasis role',
        'Performa eksekusi skrip cepat dengan memori efisien',
        'Kompatibilitas tinggi dengan berbagai database engine'
      ]
    },
    'tailwind': {
      title: 'Tailwind CSS',
      subtitle: 'Modern Utility-First Styling & Responsive UI',
      badge: 'Frontend Styling',
      badgeClass: 'badge-sky',
      iconHtml: '<i class="ri-tailwind-css-fill text-cyan-400"></i>',
      iconBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(2, 132, 199, 0.1))',
      borderGlow: 'rgba(14, 165, 233, 0.6)',
      desc: 'Kerangka kerja CSS berbasis utility-first untuk menciptakan tampilan antarmuka yang modern, responsif, dan estetis. Terbiasa membangun komponen UI kompleks, dark & light mode dinamis, serta efek visual glassmorphism modern tanpa beban file CSS berlebih.',
      points: [
        'Desain Mobile-First yang adaptif di semua resolusi',
        'Implementasi Dark Mode dinamis & token warna presisi',
        'Efek visual Glassmorphism & transisi micro-animation halus',
        'File CSS akhir super ringan dan optimal untuk produksi'
      ]
    },
    'mysql': {
      title: 'MySQL',
      subtitle: 'Relational Database Management System (RDBMS)',
      badge: 'Relational Database',
      badgeClass: 'badge-cyan',
      iconHtml: '<i class="ri-database-2-line text-cyan-400"></i>',
      iconBg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(8, 145, 178, 0.1))',
      borderGlow: 'rgba(6, 182, 212, 0.6)',
      desc: 'Sistem manajemen basis data relasional andalan saya untuk menyimpan dan mengorganisasi data aplikasi secara konsisten. Mampu merancang skema relasi tabel normalisasi, indexing kunci asing, serta penyusunan query transaksi yang cepat dan andal.',
      points: [
        'Normalisasi tabel dengan integritas relasi Foreign Key',
        'Optimasi indeks query SQL untuk performa baca/tulis tinggi',
        'Manajemen transaksi ACID untuk konsistensi data finansial',
        'Struktur data terorganisir untuk meminimalkan redundansi'
      ]
    },
    'javascript': {
      title: 'JavaScript (ES6+)',
      subtitle: 'Client-Side Logic & Dynamic Interactivity',
      badge: 'Interactive Scripting',
      badgeClass: 'badge-yellow',
      iconHtml: '<i class="ri-javascript-fill text-yellow-400"></i>',
      iconBg: 'linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(202, 138, 4, 0.1))',
      borderGlow: 'rgba(234, 179, 8, 0.6)',
      desc: 'Fondasi utama dalam menghadirkan interaktivitas modern pada web aplikasi. Berpengalaman dalam manipulasi DOM performan tinggi, komunikasi asynchronous (Fetch API / AJAX) tanpa reload halaman, event handling interaktif, dan state management lokal.',
      points: [
        'Komunikasi Asinkron (Async/Await & Fetch) ke Backend API',
        'Manipulasi DOM vanilla JavaScript yang cepat & tanpa bloat',
        'State management lokal (Theme switcher, filter, animasi)',
        'Validasi input pengguna real-time sebelum submit'
      ]
    },
    'git': {
      title: 'Git & GitHub',
      subtitle: 'Version Control & Code Management',
      badge: 'Version Control',
      badgeClass: 'badge-rose',
      iconHtml: '<i class="ri-git-branch-line text-rose-400"></i>',
      iconBg: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25), rgba(225, 29, 72, 0.1))',
      borderGlow: 'rgba(244, 63, 94, 0.6)',
      desc: 'Sistem kontrol versi standar industri yang saya terapkan dalam setiap proyek perangkat lunak. Terbiasa mengelola alur kerja branching yang teratur, histori commit deskriptif, manajemen remote repository GitHub, serta penyusunan rilis kode yang aman dan terkontrol.',
      points: [
        'Branching strategy terstruktur (main, feature, hotfix)',
        'Pelacakan perubahan kode dan histori revisi yang transparan',
        'Manajemen repository GitHub dan kolaborasi kode yang rapi',
        'Penyusunan rilis kode dengan rollback safety'
      ]
    }
  };

  let currentlySelectedTech = null;

  function showTechDetail(techKey) {
    const data = techDetailsData[techKey];
    if (!data || !techDetailContainer) return;

    currentlySelectedTech = techKey;

    // Update active bubble state
    techBubbles.forEach(b => {
      if (b.getAttribute('data-tech') === techKey) {
        b.classList.add('bubble-selected');
      } else {
        b.classList.remove('bubble-selected');
      }
    });

    // Populate card
    detailIcon.innerHTML = data.iconHtml;
    detailIcon.style.background = data.iconBg;
    detailBadge.textContent = data.badge;
    detailBadge.className = `detail-badge ${data.badgeClass}`;
    detailTitle.textContent = data.title;
    detailSubtitle.textContent = data.subtitle;
    detailDesc.textContent = data.desc;

    // Border glow on card
    const card = document.getElementById('techDetailCard');
    if (card) {
      card.style.borderColor = data.borderGlow;
      card.style.boxShadow = `0 20px 45px -12px rgba(0, 0, 0, 0.6), 0 0 35px -5px ${data.borderGlow}`;
    }

    // Points
    detailPoints.innerHTML = data.points.map(pt => `
      <div class="detail-point-item">
        <i class="ri-checkbox-circle-fill" style="color:${data.borderGlow};"></i>
        <span>${pt}</span>
      </div>
    `).join('');

    techDetailContainer.classList.remove('hidden');
    techDetailContainer.classList.add('show');

    // Smooth scroll to card if on small screens
    if (window.innerWidth < 768) {
      setTimeout(() => {
        techDetailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  function hideTechDetail() {
    if (!techDetailContainer) return;
    currentlySelectedTech = null;
    techBubbles.forEach(b => b.classList.remove('bubble-selected'));
    techDetailContainer.classList.remove('show');
    techDetailContainer.classList.add('hidden');
  }

  techBubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
      const techKey = bubble.getAttribute('data-tech');
      if (currentlySelectedTech === techKey) {
        hideTechDetail();
      } else {
        showTechDetail(techKey);
      }
    });
  });

  if (closeTechDetailBtn) {
    closeTechDetailBtn.addEventListener('click', hideTechDetail);
  }

});
