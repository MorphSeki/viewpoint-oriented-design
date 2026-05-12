console.log("VOD MVP start");
// ===== Viewpoint =====
type Viewpoint<T> = {
  state: T;
  update: (dt: number) => void;
};

// ===== Morphism =====
type Morphism<A, B> = {
  apply: (a: A, b: B) => void;
};

// ===== Carrier =====
type Carrier = {
  id: string;
  buffer: Record<string, any>;
};

// ===== World Runtime =====
class World {
  viewpoints: Record<string, Viewpoint<any>>;
  morphisms: Array<Morphism<any, any>>;
  carriers: Carrier[];

  constructor(
    viewpoints: Record<string, Viewpoint<any>>,
    morphisms: Array<Morphism<any, any>>,
    carriers: Carrier[]
  ) {
    this.viewpoints = viewpoints;
    this.morphisms = morphisms;
    this.carriers = carriers;
  }

  step(dt: number) {
    for (const v of Object.values(this.viewpoints)) v.update(dt);
    for (const m of this.morphisms) {
      for (const c of this.carriers) {
        m.apply(this.viewpoints["physics"].state, c.buffer);
      }
    }
  }
}

// ===== Concrete Viewpoints =====
const physics = (): Viewpoint<{ x: number }> => ({
  state: { x: 0 },
  update(dt) {
    this.state.x += dt;
  }
});

const ui = (): Viewpoint<{ display: number }> => ({
  state: { display: 0 },
  update() {}
});

// ===== Concrete Morphism =====
const physicsToUI = (): Morphism<{ x: number }, any> => ({
  apply(phys, buf) {
    buf.display = phys.x;
  }
});

// ===== Setup World =====
const world = new World(
  { physics: physics(), ui: ui() },
  [physicsToUI()],
  [{ id: "player", buffer: {} }]
);

// ===== Run Simulation =====
for (let i = 0; i < 5; i++) {
  world.step(1);
  console.log(world.carriers[0].buffer);
}
