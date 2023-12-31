/** 
 * * AppManager
 * 
 * Namespace: System.Registry.Apps
 * 
 * This is a helper script which provides classes for Apps and Services - The system does not have it's own AppManager *yet*, though coming with the App store system, it might need one.
 * The App directory is currently handled by the Registry.
 * 
 * ! See the note in System/OS.js for an important note about App loading.
 */

import { System } from "../OS.js";

export default class App// Collection of available Apps to the system
{      
    #ID;                // Automatically assigned App ID
    Name;               // Name of the application
    Description;        // Short App description
    MainPagePath;       // Path to the main HTML file to be displayed when an app window opens
    MainScriptPath;     // Path to the main JS file to be started when the app is launched
    Index;              // Boolean: If true, app will be displayed in start menu, App list, Dock etc...
    StartType;          // Either "foreground" or "background". Foreground will show an application window on launch, background will only execute the JS.
    AllowMultipleInstcances; // Self-explanatory
    constructor(AppOptions)
    {
        this.#ID = System.GenerateUID();
        this.Name = AppOptions.name; //TODO: update object properties to CamelCase
        this.Description = AppOptions.description;
        this.MainPagePath = AppOptions.mainpage || null;
        this.MainScriptPath = AppOptions.mainscript || null;
        this.Index = AppOptions.index || false;
        this.StartType = AppOptions.starttype || "background"
        this.AllowMultipleInstcances = AppOptions.AllowMultipleInstances || false
    }
    Run()
    {
        System.TaskManager.RunApp(new Task(this));
    }
    /**
     * Returns the App's assigned internal ID
     * @returns {string}
     */
    getID()
    {
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