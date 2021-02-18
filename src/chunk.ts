import { Octree, randomOctree } from "./octree";

const chunkSize = 16;

export interface Chunk {
  blocks: Octree;
  size: number;
}

export const randomChunk = (): Chunk => {
  return {
    blocks: randomOctree(chunkSize),
    size: chunkSize,
  };
};
