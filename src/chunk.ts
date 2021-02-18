import { Octree, randomOctree } from "./octree";

export interface Chunk {
  blocks: Octree;
}

export const randomChunk = (): Chunk => {
  return {
    blocks: randomOctree(16),
  };
};
