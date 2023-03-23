let gameBoard = document.getElementById('gameBoard');
var ball = document.getElementsByClassName('ball');//.item(0).className;
let paddle = document.getElementsByClassName('paddle');//.item(0).className;
var btn_start = document.getElementsByClassName('startBtn');//.item(0).className;
var gameOver = document.getElementsByClassName('gameOver');//.item(0).className;

var gameInPlay = false;
var animationRepeat ;
var ballDir =[5,5,5];
var score = 0;
var lives = 5;
var rect = paddle[0].getBoundingClientRect();

console.log(btn_start[0])

btn_start[0].addEventListener("click", startGame);

document.addEventListener('keydown', function(e){
  var key =e.key;
  e.preventDefault();
  
  console.log(key)

  if(key === 'ArrowLeft'){paddle[0].left = true 
    console.log(paddle[0].left)}
  
  else if(key === 'ArrowRight'){paddle[0].right = true;}
  
  else if(key === 'ArrowUp')
    alert('Release the ball!')
  
});

document.addEventListener('keyup', function(e){
  var key =e.key;
  e.preventDefault();

  if(key === 'ArrowLeft'){paddle[0].left = false
    console.log(paddle[0].left)}
  
  else if(key === 'ArrowRight'){paddle[0].right = false;}
  
  else if(key === 'ArrowUp')
    alert('Release the ball!')
});

function startGame(){
  gameOver[0].style.display='none';
  ball[0].style.display="block";
  animationRepeat = requestAnimationFrame(update);
  gameOver = false;
  gameInPlay = true;
}

function update() {
  if(gameOver === false){
    var pCurrent = paddle[0].offsetLeft;
    if(paddle[0].left){
      pCurrent -= 5;
    }
    else if(paddle[0].right){
      pCurrent += 5;
    }

    paddle[0].style.left = pCurrent +'px';

    console.log(paddle[0].offsetLeft)
    //console.log(rect.left)
    //console.log(rect.right)
    //console.log(pCurrent)
    

    animationRepeat = requestAnimationFrame(update);
  }
}