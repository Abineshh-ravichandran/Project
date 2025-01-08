const questions = [
    {
        question: "How often do you feel overwhelmed by daily tasks?",
        answers: ["Rarely", "Sometimes", "Often", "Almost always"]
    },
    {
        question: "When faced with a difficult problem at work or school, how do you typically react?",
        answers: ["I break it down and tackle it step by step", "I ask for help from others", "I procrastinate and avoid it", "I feel paralyzed and unable to start"]
    },
    {
        question: "How do you handle unexpected changes to your plans?",
        answers: ["I adapt easily and find alternatives", "I feel slightly anxious but manage", "I become stressed and irritable", "I completely shut down"]
    },
    {
        question: "In social situations, how comfortable do you feel?",
        answers: ["Very comfortable and engaged", "Somewhat comfortable", "Anxious but I push through", "I avoid social situations entirely"]
    },
    {
        question: "How often do you find yourself dwelling on past mistakes or worrying about the future?",
        answers: ["Rarely", "Occasionally", "Frequently", "Almost constantly"]
    },
    {
        question: "When you're feeling down, how likely are you to reach out to friends or family for support?",
        answers: ["Very likely", "Somewhat likely", "Unlikely", "I never reach out"]
    },
    {
        question: "How would you describe your sleep patterns over the past month?",
        answers: ["Consistent and restful", "Occasionally disrupted", "Frequently disrupted", "Severe insomnia or oversleeping"]
    },
    {
        question: "When receiving criticism, how do you typically respond?",
        answers: ["I see it as an opportunity to improve", "I feel hurt but try to learn from it", "I become defensive and upset", "I internalize it and feel worthless"]
    },
    {
        question: "How often do you engage in activities you enjoy or find relaxing?",
        answers: ["Regularly", "Sometimes", "Rarely", "Never"]
    },
    {
        question: "When facing a setback, how quickly do you bounce back?",
        answers: ["Very quickly", "It takes some time, but I manage", "It's a slow, difficult process", "I struggle to recover at all"]
    },
    {
        question: "How often do you experience physical symptoms of stress (e.g., headaches, muscle tension)?",
        answers: ["Rarely", "Occasionally", "Frequently", "Almost daily"]
    },
    {
        question: "In the past month, how often have you felt that you were unable to control the important things in your life?",
        answers: ["Never", "Sometimes", "Often", "Very often"]
    },
    {
        question: "How do you typically handle conflicts with others?",
        answers: ["I address them calmly and directly", "I try to compromise", "I avoid confrontation", "I become aggressive or completely shut down"]
    },
    {
        question: "How often do you feel satisfied with your personal and professional achievements?",
        answers: ["Most of the time", "Sometimes", "Rarely", "Never"]
    },
    {
        question: "When faced with a long-term goal, how do you approach it?",
        answers: ["I break it into smaller, manageable steps", "I make a plan but sometimes struggle to follow through", "I feel overwhelmed and procrastinate", "I give up before I even start"]
    }
];

const doctors = [
    {
        name: "Dr. Aswin",
        specialty: "Stress Management and Resilience Building",
        contact: "+91 9876543210",
        email: "dr.aswin@mentalhealth.com"
    },
    {
        name: "Dr. Gokul",
        specialty: "Anxiety and Depression Treatment",
        contact: "+91 8765432109",
        email: "dr.gokul@mentalhealth.com"
    },
    {
        name: "Dr. Abinesh R",
        specialty: "Complex Mental Health Conditions",
        contact: "+91 8754939207",
        email: "contact@abineshr.com"
    }
];

let currentQuestion = 0;
let answers = [];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress");
const resultsElement = document.getElementById("results");

function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${question.question}`;
    answersElement.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => selectAnswer(index));
        answersElement.appendChild(button);
    });

    nextButton.style.display = "none";
    updateProgressBar();
}

function selectAnswer(index) {
    answers[currentQuestion] = index;
    Array.from(answersElement.children).forEach((button, i) => {
        button.classList.remove("selected");
        if (i === index) button.classList.add("selected");
    });
    nextButton.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResults() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    resultsElement.style.display = "block";

    let score = answers.reduce((sum, answer) => sum + answer, 0);
    let maxScore = questions.length * 3;
    let percentage = (score / maxScore) * 100;

    let resultText = "";
    let wellbeingState = "";
    let recommendedDoctor = null;

    if (percentage < 25) {
        resultText = "Your responses suggest a generally positive state of mental well-being. You seem to handle daily challenges effectively and maintain good emotional balance. Continue your healthy habits and self-care routines.";
        wellbeingState = "Positive";
        recommendedDoctor = doctors[0]; // Dr. Aswin
    } else if (percentage < 50) {
        resultText = "Your responses indicate some areas of mild concern. While you're managing well in many aspects, there may be room for improvement in stress management and emotional resilience. Consider incorporating more self-care activities and stress-reduction techniques into your routine.";
        wellbeingState = "Mild Concern";
        recommendedDoctor = doctors[0]; // Dr. Aswin
    } else if (percentage < 75) {
        resultText = "Your responses suggest moderate challenges to your mental well-being. You may be experiencing difficulties in several areas of your life, such as stress management, social interactions, or emotional regulation. It's recommended to speak with a mental health professional for guidance on developing coping strategies and improving your overall well-being.";
        wellbeingState = "Moderate Concern";
        recommendedDoctor = doctors[1]; // Dr. Gokul
    } else {
        resultText = "Your responses indicate significant challenges to your mental well-being. You may be experiencing high levels of stress, anxiety, or other emotional difficulties that are impacting various aspects of your life. It's strongly recommended to consult with a mental health professional for a comprehensive evaluation and personalized support plan.";
        wellbeingState = "High Concern";
        recommendedDoctor = doctors[2]; // Dr. Abinesh R
    }

    resultsElement.innerHTML = `
        <h2>Mental Well-being Assessment Results</h2>
        <p class="well-being-state">Current State: <strong>${wellbeingState}</strong></p>
        <p>${resultText}</p>
        <div class="doctor-info">
            <h3>Recommended Specialist: ${recommendedDoctor.name}</h3>
            <p>Specialty: ${recommendedDoctor.specialty}</p>
            <p>Contact: ${recommendedDoctor.contact}</p>
            <p>Email: ${recommendedDoctor.email}</p>
        </div>
        <p class="disclaimer">Remember, this assessment is not a diagnostic tool. For accurate diagnosis and treatment, please consult with the recommended specialist or another qualified mental health professional.</p>
        <button id="restart-btn">Restart Assessment</button>
    `;

    document.getElementById("restart-btn").addEventListener("click", restartAssessment);
}

function restartAssessment() {
    currentQuestion = 0;
    answers = [];
    resultsElement.style.display = "none";
    questionContainer.style.display = "block";
    loadQuestion();
}

nextButton.addEventListener("click", nextQuestion);

loadQuestion();