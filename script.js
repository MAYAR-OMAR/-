const envelopeScreen = document.getElementById('envelope-screen');
const envelopeStatic = document.getElementById('envelope-static');
const envelopeVideo = document.getElementById('envelope-video');
const waxSeal = document.getElementById('wax-seal');
const bgMusic = document.getElementById('bg-music');

let isOpened = false;

function openInvitation() {
    if (isOpened) return;
    isOpened = true;

    // 1. إخفاء الختم فوراً
    if (waxSeal) {
        waxSeal.classList.add('fade-out');
        setTimeout(() => waxSeal.style.display = 'none', 300);
    }

    // 2. تشغيل الميديا فوراً من أول ضغطة
    // تشغيل الصوت
    bgMusic.play().catch(err => console.log("Audio play error:", err));

    // تشغيل فيديو الفتح
    const playPromise = envelopeVideo.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // أول ما الفيديو يبتدي يعرض فعلياً، نخفي الصورة الثابتة منعاً للشاشة السوداء
            envelopeStatic.style.opacity = '0';
            setTimeout(() => envelopeStatic.style.display = 'none', 200);
        }).catch(error => {
            console.log("Video play error:", error);
            // لو المتصفح منع الفيديو، نخفي الشاشة فوراً
            envelopeScreen.classList.add('fade-out');
        });
    }

    // 3. اختفاء الشاشة بالكامل بعد انتهاء فيديو الفتح
    envelopeVideo.addEventListener('ended', () => {
        envelopeScreen.classList.add('fade-out');
    });
}

// تاريخ المناسبة: 6 سبتمبر 2026 الساعة 7 مساءً
const targetDate = new Date("September 6, 2026 19:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    } else {
        document.getElementById("countdown-timer").innerHTML = "<p style='font-family: Amiri; font-size: 1.4rem; color: #3b2b1e;'>أهلاً بكم في يومنا المميز!</p>";
    }
}

// تحديث التايمر كل ثانية
setInterval(updateCountdown, 1000);
updateCountdown();