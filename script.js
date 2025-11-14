
// Convert English digits to Bangla
function toBanglaNumber(number) {
  const banglaDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return number.toString().split('').map(d => banglaDigits[d] ?? d).join('');
}

// Countdown Function
function updateCountdowns() {
  document.querySelectorAll('[data-count]').forEach(el => {
    el.style.fontFamily = "Kalpurush";   // apply font
    el.style.fontWeight = "1200";         // bold text

    const dateStr = el.getAttribute('data-count'); // e.g. "16-11-2025 23:59"
    const [dmy, time] = dateStr.split(' ');
    const [day, month, year] = dmy.split('-').map(x => parseInt(x, 10));
    const [hour, minute] = time.split(':').map(x => parseInt(x, 10));

    const target = new Date(year, month - 1, day, hour, minute, 0);
    if (isNaN(target.getTime())) {
      el.innerText = "অবৈধ তারিখ";
      el.style.color = "red";
      return;
    }

    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      el.innerText = "সময় শেষ";
      el.style.color = "red";
      return;
    }

    // Time calculations
    let totalSeconds = Math.floor(diff / 1000);
    let days = Math.floor(totalSeconds / (60 * 60 * 24));
    totalSeconds %= (60 * 60 * 24);

    let hours = Math.floor(totalSeconds / (60 * 60));
    totalSeconds %= (60 * 60);

    let minutes = Math.floor(totalSeconds / 60);

    // Color logic
    if (days <= 0) {
      // Less than 1 day → RED
      el.style.color = "red";
      el.innerText = `${toBanglaNumber(hours)} ঘণ্টা ${toBanglaNumber(minutes)} মিনিট বাকি`;
    } else {
      // More than 1 day → GREEN
      el.style.color = "green";
      el.innerText = `${toBanglaNumber(days)} দিন ${toBanglaNumber(hours)} ঘণ্টা বাকি`;
    }
  });
}

// Update every 1 minute
setInterval(updateCountdowns, 60000);
updateCountdowns();


    const subscribeBtn = document.getElementById('subscribeBtn');
    let subscribed = false;

    subscribeBtn.addEventListener('click', () => {
      subscribed = !subscribed;
      if (subscribed) {
        subscribeBtn.textContent = 'Subscribed';
        subscribeBtn.style.background = '#444';
      } else {
        subscribeBtn.innerHTML = '<i class="fa-brands fa-youtube"></i> Subscribe';
        subscribeBtn.style.background = '#ff0000';
      }
    });

    function joinTelegram() {
      window.open('https://t.me/mahinsclassroom', '_blank');
    }
     Auto update year
    document.getElementById("year").textContent = new Date().getFullYear();


  // ==== Add your YouTube video links here ====
const videoLinks = [
  "https://www.youtube.com/watch?v=1mE5TGuekls",
  "https://www.youtube.com/watch?v=XOmOjg1WZm0",
  "https://www.youtube.com/watch?v=y-OSm7gnFLw",
  "https://www.youtube.com/watch?v=wcXTKmfMKTw",
  "https://www.youtube.com/watch?v=TJh1pajFPGY",
  "https://www.youtube.com/watch?v=yrpzKhyNvi4",
  "https://www.youtube.com/watch?v=zXt9KQnR2Ko"
];

// ==== Functions ====
const videoSlider = document.getElementById("videoSlider");

videoLinks.forEach(link => {
  const videoId = extractYouTubeID(link);
  if (!videoId) return;

  fetchVideoDetails(videoId).then(data => {
    const card = document.createElement("div");
    card.classList.add("video-card");
    card.innerHTML = `
      <img class="video-thumb" src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="Video Thumbnail">
      <div class="video-info">
        <div class="video-title">${data.title}</div>
      </div>
    `;
    card.addEventListener("click", () => {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    });
    videoSlider.appendChild(card);
  });
});

// ==== Helper: extract video ID ====
function extractYouTubeID(url) {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// ==== Helper: get video title (no API key needed) ====
async function fetchVideoDetails(videoId) {
  try {
    const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
    const data = await res.json();
    return { title: data.title || "Untitled Video" };
  } catch {
    return { title: "Untitled Video" };
  }
}
