/** 
 * * AppManager
 * 
 * Namespace: System.GWM
 * 
 * The Glass Window Manager (GWM) takes care of the actual DOM Elements that represent the app windows.
 * It also keeps track of which windows are shown and exposes these so that Apps like Docks can display them.
 * 
 * Each running instance of an app will be an instance of the AppInstance class, which will have instances of the Window class as it's associated windows.
 * This is done so that corresponding windows can be grouped together and have a relationship with their overall parent instance, while still allowing apps to be running multiple instances at the same time.
 */

import Glass from "./Icons/Glass.js";

export default class GWM 
{
    static #Instances = {}
    static Desktop = document.getElementById('windows')        // The desktop DOM element that GWM will be operating upon
    static #WindowTemplate

    static init(){
        fetch("/src/System/Static/WindowTemplates/WindowTemplate.html").then(r => {
            return r.text()
        }).then(tx => {
            this.#WindowTemplate = new DOMParser().parseFromString(tx, 'text/html');
        })
    }

    static GetWindowTemplate(){
        return this.#WindowTemplate;
    }

    static Launch(app, htmlFile)
    /**
     * This method will let apps request launching a new window, optionally with a specific html.
     * It will check if multiple instances are allowed and add it to a currently running instance or create a new one, if not.
     * 
     * If an app intends to have a new window created in a running instance but DOES allow multiple instances, it needs to refer to the AppInstance's AddWindow() instead.
     * Otherwise, this function will create a new instance.
     * 
     * This method should be used primarily by App launchers and docks.
     */
    {
        console.log(new Window({Title: "Dock", Icon: Glass.GetIcon("folder")}))
    }
}

GWM.init();

export class AppInstance
{
    #App                    // The corresponding app that is running the window
    #Windows = {}           // The Instances Child window group
}

export class Window
{
    #Window                 // The actual DOM element referring to the window
    #FrameType              // 'default' | 'none'
    #Title                  // Window Title
    #Icon                   // Window Icon
    #Resizable              // User-Resizable?

    // Runtime parameters
    #isMinimized = false;
    #isMaximized = false;
    #alwaysOnTop = false;

    /**
     * Window Constructor
     * @param {{ Title: ?string, Icon: ?Icon, Frame: ?("default"|"none"), Resizable: boolean }} props
     * @returns {any}
     */
    constructor(props)
    {
        this.#Window = GWM.GetWindowTemplate();

        this.#FrameType = props.Frame || 'default';
        this.SetTitle(props.Title || 'Unnamed Window');
        this.#Icon = props.Icon || Glass.GetIcon('file');
        this.#Resizable = props.Resizable || true;

        this.#Window.getElementById("##ICON##").src = this.#Icon.FileURL

        // TODO: Fetch app's desired window HTML and apply to template
        this.#Window = GWM.Desktop.appendChild(this.#Window.body.childNodes[0]);

        interact(this.#Window).resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },
        
            listeners: {
              move (event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)
        
                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'
        
                // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top
        
                target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
        
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
              }
            },
            modifiers: [
              // keep the edges inside the parent
              interact.modifiers.restrictEdges({
                outer: 'parent'
              }),
        
              // minimum size
              interact.modifiers.restrictSize({
                min: { width: 200, height: 100 }
              })
            ],
        
            inertia: true
          }).draggable({
            allowFrom: '.title',
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
              })
            ],
            // enable autoScroll
            autoScroll: true,
        
            listeners: {
              // call this function on every dragmove event
              move: dragMoveListener,
        
              // call this function on every dragend event
              end (event) {
                var textEl = event.target.querySelector('p')
        
                textEl && (textEl.textContent =
                  'moved a distance of ' +
                  (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                             Math.pow(event.pageY - event.y0, 2) | 0))
                    .toFixed(2) + 'px')
              }
            }
          })
          // TODO: Clean up stolen code from demo page.
    }

    SetTitle(title){
        this.#Title = title;
        this.#Window.getElementById("##TITLE##").innerHTML = title
    }

    Minimize(){
        // TODO
    }

    Maximize(){
        // TODO
    }

    Close(){
        // TODO
        // ! Implement (optional) killing of App instance when last window is closed
    }

    // TODO: Add event emitters for when something is updated, so Docks/other apps can react to title changes etc...
}

function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }