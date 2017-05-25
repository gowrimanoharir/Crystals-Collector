var crystalCollector = {

	//Variables for Wins and Losses that will not be reset each round
	wins: 0, 
	losses: 0,

	/*Round Variables for Game Number, 
	Crystal Array for 4 crystals, 
	Current Round user score and related functions */
	gameNum: null, 
	isWin: null, 
	crystalNum: [], 
	curUserScore: 0,

	//Ininitialize current round variables
	curRoundInitialize: function()
	{
		this.gameNum=this.getRandNum(19,120);
		this.crystalNum=[];
		this.curUserScore=0;
		this.setCrystalNum(1, 12);
		$('#gameNumber').html(this.gameNum);
		$('#userScore').html(this.curUserScore);
	},

	/*function to check for wins and losses*/
	checkWinLose: function()
	{
		if(this.curUserScore===this.gameNum){
			this.wins+=1;
			$('#win').html(this.wins);
			this.curRoundInitialize();
		}
		else if(this.curUserScore>this.gameNum){
			this.losses+=1;
			$('#lose').html(this.losses);
			this.curRoundInitialize();
		}
	},

	/*Have a function to set the Crystal random number 
	between 1 - 12 for 4 crystals in an array without 
	duplicates*/
	setCrystalNum: function(min, max)
	{
	  var rand=this.getRandNum(min, max);
	  while(this.crystalNum.length<4)
	  {
		  if (this.crystalNum.includes(rand))
		    this.setCrystalNum(min, max);
		  else
		    this.crystalNum.push(rand);
	  }
	},

	/*Function to get the random number 
	for a given min and max*/
	getRandNum: function(min,max)
	{
		return (Math.floor(Math.random()*(max-min+1)+min))
	}

};

//Initialize the game
var play = crystalCollector;
play.curRoundInitialize();

//Wait for HTML to load
$(document).ready(function(){

	//jQuery to listen to click event

	$('.gem').on('click', function(){

		/*Increase User Score based on which gem button 
		 was clicked identified through value attribute*/
		play.curUserScore += play.crystalNum[$(this).attr('value')];

		//display the user score
		$('#userScore').html(play.curUserScore);

		//check for win or lose
		play.checkWinLose();
	});
});