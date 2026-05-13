// ===== pre-MVP =====

class Viewpoint {
  morphism(_input: number): number {
    return 42;
  }
}

class Carrier {
  buffer: number = 0;
}

export class World {
  vp = new Viewpoint();
  carrier = new Carrier();

  step() {
    const input = 0;

    const output = this.vp.morphism(input);

    this.carrier.buffer = output;

    console.log("buffer:", this.carrier.buffer);
  }
}

const world = new World();
world.step(); // => buffer: 42
