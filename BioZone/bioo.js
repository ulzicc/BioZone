// ----------------------------------------------------------------------
        // --- LOGIKA UTAMA (PURE JS) ---
        // ----------------------------------------------------------------------

        // 1. Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                // Tambahkan kode untuk menutup navbar mobile saat link diklik (Pure JS)
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // 2. Contact form submission (Dari kode lama Anda)
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
            this.reset();
        });
        
        // 3. Navbar Sticky/Scrolled (Pure JS)
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const toggleButton = document.querySelector('.navbar-toggler');
            
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                // Hapus warna text-white dari nav-link saat di-scroll
                document.querySelectorAll('.nav-link').forEach(link => {
                     link.classList.remove('text-white');
                });
            } else {
                navbar.classList.remove('scrolled');
                 // Tambahkan warna text-white saat di Hero Section
                document.querySelectorAll('.nav-link').forEach(link => {
                     link.classList.add('text-white');
                });
            }
        });

        // 4. Navbar Toggler (Pure JS - Menggantikan Bootstrap JS)
        document.querySelector('.navbar-toggler').addEventListener('click', function() {
            const navbarCollapse = document.getElementById('navbarNav');
            navbarCollapse.classList.toggle('collapse');
            navbarCollapse.classList.toggle('show');
        });
        
        // 5. Animasi On Scroll (Dari kode lama Anda)
        window.addEventListener('scroll', function() {
            const elements = document.querySelectorAll('.card, .section-title, .timeline-item');
            
            elements.forEach(element => {
                const position = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if(position < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        });
        
        // 6. Initialize elements with animation properties (Dari kode lama Anda)
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.card, .section-title, .timeline-item');
            
            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            // Trigger the animation for elements already in view
            window.dispatchEvent(new Event('scroll'));
        });


        // ----------------------------------------------------------------------
        // --- LOGIKA GAMES LABSIM: PERAKITAN GEN (100% PURE JS) ---
        // ----------------------------------------------------------------------

        const targetSequences = [
            'ATGCCGT', 
            'GCGTACCGTA', 
            'TATCGTACCCGTAG',
        ];

        let currentLevel = 0;
        let userSequence = '';
        let timerInterval;
        const initialTime = 15; // Waktu per level
        
        const modal = document.getElementById('gene-assembly-modal');
        const openBtn = document.getElementById('open-labsim-btn');
        const closeBtn = document.getElementById('close-labsim-btn');
        const closeResultBtn = document.getElementById('close-result-btn');
        const startBtn = document.getElementById('start-game-btn');
        const nextBtn = document.getElementById('next-level-btn');
        const restartBtn = document.getElementById('restart-game-btn');
        const gameIntro = document.getElementById('game-intro');
        const gameArea = document.getElementById('game-area');
        const gameResult = document.getElementById('game-result');
        const assemblyArea = document.getElementById('assembly-area');
        const dnaButtons = document.querySelectorAll('.dna-base');
        const timerDisplay = document.getElementById('game-timer');
        const targetDisplay = document.getElementById('target-sequence');
        const currentTargetDisplay = document.getElementById('current-target');
        const resultMessage = document.getElementById('result-message');


        // 1. Fungsi untuk Membuka/Menutup Modal (Pure JS)
        openBtn.addEventListener('click', function() {
            modal.style.display = 'flex'; // Tampilkan modal
            loadLevel(); // Muat level saat dibuka
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none'; // Sembunyikan modal
            clearInterval(timerInterval);
        });

        closeResultBtn.addEventListener('click', function() {
            modal.style.display = 'none'; // Sembunyikan modal
            clearInterval(timerInterval);
        });
        
        // Tutup saat klik di luar modal
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                clearInterval(timerInterval);
            }
        });

        // 2. Logika Game
        function updateGameDisplay() {
            const target = targetSequences[currentLevel];
            
            currentTargetDisplay.textContent = target.substring(userSequence.length);
            
            assemblyArea.innerHTML = userSequence.split('').map(base => 
                `<span style="background-color: #333; color: white; padding: 4px 8px; margin: 2px; border-radius: 4px; font-weight: bold;">${base}</span>`
            ).join('');
        }

        function startTimer() {
            let timeLeft = initialTime;
            timerDisplay.textContent = timeLeft;
            
            timerInterval = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    checkResult(true); 
                }
            }, 1000);
        }

        function loadLevel() {
            if (currentLevel >= targetSequences.length) {
                showFinalResult(true);
                return;
            }

            userSequence = '';
            clearInterval(timerInterval);
            
            gameIntro.style.display = 'block';
            gameArea.style.display = 'none';
            gameResult.style.display = 'none';

            targetDisplay.textContent = targetSequences[currentLevel].split('').join(' ');
            startBtn.textContent = `START LEVEL ${currentLevel + 1}`;
            startBtn.style.display = 'block';
            nextBtn.style.display = 'none';
            restartBtn.style.display = 'none';
        }
        
        function checkResult(timeUp) {
            const target = targetSequences[currentLevel];
            clearInterval(timerInterval);

            gameArea.style.display = 'none';
            gameResult.style.display = 'block';
            nextBtn.style.display = 'none';
            restartBtn.style.display = 'none';

            if (userSequence === target && !timeUp) {
                resultMessage.innerHTML = `**PERAKITAN BERHASIL!** Anda menyelesaikan Level ${currentLevel + 1} dengan waktu tersisa ${timerDisplay.textContent} detik.`;
                currentLevel++;
                
                if (currentLevel < targetSequences.length) {
                    nextBtn.textContent = `LANJUT KE LEVEL ${currentLevel + 1}`;
                    nextBtn.style.display = 'inline-block';
                } else {
                    showFinalResult(true);
                }
            } else {
                resultMessage.innerHTML = `**GAGAL!** ${timeUp ? 'Waktu habis.' : 'Sekuens Salah.'} Sekuens yang benar adalah: <span class="fw-bold">${target}</span>.`;
                restartBtn.style.display = 'inline-block';
            }
        }
        
        function showFinalResult(win) {
             gameArea.style.display = 'none';
             gameIntro.style.display = 'none';
             gameResult.style.display = 'block';

             if (win) {
                resultMessage.innerHTML = `**SELAMAT!** Anda berhasil menyelesaikan semua Level dan diakui sebagai BioEngineer Level Akhir!`;
             }
             nextBtn.style.display = 'none';
             restartBtn.style.display = 'none';
        }

        // --- Event Listeners Game ---
        startBtn.addEventListener('click', function() {
            gameIntro.style.display = 'none';
            gameArea.style.display = 'block';
            userSequence = '';
            updateGameDisplay();
            startTimer();
        });

        nextBtn.addEventListener('click', function() {
            loadLevel();
        });

        restartBtn.addEventListener('click', function() {
            loadLevel();
        });
        
        dnaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = targetSequences[currentLevel];
                if (userSequence.length < target.length) {
                    const base = button.getAttribute('data-base');
                    userSequence += base;
                    
                    if (userSequence !== target.substring(0, userSequence.length)) {
                         checkResult(false);
                         return;
                    }
                    
                    updateGameDisplay();
                    
                    if (userSequence.length === target.length) {
                        checkResult(false);
                    }
                }
            });
        });


        document.addEventListener('DOMContentLoaded', function(){
          const btn = document.getElementById('open-labsim-btn');
          if (btn) {
            btn.addEventListener('click', function(e){
              e.preventDefault();
              // buka di tab sama:
              window.location.href = 'labsim.html';
              // atau buka di tab baru:
              // window.open('labsim.html', '_blank');
            });
          }
        });


        /* script: muat video ke hero-right saat user klik thumbnail/watch button */
document.addEventListener('DOMContentLoaded', function(){
  const heroVideo = document.getElementById('hero-video');
  if (!heroVideo) return;

  function extractYouTubeID(url){
    try {
      // remove trailing params for path checks
      const pathOnly = url.split('?')[0];
      const patterns = [
        /youtu\.be\/([^\/\?#]+)/i,
        /youtube\.com\/embed\/([^\/\?#]+)/i,
        /youtube\.com\/shorts\/([^\/\?#]+)/i
      ];
      for (const p of patterns) {
        const m = url.match(p) || pathOnly.match(p);
        if (m) return m[1];
      }
      const m = url.match(/[?&]v=([^&]+)/i);
      if (m) return m[1];
    } catch(e){}
    return null;
  }

  function loadVideo(href){
    const id = extractYouTubeID(href);
    if (!id) {
      // fallback: buka link di tab baru
      window.open(href, '_blank');
      return;
    }
    const embed = 'https://www.youtube.com/embed/' + id + '?rel=0&autoplay=1';
    heroVideo.innerHTML = '<iframe src="' + embed + '" title="Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }

  // delegated click handler: intercept clicks on video links / watch buttons
  document.body.addEventListener('click', function(e){
    const a = e.target.closest('a.video-link, a.watch-btn, .video-container a[href*="youtu"], .video-container a[href*="youtube"]');
    if (!a) return;
    e.preventDefault();
    loadVideo(a.href);
  });

  // load first available video on page load (optional)
  const first = document.querySelector('a.video-link, a.watch-btn, .video-container a[href*="youtu"], .video-container a[href*="youtube"]');
  if (first) loadVideo(first.href);
});
