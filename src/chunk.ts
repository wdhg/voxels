import { Octree, randomOctree } from "./octree";
import { Mesh } from "three";

const chunkSize = 16;

export interface Chunk {
  blocks: Octree<boolean>;
  size: number;
}

export const randomChunk = (): Chunk => {
  return {
    blocks: randomOctree(chunkSize, (x) => x > 0.5),
    size: chunkSize,
  };
};
