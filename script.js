
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


    
