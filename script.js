


const envelopeScreen = document.getElementById('envelope-screen');
// الختم وصورة الخلفية تم استدعاؤهما بالفعل في الأكواد السابقة
const envelopeStatic = document.getElementById('envelope-static');
const envelopeVideo = document.getElementById('envelope-video');
const waxSeal = document.getElementById('wax-seal'); // نضمن استدعاء الختم

const bgMusic = document.getElementById('bg-music');
const audioBtn = document.querySelector('.audio-btn');

let isOpened = false;

function openInvitation() {
    if (isOpened) return;
    isOpened = true;

    // --- التعديل هنا لختم البسملة ---

    // 1. إضافة كلاس "fade-out" للختم فقط ليختفي فوراً
    waxSeal.classList.add('fade-out');
    // لضمان اختفائه تماماً من مساحة الصفحة، يمكنك استخدام 'none' بعد انتهاء تأثير الأنميشن
    setTimeout(() => {
        waxSeal.style.display = 'none';
    }, 400); // 400ms هو نفس وقت الـ transition في الـ CSS أدناه


    // --- باقي الكود كما هو ---

    // 2. إخفاء الصورة الثابتة وتشغيل فيديو الفتح
    envelopeStatic.style.display = 'none';
    envelopeVideo.play();

    // 3. تشغيل الموسيقى
    bgMusic.play().catch(error => {
        console.log("Autoplay blocked by browser:", error);
    });

    // 4. اختفاء الشاشة بالكامل بعد انتهاء فيديو الفتح
    envelopeVideo.addEventListener('ended', () => {
        envelopeScreen.classList.add('fade-out');
    });
}