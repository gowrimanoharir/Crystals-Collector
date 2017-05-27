//Wait for HTML to load
$(document).ready(function(){

//Define game object
var precious = {

	//Variables for Wins and Losses that will not be reset each round
	wins: 0, 
	losses: 0,

	/*Round Variables for Gollum Number, Fellow Array for 4 fellowship, 
	Current Round user score and related functions */
	gollumNum: null, 
	fellowNum: [], 
	curUserScore: 0,
	
	//Function to initialize current round variables
	curRoundInitialize: function()
	{
		this.gollumNum=this.getRandNum(19,120);
		this.fellowNum=[];
		this.curUserScore=0;
		this.setFellowNum(1, 12);
		$('#gollumNumber').html(this.gollumNum);
		$('#userScore').html(this.curUserScore);
		$('#again').attr("src","assets/images/wait.jpg");
		$('#pl-again').html('');
		$('.js-fellow').removeAttr('disabled');
	},

	/*Function to check for wins and losses*/
	checkWinLose: function()
	{	
		if(this.curUserScore===this.gollumNum){
			this.wins+=1;
			$('#win').html(this.wins);
			$('#again').attr("src","assets/images/win.gif");
			$('#pl-again').html('Click the Image to play again');
			$('.js-fellow').attr('disabled', 'true');
		}
		else if(this.curUserScore>this.gollumNum){
			this.losses+=1;
			$('#lose').html(this.losses);
			$('#again').attr("src","assets/images/lose.jpg");
			$('#pl-again').html('Click the Image to play again');
			$('.js-fellow').attr('disabled', 'true');
		}
	},

	/*Have a function to set the fellow random number 
	between 1 - 12 for 4 fellows in an array without 
	duplicates*/
	setFellowNum: function(min, max)
	{
	  var rand=this.getRandNum(min, max);
	  while(this.fellowNum.length<4)
	  {
		  if (this.fellowNum.includes(rand))
		    this.setFellowNum(min, max);
		  else
		    this.fellowNum.push(rand);
	  }
	},

	/*Function to get the random number 
	for a given min and max*/
	getRandNum: function(min,max)
	{
		return (Math.floor(Math.random()*(max-min+1)+min))
	}

};

	//Display instructions popup on game load

	$('#overlay').css('display','block');
	$('#popup').css('display','block');
  
	//On click of Close Popup make instruction div display to none
	$('#popupclose').on('click',function() {
	  $('#overlay').css('display','none');
	  $('#popup').css('display','none');
	});

	//On click of Instructions make instruction div to display
	$('#instructions').on('click',function() {
		$('#overlay').css('display','block');
		$('#popup').css('display','block');
	});


	//Initialize the game
	var play = precious;
	play.curRoundInitialize();

	//jQuery to define what happens on click of Fellowhip buttons

	$('.js-fellow').on('click', function(){

		/*Increase Fellowship Score based on which button 
		 was clicked identified through value attribute*/
		play.curUserScore += play.fellowNum[$(this).attr('value')];

		//Display the Fellowship score
		$('#userScore').html(play.curUserScore);

		//Check for win or lose
		play.checkWinLose();
	});


	//jQuery to define what happens when image is clicked to start new round

	$('#again').on('click', function(){

		/*Check if fellow buttons are disabled only then start the new round
		this is to avoid starting a new round if user clicks image middle of game*/
		if ($('.js-fellow').is(':disabled')){
			play.curRoundInitialize();
		}
	});

});