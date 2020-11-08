var background2,backround2Image;
var ryuk, ryukImage;
var deathNotePiece, deathNotePieceImage, pieceGroup;

function preload() 
{
    ryukImage=loadImage("Ryuk.png");
    background2Image=loadImage("DeathNoteBack.png");
    deathNotePieceImage=loadImage("death note piece.jfif");
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
  
  pieceGroup=new Group();
  
}

function draw() {
  background(220);
  
  if(background1.y>1300)
  {
    background1.y=-378.6;
  }
  
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
  
  spawnPiece();
  
  console.log(background1.y);
  drawSprites();
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
 
  }
}