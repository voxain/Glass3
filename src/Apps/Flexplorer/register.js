import { System } from "/src/System/OS.js";
import App from "../../System/Libraries/AppManager.js";

export function Register(){
    
    System.Registry.RegisterApp(
        new App({
            name: "Flexplorer",
            description: "A file explorer for Glass³",
            mainpage: "main.html",
            index: true,
            starttype: "foreground"
        })
    );
}