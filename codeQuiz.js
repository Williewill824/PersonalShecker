var introDiv = document.querySelector("#intro");
var startBtn = document.querySelector("#start");
var questionDiv = document.querySelector("#question");
var title = document.querySelector("#title");
var c1 = document.querySelector("#c1");
var c2 = document.querySelector("#c2");
var c3 = document.querySelector("#c3");
var c4 = document.querySelector("#c4");
var choices = document.querySelectorAll(".choice");
var questionIndex = 0;
var timerId;
var timeSpan = document.querySelector("#time");
var time = 30;
var resultDiv = document.querySelector("#result")
var scoreSpan = document.querySelector("#score")
var correctCount = 0;
var intervalId;




var questions = [{
    title : "Commonly used data types DO NOT include..",
    c1: "String",
    c2: "Boolean",
    c3: "Alert",
    c4: "Numbers",
    answer: "Alert"
},
{
    title : "The condition in an if / else statements is enclosed within...",
    c1: "Quotes",
    c2: "Curly Braquets",
    c3: "Parenthesis",
    c4: "Square Braquets",
    answer: "Parenthesis"
},
   {
    title : "Arrays in javascript can be used to store...",
    c1: "Numbers and strings",
    c2: "Arrays",
    c3: "Booleans",
    c4: "All the above",
    answer: "All the above"

   }

];
  //show results div
  // hide questions div 
  // show score 
function endQuiz(){
   scoreSpan.textContent = time;
   clearInterval(intervalId)
   questionDiv.classList.add("hide");
   resultDiv.classList.remove("hide");
   console.log(resultDiv);
   setTimeout(showHighScore, 2)
} 

function showHighScore() {
    var name = prompt("Please enter your name");
  
    var high_scores = localStorage.getItem("scores");
  
    if (!high_scores) {
      high_scores = [];
    } else {
      high_scores = JSON.parse(high_scores);
    }
  
    high_scores.push({ name: name, score: time });
  
    localStorage.setItem("scores", JSON.stringify(high_scores));
  
    high_scores.sort(function (a, b) {
      return b.score - a.score;
    });
  
    var contentUL = document.createElement("ul");
  
    for (var i = 0; i < high_scores.length; i++) {
      var contentLI = document.createElement("li");
      contentLI.textContent =
        "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
      contentUL.appendChild(contentLI);
    }
  
    document.body.appendChild(contentUL);
  }

//   start button function
startBtn.addEventListener("click", function(){
    introDiv.classList.add("hide");
    questionDiv.classList.remove("hide");
    timerId = setInterval(function(){
        time--;
        if(time == 0){
            clearInterval(timerId);
            endQuiz()
        }
        timeSpan.textContent = time;

    },1000)
});




choices.forEach(function(e){
    e.addEventListener("click", function(event){
        var userGuess= event.target.textContent
        console.log(userGuess)
        if(userGuess === questions[questionIndex].answer){
          //  result.innerHTML= "CORRECT";
        } else {
        //   result.innerHTML= "INCORRECT";
             time -= 5;
        }

       if(questionIndex != (questions.length - 1)){
            questionIndex++;
            loadNextQuestion()

       } else {
           console.log("Quiz Over!")
           clearInterval(timerId);
           endQuiz();
       }
    })
})
    //   load the next questions 
function loadNextQuestion(){
    
    title.textContent = questions[questionIndex].title
    c1.textContent = questions[questionIndex].c1
    c2.textContent = questions[questionIndex].c2
    c3.textContent = questions[questionIndex].c3
    c4.textContent = questions[questionIndex].c4
     
   

}
loadNextQuestion();