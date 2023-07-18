import AppList from "/src/Apps/AppList.js";
import Libraries from "./Libraries/Icons/Icons.js";
import Registry from "./Libraries/Registry.js";
import TaskManager from "./Libraries/TaskManager.js";
import FS from "./Libraries/FS/FS.js";

class MediaLibrary{
    static Icons =  Libraries;
}

export class System{
    static Registry = Registry;
    static TaskManager = TaskManager;
    static MediaLibrary = MediaLibrary;
    static FileSystem = FS

    static GenerateUID(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

console.log(System.MediaLibrary.Icons)

AppList.GetList().forEach(a => {
    /* 
    * The folder "Apps" will be crawled through and have "register.js" execute for every entry in Apps/AppList.js. Eventually,
    * this file will be obsolete when a web server will dynamically generate a list of existing folders.
    * Apps and sevices will have to register from within this script through System.Registry
    */

    import("/src/Apps/" + a + "/register.js").then(script => {
        script.Register();
    });
    Object.values(System.Registry.GetAppList()).forEach(a => {
        typeof a == Service;
    })
});