import { System } from "../OS.js";

export default class App {      // Collection of available Apps to the system
    #ID;                // Automatically assigned App ID
    Name;               // Name of the application
    Description;        // Short App description
    MainPagePath;       // Path to the main HTML file to be displayed when an app window opens
    MainScriptPath;     // Path to the main JS file to be started when the app is launched
    Index;              // Boolean: If true, app will be displayed in start menu, App list, Dock etc...
    StartType;          // Either "foreground" or "background". Foreground will show an application window on launch, background will only execute the JS.
    constructor(appoptions){
        this.#ID = System.GenerateUID();
        this.Name = appoptions.name;
        this.Description = appoptions.description;
        this.MainPagePath = appoptions.mainpage || null;
        this.MainScriptPath = appoptions.mainscript || null;
        this.Index = appoptions.index || false;
        this.StartType = appoptions.starttype || "background"
    }
    Run() {
        System.TaskList.RunTask(new Task(this));
    }
    getID(){
        return this.#ID;
    }
}

export class Service extends App { // Will always search for "service.js" in the root directory and run default exported function on start.
    StartupType;        // Like in windows: "automatic", "manual" or "deactivated"
    constructor(appoptions){
        super(appoptions);
        this.StartupType = appoptions.startup;
        if(this.StartType == "automatic"){
            System.TaskManager.RunApp(this);
        }
    }
}