const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}




const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

const propertyCards = document.querySelector('.property-cards');
let isDown = false;
let startX;
let scrollLeft;

propertyCards.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - propertyCards.offsetLeft;
    scrollLeft = propertyCards.scrollLeft;
});

propertyCards.addEventListener('mouseleave', () => {
    isDown = false;
});

propertyCards.addEventListener('mouseup', () => {
    isDown = false;
});

propertyCards.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - propertyCards.offsetLeft;
    const walk = (x - startX) * 2; // Percepatan geseran
    propertyCards.scrollLeft = scrollLeft - walk;
});

// Untuk perangkat sentuh (mobile)
let touchStartX;
let touchScrollLeft;

propertyCards.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX - propertyCards.offsetLeft;
    touchScrollLeft = propertyCards.scrollLeft;
});

propertyCards.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touchMoveX = e.touches[0].pageX - propertyCards.offsetLeft;
    const walk = (touchMoveX - touchStartX) * 2; // Percepatan geseran
    propertyCards.scrollLeft = touchScrollLeft - walk;
});
// carusel
let slideIndex = 0;
let slides = document.getElementsByClassName("custom-slide");
let dots = document.getElementsByClassName("custom-dot");
let slideInterval;

// Fungsi untuk menampilkan slide
function showSlides(n) {
    if (n >= slides.length) {
        slideIndex = 0; // Jika indeks melebihi jumlah slide, kembali ke awal
    }
    if (n < 0) {
        slideIndex = slides.length - 1; // Jika indeks kurang dari 0, lompat ke slide terakhir
    }

    // Sembunyikan semua slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Tampilkan slide aktif
    slides[slideIndex].style.display = "block";

    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    dots[slideIndex].classList.add("active");
}

// Fungsi untuk navigasi slide dengan tombol prev/next
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetAutoSlide(); // Reset auto slide saat ada interaksi
}

// Fungsi untuk memilih slide berdasarkan dots
function setSlideFromDot(n) {
    showSlides(slideIndex = n);
    resetAutoSlide(); // Reset auto slide saat ada interaksi
}

// Fungsi untuk memulai slideshow otomatis
function startAutoSlide() {
    showSlides(slideIndex); // Pastikan slide pertama langsung terlihat
    slideInterval = setInterval(function() {
        showSlides(slideIndex += 1);
    }, 3000); // Slide berubah setiap 3 detik
}

// Fungsi untuk menghentikan slideshow otomatis
function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Reset slideshow otomatis setelah interaksi
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Tambahkan event listener DOMContentLoaded untuk inisialisasi awal
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex); // Tampilkan slide pertama saat halaman dimuat
    startAutoSlide(); // Mulai slideshow otomatis
});