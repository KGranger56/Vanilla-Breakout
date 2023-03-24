let gameBoard = document.getElementById('gameBoard');
var ball = document.getElementsByClassName('ball');//.item(0).className;
let paddle = document.getElementsByClassName('paddle');//.item(0).className;
var btn_start = document.getElementsByClassName('startBtn');//.item(0).className;
var gameOverText = document.getElementsByClassName('gameOverText');//.item(0).className;

var gameInPlay = false;
var gameOver = true
var animationRepeat ;
var ballDir =[5,5,5];
var score = 0;
var lives = 0;
var rect = gameBoard.getBoundingClientRect();


btn_start[0].addEventListener("click", startGame);

document.addEventListener('keydown', function(e){
  var key =e.key;
  e.preventDefault();

  if(key === 'ArrowLeft'){paddle[0].left = true;}
  
  else if(key === 'ArrowRight'){paddle[0].right = true;}
  
  else if(key === 'ArrowUp' && !gameInPlay){ gameInPlay = true;}
  
});

document.addEventListener('keyup', function(e){
  var key =e.key;
  e.preventDefault();

  if(key === 'ArrowLeft'){paddle[0].left = false}
  
  else if(key === 'ArrowRight'){paddle[0].right = false;}
});

function startGame(){
  if(gameOver){
  gameOverText[0].style.display='none';
  ball[0].style.display="block";
  lives = 5;
  setupBricks(12)
  lifeUpdate();
  animationRepeat = requestAnimationFrame(update);
  gameOver = false;
  gameInPlay = false;
  }
}

function setupBricks(num){
  var row = {
    x:((rect.width % 100)/2+4)
    ,y:50
  }
  for(var x=0; x<num; x++){
    if(row.x > (rect.width - 100)){
      row.y += 70;
      row.x = ((rect.width % 100)/2+4)
    }
    brickMaker(row);
    row.x += 100;
  }
}

function brickMaker(row){
  var div= document.createElement('div');
  div.setAttribute('class','brick')
  div.style.backgroundColor = ranColor();
  var pointDiv = Math.ceil(Math.random()*10)+2;
  div.dataset.points = pointDiv;
  div.innerHTML = pointDiv;
  div.style.left = row.x +'px';
  div.style.top = row.y + 'px';
  gameBoard.appendChild(div);
}

function ranColor() {
  function c() {
    var hex = Math.floor(Math.random() * 256).toString(16);
    var response = ('0' + String(hex)).substr(-2)
    return response;
  }
  return '#' + c() + c() + c()
}

function update() {
  if(gameOver === false ){
    var pCurrent = paddle[0].offsetLeft;
    if(paddle[0].left && pCurrent > 0){
      pCurrent -= 5;
    }
    else if(paddle[0].right && pCurrent < (rect.width - paddle[0].offsetWidth)){
      pCurrent += 5;
    }
    paddle[0].style.left = pCurrent +'px';
    
    if(!gameInPlay){
      waitingOnPaddle();
    }
    else{
      ballMove();
    }
    animationRepeat = requestAnimationFrame(update);
  }
}

function waitingOnPaddle(){
  ball[0].style.top = (paddle[0].offsetTop-20) + 'px';
  ball[0].style.left = (paddle[0].offsetLeft+35) + 'px'
}

function ballMove(){
  var x = ball[0].offsetLeft;
  var y = ball[0].offsetTop;
  
  if(x > (rect.width-20) || x <0){
    ballDir[0]*= -1;
  }
  if(y > (rect.height-20) || y <0){
    if(y > (rect.height-20)){
      fallOffEdge();
      return;
    }
    ballDir[1]*= -1;
  }

  if(isCollide(ball[0],paddle[0])){
    var nDir = ((x -paddle[0].offsetLeft)- (paddle[0].offsetWidth/2))/10;
    ballDir[0] = nDir;
    ballDir[1]*= -1;
  }

  var tempBricks = document.querySelectorAll('.brick');
  if(tempBricks.length == 0){
    stopper();
    setupBricks(20);
  }

  for(var tarBrick of tempBricks){
    if(isCollide(tarBrick,ball[0])){
      ballDir[1]*= -1;
      tarBrick.parentNode.removeChild(tarBrick);
      scoreUpdate(tarBrick.dataset.points);
    }
  }

  x += ballDir[0]
  y += ballDir[1]


  ball[0].style.top = (y) + 'px';
  ball[0].style.left = (x) + 'px'
}

function lifeUpdate(){
  document.getElementsByClassName('currentLives')[0].innerHTML=lives;
}

function scoreUpdate(num){
  score += parseInt(num);
  document.getElementsByClassName('currentScore')[0].innerHTML=score;
}

function stopper(){
  gameInPlay = false;
  ballDir[0,-5]
  waitingOnPaddle();
  window.cancelAnimationFrame(animationRepeat);
}

function endGame(){
  gameOverText[0].style.display='block';
  gameOverText[0].style.top= '24' + '%'
  gameOverText[0].style.left= '13' + '%'
  gameOverText[0].innerHTML = 'GAME OVER <br/> Your Score: '+score;
  gameOver= true;
  ball[0].style.display="none";
  var tempBricks = document.querySelectorAll('.brick');
  for(var tarBrick of tempBricks){
      tarBrick.parentNode.removeChild(tarBrick);
    }
}

function fallOffEdge(){  
  lives--;
  if(lives < 0){
    endGame();
    lives = 0;
  }
  lifeUpdate();
  stopper();
}

function isCollide(a,b){
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();
  //console.log(aRect, bRect);
  return(!(
    aRect.bottom<bRect.top || 
    aRect.top>bRect.bottom || 
    aRect.right<bRect.left || 
    aRect.left>bRect.right));
  }