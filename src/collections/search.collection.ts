import { createCollection, localStorageCollectionOptions } from "@tanstack/react-db";

import { compressedStorage } from "./utils";

export interface CarData {
  make: string;
  model: string;
  year: number | string;
  estimatedValue: number;
  minPrice: number;
  maxPrice: number;
  priceRange: string;
}

export interface SearchItem {
  plate: string;
  kilometers: number;
  success: boolean;
  error?: Error;
  data?: CarData;
  timestamp: number;
}

export const searchCollection = createCollection(
  localStorageCollectionOptions<SearchItem>({
    id: "search",
    storageKey: "search-key",
    storage: compressedStorage,
    getKey: (item) => item.plate,
  }),
);
