class Food extends Entity {

  constructor(pos, r, b) {
    super(pos, r, b);
    this.color = [50, 255, 50];
  }

  show() {
    strokeWeight(1);
    stroke(0);
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

}
