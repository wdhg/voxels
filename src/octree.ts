export interface Node<T> {
  tag: "node";
  children: Octree<T>[];
}

export interface End<T> {
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

export const isNode = <T>(tree: Octree<T>): tree is Node<T> => {
  return (tree as Node<T>).tag === "node";
};

export const isEnd = <T>(tree: Octree<T>): tree is End<T> => {
  return (tree as End<T>).tag === "end";
};

const randomNode = <T>(
  size: number,
  assignment: (x: number) => T
): Octree<T> => {
  const childSize = Math.floor(size / 2);
  const children = Array.from(Array(8).keys()).map(() =>
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
