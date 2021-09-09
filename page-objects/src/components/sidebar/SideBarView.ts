import { AbstractElement } from "../AbstractElement";
import { ViewTitlePart, ViewContent } from "../..";
import { ISideBarView, IViewTitlePart, IViewContent } from "extension-tester-page-objects";

/**
 * Page object for the side bar view
 */
export class SideBarView extends AbstractElement implements ISideBarView {
    constructor() {
        super(SideBarView.locators.SideBarView.constructor, SideBarView.locators.Workbench.constructor);
    }

    /**
     * Get the top part of the open view (contains title and possibly some buttons)
     * @returns ViewTitlePart object
     */
    getTitlePart(): IViewTitlePart {
        return new ViewTitlePart(this);
    }

    /**
     * Get the content part of the open view
     * @returns ViewContent object
     */
    getContent(): IViewContent {
        return new ViewContent(this);
    }
}