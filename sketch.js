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
  createCanvas(windowWidth, windowHeight);

  background1=createSprite(width/2,height/2,width,height);
  background1.addImage(background2Image);
  background1.scale=15;
  background1.velocityY=3;
  
  ryuk=createSprite(width/2,height*0.75,20,20);
  ryuk.addImage(ryukImage);
  ryuk.scale=0.5
  
  restart=createSprite(width/2,height*0.75,20,20);
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
    
    if(background1.y>height*2.6)
    {
      background1.y=height/2;
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
    ryuk.x=width/2;
    ryuk.y=height/2;
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
    deathNotePiece=createSprite(200,height-height-50);
    deathNotePiece.x=Math.round(random(width+50,width-380));
    deathNotePiece.velocityY=4;
    deathNotePiece.addImage(deathNotePieceImage);
    deathNotePiece.lifetime=height/4;
    deathNotePiece.scale=0.1;
    pieceGroup.add(deathNotePiece);
    
    ryuk.depth=deathNotePiece.depth;
    ryuk.depth++;
    
    
 
  }
}

function spawnFire()
{
  if(frameCount%200===0 && frameCount>0)
  {
    fire=createSprite(200,height-height-50);
    fire.x=Math.round(random(width+20,width-380));
    fire.velocityY=6;
    fire.addImage(fireImage);
    fire.lifetime=height/6;
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
    ryuk.x+=-width/200;
  }
  
  if(keyDown("D"))
  {
    ryuk.x+=width/200;
  }
  
  if(keyDown("W"))
  {
    ryuk.y+=-height/200;
  }
  
  if(keyDown("S"))
  {
    ryuk.y+=height/200;
  }
  
  if((ryuk.x>width||ryuk.x<width-width)||(ryuk.y>height||ryuk.y<height-height))
  {
    ryuk.x=width/2;
    ryuk.y=height*0.75;
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
        text("My death note is complete!",ryuk.x+15,ryuk.y-                 60);
        text("Im bored now so lets restart!",ryuk.x+15,ryuk.y-               50);
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
