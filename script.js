/* =========================================
   SHINOBI ECONOMICS
   INTERACTIVE JAVASCRIPT
========================================= */

// =========================================
// 1. PRICE CONTROL SIMULATOR
// =========================================

const slider = document.getElementById("priceSlider");

const priceValue = document.getElementById("priceValue");
const demandValue = document.getElementById("demandValue");
const supplyValue = document.getElementById("supplyValue");
const shortageValue = document.getElementById("shortageValue");

const statusPill = document.getElementById("statusPill");
const statusText = document.getElementById("statusText");
const chartExplain = document.getElementById("chartExplain");

const resetButton = document.getElementById("resetButton");

const equilibriumPrice = 40;
const equilibriumQuantity = 60;

// Graph coordinates
const chart = {
    left: 62,
    right: 632,
    top: 22,
    bottom: 362,

    x: function(quantity) {
        return 62 + (quantity / 100) * 570;
    },

    y: function(price) {
        return 362 - (price / 100) * 340;
    }
};

// Graph elements
const capLine = document.getElementById("capLine");
const capLabel = document.getElementById("capLabel");

const shortageBand = document.getElementById("shortageBand");
const shortageBracket = document.getElementById("shortageBracket");

const bracketLeft = document.getElementById("bracketLeft");
const bracketRight = document.getElementById("bracketRight");

const shortageLabel = document.getElementById("shortageLabel");

const demandDot = document.getElementById("demandDot");
const supplyDot = document.getElementById("supplyDot");

// Update the market
function updateMarket() {

    const cap = Number(slider.value);

    // A ceiling below equilibrium is binding.
    const isBinding = cap < equilibriumPrice;

    let qDemand;
    let qSupply;
    let shortage;

    if (isBinding) {

        // Illustrative market equations:
        // Qd = 100 - P
        // Qs = 20 + P

        qDemand = 100 - cap;
        qSupply = 20 + cap;

        shortage = qDemand - qSupply;

    } else {

        // A non-binding ceiling does not change
        // the market equilibrium in this model.

        qDemand = equilibriumQuantity;
        qSupply = equilibriumQuantity;

        shortage = 0;
    }

    // Update numerical values
    priceValue.textContent = `₹${cap}`;

    demandValue.textContent = `${qDemand} units`;

    supplyValue.textContent = `${qSupply} units`;

    shortageValue.textContent = `${shortage} units`;

    // Update slider background
    const percentage = ((cap - 10) / 60) * 100;

    slider.style.background =
        `linear-gradient(90deg,
        #ff7a28 ${percentage}%,
        #35445f ${percentage}%)`;

    // Update graph ceiling line
    const capY = chart.y(cap);

    capLine.setAttribute("y1", capY);
    capLine.setAttribute("y2", capY);

    capLabel.setAttribute("y", capY - 10);

    capLabel.textContent = `PRICE CEILING ₹${cap}`;

    if (isBinding) {

        // Position shortage points
        const demandX = chart.x(qDemand);
        const supplyX = chart.x(qSupply);

        // Display shortage band
        shortageBand.style.display = "block";

        shortageBand.setAttribute("x", supplyX);
        shortageBand.setAttribute("y", capY - 9);
        shortageBand.setAttribute(
            "width",
            demandX - supplyX
        );

        // Display shortage bracket
        shortageBracket.style.display = "block";

        shortageBracket.setAttribute("x1", supplyX);
        shortageBracket.setAttribute("x2", demandX);

        const labelY = Math.min(capY + 39, 350);

        shortageBracket.setAttribute(
            "y1",
            labelY - 12
        );

        shortageBracket.setAttribute(
            "y2",
            labelY - 12
        );

        // Left bracket
        bracketLeft.style.display = "block";

        bracketLeft.setAttribute("x1", supplyX);
        bracketLeft.setAttribute("x2", supplyX);

        bracketLeft.setAttribute("y1", labelY - 19);
        bracketLeft.setAttribute("y2", labelY - 5);

        // Right bracket
        bracketRight.style.display = "block";

        bracketRight.setAttribute("x1", demandX);
        bracketRight.setAttribute("x2", demandX);

        bracketRight.setAttribute("y1", labelY - 19);
        bracketRight.setAttribute("y2", labelY - 5);

        // Shortage label
        shortageLabel.style.display = "block";

        shortageLabel.setAttribute(
            "x",
            (supplyX + demandX) / 2
        );

        shortageLabel.setAttribute(
            "y",
            labelY + 6
        );

        shortageLabel.textContent =
            `SHORTAGE: ${shortage} UNITS`;

        // Demand point
        demandDot.style.display = "block";

        demandDot.setAttribute("cx", demandX);
        demandDot.setAttribute("cy", capY);

        // Supply point
        supplyDot.style.display = "block";

        supplyDot.setAttribute("cx", supplyX);
        supplyDot.setAttribute("cy", capY);

        // Update status
        statusPill.className = "status-pill";

        statusPill.textContent =
            "⚠ SHORTAGE DETECTED";

        statusText.textContent =
            `At ₹${cap}, buyers want ${shortage} more units than sellers plan to supply.`;

        chartExplain.textContent =
            `The ceiling is ₹${equilibriumPrice - cap} below equilibrium. ` +
            `Buyers want ${qDemand} units, while sellers plan to supply ` +
            `${qSupply} units. The highlighted gap represents ` +
            `${shortage} units of excess demand.`;

    } else {

        // Hide shortage indicators
        shortageBand.style.display = "none";

        shortageBracket.style.display = "none";

        bracketLeft.style.display = "none";

        bracketRight.style.display = "none";

        shortageLabel.style.display = "none";

        demandDot.style.display = "none";

        supplyDot.style.display = "none";

        // Update status
        statusPill.className = "status-pill balanced";

        if (cap === equilibriumPrice) {

            statusPill.textContent =
                "✓ MARKET AT EQUILIBRIUM";

            statusText.textContent =
                "At equilibrium, planned demand and supply are equal.";

            chartExplain.textContent =
                "At ₹40, quantity demanded equals quantity supplied: " +
                "60 units. There is no shortage.";

        } else {

            statusPill.textContent =
                "✓ NO SHORTAGE IN THIS MODEL";

            statusText.textContent =
                "The ceiling is above equilibrium, so it does not restrict the market price.";

            chartExplain.textContent =
                "The ceiling is above equilibrium and is non-binding. " +
                "The market remains at ₹40, with 60 units demanded " +
                "and 60 units supplied.";
        }
    }
}

// Slider event
slider.addEventListener("input", updateMarket);

// Reset button
resetButton.addEventListener("click", function() {

    slider.value = 20;

    updateMarket();

});

// Initial simulation
updateMarket();


// =========================================
// 2. MOBILE NAVIGATION
// =========================================

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

menuToggle.addEventListener("click", function() {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.textContent = isOpen ? "×" : "☰";

});

// Close menu after clicking a navigation link
mainNav.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";

    });

});


// =========================================
// 3. QUIZ QUESTIONS
// =========================================

const questions = [

    {
        question:
        "Which section of the Essential Commodities Act empowers the government to control prices?",

        answers: [
            "Section 2",
            "Section 3(2)(c)",
            "Section 5",
            "Section 10"
        ],

        correct: 1,

        explanation:
        "Section 3(2)(c) specifically allows an order controlling the price at which an essential commodity may be bought or sold."
    },

    {
        question:
        "What usually happens when a binding price ceiling is set below equilibrium?",

        answers: [
            "A surplus",
            "No change",
            "A shortage",
            "Supply becomes unlimited"
        ],

        correct: 2,

        explanation:
        "At the lower legal price, quantity demanded increases while quantity supplied decreases, creating excess demand."
    },

    {
        question:
        "Which DPCO 2013 paragraph allows price fixation in extraordinary circumstances?",

        answers: [
            "Paragraph 5",
            "Paragraph 11",
            "Paragraph 19",
            "Paragraph 24"
        ],

        correct: 2,

        explanation:
        "Paragraph 19 permits the government to fix a ceiling price or retail price of a drug in extraordinary circumstances in the public interest."
    }

];


// =========================================
// 4. QUIZ VARIABLES
// =========================================

let questionIndex = 0;

let score = 0;

let answered = false;

let quizComplete = false;


// Quiz elements
const questionText =
    document.getElementById("questionText");

const quizOptions =
    document.getElementById("quizOptions");

const quizFeedback =
    document.getElementById("quizFeedback");

const nextQuestion =
    document.getElementById("nextQuestion");

const questionCount =
    document.getElementById("questionCount");

const progressBar =
    document.getElementById("progressBar");

const scoreText =
    document.getElementById("scoreText");


// =========================================
// 5. DISPLAY QUIZ QUESTIONS
// =========================================

function renderQuestion() {

    const currentQuestion =
        questions[questionIndex];

    answered = false;

    quizComplete = false;

    questionCount.textContent =
        `QUESTION 0${questionIndex + 1} / 03`;

    progressBar.style.width =
        `${((questionIndex + 1) / questions.length) * 100}%`;

    questionText.textContent =
        currentQuestion.question;

    quizOptions.innerHTML = "";

    quizFeedback.textContent = "";

    nextQuestion.disabled = true;

    nextQuestion.textContent =
        questionIndex === questions.length - 1
            ? "See Results →"
            : "Next Question →";


    // Generate answer buttons
    currentQuestion.answers.forEach(
        function(answer, index) {

            const button =
                document.createElement("button");

            button.className = "quiz-option";

            button.textContent =
                `${String.fromCharCode(65 + index)}. ${answer}`;

            button.addEventListener(
                "click",
                function() {

                    selectAnswer(index);

                }
            );

            quizOptions.appendChild(button);

        }
    );

}


// =========================================
// 6. CHECK ANSWERS
// =========================================

function selectAnswer(selected) {

    if (answered) return;

    answered = true;

    const currentQuestion =
        questions[questionIndex];

    const buttons =
        [...quizOptions.querySelectorAll("button")];

    // Disable all answers
    buttons.forEach(function(button, index) {

        button.disabled = true;

        if (index === currentQuestion.correct) {

            button.classList.add("correct");

        }

        if (
            index === selected &&
            selected !== currentQuestion.correct
        ) {

            button.classList.add("wrong");

        }

    });


    // Check selected answer
    if (selected === currentQuestion.correct) {

        score++;

        quizFeedback.textContent =
            `✓ Correct! ${currentQuestion.explanation}`;

        quizFeedback.style.color =
            "var(--green)";

    } else {

        quizFeedback.textContent =
            `Not quite. ${currentQuestion.explanation}`;

        quizFeedback.style.color =
            "var(--red)";

    }

    scoreText.textContent =
        `SCORE: ${score}`;

    nextQuestion.disabled = false;

}


// =========================================
// 7. NEXT QUESTION / RESULTS
// =========================================

nextQuestion.addEventListener("click", function() {

    // Restart quiz after completion
    if (quizComplete) {

        questionIndex = 0;

        score = 0;

        scoreText.textContent = "SCORE: 0";

        renderQuestion();

        return;

    }

    if (!answered) return;


    // Move to next question
    if (questionIndex < questions.length - 1) {

        questionIndex++;

        renderQuestion();

    } else {

        // Display final result
        quizComplete = true;

        questionText.textContent =
            `Training complete! You scored ${score} out of ${questions.length}.`;

        quizOptions.innerHTML = "";

        if (score === 3) {

            quizFeedback.textContent =
                "Excellent work, shinobi! You have mastered the fundamentals.";

        } else {

            quizFeedback.textContent =
                "Good effort! Review the economics and law sections, then try again.";

        }

        quizFeedback.style.color =
            "var(--orange)";

        progressBar.style.width = "100%";

        nextQuestion.textContent =
            "↺ Retake Quiz";

        nextQuestion.disabled = false;

    }

});


// =========================================
// 8. INITIALIZE QUIZ
// =========================================

renderQuestion();

console.log(
    "SHINOBI ECONOMICS: Website successfully loaded!"
);