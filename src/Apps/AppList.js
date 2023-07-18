/**
 * * AppList
 * 
 * The folder name of an app that has to be loaded will have to be put here manually for now so that the system can scan available apps on initialization.
 * In the future, there will be an integrated webserver which will have this function scan the folders itself.
 * In the far far future, App files will be stored in the FileSystem and be loaded from there, so that this step becomes even less necessary.
 */
export default class AppList
{
    static #list = [
        "Bulldock",
        "Flexplorer",
        "Settings",
        "Terminal",
        "Texter"
    ]
    static GetList()
    {
        return this.#list;
    }
}