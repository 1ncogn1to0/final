let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll(".book-gallery .book-item");
const speedInput = document.getElementById("speedInput");

const descriptions = {
    "Crime and Punishment": "Роман Ф.М. Достоевского о моральных дилеммах и преступлении.",
    "1984": "Антиутопический роман Джорджа Оруэлла о тоталитаризме и контроле над личностью.",
    "Fahrenheit 451": "Роман Рея Брэдбери о будущем, где книги сжигаются."
};

function updateSlidePosition() {
    slides.forEach((slide, index) => {
        slide.style.display = index === currentSlide ? "block" : "none";
    });
    const currentBook = slides[currentSlide].querySelector("img").alt;
    document.getElementById("bookDescription").innerText = descriptions[currentBook] || "Описание недоступно.";
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlidePosition();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlidePosition();
}

function startCarousel() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, Number(speedInput.value));
}

function stopCarousel() {
    clearInterval(slideInterval);
}

document.getElementById("nextSlide").addEventListener("click", () => {
    nextSlide();
    stopCarousel();
});

document.getElementById("prevSlide").addEventListener("click", () => {
    prevSlide();
    stopCarousel();
});

document.getElementById("pauseCarousel").addEventListener("click", stopCarousel);
document.getElementById("resumeCarousel").addEventListener("click", startCarousel);
speedInput.addEventListener("change", startCarousel);

updateSlidePosition();
startCarousel();

const questions = [
    {
        question: "Who wrote 'Crime and Punishment'?",
        answers: ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"],
        correct: 0
    },
    {
        question: "What is the main theme of '1984' by George Orwell?",
        answers: ["Love and Relationships", "Freedom and Totalitarianism", "Adventure and Exploration", "Technology and Innovation"],
        correct: 1
    },
    {
        question: "'Fahrenheit 451' is about what future scenario?",
        answers: ["A world without books", "A utopian society", "A war between nations", "A race to the moon"],
        correct: 0
    },
    {
        question: "Which genre best describes '1984'?",
        answers: ["Fantasy", "Dystopian Fiction", "Romance", "Science Fiction"],
        correct: 1
    },
    {
        question: "Which book features the concept of 'doublethink'?",
        answers: ["Crime and Punishment", "1984", "Fahrenheit 451", "Brave New World"],
        correct: 1
    },
    {
        question: "What is the profession of Guy Montag in 'Fahrenheit 451'?",
        answers: ["Fireman", "Teacher", "Scientist", "Journalist"],
        correct: 0
    },
    {
        question: "Which book explores themes of guilt and redemption?",
        answers: ["The Great Gatsby", "Crime and Punishment", "1984", "Fahrenheit 451"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.querySelector(".quiz-container");
const questionText = document.querySelector(".question-text");
const answerList = document.querySelector(".answer-list");
const nextButton = document.getElementById("nextQuestion");
const scoreDisplay = document.getElementById("score");
const feedbackMessage = document.getElementById("feedbackMessage");
const quizResult = document.getElementById("quizResult");
const retryQuizButton = document.getElementById("retryQuiz");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answerList.innerHTML = "";
    nextButton.disabled = true;

    currentQuestion.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.textContent = answer;
        li.classList.add("answer-item");
        li.addEventListener("click", () => handleAnswer(index));
        answerList.appendChild(li);
    });
}

function handleAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    Array.from(answerList.children).forEach((item, index) => {
        if (index === correctIndex) {
            item.classList.add("correct");
        } else {
            item.classList.add("incorrect");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    nextButton.disabled = false;
}

function showResult() {
    quizContainer.style.display = "none";
    quizResult.classList.remove("hidden");
    scoreDisplay.textContent = score;

    if (score === 7) {
        feedbackMessage.textContent = "Excellent! You know your books very well!";
    } else if (score >= 4) {
        feedbackMessage.textContent = "Good job! You have a solid understanding.";
    } else {
        feedbackMessage.textContent = "Keep learning and try again!";
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "block";
    quizResult.classList.add("hidden");
    loadQuestion();
}

nextButton.addEventListener("click", nextQuestion);
retryQuizButton.addEventListener("click", resetQuiz);

loadQuestion();

// Initialize map
function initMap() {
    const locations = [
        { name: "St. Petersburg, Russia", book: "Crime and Punishment", lat: 59.9343, lng: 30.3351 },
        { name: "London, England", book: "1984", lat: 51.5074, lng: -0.1278 },
        { name: "Los Angeles, USA", book: "Fahrenheit 451", lat: 34.0522, lng: -118.2437 },
    ];

    const map = new google.maps.Map(document.getElementById("interactiveMap"), {
        center: { lat: 51.5074, lng: -0.1278 },
        zoom: 2,
    });

    locations.forEach((location) => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.book,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${location.book}</h3><p>Setting: ${location.name}</p>`,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}

// Load Google Maps script dynamically
function loadGoogleMapsAPI() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

loadGoogleMapsAPI();

// Timeline scroll animation
function activateTimelineEvents() {
    const events = document.querySelectorAll(".timeline-event");
    const windowHeight = window.innerHeight;

    events.forEach((event) => {
        const eventTop = event.getBoundingClientRect().top;

        if (eventTop < windowHeight * 0.75) {
            event.classList.add("active");
        }
    });
}

window.addEventListener("scroll", activateTimelineEvents);
activateTimelineEvents();

document.addEventListener("DOMContentLoaded", function () {
    Highcharts.chart("bookSalesChart", {
        chart: {
            type: "column",
        },
        title: {
            text: "Famous Books by Copies Sold",
        },
        xAxis: {
            categories: ["Crime and Punishment", "1984", "Fahrenheit 451"],
            title: {
                text: "Book Titles",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Millions of Copies Sold",
            },
        },
        tooltip: {
            pointFormat: "<b>{point.y} million copies sold</b>",
        },
        series: [
            {
                name: "Books",
                data: [15, 30, 12], // Sample sales data in millions
                colorByPoint: true,
            },
        ],
        credits: {
            enabled: false,
        },
    });
});

const bookItems = document.querySelectorAll(".drag-item");
const favoritesDropZone = document.getElementById("favoritesDropZone");

bookItems.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.dataset.book);
        e.target.classList.add("dragging");
    });

    item.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging");
    });
});

favoritesDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    favoritesDropZone.classList.add("dragover");
});

favoritesDropZone.addEventListener("dragleave", () => {
    favoritesDropZone.classList.remove("dragover");
});

favoritesDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    favoritesDropZone.classList.remove("dragover");

    const bookTitle = e.dataTransfer.getData("text/plain");
    const existingBooks = [...favoritesDropZone.querySelectorAll(".drag-item")];
    const alreadyAdded = existingBooks.some(
        (book) => book.textContent.trim() === bookTitle
    );

    if (!alreadyAdded) {
        const newItem = document.createElement("div");
        newItem.classList.add("drag-item");
        newItem.textContent = bookTitle;
        favoritesDropZone.appendChild(newItem);
    }
});
