
//Global Variable for Wins and Losses
var wins=0, losses=0;

/*Round Variable for Game Number, 
Crystal Array for 4 crystals, 
Current Round user score and related functions */
var gameNum, isWin, crystalNum, curUserScore;

//Ininitialize current round variables
function curRoundInitialize()
{
	gameNum=getRandNum(19,120);
	roundEnd=false;
	crystalNum=[];
	curUserScore=0;
	setCrystalNum(1, 12);
	$('#gameNumber').html(gameNum);
	$('#userScore').html(curUserScore);
}

curRoundInitialize();
//Jquery click event to add the corresponding number to the current user score, then compare with the game number, when equals then wins+1 if > than game number then loses+1
//After Wins or Loses regenerate the Game number and Crystal Array with new random and reset current round user score to 0


$(document).ready(function(){


	$('#gem1').on('click', function(){
		curUserScore += crystalNum[0];
		$('#userScore').html(curUserScore);
		checkWinLose();
	});

	$('#gem2').on('click', function(){
		curUserScore += crystalNum[1];
		$('#userScore').html(curUserScore);
		checkWinLose();
	});

	$('#gem3').on('click', function(){
		curUserScore += crystalNum[2];
		$('#userScore').html(curUserScore);
		checkWinLose();
	});

	$('#gem4').on('click', function(){
		curUserScore += crystalNum[3];
		$('#userScore').html(curUserScore);
		checkWinLose();
	});

});

/*function to check for wins and losses*/
function checkWinLose()
{
	if(curUserScore===gameNum){
		//roundEnd=true;
		wins+=1;
		$('#win').html(wins);
		curRoundInitialize();
	}
	else if(curUserScore>gameNum){
		//roundEnd=true;
		losses+=1;
		$('#lose').html(losses);
		curRoundInitialize();
	}
}


/*Have a function to get the random number 
for a given min and max*/
function getRandNum(min,max){
		return (Math.floor(Math.random()*(max-min+1)+min))
}


/*Have a function to set the Crystal random number 
between 1 - 12 for 4 crystals in a array without 
duplicates*/
function setCrystalNum(min, max){
  rand=getRandNum(min, max);
  while(crystalNum.length<4)
  {
	  if (crystalNum.includes(rand))
	    setCrystalNum(min, max);
	  else
	    crystalNum.push(rand);
  }
 }