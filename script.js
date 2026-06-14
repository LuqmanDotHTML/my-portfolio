function showMessage() {
    alert("Thanks for visiting my portfolio! 🚀");
}

/* SCROLL PROGRESS LINE */
window.addEventListener("scroll", function () {
    const scrollProgress = document.getElementById("scrollProgress");

    if (!scrollProgress) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    scrollProgress.style.width = scrollPercent + "%";
});

/* FAST-TO-SLOW STATS SHUFFLE */
/* FAST CONSTANT STATS SHUFFLE */
const randomValues = [
    "0", "1", "2", "3+", "4+", "5+", "8+", "10+",
    "01", "07", "99", "CS", "</>", "{ }", "404"
];

let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    const numbers = document.querySelectorAll(".stat-number");

    numbers.forEach(function (number) {
        const finalValue = number.getAttribute("data-final");

        let shuffleCount = 0;
        const maxShuffle = 25;

        const shuffle = setInterval(function () {
            const randomIndex = Math.floor(Math.random() * randomValues.length);
            number.textContent = randomValues[randomIndex];

            shuffleCount++;

            if (shuffleCount >= maxShuffle) {
                clearInterval(shuffle);
                number.textContent = finalValue;
                number.classList.add("stat-done");
            }
        }, 35);
    });
}

/* TRIGGER WHEN USER SCROLLS TO STATS */
const statsSection = document.getElementById("stats");

if (statsSection) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, {
        threshold: 0.4
    });

    observer.observe(statsSection);
}

function copyEmail() {
    const email = "luqman4zhar@gmail.com";

    navigator.clipboard.writeText(email).then(function () {
        const toast = document.getElementById("copyToast");

        toast.classList.add("show");

        setTimeout(function () {
            toast.classList.remove("show");
        }, 1800);
    });
}

/* ABOUT ME WORD-BY-WORD LIGHT REVEAL */
const revealTexts = document.querySelectorAll(".reveal-text");

revealTexts.forEach(function (text) {
    const words = text.textContent.trim().split(/\s+/);

    text.innerHTML = words
        .map(function (word, index) {
            return `<span style="--i:${index}">${word}</span>`;
        })
        .join(" ");
});

const textObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.4
});

revealTexts.forEach(function (text) {
    textObserver.observe(text);
});

/* DRAGGABLE PROFILE PHOTO SLIDER */
const photoSlider = document.getElementById("photoSlider");
const photoTrack = document.getElementById("photoTrack");
const photoDots = document.querySelectorAll(".photo-dot");

let currentPhoto = 0;
let startX = 0;
let isDragging = false;

function updatePhotoSlider() {
    photoTrack.style.transform = `translateX(-${currentPhoto * 100}%)`;

    photoDots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    photoDots[currentPhoto].classList.add("active");
}

function goToPhoto(index) {
    currentPhoto = index;
    updatePhotoSlider();
}

if (photoSlider) {
    photoSlider.addEventListener("mousedown", function (e) {
        isDragging = true;
        startX = e.clientX;
    });

    photoSlider.addEventListener("mouseup", function (e) {
        if (!isDragging) return;

        let endX = e.clientX;
        let difference = startX - endX;

        if (difference > 50 && currentPhoto < 2) {
            currentPhoto++;
        }

        if (difference < -50 && currentPhoto > 0) {
            currentPhoto--;
        }

        updatePhotoSlider();
        isDragging = false;
    });

    photoSlider.addEventListener("mouseleave", function () {
        isDragging = false;
    });

    /* PHONE TOUCH SUPPORT */
    photoSlider.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    photoSlider.addEventListener("touchend", function (e) {
        let endX = e.changedTouches[0].clientX;
        let difference = startX - endX;

        if (difference > 50 && currentPhoto < 2) {
            currentPhoto++;
        }

        if (difference < -50 && currentPhoto > 0) {
            currentPhoto--;
        }

        updatePhotoSlider();
    });
}