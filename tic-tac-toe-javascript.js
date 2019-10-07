$(document).ready(function() {

  var turn = "Leia";//defaults players turn to X
  var computersTurn = "Vader"; //defaults computer's turn to O
  var turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];//stores values to check for winner later.
  var xButton = document.querySelector("#turnX");
  var oButton = document.querySelector("#turnO");
  var gameOn = false;  //keeps track if it is the computer's turn
  var count = 0; //keeps track of computer's turn so no infinite loop
  var leia = "https://4.bp.blogspot.com/-nQTVlD6_b5Y/V74SQkM6NZI/AAAAAAAAWJE/O7Tn3sCkdv8aHv4H678aBvVQBGbMpfDhgCLcB/s1600/9fc41654.png";
  var vader = "https://spacequotations.com/wp-content/uploads/2018/09/darth-vader-star-wars-lack-of-faith.jpg";

  //change player's turn to X and computer's turn to O
  $("#turnX").click(function(){
    turn = "Vader"
    computersTurn = "Leia";
    xButton.style.color = "grey";
    oButton.style.color = "yellow";
    reset();
  });

  //change player's turn back to O and computer's turn to X
  $("#turnO").click(function(){
    turn = "Leia"
    computersTurn = "Vader";
    xButton.style.color = "yellow";
    oButton.style.color = "grey";
    reset();
  });

  function computerTurn(){
    //used to break while loop
    var taken = false;
    while(taken === false && count !== 5){//checks if square is free and if you have taken less than 5 turns
      var computersMove = (Math.random()*10).toFixed();//generates computers random turn
      var move = $("#"+computersMove).text();
      if(move==="#"){
        $("#" + computersMove).text(computersTurn);//displays on page
        if(computersTurn === "Leia"){
           $("#" + computersMove).css("background-image", "url(" + leia + ")");
        }else{
          $("#" + computersMove).css("background-image", "url(" + vader + ")");
        }
        taken = true;//breaks loop
        turns[computersMove] = computersTurn;
      }
    }
  }

  function playerTurn(turn, id){
    var spotTaken = $("#" + id).text();//checks the value of the square
    if(spotTaken==="#"){//checks that spot is open
      count ++;
      turns[id] = turn;//adds turn to the array
      $("#"+id).text(turn);//places your mark in the square
      if(turn==="Leia"){
     $("#"+id).css("background-image", "url(" + leia + ")");
      }else {
      $("#"+id).css("background-image", "url(" + vader + ")");
      }
      winCondition(turns, turn);//checks if you won
      if(gameOn===false){//if no one wins, its the computer's turn
        computerTurn();//runs computer function
        winCondition(turns, computersTurn);//checks if computer won
      }
    }
  }

 function winCondition(turnArray,currentTurn){//lists all possible ways to win tic tac toe and checks for a match
   if (turnArray[0] === currentTurn && turnArray[1]===currentTurn && turnArray[2] ===currentTurn){//top row win
     gameOn = true;
     reset();
     alert(currentTurn + " wins across the top row!");
   }
   else if (turnArray[2] === currentTurn && turnArray[4]===currentTurn && turnArray[6] === currentTurn) {
      gameOn = true;//diagonal bottomL-topR win
      reset();
      alert(currentTurn + " wins diagonally!");
    }
    else if (turnArray[0] === currentTurn && turnArray[3]===currentTurn && turnArray[6] === currentTurn) {
      gameOn = true;//left column win
      reset();
      alert(currentTurn + " wins in the left column!");
      }
    else if (turnArray[0] === currentTurn && turnArray[4]===currentTurn && turnArray[8] === currentTurn) {
      gameOn = true;//diagonal topL-bottomR win
      reset();
      alert(currentTurn + " wins diagonally!");
    }
    else if (turnArray[1] === currentTurn && turnArray[4]===currentTurn && turnArray[7] === currentTurn) {
      gameOn = true;//middle column win
      reset();
      alert(currentTurn + " wins in the middle column!");
    }
    else if (turnArray[2] === currentTurn && turnArray[5]===currentTurn && turnArray[8] === currentTurn) {
      gameOn = true;//right column win
      reset();
      alert(currentTurn + " wins in the right column!");
    } else if (turnArray[3] === currentTurn && turnArray[4]===currentTurn && turnArray[5] === currentTurn) {
      gameOn = true;//middle row win
      reset();
      alert(currentTurn + " wins across the middle row!");
    }else if (turnArray[6] === currentTurn && turnArray[7]===currentTurn && turnArray[8] === currentTurn) {
      gameOn = true;//bottom row win
      reset();
      alert(currentTurn + " wins across the bottom row!");
    }else if (!(turnArray.includes("#"))) {//if there are no more open spots
      gameOn = true;//bottom row win
      reset();
      alert("It was a tie! May the force be with you.");
    }else{
      gameOn = false;//game continues if no win is acheived in that turn
    }
 }

  $(".square").click(function(){//when you click a square, run player turn function
    var slot = $(this).attr("id");
    playerTurn(turn, slot);
  });

  function reset(){//resets so you cant change  player mid game
    turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
    count=0;
    $(".square").text("#");
    $(".square").css("background-image", "url( )");
    gameOn=false;
  }

});
