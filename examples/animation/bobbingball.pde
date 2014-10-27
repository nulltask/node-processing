Ball ball;
float angle = 0;
float centerY = 200;
float range = 100;
float speed = 0.2;
 
void setup() {
  size(400, 400);
  frameRate(25);

  initialize();
}
 
void initialize() {
  smooth();
  noStroke();
  background(255);
  ball = new Ball();
  centerY = height/2;
  ball.x = width/2;
  ball.y = centerY;
  ball.radius = 50;
  ball.setFillColor(color(255, 0, 0));
  ball.update();
  
}
 
void draw() {
  background(255);
  ball.y = centerY + sin(angle) * range;
  angle += speed;    
  ball.update();
}
 
////////////////////////////////
 
class Ball extends Sprite {
  float radius;
   
  Ball() {
    super();
  }
   
  void draw() {
    ellipse(0, 0, radius*2, radius*2);
  }
}
 
////////////////////////////////
 
class Sprite {
  float x, y;
  float scaleX, scaleY;
  float width, height;
  float rotation;
  boolean visible;
  color strokeColor;
  color fillColor;
  Boolean isStroke;
  Boolean isFill;
   
  Sprite() {
    x = 0.0;
    y = 0.0;
    scaleX = 1.0;
    scaleY = 1.0;
    rotation = 0.0;
    strokeColor = color(0);
    fillColor = color(0);
    isStroke = false;
    isFill = false;
    visible = true;
  }
   
  void update() {
    if(! visible) return;
    pushMatrix();
    translate(x, y);
    scale(scaleX, scaleY);
    rotate(rotation * PI / 180.0);
    if(isStroke) stroke(strokeColor);
    if(isFill) fill(fillColor);
    draw();
    popMatrix();
  }
   
  void setStrokeColor(color strokeColor) {
    this.strokeColor = strokeColor;
    isStroke = true;
  }
   
  void setFillColor(color fillColor) {
    this.fillColor = fillColor;
    isFill = true;
  }
   
  void draw() {}
}