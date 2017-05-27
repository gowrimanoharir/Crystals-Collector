//Wait for HTML to load
$(document).ready(function(){


var precious = {

	//Variables for Wins and Losses that will not be reset each round
	wins: 0, 
	losses: 0,

	/*Round Variables for Game Number, 
	Hobbit Array for 4 hobbits, 
	Current Round user score and related functions */
	gameNum: null, 
	hobbitNum: [], 
	curUserScore: 0,
	
	//Ininitialize current round variables
	curRoundInitialize: function()
	{
		this.gameNum=this.getRandNum(19,120);
		this.hobbitNum=[];
		this.curUserScore=0;
		this.setHobbitNum(1, 12);
		$('#gameNumber').html(this.gameNum);
		$('#userScore').html(this.curUserScore);
		$('#again').attr("src","assets/images/wait.jpg");
		$('#pl-again').html('');
		$('.js-hobbit').removeAttr('disabled');
	},

	/*function to check for wins and losses*/
	checkWinLose: function()
	{	
		if(this.curUserScore===this.gameNum){
			this.wins+=1;
			$('#win').html(this.wins);
			$('#again').attr("src","assets/images/win.gif");
			$('#pl-again').html('Click the Image to play again');
			$('.js-hobbit').attr('disabled', 'true');
		}
		else if(this.curUserScore>this.gameNum){
			this.losses+=1;
			$('#lose').html(this.losses);
			$('#again').attr("src","assets/images/lose.jpg");
			$('#pl-again').html('Click the Image to play again');
			$('.js-hobbit').attr('disabled', 'true');
		}
	},

	/*Have a function to set the Hobbit random number 
	between 1 - 12 for 4 hobbits in an array without 
	duplicates*/
	setHobbitNum: function(min, max)
	{
	  var rand=this.getRandNum(min, max);
	  while(this.hobbitNum.length<4)
	  {
		  if (this.hobbitNum.includes(rand))
		    this.setHobbitNum(min, max);
		  else
		    this.hobbitNum.push(rand);
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
  
	// Close Popup Event
	$('#popupclose').on('click',function() {
	  $('#overlay').css('display','none');
	  $('#popup').css('display','none');
	});

	$('#instructions').on('click',function() {
		$('#overlay').css('display','block');
		$('#popup').css('display','block');
	});


	//Initialize the game
	var play = precious;
	play.curRoundInitialize();

	//jQuery to listen to click event

	$('.js-hobbit').on('click', function(){

		/*Increase User Score based on which gem button 
		 was clicked identified through value attribute*/
		play.curUserScore += play.hobbitNum[$(this).attr('value')];

		//display the user score
		$('#userScore').html(play.curUserScore);

		//check for win or lose
		play.checkWinLose();
	});

	$('#again').on('click', function(){
		if ($('.js-hobbit').is(':disabled')){
		play.curRoundInitialize();
		}
	});





});