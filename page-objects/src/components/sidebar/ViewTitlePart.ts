import { ElementWithContexMenu } from "../ElementWithContextMenu";
import { AbstractElement } from "../AbstractElement";
import { SideBarView } from "../..";
import { ITitleActionButton, IViewTitlePart } from "extension-tester-page-objects";

/**
 * Page object representing the top (title) part of a side bar view
 */
export class ViewTitlePart extends ElementWithContexMenu implements IViewTitlePart {
    constructor(view: SideBarView = new SideBarView()) {
        super(ViewTitlePart.locators.ViewTitlePart.constructor, view);
    }

    /**
     * Returns the displayed title of the view
     * @returns Promise resolving to displayed title
     */
    async getTitle(): Promise<string> {
        return await this.findElement(ViewTitlePart.locators.ViewTitlePart.title).getText();
    }

    /**
     * Finds action buttons inside the view title part
     * @returns Promise resolving to array of TitleActionButton objects
     */
    async getActions(): Promise<ITitleActionButton[]> {
        const actions: TitleActionButton[] = [];
        const elements = await this.findElements(ViewTitlePart.locators.ViewTitlePart.action);
        for (const element of elements) {
            const title = await element.getAttribute(ViewTitlePart.locators.ViewTitlePart.actionLabel);
            actions.push(await new TitleActionButton(title, this).wait());
        }
        return actions;
    }

    /**
     * Finds an action button by title
     * @param title title of the button to search for
     * @returns Promise resolving to TitleActionButton object
     */
    async getAction(title: string): Promise<ITitleActionButton> {
        return new TitleActionButton(title, this);
    }
 }

 /**
  * Page object representing a button inside the view title part
  */
 export class TitleActionButton extends AbstractElement implements ITitleActionButton {
    private title: string;

    constructor(title: string, viewTitle: ViewTitlePart) {
        super(TitleActionButton.locators.ViewTitlePart.actionContstructor(title), viewTitle);
        this.title = title;
    }

    /**
     * Get title of the button
     */
    async getTitle(): Promise<string> {
        return this.title;
    }
 }