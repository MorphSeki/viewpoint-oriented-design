# Overview of Viewpoint-Oriented Design (VOD)

# 1. What is VOD?
Viewpoint-Oriented Design is a design philosophy that reconstructs the world as a set of independent *local worlds*, each defined by the meaning structure of a particular viewpoint.  
(A local world = a coherent cluster of meanings defined by that viewpoint.)

Even if an object exists in the game world, its **meaning** differs depending on the viewpoint applied to it.

- Physics viewpoint: an entity with position, mass, and velocity  
- AI viewpoint: an entity with position, friend/foe classification, and threat level  
- UI viewpoint: an entity with position and an associated HP bar  

The same object is interpreted differently depending on the viewpoint.  
VOD reconstructs the world per viewpoint and expresses the overall world through  
the transformations (morphisms) and consistency between these viewpoints.

> ※ In this example, it may still look like a simple categorization of properties,  
> but depending on how they are handled, they become full-fledged *local worlds*.  
> The essence of a viewpoint is not “properties” but the **meaning structure of a world**.  
> For details, see “3. What is a Viewpoint?”.

> ※ Objects themselves do not carry meaning.  
> They function merely as *carriers* that hold the composite result of morphisms  
> defined by each viewpoint.  
> For details, see “5. What is a Carrier?”.

---

# 2. Why VOD?

## 2.1 Preventing world-model confusion by strictly separating meaning sources
In traditional designs, when the same name belongs to multiple conceptual worlds, meanings get mixed.  
For example, “apple” could mean a fruit, a company, or a logo.  
Likewise, when multiple viewpoints write meaning into the same object,  
semantic collisions, backflow, and consistency breakdown occur.

This structure is isomorphic to the polysemy problem in AI embeddings.  
Just as multiple meanings packed into a single vector cause confusion,  
multiple viewpoints writing into a single object in OOP cause semantic mixing.

VOD ensures that each meaning is used unambiguously by separating meaning sources into viewpoints,  
and restricting connections between viewpoints to **morphisms** (meaning transformations).  
In the apple example:

- “apple as food”  
- “Apple as a company”  
- “apple as a logo”  

become independent viewpoints,  
and **viewpoints are connected only through their corresponding morphisms**.

Furthermore, since the output target (Carrier) holds no meaning and only stores results,  
**there is no structural possibility for meaning to backflow or mix**.

In this sense, VOD lets AI “skip the training required to resolve ambiguity”  
and start learning directly from *understanding*.

---

## 2.2 1:1 correspondence between world model and implementation
Since viewpoints are separated as meaning sources,  
and relationships between viewpoints are explicitly defined as morphisms,  
the structure of viewpoints directly matches the structure of the world model.

- Viewpoint = local semantic domain of the world  
- Morphism = relationship between worlds  
- Carrier = display surface (a meaning-free container of results)

Thus, the world model and implementation naturally align 1:1,  
localizing specification changes and preventing collapse in large-scale development.

---

## 2.3 One-way output and hollow objects
OOP modularity breaks down because multiple viewpoints write meaning into the same object.  
VOD avoids this by separating meaning into viewpoints,  
restricting viewpoint connections to **one-way morphisms**,  
and ensuring that Carriers hold no meaning and only store results.

Objects (Carriers) function like monitors—  
empty vessels that merely receive output from viewpoints.  
Their only role is to hold an **Identity**,  
which allows viewpoints to determine *which entity* they are applying meaning to.

---

## 2.4 Solving the isomorphic bugs of AI and OOP simultaneously
- AI embedding polysemy  
- OOP semantic collisions  
- World-model confusion  

All of these stem from the same structural bug:  
**“multiple meanings packed into a single container.”**

VOD fixes the meaning source at the viewpoint level,  
eliminating ambiguity structurally and improving both  
AI inference stability and software modularity.

---

# 3. What is a Viewpoint?

**A viewpoint is a local world that extracts part of the global world and defines its meaning uniquely.**  
Unlike OOP, objects do not carry multiple meanings.  
Meaning exists *only* in viewpoints, and viewpoints determine how the world is interpreted.

A viewpoint has three essential properties:

---

## 3.1 A viewpoint is a “source of meaning”

A viewpoint is a world-side mechanism that defines  
**what meaning structure is applied to objects or relations**.

A viewpoint is not owned by any specific object.  
It is a **common schema** applied equally to all objects.

Thus, a viewpoint is the **common foundation**  
for defining a particular aspect (local world) of the global world.

---

### ● A viewpoint does not “hold properties”; it defines “how to interpret a target”

For example:

- Physics viewpoint defines Position, Velocity, Mass  
- UI viewpoint defines Position, DisplayInfo  

Both contain “Position”,  
but these are **different meaning structures**.

---

### ● The “source of meaning” for Position is uniquely determined

In configuration:

- Physics.Position → Source  
- UI.Position → Projection of Physics.Position  

Thus:

- Physics.Position = meaning source  
- UI.Position = projection (after interpretation in UI world)

UI.Position never updates Physics.Position.  
This one-way flow is structurally guaranteed.

---

### ● An object gains a world only when viewpoints are applied to it

Since viewpoints are common schemas,  
they can be applied to NPCs, Players, Projectiles, Cameras, etc.

Once applied:

- Physics meaning  
- UI meaning  

are projected onto the Carrier,  
and the object becomes an entity that “has Physics” and “has UI”.

---

## 3.2 A viewpoint forms a “local world”
A viewpoint is treated as an independent local world that constitutes part of the global world.

- What it observes  
- What it computes  
- What it outputs  

are all self-contained within the viewpoint.

Viewpoints cannot directly reference or modify each other’s internal state.  
All connections must go through **morphisms**.

This ensures:

- No unexpected semantic collisions  
- Independence of worlds  
- Guaranteed one-way output  

and keeps the **meaning source unique**.

---

## 3.3 A viewpoint is an “output process”
A viewpoint behaves like an OS process:

- It runs independently  
- It outputs one-way into the Carrier  
- It communicates with other viewpoints only via morphisms

Allowed flows:

- Viewpoint → Carrier  
- Viewpoint → Viewpoint (via morphism)

Forbidden flows:

- Carrier → Viewpoint  
- Carrier → Carrier  
- Direct Viewpoint → Viewpoint access

This prevents:

- Meaning backflow  
- Cyclic dependencies  
- Module-boundary collapse

---

## 3.4 A viewpoint is the “smallest unit of the world model”
The world model in VOD is composed of viewpoints.

- Viewpoints = local semantic domains  
- Morphisms = relations between domains  
- Carrier = runtime display surface  

Thus, defining a viewpoint is equivalent to defining part of the world model.

The world model always flows **Viewpoint → Carrier**,  
never the reverse.

---

## 3.5 Intuitive understanding of viewpoints

A viewpoint can be understood as:

- **“a way of seeing the world”**  
- **“a coordinate system of meaning”**  
- **“a local OS process”**  
- **“an ambiguity-free local world”**

Adding viewpoints means decomposing the world into finer, more precise semantic layers.

---

# ✔ Summary  
**A viewpoint is a local world with unique meaning,  
the smallest unit of the world model,  
and an independent process that outputs one-way into the Carrier.**

This ensures:

- Unique meaning sources  
- No world-model mixing  
- Hollow, stable Carriers  
- A structurally unbreakable multi-world architecture  

---

# 4. What is a Morphism?

**A morphism is the only legitimate route connecting viewpoints,  
responsible for one-way meaning transformation.**

Viewpoints are independent local worlds;  
they cannot directly access each other.  
All communication must go through morphisms.

---

## 4.1 Roles of a morphism

- **Meaning mapping**  
- **Interpretation between worlds**  
- **Guaranteeing one-way flow (no backflow)**  

---

## 4.2 A morphism is not a copy; it is “meaning reconstruction”

Physics.Position → UI.Position is not a copy.  
It is **reconstruction of meaning in the UI world**.

---

## 4.3 Types of morphisms

- Source → Projection  
- Projection → Projection  

All are one-way.

---

## 4.4 Minimal YAML example
```yaml
Morphism:
  From: Physics.Position
  To:   UI.Position
  Rule: Copy
```

---

# 5. What is a Carrier?

**A Carrier is an empty vessel that only displays the output of viewpoints.**

It holds:

- No meaning  
- No logic  
- Only an Identity  

It prevents semantic mixing and ensures world-model stability.

---

# 6. World Model Structure

The world model consists of:

- Viewpoints  
- Morphisms  
- Carriers  

forming a DAG (Directed Acyclic Graph):

```
[Physics] → [AI] → [UI] → [Animation]
     |         |        |         |
     v         v        v         v
               [Carrier]
```

This guarantees:

- Unique meaning sources  
- No mixing between worlds  
- No backflow  
- Stable multi-world architecture  

---