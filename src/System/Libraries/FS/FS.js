/** 
 * * FileSystem
 * 
 * Namespace: System.FileSystem
 * 
 * The filesystem will be the main keeper of data in the system. While apps will (at least for now) not have their own files in this storage and rather be served by the webserver,
 * it keeps track of user saved files and configuration data that should not be kept in the registry (like App settings).
 * 
 * ! In the future, I plan on making the FileSystem store all files of apps, to make it possible to locally store downloaded apps from the app store.
 *   I don't know what that will look like yet.
 * 
 * The FileSystem has a manager class called FS.
 * It will be the interface for interactions with the "gfs" (glass file system).
 * It has a map of virtual "drives", that can be any size.
 * Any drive as well as folders will have as many children of either the type Directory or File as you want. They will both be stored and outputted from the same Object.
 * 
 * TODO: Provide methods that filter and sort after directories, calculate a file/folder's size etc...
 */

import { System } from "/src/System/OS.js";
import GlassIcons from "../Icons/Glass.js";

export default class FS
{
    static #FileSystem = {}
    static #FileExtensions = {}
    static RegisterExtension(ex)
    {
        if(this.#FileExtensions[ex] != null)
        {
            throw new Error("[GLASS][ERR] This extension is already registered.");
        }
        else
        {
            this.#FileExtensions[ex.GetID()] = ex;
        }
    }
    static CreateDrive(drv)
    {
        this.#FileSystem[drv.getID()] = drv;
    }
}

export class File
{
    #ID;
    Name;
    Location;
    Content;
    Extension;
}

export class Directory
{
    #ID;
    Name;
    #Children;
    Icon;
    constructor(dir)
    {
        this.#ID = System.GenerateUID();
        this.Name = dir.Name || "New Directory";
        this.Children = [];
        this.Icon = dir.Icon || GlassIcons.GetIcon('folder')

        return this;
    }
    GetID()
    {
        return this.#ID;
    }
    Read()
    {
        return this.#Children;
    }
}

export class Drive
{
    #ID;
    Name;
    FileSystem = "gfs";
    Space;
    #RootDirectory = new Directory({
        Name: "Glass"
    });
    constructor(drv)
    {
        this.#ID = System.GenerateUID();
        this.Name = drv.Name || "New Drive";
        this.Space = 536870912 // 512MiB
    }
    GetID()
    {
        return this.#ID;
    }
    Read()
    {
        return this.#RootDirectory;
    }
}

export class FileExtension
{
    #ID;                // Auto-generated ID
    Type;               // The "mime-type" of the extension
    Extension;          // The actual extension (excluding .)
    FriendlyName;       // Brief description (e.g. "MP4 Video file")
    DefaultAppID;       // The ID of the app that can open this file by default, or "none" to ask the user.
    Icon;               // The Icon ID that this file type should be displayed as. 

    constructor(init)
    {
        this.#ID = System.GenerateUID();
        this.Type = init.type;
        this.Extension = init.extension;
        this.FriendlyName = init.name
        this.DefaultAppID = init.defaultapp
        this.Icon = init.Icon || GlassIcons.GetIcon("file")
    }
    GetID()
    {
        return this.#ID;
    }
}

// Generate default file system (Will change in the future)
