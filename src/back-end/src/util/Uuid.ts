import { v4 } from "uuid";

export const Uuid = {
  generate(): string {
    return v4();
  },
};
