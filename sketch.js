var background2,backround2Image;
var deathNotePiece, deathNotePieceImage, pieceGroup;
var ryuk, ryukImage;
var score=0;
var gameState="PLAY";
var restart, restartImage;
var fire, fireImage, fireGroup;

function preload() 
{ 
  ryukImage=loadImage("Ryuk.png");
  background2Image=loadImage("DeathNoteBack.png");
  deathNotePieceImage=loadImage("death note piece.jfif");
  restartImage=loadImage("Restart Button.png");
  fireImage=loadImage("fire.png");
}

function setup() {
  createCanvas(400, 400);

  background1=createSprite(200,1050,20,20);
  background1.addImage(background2Image);
  background1.scale=15;
  background1.velocityY=3;
  
  ryuk=createSprite(200,300,20,20);
  ryuk.addImage(ryukImage);
  ryuk.scale=0.5
  
  restart=createSprite(200,300,20,20);
  restart.addImage(restartImage);
  restart.visible=false;
  
  
  pieceGroup=new Group();
  fireGroup=new Group();
  
}

function draw() {
  background(220);
  
  if(gameState==="PLAY")
  {
   
    background1.velocityY=3;
    
    if(background1.y>1300)
    {
      background1.y=-378.6;
    }
  
    if(pieceGroup.isTouching(ryuk))
    {
      score+=3;
      pieceGroup.destroyEach();
    }
    
    if(fireGroup.isTouching(ryuk))
    {
      score=0;
      fireGroup.destroyEach();
    }
  
    controls();
    spawnPiece();
    spawnFire();
  }
  
  if(gameState==="END")
  {
    restart.visible=true;
    background1.velocityY=0;
    ryuk.x=200;
    ryuk.y=200;
    fireGroup.destroyEach();
    pieceGroup.destroyEach();
    
    if(mousePressedOver(restart))
    {
      reset();
    }
  }

  drawSprites();
  
  if(score===0)
    {
      stroke('black');
      fill('blue');
      textSize(15);
      text("Grrrr, I have no PAGES!",ryuk.x+15,ryuk.y-50);
    }
  
  percentComplete();

  
  stroke('black');
  fill('red');
  textSize(30);
  text("Score : "+score,260,30);
}

function spawnPiece()
{
  if(frameCount%80===0)
  {
    deathNotePiece=createSprite(200,-50);
    deathNotePiece.x=Math.round(random(20,380));
    deathNotePiece.velocityY=4;
    deathNotePiece.addImage(deathNotePieceImage);
    deathNotePiece.lifetime=350;
    deathNotePiece.scale=0.1;
    pieceGroup.add(deathNotePiece);
    
    ryuk.depth=deathNotePiece.depth;
    ryuk.depth++;
    
    
 
  }
}

function spawnFire()
{
  if(frameCount%200===0&&frameCount>0)
  {
    fire=createSprite(200,-50);
    fire.x=Math.round(random(20,380));
    fire.velocityY=4;
    fire.addImage(fireImage);
    fire.lifetime=350;
    fire.scale=0.3;
    fireGroup.add(fire);
    //fire.debug=true;
    fire.setCollider("rectangle",0,0,300,300);
    
    ryuk.depth=fire.depth;
    ryuk.depth++;
    
    
    
  }
}

function controls()
{
  if(keyDown("A"))
  {
    ryuk.x+=-3;
  }
  
  if(keyDown("D"))
  {
    ryuk.x+=3;
  }
  
  if(keyDown("W"))
  {
    ryuk.y+=-3;
  }
  
  if(keyDown("S"))
  {
    ryuk.y+=3;
  }
  
  if((ryuk.x>400||ryuk.x<0)||(ryuk.y>400||ryuk.y<0))
  {
    ryuk.x=200;
    ryuk.y=300;
  }
}

function percentComplete()
{
  switch(score)
  {
    case 12:
      {
        stroke('black');
        fill('blue');
        textSize(10);
        text("My death note is 20% complete,",ryuk.x+15,ryuk.y-60);
        text("I need 16 more pages, heh heh heh",ryuk.x+15,ryuk.y-50);
        break;
      }
    
    case 24:
      {
        stroke('black');
        fill('blue');
        textSize(10);
        text("My death note is 40% complete,",ryuk.x+15,ryuk.y-60);
        text("I need 12 more pages, heh heh heh",ryuk.x+15,ryuk.y-50);
        break;
      }
      
    case 36:
      {
        stroke('black');
        fill('blue');
        textSize(10);
        text("My death note is 60% complete,",ryuk.x+15,ryuk.y-60);
        text("I need 8 more pages, heh heh heh",ryuk.x+15,ryuk.y-50);
        break;
      }
      
    case 48:
      {
        stroke('black');
        fill('blue');
        textSize(10);
        text("My death note is 80% complete,",ryuk.x+15,ryuk.y-60);
        text("I need 4 more pages, heh heh heh",ryuk.x+15,ryuk.y-50);
        break;
      }  
    
    case 60:
      {
        stroke('black');
        fill('blue');
        textSize(10);
        text("My death note is 100% complete!",ryuk.x+15,ryuk.y-              60);
        text("Im bored now so lets restart!",ryuk.x+15,ryuk.y-                50);
        gameState="END";
        break;
      }
  }
}
  function reset()
{
  gameState="PLAY";
  restart.visible=false;
  score=0;
}
