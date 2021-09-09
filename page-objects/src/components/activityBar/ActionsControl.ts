import { ActivityBar } from "../..";
import { ElementWithContexMenu } from "../ElementWithContextMenu";
import { IActionsControl, IContextMenu, WebElement } from "extension-tester-page-objects";

/**
 * Page object representing the global action controls on the bottom of the action bar
 */
export class ActionsControl extends ElementWithContexMenu implements IActionsControl {
    constructor(element: WebElement, bar: ActivityBar) {
        super(element, bar);
    }

    /**
     * Open the context menu bound to this global action
     * @returns Promise resolving to ContextMenu object representing the action's menu
     */
    async openActionMenu(): Promise<IContextMenu> {
        return this.openContextMenu();
    }

    /**
     * Returns the title of the associated action
     */
    async getTitle(): Promise<string> {
        return this.getAttribute('aria-label');
    }
}