import { AbstractElement } from "../AbstractElement";
import { IMenu, IMenuItem } from "extension-tester-page-objects";

/**
 * Abstract element representing a menu
 */
export abstract class Menu extends AbstractElement implements IMenu {
    
    /**
     * Find whether the menu has an item of a given name
     * @param name name of the item to search for
     * @returns true if menu has an item with the given name, false otherwise
     */
    async hasItem(name: string): Promise<boolean> {
        const item = await this.getItem(name);
        return !!item && (item).isDisplayed();
    }

    /**
     * Return a menu item of a given name, undefined if not found
     * @param name name of the item to search for
     */
    abstract getItem(name: string): Promise<IMenuItem | undefined>;

    /**
     * Get all items of a menu
     * @returns array of MenuItem object representing the menu items
     */
    abstract getItems(): Promise<IMenuItem[]>;

    /**
     * Recursively select an item with a given path.
     * 
     * E.g. calling select('File', 'Preferences', 'Settings') will
     * open the 'File' -> 'Preferences' submenus and then click on 'Settings'.
     * 
     * Selection happens in order of the arguments, if one of the items in the middle
     * of the path has no children, the consequent path arguments will be ignored.
     * 
     * 
     * @param path path to the item to select, represented by a sequence of strings
     * @returns void if the last clicked item is a leaf, Menu item representing
     * its submenu otherwise
     */
    async select(...path: string[]): Promise<IMenu | undefined> {
        let parent: IMenu = this;
        for (const label of path) {
			const item = await parent.getItem(label);
            if (!item) return parent;
            await Menu.driver.wait(async function () {
                return await item.isDisplayed() && await item.isEnabled();
            });
            const submenu = await item.select();
            if (submenu) {
                parent = submenu;
            } else {
                return;   
            }
        }
        return parent;
    }
}