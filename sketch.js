//create an empty array called balls

let median = [];
let obstacle= [];
let d;
let leftmedian = [];
let rightmedian = [];
let z = [151, 181, 229,255];
let died = false;
let score = 0;
let scored= false;
let drip;
let you;
let highScores = [];
let recovered = true;
let goCars = true;

let jeremy;

let crashed = false;


function setup() {

  createCanvas(500, 400);


  d = new Dashes (250,10, 6.5);
  jeremy= new Ball (250, 310, 10);



}




function keyPressed() {   if (keyCode == 32){     location.reload(true);

  died = false;
  crashed = false;


  // recovered = false;


  let counter = frameCount;
  print(counter);

  if (frameCount<=counter+90){
    recovered = false;
  }



}
}


function draw(){


  if (died == false){


    background(z[0],z[1],z[2],z[3]);

    if (frameCount % 25 == 0) {
      let  b = new Dashes(250,10,6.5);
      median.push(b);
      // console.log(median); //print the balls array to the console
    }



    //	draw all the balls in that array
    for (let i = 0; i < median.length; i++) {
      median[i].drawDash();
      median[i].moveDash();

    }

    if (frameCount % 25 == 0) {
      let  b = new Dashes(100,10,6.5);
      leftmedian.push(b);
      //console.log(leftmedian); //print the balls array to the console
    }

    //	draw all the balls in that array
    for (let i = 0; i < median.length; i++) {
      leftmedian[i].drawDash();
      leftmedian[i].moveDash();

    }

    if (frameCount % 25 == 0) {
      let  b = new Dashes(400,10,6.5);
      rightmedian.push(b);
      //  console.log(rightmedian); //print the balls array to the console
    }

    //	draw all the balls in that array
    for (let i = 0; i < median.length; i++) {
      rightmedian[i].drawDash();
      rightmedian[i].moveDash();

    }

    stroke("gray")
    line (167, 0, 167,500)
    line  (334,0, 334, 500)

    // rect(250,250,55,90)
    // fill("black")

    //OBSTACLES
    // every time the framecount is divisible by 200, make a new car and put it into the obstacle group
    if (frameCount % 90 == 0 ) {
      let  c = new cars(random(0,100),-75,9.5);
      obstacle.push(c);
      score = score + 1;
      //   console.log(obstacle);
    }

    if (frameCount % 60 == 0 ) {
      let  c = new cars(random(130,250),-75,9.5);
      obstacle.push(c);
      score = score + 1;
      // console.log(obstacle);
    }

    if (frameCount % 80 == 0 ) {
      let  c = new cars(random(280,480),-75,9.5);
      obstacle.push(c);
      score = score + 1;
      // console.log(obstacle);
    }



    //	draw and move all the crafty cars

    for (let i = 0; i < obstacle.length; i++) {
      obstacle[i].drawCar();
      obstacle[i].movecars();
      obstacle[i].crashleft();
    }


    //

    if (frameCount % 200 == 0) {
      z=[random(255), random(255), random(255), 255];
    }




    d.drawDash();
    d.moveDash();
    jeremy.drawBall();
    jeremy.moveBall();

    textSize(22);
    text('score', 443, 30);
    fill("black");
    textSize(20);
    text(score, 443, 50);
    fill("black");


  }
  else if (died == true){
    background ("random")
    textSize(32);
    text('space to restart', 10, 140);
    fill(62,121,153)
    textSize(40);
    text('Final Score = '+score,10,210)
    fill(54,144,193)
    textSize(43);
    text('AVOID THE OBSTACLE',10,72);
    fill(60,69,73)
    if (scored == false){


      scored = true;
    }



  }
}



class cars{
  constructor(x,y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  drawCar(){
    fill("black");
    rect(this.x, this.y, 75, 85);
    fill("black");
    rect(this.x+10, this.y+20, 55, 55);
  }
  movecars(){

    if(crashed == false){
      this.y = this.y + this.speed;
    }
    else if (crashed == true){
      this.y = this.y;
      died = true;

    }

    //if the ball hits the paddle, change the speed value to negative (send it in the opposite direction)
  }

  crash(){

    // this.x >= jeremy.x-20 && this.x<= jeremy.x+20 &&
    if (this.y+85 >= jeremy.y-20 && this.y+85 <= jeremy.y+20 && jeremy.x >= this.x && jeremy.x<=this.x+75){
      crashed = true;
      fill("black")
      rect(0,0, 500,400);
      print("crashe d!");

    }



  }

  crashleft(){

    // this.x >= jeremy.x-20 && this.x<= jeremy.x+20 &&
    if (jeremy.x+20>=this.x&&jeremy.x-20<= this .x +75 && jeremy.y+20>= this.y&& jeremy.y -20<= this.y+85){
      crashed = true;
      fill("black")
      rect(0,0, 500,400);
      print("crashe d!");
    }




  }







}


class Dashes {

  //every ball needs an x value, a y value, and a speed
  constructor(x,y, speed){
    this.x = x;
    this.y = y;

    this.speed = speed;
  }

  // draw a ball on the screen at x,y
  drawDash(){
    stroke("yellow");
    strokeWeight(8);
    fill("yellow");
    line(this.x,this.y,this.x,this.y+30)
  }

  //update the location of the ball, so it moves across the screen
  moveDash(){
    if(crashed == false){
      this.y = this.y+ this.speed;
    }
    else if (crashed == true){
      this.y = this.y;

    }



    //if the ball hits the paddle, change the speed value to negative (send it in the opposite direction)
  }
}

class Ball {

  constructor(x,y, speed){
    this.x = x;
    this.y = y;

    this.speed = speed;
  }



  drawBall(){

    fill("black")
    noStroke();
    ellipse(this.x, this.y, 40,40);
    line(this.x,this.y,this.x,this.y+30)

    strokeWeight(2)
    stroke("black")
    line(this.x, this.y,250, 400);

  }


  moveBall(){
    if (keyIsDown(LEFT_ARROW) && this.x >= 10) { //if you hold the up arrow, move up by speed
      this.x = this.x - this.speed;
    }

    if (keyIsDown(RIGHT_ARROW) && this.x <= 490) { // if you hold the down arrow, move down by speed
      this.x = this.x+ this.speed;
    }

    if(keyIsDown(UP_ARROW) && this.y>= 10) {
      this.y=this.y-this.speed;

    }

    if(keyIsDown(DOWN_ARROW) && this.y<= 390) {
      this.y=this.y+this.speed;
    }
  }

}
