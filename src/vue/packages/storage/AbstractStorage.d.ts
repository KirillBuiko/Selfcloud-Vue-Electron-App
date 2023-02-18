import IStorageHandler from "@vue/packages/request/IStorageHandler";
export default abstract class AbstractStorage {
    storageHandler: IStorageHandler;
    protected constructor(storageHandler: IStorageHandler);
}
