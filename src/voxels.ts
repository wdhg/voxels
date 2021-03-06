import { Vector3 } from "three";

/*
   0-------------1                       y
   |\            |\                      |
   | \           | \                     |
   |  \          |  \                    |
   |   2---------|---3                   |
   |   |         |   |                   |
   4---|---------5   |     x-------------*
    \  |          \  |                    \
     \ |           \ |                     \
      \|            \|                      \
       6-------------7                       z
*/

interface Node {
  tag: "node";
  children: Octree[];
  position: Vector3;
  size: number;
}

interface End {
  tag: "end";
  value: boolean;
  position: Vector3;
  size: number;
}

type Octree = Node | End;

export type Voxels = Octree;

const isNode = (tree: Octree): tree is Node => {
  return (tree as Node).tag === "node";
};

const isEnd = (tree: Octree): tree is End => {
  return (tree as End).tag === "end";
};

const randomEnd = (position: Vector3, size: number): End => {
  return {
    tag: "end",
    value: Math.random() < 0.5,
    position: position,
    size: size,
  };
};

const offsetVector = (o: number): Vector3 =>
  new Vector3(o & 0b001 ? 1 : 0, o & 0b010 ? 1 : 0, o & 0b100 ? 1 : 0);

const randomNode = (position: Vector3, size: number): Node => {
  const childSize = Math.floor(size / 2);
  return {
    tag: "node",
    children: Array.from(Array(8).keys()).map((v, _i, _a) =>
      randomOctree(
        offsetVector(v).multiplyScalar(childSize).add(position),
        childSize
      )
    ),
    position: position,
    size: size,
  };
};

const randomOctree = (position: Vector3, size: number): Octree => {
  if (size === 1 || Math.random() < 1 / size) {
    return randomEnd(position, size);
  }
  return randomNode(position, size);
};

export const generateVoxels = (_seed: number, size: number): Voxels => {
  return randomOctree(new Vector3(0, 0, 0), size);
};

export const forEachVoxel = (
  voxels: Voxels,
  f: (pos: Vector3, size: number) => any
) => {
  if (isEnd(voxels) && voxels.value) {
    console.log("voxel", voxels.position, voxels.size);
    f(voxels.position, voxels.size);
  } else if (isNode(voxels)) {
    voxels.children.forEach((t, _i, _a) => forEachVoxel(t, f));
  }
};
