/** 
 * * Registry
 * 
 * Namespace: System.Registry
 * 
 * The registry will contain all sorts of system configuration information, such as the list of installed apps for any program to access, or settings.
 * It currently handles the registration of Apps, which will probably change in the future.
 */

export default class Registry
{
    static #AppList = {};
    static #StartupApps = {};

    /**
     * Registers an app in the app directory
     * @param {App} a
     * @returns {null}
     */
    static RegisterApp(a) 
    {
        this.#AppList[a.getID()] = a;
    }

    /**
     * Registers app in startup apps directory
     * @param {string} id
     * @param {boolean} onoff
     * @returns {null}
     */
    static RegisterStartup(id, onoff)
    {
        this.#StartupApps[id] = onoff || true;
    }

    /**
     * Gives back a directory of all registered ("installed") apps.
     * @returns {{}App}
     */
    static GetAppList = () => 
    {
        return this.#AppList;
    }
}
