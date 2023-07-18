export default class AppList{
    static #list = [
        "Bulldock",
        "Flexplorer",
        "Settings",
        "Terminal",
        "Texter"
    ]
    static GetList(){
        return this.#list;
    }
}

/*
 * The folder name of an app will have to be put here manually for now.
 * In the future, there will be an integrated webserver which will have this function scan the folders itself.
 */