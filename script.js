const kpopQuestions = [
    {
    question: "Who is the leader of BTS?",
    choices: ["RM", "Jin", "Suga", "J-Hope"],
    answer: "RM",
    image: "images/bts.jpg"
},
{
    question: "Which K-pop group sings 'Dynamite'?",
    choices: ["Blackpink", "BTS", "Twice", "EXO"],
    answer: "BTS",
    image: "images/sm.png"
},
{
    question: "Which K-pop group is known for the song 'Gee'?",
    choices: ["Girls' Generation", "Twice", "Red Velvet", "Blackpink"],
    answer: "Girls' Generation",
    image: "images/gg.jpeg"
},
{
    question: "Which K-pop group has the sub-unit 'Odd Eye Circle'?",
    choices: ["EXO", "Twice", "LOONA", "ITZY"],
    answer: "LOONA",
    image: "images/oddeye.png"
},
{
    question: "Which K-pop group debuted with the song 'Like OOH-AHH'?",
    choices: ["Twice", "Red Velvet", "Mamamoo", "GFriend"],
    answer: "Twice",
    image: "images/girlgroup.jpg"
},
{
    question: "What was the first K-pop group to perform at Coachella?",
    choices: ["Big Bang", "BLACKPINK", "2NE1", "Wonder Girls"],
    answer: "BLACKPINK",
    image: "images/coachella.jpg"
},
{
    question: "Which K-pop idol is known as the 'Nation's Little Sister'?",
    choices: ["IU", "Suzy", "Yeri", "Taeyeon"],
    answer: "IU",
    image: "images/littlesister.jpg"
},
{
    question: "Which K-pop group has a member named 'Bang Chan'?",
    choices: ["Stray Kids", "BTS", "Seventeen", "NCT"],
    answer: "Stray Kids",
    image: "images/male.jpg"
},
{
    question: "Who is the main vocalist of EXO?",
    choices: ["Baekhyun", "Chanyeol", "Kai", "Sehun"],
    answer: "Baekhyun",
    image: "images/exo.jpg"
},
{
    question: "Which K-pop group released the album 'The Album'?",
    choices: ["BLACKPINK", "TWICE", "Red Velvet", "GFRIEND"],
    answer: "BLACKPINK",
    image: "images/big3.png"
}
];

const animeQuestions = [
    {
    question: "In 'Naruto', who is Naruto's best friend?",
    choices: ["Sasuke", "Sakura", "Kakashi", "Gaara"],
    answer: "Sasuke",
    image: "images/naruto.jpeg"
},
{
    question: "Which anime features a hero named Goku?",
    choices: ["One Piece", "Dragon Ball Z", "Bleach", "Naruto"],
    answer: "Dragon Ball Z",
    image: "images/crossover.png"
},
{
    question: "In 'Attack on Titan', who is the main protagonist?",
    choices: ["Eren Yeager", "Armin Arlert", "Levi Ackerman", "Mikasa Ackerman"],
    answer: "Eren Yeager",
    image: "images/aot.jpg"
},
{
    question: "In 'One Piece', who is the captain of the Straw Hat Pirates?",
    choices: ["Monkey D. Luffy", "Roronoa Zoro", "Sanji", "Usopp"],
    answer: "Monkey D. Luffy",
    image: "images/onepiece.png"
},
{
    question: "In 'My Hero Academia', what is the name of the main character?",
    choices: ["Bakugo Katsuki", "Todoroki Shoto", "Midoriya Izuku", "All Might"],
    answer: "Midoriya Izuku",
    image: "images/mha.jpg"
},
{
    question: "In 'Death Note', what is the Shinigami's name who drops the Death Note?",
    choices: ["Ryuk", "Rem", "Jealous", "Sidoh"],
    answer: "Ryuk",
    image: "images/deathnote.jpg"
},
{
    question: "Which anime features characters with unique powers called 'Quirks'?",
    choices: ["My Hero Academia", "One Punch Man", "Hunter x Hunter", "Fairy Tail"],
    answer: "My Hero Academia",
    image: "images/quirks.jpeg"
},
{
    question: "In 'Fullmetal Alchemist', what is the fundamental law of alchemy?",
    choices: ["Law of Conservation", "Law of Exchange", "Law of Transmutation", "Law of Equivalent Exchange"],
    answer: "Law of Equivalent Exchange",
    image: "images/fullmetal.jpg"
},
{
    question: "Which anime features a group of pirates searching for the ultimate treasure?",
    choices: ["One Piece", "Fairy Tail", "Naruto", "Bleach"],
    answer: "One Piece",
    image: "images/pirates.jpg"
},
{
    question: "In 'Tokyo Ghoul', what is the protagonist's name?",
    choices: ["Kaneki Ken", "Arima Kishou", "Touka Kirishima", "Ayato Kirishima"],
    answer: "Kaneki Ken",
    image: "images/tokyoghoul.jpeg"
}
];


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let selectedQuiz;
let leaderboard = [];

function startQuiz(quizType) {
    selectedQuiz = quizType === 'kpop' ? kpopQuestions : animeQuestions;
    document.body.className = quizType + '-theme';
    document.getElementById("welcome-screen").classList.remove("active");
    document.getElementById("quiz-screen").classList.add("active");
    showQuestion();
    startTimer();
    updateProgressBar();
}

function showQuestion() {
    const questionObj = selectedQuiz[currentQuestionIndex];
    document.getElementById("question").textContent = questionObj.question;
    document.getElementById("question-image").src = questionObj.image;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    questionObj.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.className = "choice";
        button.onclick = () => selectChoice(choice);
        choicesDiv.appendChild(button);
    });
    document.getElementById("feedback").textContent = "";
}

function selectChoice(choice) {
    const questionObj = selectedQuiz[currentQuestionIndex];
    if (choice === questionObj.answer) {
        score++;
        document.getElementById("feedback").textContent = "Correct!";
    } else {
        document.getElementById("feedback").textContent = "Incorrect!";
    }
    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    if (currentQuestionIndex < selectedQuiz.length - 1) {
        currentQuestionIndex++;
        showQuestion();
        resetTimer();
        updateProgressBar();
    } else {
        clearInterval(timerInterval);
        showScore();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.length) * 100;
    progressBar.style.width = progress + "%";
}

function showScore() {
    document.getElementById("quiz-screen").classList.remove("active");
    document.getElementById("score-screen").classList.add("active");
    document.getElementById("score").textContent = score;
    updateLeaderboard();
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    document.body.className = '';
    document.getElementById("score-screen").classList.remove("active");
    document.getElementById("welcome-screen").classList.add("active");
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time-left").textContent = timeLeft;
        } else {
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 30;
    document.getElementById("time-left").textContent = timeLeft;
}

function updateLeaderboard() {
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    const leaderboardList = document.getElementById("leaderboard");
    leaderboardList.innerHTML = "";
    leaderboard.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `#${index + 1}: ${score}`;
        leaderboardList.appendChild(listItem);
    });
}

document.getElementById("next-btn").addEventListener("click", () => {
    clearInterval(timerInterval);
    nextQuestion();
    startTimer();
});