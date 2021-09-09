import { TreeItem } from "../../ViewItem";
import { TreeSection } from "../TreeSection";
import { WebElement } from "selenium-webdriver";
import { ICustomTreeItem, ITreeItem } from "extension-tester-page-objects";

/**
 * View item in a custom-made content section (e.g. an extension tree view)
 */
export class CustomTreeItem extends TreeItem implements ICustomTreeItem {
    constructor(element: WebElement, viewPart: TreeSection) {
        super(element, viewPart);
    }

    async getLabel(): Promise<string> {
        return this.findElement(CustomTreeItem.locators.CustomTreeSection.itemLabel).getText();
    }

    async getTooltip(): Promise<string> {
        return this.getAttribute(CustomTreeItem.locators.CustomTreeItem.tooltipAttribute);
    }

    async getDescription(): Promise<string> {
        return this.findElement(CustomTreeItem.locators.CustomTreeItem.description).getText();
    }

    async isExpanded(): Promise<boolean> {
        const attr = await this.getAttribute(CustomTreeItem.locators.CustomTreeItem.expandedAttr);
        return attr === CustomTreeItem.locators.CustomTreeItem.expandedValue;
    }

    async getChildren(): Promise<ITreeItem[]> {
        const rows = await this.getChildItems(CustomTreeItem.locators.DefaultTreeSection.itemRow);
        const items = await Promise.all(rows.map(async row => new CustomTreeItem(row, this.enclosingItem as TreeSection).wait()));
        return items;
    }

    async isExpandable(): Promise<boolean> {
        const attr = await this.getAttribute(CustomTreeItem.locators.CustomTreeItem.expandedAttr);
        return attr !== null;
    }
}