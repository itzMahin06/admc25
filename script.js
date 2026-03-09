  // 1. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    themeBtn.innerHTML = currentTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

    themeBtn.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // 2. Auto Year
    document.getElementById("year").textContent = new Date().getFullYear();

    // 3. Tab Hash Management (Persist Tabs on Reload)
    document.querySelectorAll(".tlabels label").forEach(label => {
        label.addEventListener("click", () => {
            const tabId = label.getAttribute("data-tab");
            history.replaceState(null, "", "#" + tabId);
        });
    });

    function openTabFromHash() {
        const hash = location.hash.replace("#", "");
        if (hash && document.getElementById(hash)) {
            document.getElementById(hash).checked = true;
        }
    }
    window.addEventListener("load", openTabFromHash);
    window.addEventListener("hashchange", openTabFromHash);

    // English to Bengali Number Converter
    const engToBng = (num) => {
        const bngDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().replace(/\d/g, x => bngDigits[x]);
    };

    // 4. Countdown Timer Logic (Updated for Bengali)
    function startCountdown() {
        const timerCells = document.querySelectorAll('td[data-count]');
        
        setInterval(() => {
            const now = new Date().getTime();
            
            timerCells.forEach(cell => {
                const dateString = cell.getAttribute('data-count');
                if (!dateString) return;

                const parts = dateString.split(' ');
                const dateParts = parts[0].split('-');
                const timeParts = parts[1] ? parts[1].split(':') : ['00', '00'];
                const targetDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]).getTime();

                const distance = targetDate - now;

                if (distance < 0) {
                    cell.innerHTML = '<span class="expired">সময় শেষ</span>';
                } else {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    
                    // Convert numbers to Bengali
                    const bnDays = engToBng(days);
                    const bnHours = engToBng(hours);
                    const bnMins = engToBng(minutes);
                    
                    cell.innerHTML = `<span class="countdown">${bnDays} দিন ${bnHours} ঘণ্টা ${bnMins} মিনিট</span>`;
                }
            });
        }, 1000);
    }
    startCountdown();

    // 5. YouTube Videos API Fix
    const videoLinks = [
        "https://www.youtube.com/watch?v=OICkGsOEv64",
        "https://www.youtube.com/watch?v=cd8hy8v5Pss",
        "https://www.youtube.com/watch?v=the3oQrq5-E",
        "https://www.youtube.com/watch?v=8Cr4oE61OYQ",
        "https://www.youtube.com/watch?v=wM7pRxfr8zE"
    ];

    const videoSlider = document.getElementById("videoSlider");
    function extractYouTubeID(url) {
        const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    async function fetchVideoDetails(videoId) {
        try {
            const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
            const data = await res.json();
            return { title: data.title || "Untitled Video" };
        } catch { return { title: "Admission Update Video" }; }
    }

    videoLinks.forEach(link => {
        const videoId = extractYouTubeID(link);
        if (!videoId) return;

        fetchVideoDetails(videoId).then(data => {
            const card = document.createElement("div");
            card.classList.add("video-card");
            card.innerHTML = `
                <img class="video-thumb" src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="Video">
                <div class="video-info">${data.title}</div>
            `;
            card.addEventListener("click", () => {
                window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
            });
            videoSlider.appendChild(card);
        });
    });
