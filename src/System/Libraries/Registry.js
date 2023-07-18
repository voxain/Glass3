export default class Registry{
    static #AppList = {};
    static RegisterApp = a => {
        this.#AppList[a.getID()] = a;
    }
    static GetAppList = () => {
        return this.#AppList;
    }
}
