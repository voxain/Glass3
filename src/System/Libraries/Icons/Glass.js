import { IconLibrary, Icon } from "./Icons.js";

// Example for an Icon Library
export default new IconLibrary({
    Name: "Glass3-default",
    FriendlyName: "Glass³ Icons",
    Description: "Default",
    Author: "Voxain"
})

.AddIcon(new Icon({
    Name: "folder",
    FriendlyName: "Folder",
    Description: "An empty folder",
    FileURL: "/"
}))
.AddIcon(new Icon({
    Name: "file",
    FriendlyName: "File",
    Description: "An empty file",
    FileURL: "/"
}))
.AddIcon(new Icon({
    Name: "file-png",
    FriendlyName: "PNG File",
    Description: "A picture",
    FileURL: "/"
}))
.AddIcon(new Icon({
    Name: "file-pdf",
    FriendlyName: "PDF File",
    Description: "A file with a PDF Label",
    FileURL: "/"
}));
