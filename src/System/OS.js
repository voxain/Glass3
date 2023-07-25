/** 
 * * System
 * 
 * Namespace: System
 * 
 * The System "namespace" will contain all the core elements and "Libraries" that can be found in the Libraries folder for easy interaction.
 * It will also have core methods that should be kept the same over the entire system, such as GenerateUID() to make unique IDs for every possible item.
 */

import AppList from "/src/Apps/AppList.js";
import Libraries from "./Libraries/Icons/Icons.js";
import Registry from "./Libraries/Registry.js";
import TaskManager from "./Libraries/TaskManager.js";
import FS from "./Libraries/FS/FS.js";
import GWM from "./Libraries/WindowManager.js";

class MediaLibrary
{
    static Icons =  Libraries;
}

export class System
{
    static Registry = Registry;
    static TaskManager = TaskManager;
    static MediaLibrary = MediaLibrary;
    static FileSystem = FS

    static GenerateUID()
    {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static Initialize()
    {
        //TODO: Run startup apps here
        console.log(Registry.GetStartupList())
        Object.getOwnPropertyNames(Registry.GetStartupList()).forEach(s => {
            GWM.Launch(Registry.GetApp(s));
        });
    }
}

console.log(System.MediaLibrary.Icons)

async function LoadAppsAndInit() {
    for await (let a of AppList.GetList()) {
    /** 
        * * App Registration
        * The folder "Apps" will be crawled through and have "register.js" execute for every entry in Apps/AppList.js. Eventually,
        * this file will be obsolete when a web server will dynamically generate a list of existing folders.
        * Apps and sevices will have to register from within this script through System.Registry
        * 
        * ! For now, you have to add your App's folder name manually in Apps/AppList.js for it to be loaded.
        */

        await import("/src/Apps/" + a + "/register.js").then(script => {
            script.Register();
        });
    };

    System.Initialize();
}

LoadAppsAndInit();