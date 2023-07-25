import { System } from "/src/System/OS.js";
import Service from "../../System/Libraries/AppManager.js";

export function Register(){
    
    let dock = System.Registry.RegisterApp(
        new Service({
            name: "Bulldock",
            description: "A Taskbar-like Dock for Glass³",
            mainpage: "dock.html",
            index: true,
            starttype: "foreground",
            startup: "automatic"
        })
    );

    System.Registry.RegisterStartup(dock.getID());
}