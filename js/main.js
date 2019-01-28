var objWidth;
var objHeight;

var addTime=0;
var mousePressedTime=0;


var handImage={
  hours:null,
  minutes:null,
  secounds:null
};
var clockImage;

function preload(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canv");

  handImage.hours = loadImage("./js/image/hoursLine.png");
  handImage.minutes = loadImage("./js/image/minutesLine.png");
  handImage.seconds = loadImage("./js/image/secondsLine.png");
  clockImage = loadImage("./js/image/clock.png");
}

function setup() {
  frameRate(60);
  noStroke();

  if(windowWidth>800 && windowHeight > 800){
    objWidth=800;
    objHeight=800;
  }else{
    if(windowWidth > windowHeight){
      objWidth = windowHeight;
      objHeight = windowHeight;
    }else{
      objWidth = windowWidth;
      objHeight = windowWidth;
    }
  }
}


function draw(){
  background(200,200,200);

  //時計描画
  fill(255,255,255);
  image(clockImage,(windowWidth-objWidth)/2,(windowHeight-objHeight)/2,objWidth,objHeight);

  //画面長押しで時を加速させる
  if (mouseIsPressed){
    mousePressedTime++;
    if(mousePressedTime>60){
      addTime++;
    }
  }else{
    mousePressedTime=0;
  }

  //針描画
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes() + addTime;
  var seconds = now.getSeconds();
  var milliSeconds = now.getMilliseconds();

  while(minutes>=60){
    hours++;
    minutes-=60;
  }
  hours = hours%24;

  //時針表示
  drawHand(handImage.hours,(hours+minutes/60)*30);
  //分針表示
  drawHand(handImage.minutes,(minutes+seconds/60)*6);
  //秒針表示
  //console.log((seconds+milliSeconds/1000)*6);
  drawHand(handImage.seconds,(seconds+milliSeconds/1000)*6);
}

/**
 * 針を描画する
 **/
function drawHand(img,deg){

  push();
  //回転の中心をキャンバスの中心にする
  translate( windowWidth/2, windowHeight/2 );
  //角度を算出
  rotate(radians( deg ));
  //画像描画点を画像の中心にする
  imageMode(CENTER);
  //画像を描画
  image( img, 0, 0,objWidth,objHeight );
  //画像描画点をデフォルトの設定に戻す
  imageMode(CORNER);
  pop();
}


//ウィンドウリサイズイベント
var timer = false;
$(window).resize(function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        console.log('resized');
        //キャンバス再描画
        resizeCanvas(windowWidth, windowHeight);
        setup();
    }, 200);
});
