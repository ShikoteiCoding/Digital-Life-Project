class Entity {

  constructor(pos, r, b) {
    this.pos = pos;
    this.r = r;
    this.energy = 2*r;
    this.board = b;
  }

  die(index) {
    Board.DestroyEntity(this.board, index);
    //delete this.pos;
  }

  show() {
    strokeWeight(1);
    stroke(100, 255, 100, 100);
    fill(100, 255, 100);
    ellipse(this.pos.x, this.pos.y, 2*this.r, 2*this.r);
    stroke('black');
  }
}
