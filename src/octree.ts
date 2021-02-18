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
}

interface End {
  tag: "end";
}

interface Empty {
  tag: "empty";
}

export type Octree = Node | End | Empty;

const node = (children: Octree[]): Octree => {
  return {
    tag: "node",
    children: children,
  };
};

const end = (): Octree => {
  return { tag: "end" };
};

const empty = (): Octree => {
  return { tag: "empty" };
};

const randomNode = (size: number): Octree => {
  const childSize = Math.floor(size / 2);
  const children = Array.from(Array(8).keys()).map((v, _i, _a) =>
    randomOctree(childSize)
  );
  return node(children);
};

export const randomOctree = (size: number): Octree => {
  if (size === 1) {
    if (Math.random() < 0.5) {
      return end();
    }
    return empty();
  }
  return randomNode(size);
};
