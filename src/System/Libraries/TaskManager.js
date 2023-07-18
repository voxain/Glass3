import { System } from "../OS.js";

export default class TaskManager {
    static #RunningTasks = [];
    static RunTask(t){
        this.#RunningTasks.push(t);
        return this.#RunningTasks.length;
    }
    static RunApp(a){
        this.RunTask(new Task(a));
    }
}

export class Task {
    #ID;                // Automatically assigned Task ID (PID)
    App;                // The app that is running
    constructor(a){
        this.App = a;
        this.#ID = System.GenerateUID();
    }
    getID(){
        return this.#ID;
    }
}