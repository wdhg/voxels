/*
         4     0
          \    |
       0---\---|-----1                           y
       |\   \  |     |\                          |
       | \     |     | \                         |
       |  \          |  \                        |
       |   2---------|---3                       |
  3 ---|-- |         |  -|---- 1                 |
       4---|---------5   |         x-------------*
        \  |          \  |                        \
         \ |      \    \ |                         \
          \|   |   \    \|                          \
           6---|----\----7                           z
               |     \
               6      2
*/

interface Node<T> {
  tag: "node";
  children: Octree<T>[];
}

interface End<T> {
  tag: "end";
  value: T;
}

export type Octree<T> = Node<T> | End<T>;

const node = <T>(children: Octree<T>[]): Octree<T> => {
  return { tag: "node", children: children };
};

const end = <T>(value: T): Octree<T> => {
  return { tag: "end", value: value };
};

const randomNode = <T>(
  size: number,
  assignment: (x: number) => T
): Octree<T> => {
  const childSize = Math.floor(size / 2);
  const children = Array.from(Array(8).keys()).map((_v, _i, _a) =>
    randomOctree(childSize, assignment)
  );
  return node(children);
};

export const randomOctree = <T>(
  size: number,
  assignment: (x: number) => T
): Octree<T> => {
  if (size === 1) {
    return end(assignment(Math.random()));
  }
  return randomNode(size, assignment);
};
