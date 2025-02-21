import { ActionsControl, ViewControl } from "../..";
import { ElementWithContexMenu } from "../ElementWithContextMenu";
import { IActivityBar, IViewControl, IActionsControl } from "extension-tester-page-objects";

/**
 * Page object representing the left side activity bar in VS Code
 */
export class ActivityBar extends ElementWithContexMenu implements IActivityBar {
    constructor() {
        super(ActivityBar.locators.ActivityBar.constructor, ActivityBar.locators.Workbench.constructor);
    }

    /**
     * Find all view containers displayed in the activity bar
     * @returns Promise resolving to array of ViewControl objects
     */
    async getViewControls(): Promise<IViewControl[]> {
        const views: ViewControl[] = [];
        const viewContainer = await this.findElement(ActivityBar.locators.ActivityBar.viewContainer);
        for(const element of await viewContainer.findElements(ActivityBar.locators.ActivityBar.actionItem)) {
            views.push(await new ViewControl(element, this).wait());
        }
        return views;
    }

    /**
     * Find a view container with a given title
     * @param name title of the view
     * @returns Promise resolving to ViewControl object representing the view selector, undefined if not found
     */
    async getViewControl(name: string): Promise<IViewControl | undefined> {
        const controls = await this.getViewControls();
        const names = await Promise.all(controls.map(async (item) => {
            return item.getTitle();
        }));
        const index = names.findIndex((value) => value.indexOf(name) > -1);
        if (index > -1) {
            return controls[index];
        }
        return undefined;
    }

    /**
     * Find all global action controls displayed on the bottom of the activity bar
     * @returns Promise resolving to array of ActionsControl objects
     */
    async getGlobalActions(): Promise<IActionsControl[]> {
        const actions: ActionsControl[] = [];
        const actionContainer = await this.findElement(ActivityBar.locators.ActivityBar.actionsContainer);
        for(const element of await actionContainer.findElements(ActivityBar.locators.ActivityBar.actionItem)) {
            actions.push(await new ActionsControl(element, this).wait());
        }
        return actions;
    }

    /**
     * Find an action control with a given title
     * @param name title of the global action
     * @returns Promise resolving to ActionsControl object representing the action selector, undefined if not found
     */
    async getGlobalAction(name: string): Promise<IActionsControl | undefined> {
        const actions = await this.getGlobalActions();
        const names = await Promise.all(actions.map(async (item) => {
            return item.getTitle();
        }));
        const index = names.findIndex((value) => value.indexOf(name) > -1);
        if (index > -1) {
            return actions[index];
        }
        return undefined;
    }
}