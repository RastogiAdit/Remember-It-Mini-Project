var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var currentLevel = 1;
var gameStart = false;
var isGetSequence = true;
var checkIndex = 0;



$(document).keypress(function() {
    if(!gameStart)
    {
        gameStart = true;
        nextSequence();
        //console.log("Game Start!!");
    }
});


$(".btn").click(function() 
{
    var buttonPressedName = this.id;
    buttonSoundLocation = "sounds/" + buttonPressedName + ".mp3";
    buttonPressedId = "#" + buttonPressedName;
    var audioPlay = new Audio(buttonSoundLocation);
    audioPlay.play();

    animateButton(buttonPressedId);
    handler(buttonPressedName);

});

function animateButton(buttonId)
{
    $(buttonId).addClass("pressed");
    setTimeout(function(){$(buttonId).removeClass("pressed");},100);
}


function nextSequence()
{
    if(isGetSequence)
    {
        $("#level-title").text("Level "+currentLevel);


        isGetSequence = false;
        var randomNumber = Math.floor((Math.random())*4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        buttonId = "#" + randomChosenColor;

        setTimeout(function(){$(buttonId).fadeIn(100).fadeOut(100).fadeIn(100);},1000);
        
    }
}

function handler(buttonPressedName)
{
    var userChosenColor = buttonPressedName;
    //console.log("the user has pressed: " + userChosenColor);
    userClickedPattern.push(userChosenColor);

    if(checkAnswer())
    {
        // console.log("check index a: "+checkIndex);
        // console.log("current level a: "+currentLevel);
        // console.log("user a: "+userClickedPattern);
        // console.log("game a: "+gamePattern);
        nextSequence();
    }
    else
    {
        gameOver();
    }
}



function checkAnswer()
{
    // console.log("check index: "+checkIndex);
    // console.log("current level: "+currentLevel);
    // console.log("user: "+userClickedPattern);
    // console.log("game: "+gamePattern);
    if(gamePattern[checkIndex] == userClickedPattern[checkIndex])
    {
        if(checkIndex == currentLevel-1)
        {
            isGetSequence = true;
            userClickedPattern = [];
            checkIndex = 0;
            //console.log("next level");
            currentLevel++;
            //console.log("level "+currentLevel);
            return true;
        }
        //console.log("success");
        checkIndex++;
        return true;
    }
    else
    {
        //console.log("failure");
        return false;
    }
}

function gameOver()
{
    gamePattern = [];
    userClickedPattern = [];
    currentLevel = 1;
    gameStart = false;
    isGetSequence = true;
    checkIndex = 0;

    var audioPlay = new Audio("sounds/wrong.mp3");
    audioPlay.play();

    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},500);

    $("#level-title").text("Game Over, Press any key to Restart!");

    //console.log("Game Over");
}
