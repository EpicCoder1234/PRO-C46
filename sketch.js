var database;
var player;
var playerCount=0;
var form;
var game;
var gameState;
var allPlayers;
var ship1,ship2,ship3;
var ships;
var ship1IMG, ship2IMG, ship3IMG;

function preload(){
  ship1IMG = loadImage("ship1.png");
  ship2IMG = loadImage("ship2.png");
  ship3IMG = loadImage("ship3.png");
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    database = firebase.database();
    game = new Game();

    //playerCount = 2;
}

function draw(){
    gameState = game.getState();
    game.start();


    if(playerCount === 3){
        game.updateState(1);
      }
      if(gameState === 1){
        clear();
        console.log(gameState + "hello")
        game.play();
      }
      if(gameState===2){
        game.end();
      }
      console.log(gameState);
}
