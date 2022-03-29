var life1 = 2;
var life2 = 2;
var gameState= 0
var play=0
var end =1
var score1= 0;
var score2= 0
var form1
var player1name,player2name;

function preload() {

underwaterimg= loadImage("images/underwater1.jpg")
swimmeranimation= loadAnimation("images/s1.png", "images/s2.png", "images/s3.png", "images/s4.png", "images/s5.png","images/s6.png","images/s7.png","images/s8.png","images/s9.png","images/s10.png",)
fish1= loadImage("images/fish 1.png")
fish2= loadImage("images/fish 2.png")
fish3= loadImage("images/fish 3.png")
diveroverimg= loadImage("images/s1.png")
gameoverimg= loadImage("images/gameover.png")
goldcoinimg= loadImage("images/goldcoin.png")
pearlimg= loadImage("images/pearl.png")
bite= loadSound("images/bitesound.mp3")
ching=loadSound("images/coinsound.wav")
gOver=loadSound("images/go.wav")
}
function setup() {
createCanvas(windowWidth,windowHeight)

swimmer=createSprite(200,200,5,5)
swimmer.addAnimation("swimmer animation", swimmeranimation)
swimmer.addImage("dead",diveroverimg)
swimmer.scale=1.3
swimmer.debug=true
swimmer.setCollider("rectangle",0,0,200,50)

swimmer2=createSprite(200,500,5,5)
swimmer2.addAnimation("swimmer animation", swimmeranimation)
swimmer2.addImage("dead",diveroverimg)
swimmer2.scale=1.3
swimmer2.debug=true
swimmer2.setCollider("rectangle",0,0,200,50)
obstaclesGroup= new Group();
gameover= createSprite(windowWidth/2, windowHeight/2, 10, 10)
gameover.addImage(gameoverimg)

goldGroup= new Group();
pearlGroup= new Group();

form1=new Form1();
form2=new Form2();
}
function draw() {
  if(gameState===0){
    form1.display();
  }
  if(gameState===1){
    form2.display();
  }
  if(gameState===2){
      
background(underwaterimg)
gameover.visible=false
if (keyDown("up_arrow")){
    swimmer.y= swimmer.y-5
}
if (keyDown("down_arrow")){
    swimmer.y= swimmer.y+5
}

if (keyDown("w")){
  swimmer2.y= swimmer2.y-5
}
if (keyDown("s")){
  swimmer2.y= swimmer2.y+5
}

for(var i=0;i<obstaclesGroup.length;i++){
    if(obstaclesGroup.get(i).collide(swimmer)){
        obstaclesGroup.get(i).destroy();
        life1=life1-1
        bite.play();
    } }

    for(var i=0;i<pearlGroup.length;i++){
      if(pearlGroup.get(i).collide(swimmer)){
          pearlGroup.get(i).destroy();
          life1=life1+1
      } }

      for(var i=0;i<goldGroup.length;i++){
        if(goldGroup.get(i).collide(swimmer)){
            goldGroup.get(i).destroy();
            score1=score1+1
            ching.play();
        } }

   

  for(var i=0;i<obstaclesGroup.length;i++){
    if(obstaclesGroup.get(i).collide(swimmer2)){
        obstaclesGroup.get(i).destroy();
        life2=life2-1
        bite.play();
    } }

    for(var i=0;i<pearlGroup.length;i++){
      if(pearlGroup.get(i).collide(swimmer2)){
          pearlGroup.get(i).destroy();
          life2=life2+1
      } }

      for(var i=0;i<goldGroup.length;i++){
        if(goldGroup.get(i).collide(swimmer2)){
            goldGroup.get(i).destroy();
            score2=score2+1
            ching.play();
        } }


    
spawnObstacles();
spawnGold();
spawnPearls();
var edges= createEdgeSprites();
swimmer.collide(edges[2])
swimmer.collide(edges[3])
drawSprites();
textSize(30)
stroke("red")
strokeWeight(3)
fill("white")
textFont("timesnewroman")
text(player1name+"'s Life : "+life1,50,50)
text(player1name+"'s Score : "+score1,50,100)
text(player2name+"'s Life : "+life2,1000,50)
text(player2name+"'s Score : "+score2,1000,100)

if (life1<=0 || life2<=0){
  gameState=3
}
  }

else if (gameState===3){
textSize(50)
stroke("red")
strokeWeight(3)
fill("white")
textFont("timesnewroman")
  text("Game Over", windowWidth/2-150, windowHeight/2)
  gameover.visible=true
  swimmer.changeAnimation("dead",diveroverimg)
  //gOver.play()

  if(score1>score2){
    text("Player 1 won!",width/2-200,height/2+100);
  }
  else if(score2>score1){
    text("Player 2 won!",width/2-200,height/2+100);
  }
  else if(score1===score2){
    if(life1>life2){
    text("Player 1 won!",width/2-200,height/2+100);
    }
    else if(life2>life1){
      text("Player 2 won!",width/2-200,height/2+100);
    }
  }
}
}
function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(windowWidth,165,10,40);
    obstacle.y=Math.round(random(50,windowHeight))

      obstacle.velocityX = -10
      //-(6 + 3*score/100);
      
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(fish1);
                break;
        case 2: obstacle.addImage(fish2);
                break;
        case 3: obstacle.addImage(fish3);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.6;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }

  function spawnGold(){
    if(frameCount % 100 === 0) {
      var goldcoin = createSprite(windowWidth,165,10,40);
    goldcoin.y=Math.round(random(50,windowHeight))

      goldcoin.velocityX = -9
      goldcoin.addImage(goldcoinimg)
      //-(6 + 3*score/100);
      
      //assign scale and lifetime to the obstacle           
      goldcoin.scale = 0.2;
      goldcoin.lifetime = 300;
      //add each obstacle to the group
      goldGroup.add(goldcoin);
    }
  }

  function spawnPearls(){
    if(frameCount % 400 === 0) {
      var pearl = createSprite(windowWidth,165,10,40);
    pearl.y=Math.round(random(windowHeight-150, windowHeight-50))

      pearl.velocityX = -9
      pearl.addImage(pearlimg)
      //-(6 + 3*score/100);
      
      //assign scale and lifetime to the obstacle           
      pearl.scale = 0.2;
      pearl.lifetime = 300;
      //add each obstacle to the group
      pearlGroup.add(pearl);
    }
  }