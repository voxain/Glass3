import { System } from "../../OS";
import FS from "./FS";
import { FileExtension } from "./FS";

export default function()
{
    FS.RegisterExtension( new FileExtension({
        Type: "file/basic",
        Extension: "",
        FriendlyName: "File"
    }));
    
    FS.RegisterExtension( new FileExtension({
        Type: "text/plain",
        Extension: ".txt",
        FriendlyName: "Text file",
        DefaultAppID: System.Registry.GetAppList().find(a => {
            a.Name == "Texter";
        }).GetID()
    }));
}