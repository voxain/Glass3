export class IconLibrary{
    Name;           // This will be the identifier
    FriendlyName;
    Description;
    Author;
    #Icons = {};
    constructor(lib){
        this.Name = lib.Name;
        this.FriendlyName = lib.FriendlyName;
        this.Description = lib.Description;
        this.Author = lib.Author;
    }
    GetIcons(){
        return this.#Icons;
    }
    GetIcon(name){
        return this.#Icons[name];
    }
    AddIcon(ic){
        this.#Icons[ic.Name] = ic;
        return this;
    }
}

export class Icon{
    Name;           // This will be the identifier
    FriendlyName;
    Description;
    FileURL;
    constructor(ic){
        this.Name = ic.Name;
        this.FriendlyName = ic.FriendlyName;
        this.Description = ic.Description;
        this.FileURL = ic.FileURL;
    }
}

export default {
    GlassIcons: import("./Glass.js")
}