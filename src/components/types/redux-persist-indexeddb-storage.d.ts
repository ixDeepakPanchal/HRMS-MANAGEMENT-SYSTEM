declare module "redux-persist-indexeddb-storage" {
  import { Storage } from "redux-persist";
  export default function createIndexedDBStorage(
    dbName: string,
    storeName: string
  ): Storage;
}
