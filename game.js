/** alert("here is the game.js file"); */
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var triggerKey = "";
var buttonKey = "";
var gameLevel = 0;
var elemInc = 0;
var sgreen = new Audio("./sounds/green.mp3");
var sred = new Audio("./sounds/red.mp3");
var syellow = new Audio("./sounds/yellow.mp3");
var sblue = new Audio("./sounds/blue.mp3");
var sgameover = new Audio("./sounds/wrong.mp3");

$("body").keypress(function(event){
    if (triggerKey === "") {
        triggerKey = event.key;
        nextSequence();
    }    
});


function nextSequence () {
    elemInc = 0;
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColour = buttonColours[randomNumber];
    gameLevel++;
    $("h1").text("Level " + gameLevel);
    buttonAction(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log("gameArray " + gameLevel + " " + gamePattern);
};


function gameOver() {
    sgameover.play();
    $("body").attr("class","game-over");
    $("h1").text("Game over, press Any Key to Restart.");
    setTimeout (function () {
        $("body").attr("class","");
    }, 100);
    gamePattern = [];
    userClickedPattern = [];
    triggerKey = "";
    gameLevel = 0;
}



function buttonAction (color) {
$("." + color).fadeOut(70).fadeIn(70).fadeOut(70).fadeIn(70);
var gameSound = new Audio("./sounds/"+ color +".mp3")
gameSound.play();
}

$(".trigger").click(function (){
    $(".trigger").addClass("pressed");
    setTimeout (function () {
        $(".trigger").removeClass("pressed");
    }, 70);
    triggerKey = "r";
    nextSequence();
});

/*buttonAction(gamePattern[0]);*/

$(".btn").click(function(){
    if (triggerKey !== "") {
        buttonKey = $(this).attr("id");
        /*console.log("El valor es " + buttonKey);*/
        userClickedPattern.push(buttonKey);
        buttonAction(buttonKey);
        compareArray();
    }
    else {
        gameOver();
    }
});


function compareArray () {
    if (buttonKey === gamePattern[elemInc]) {   
        console.log("buttonKey " + buttonKey);
        console.log("userArray " + userClickedPattern);
        console.log("elemInc " + elemInc)  ;
        if (elemInc === (gameLevel-1)){
            console.log("Paso comparacion " + elemInc);
            setTimeout (function () {
                nextSequence();
            }, 500);
            
        }
        else {
            elemInc++;
        }
    }
    else {
        gameOver();
    }
}



