import { System } from "/src/System/OS.js";
import App from "../../System/Libraries/AppManager.js";

export function Register(){
    
    System.Registry.RegisterApp(
        new App({
            name: "Settings",
            description: "Glass's Settings manager app",
            mainpage: "main.html",
            index: true,
            starttype: "foreground"
        })
    );
}