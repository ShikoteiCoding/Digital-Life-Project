class Egg extends Entity {

  constructor(pos, r, b, dna) {
    super(pos, r, b);
    this.color = [255, 255, 255];

    // genes
    this.dna = {...dna};    // copy because it might be new DNA
    this.frame_existence = frameCount;
  }

  hatchable() {
    let frame = frameCount;
    if (frame > this.frame_existence + this.dna.hatch_time * FPS) return true;
    return false;
  }

  show() {
    strokeWeight(2);
    stroke('black');
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.pos.x, this.pos.y, 2*this.r, 2*this.r);
    ellipse(this.pos.x, this.pos.y, 1, 1);
  }

}
