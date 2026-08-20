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