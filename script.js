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

  // HTML escape helper
  function escapeHtml(str) {
    if (typeof str !== 'string') str = String(str);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Realistic PHP Execution Engine (Client-Side)
  function executePhpCode(code) {
    const output = [];
    try {
      let clean = code.replace(/<\?php/gi, '').replace(/\?>/gi, '').trim();
      if (!clean) return { success: true, output: '(Program selesai dieksekusi tanpa output)' };

      // Semicolon syntax check on statements
      const lines = clean.split('\n');
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line || line.startsWith('//') || line.startsWith('#') || line.startsWith('/*') || line.endsWith('*/')) continue;
        if (line.endsWith('{') || line.endsWith('}') || line.startsWith('}') || line.startsWith('{')) continue;
        if (line.startsWith('class ') || line.startsWith('public ') || line.startsWith('private ') || line.startsWith('function ')) {
          if (line.endsWith('{')) continue;
        }
        if ((line.startsWith('echo ') || line.startsWith('$') || line.startsWith('print ') || line.startsWith('return ')) && !line.endsWith(';') && !line.endsWith('{') && !line.endsWith('}')) {
          return {
            success: false,
            error: `PHP Parse error: syntax error, unexpected token on line ${i + 1} (missing semicolon ';')`
          };
        }
      }

      let jsCode = clean;

      // 1. Convert PHP string concatenation dot (.) outside quotes to plus (+)
      let quoteSegments = jsCode.split(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
      for (let i = 0; i < quoteSegments.length; i += 2) {
        quoteSegments[i] = quoteSegments[i].replace(/(\d+)\.(\d+)/g, '__FLOAT_$1_$2__');
        quoteSegments[i] = quoteSegments[i].replace(/\s*\.\s*/g, ' + ');
        quoteSegments[i] = quoteSegments[i].replace(/__FLOAT_(\d+)_(\d+)__/g, '$1.$2');
      }
      jsCode = quoteSegments.join('');

      // 2. Convert string interpolation in double quotes: "Halo $nama!" -> `Halo ${var_nama}!`
      jsCode = jsCode.replace(/"((?:[^"\\\r\n]|\\.)*)"/g, (match, inner) => {
        if (inner.includes('$')) {
          let template = inner.replace(/\$([a-zA-Z0-9_]+)/g, '${typeof var_$1 !== "undefined" ? var_$1 : ""}');
          return '`' + template + '`';
        }
        return match;
      });

      // 3. Convert PHP class definitions, member variables and property types
      jsCode = jsCode.replace(/(?:public|private|protected)\s+(?:[a-zA-Z0-9_|]+\s+)?\$([a-zA-Z0-9_]+)\s*=/g, '$1 =');
      jsCode = jsCode.replace(/(?:public|private|protected)?\s*function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)(?:\s*:\s*[a-zA-Z0-9_|]+)?\s*\{/g, '$1($2) {');

      // 4. Object arrow -> to dot .
      jsCode = jsCode.replace(/\$this->/g, 'this.');
      jsCode = jsCode.replace(/->/g, '.');

      // 5. Array syntax
      jsCode = jsCode.replace(/\barray\s*\(/g, '[');

      // 6. Echo and print statements to echo(...) function call
      jsCode = jsCode.replace(/\becho\s+([^;\n]+);/g, 'echo($1);');
      jsCode = jsCode.replace(/\bprint\s*\(([^;\n]+)\);/g, 'echo($1);');
      jsCode = jsCode.replace(/\bprint\s+([^;\n]+);/g, 'echo($1);');

      // 7. var_dump and print_r
      jsCode = jsCode.replace(/\bvar_dump\s*\(([^;\n]+)\);/g, 'var_dump($1);');
      jsCode = jsCode.replace(/\bprint_r\s*\(([^;\n]+)\);/g, 'print_r($1);');

      // 8. Extract all variable names starting with $
      let varNames = new Set();
      let varMatches = jsCode.match(/\$([a-zA-Z0-9_]+)/g);
      if (varMatches) {
        varMatches.forEach(v => varNames.add(v.slice(1)));
      }

      // Replace $variable with var_variable
      jsCode = jsCode.replace(/\$([a-zA-Z0-9_]+)/g, 'var_$1');

      // Declare all variables at the top of scope
      let varDeclarations = Array.from(varNames).map(v => `let var_${v};`).join(' ');

      let fullScript = `
        ${varDeclarations}

        function echo(...args) {
          for (let a of args) {
            __print(a);
          }
        }

        function var_dump(val) {
          if (typeof val === 'string') {
            __print('string(' + val.length + ') "' + val + '"\n');
          } else if (typeof val === 'number') {
            __print(Number.isInteger(val) ? 'int(' + val + ')\n' : 'float(' + val + ')\n');
          } else if (typeof val === 'boolean') {
            __print('bool(' + val + ')\n');
          } else if (Array.isArray(val)) {
            let res = 'array(' + val.length + ') {\n';
            val.forEach((item, idx) => {
              res += '  [' + idx + ']=>\n  ';
              if (typeof item === 'string') res += 'string(' + item.length + ') "' + item + '"\n';
              else res += item + '\n';
            });
            res += '}\n';
            __print(res);
          } else {
            __print(JSON.stringify(val, null, 2) + '\n');
          }
        }

        function print_r(val) {
          if (Array.isArray(val)) {
            let res = 'Array\n(\n';
            val.forEach((item, idx) => {
              res += '    [' + idx + '] => ' + item + '\n';
            });
            res += ')\n';
            __print(res);
          } else if (typeof val === 'object') {
            __print(JSON.stringify(val, null, 2) + '\n');
          } else {
            __print(String(val) + '\n');
          }
        }

        ${jsCode}
      `;

      let runner = new Function('__print', fullScript);

      runner(function(val) {
        output.push(val !== undefined && val !== null ? String(val) : '');
      });

      return {
        success: true,
        output: output.join('') || '(Program selesai dieksekusi tanpa output)'
      };
    } catch (err) {
      return {
        success: false,
        error: `PHP Parse error / Fatal error: ${err.message} in developer.php`
      };
    }
  }

  // Realistic Python Execution Engine (Client-Side)
  function executePythonCode(code) {
    const output = [];
    try {
      let clean = code.trim();
      if (!clean) return { success: true, output: '(Program selesai dieksekusi tanpa output)' };

      // Handle default OOP snippet
      if (clean.includes('class BackendDeveloper') && clean.includes('execute_mission')) {
        const retMatch = clean.match(/def\s+execute_mission\s*\(self\)[^:]*:\s*(?:(?:#.*?\n)|\s)*return\s+(?:f)?(["'])(.*?)\1/s);
        if (retMatch) {
          let msg = retMatch[2];
          msg = msg.replace('{self.tech_stack[0]}', 'Python 3');
          return { success: true, output: msg };
        }
      }

      // Extract print statements
      const printRegex = /print\s*\((.*?)\)/gs;
      let printMatches = [];
      let m;
      while ((m = printRegex.exec(clean)) !== null) {
        printMatches.push(m[1]);
      }

      if (printMatches.length > 0) {
        for (let p of printMatches) {
          let arg = p.trim();

          // f-string
          const fMatch = arg.match(/^f(["'])(.*?)\1$/s);
          if (fMatch) {
            let inner = fMatch[2];
            inner = inner.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, varName) => {
              const vRegex = new RegExp(`\\b${varName}\\s*=\\s*(["'])(.*?)\\1`);
              const vMatch = clean.match(vRegex);
              return vMatch ? vMatch[2] : `{${varName}}`;
            });
            output.push(inner);
            continue;
          }

          // Regular string
          const sMatch = arg.match(/^(["'])(.*?)\1$/s);
          if (sMatch) {
            output.push(sMatch[2]);
            continue;
          }

          // Simple math
          try {
            if (/^[\d\s+\-*/%().]+$/.test(arg)) {
              output.push(String(Function(`'use strict'; return (${arg})`)()));
              continue;
            }
          } catch (_) {}

          // Variable lookup
          const vRegex = new RegExp(`\\b${arg}\\s*=\\s*(["'])(.*?)\\1`);
          const vMatch = clean.match(vRegex);
          if (vMatch) {
            output.push(vMatch[2]);
            continue;
          }

          output.push(arg.replace(/^["']|["']$/g, ''));
        }
        return { success: true, output: output.join('\n') };
      }

      return { success: true, output: '(Program selesai dieksekusi tanpa output)' };
    } catch (err) {
      return {
        success: false,
        error: `Traceback (most recent call last):\n  File "developer.py", line 1\nSyntaxError: ${err.message}`
      };
    }
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
        const result = isPhp ? executePhpCode(currentCode) : executePythonCode(currentCode);

        const latency = (0.015 + Math.random() * 0.03).toFixed(3);
        const mem = (2.1 + Math.random() * 0.5).toFixed(1);

        if (result.success) {
          terminalOutput.innerHTML = `
            <div style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; line-height:1.6;">
              <div style="color:#10b981; font-weight:700; margin-bottom:0.25rem;">
                ✔ [EXECUTION SUCCESSFUL] Process finished with exit code 0
              </div>
              <div style="color:var(--text-muted); font-size:0.75rem; margin-bottom:0.4rem;">
                Runtime: ${isPhp ? 'PHP 8.3.6 (Zend Engine)' : 'Python 3.12.3'} | Memory: ${mem} MB | Latency: ${latency}s
              </div>
              <div class="terminal-result-box">
${escapeHtml(result.output)}
              </div>
            </div>
          `;
        } else {
          terminalOutput.innerHTML = `
            <div style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; line-height:1.6;">
              <div style="color:#ef4444; font-weight:700; margin-bottom:0.25rem;">
                ✖ [EXECUTION FAILED] Process finished with exit code 255
              </div>
              <div style="color:var(--text-muted); font-size:0.75rem; margin-bottom:0.4rem;">
                Runtime: ${isPhp ? 'PHP 8.3.6 (Zend Engine)' : 'Python 3.12.3'} | Error on execution
              </div>
              <div class="terminal-result-box error">
${escapeHtml(result.error)}
              </div>
            </div>
          `;
        }

        terminalOutput.classList.add('show');
        runWorkflowBtn.disabled = false;
        runWorkflowBtn.innerHTML = `<i class="ri-play-fill w-3.5 h-3.5"></i> <span>Jalankan Kode</span>`;
      }, 500);
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

  const techDetailPlaceholder = document.getElementById('techDetailPlaceholder');

  function showTechDetail(techKey, shouldScroll = true) {
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

    if (techDetailPlaceholder) {
      techDetailPlaceholder.classList.add('hidden');
    }

    techDetailContainer.classList.remove('hidden');
    techDetailContainer.classList.add('show');

    // Smooth scroll to card only on mobile and when user deliberately taps
    if (shouldScroll && window.innerWidth < 992) {
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

    if (techDetailPlaceholder) {
      techDetailPlaceholder.classList.remove('hidden');
    }
  }

  techBubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
      const techKey = bubble.getAttribute('data-tech');
      if (currentlySelectedTech === techKey) {
        hideTechDetail();
      } else {
        showTechDetail(techKey, true);
      }
    });
  });

  if (closeTechDetailBtn) {
    closeTechDetailBtn.addEventListener('click', hideTechDetail);
  }

  // Pre-load Code Igniter 3 by default so the left column is beautifully populated
  showTechDetail('ci3', false);

});
