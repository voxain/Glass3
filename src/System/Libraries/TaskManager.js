/** 
 * * TaskManager
 * 
 * Namespace: System.TaskManager
 * 
 * The TaskManager will keep track of which "Tasks" (Instances of apps) are running, and report this information to apps like the Dock.
 * It will also be responsible for launching and terminating apps.
 */

import { System } from "../OS.js";

export default class TaskManager
{
    static #RunningTasks = [];

    /**
     * Starts a script ("task") that will run in the background
     * @param {Task} t
     * @returns {int}
     */
    static RunTask(t)
    {
        this.#RunningTasks.push(t);
        return this.#RunningTasks.length;
    }

    /**
     * Launches an app and creates a background task for it
     * @param {App} a
     * @returns {null}
     */
    static RunApp(a)
    {
        this.RunTask(new Task(a));
    }
}

export class Task 
{
    #ID;                // Automatically assigned Task ID (PID)
    App;  
                  // The app that is running
    /**
     * Generates a Task Object
     * @param {App} a
     * @returns {null}
     */
    constructor(a)
    {
        this.App = a;
        this.#ID = System.GenerateUID();
    }

    /**
     * Gives back the task's ID
     * @returns {string}
     */
    getID()
    {
        return this.#ID;
    }
}