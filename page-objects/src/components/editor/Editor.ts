import { ElementWithContexMenu } from "../ElementWithContextMenu";
import { EditorView, EditorGroup } from "../..";
import { IEditor, IEditorTab, WebElement, Locator } from "extension-tester-page-objects";


/**
 * Abstract representation of an editor tab
 */
export abstract class Editor extends ElementWithContexMenu implements IEditor {

    constructor(view: EditorView | EditorGroup = new EditorView(), base: Locator | WebElement = Editor.locators.Editor.constructor) {
        super(base, view);
    }

    /**
     * Get title/name of the open editor
     */
    async getTitle(): Promise<string> {
        const tab = await this.getTab();
        return tab.getTitle()
    }

    /**
     * Get the corresponding editor tab
     */
    async getTab(): Promise<IEditorTab> {
        const element = this.enclosingItem as EditorView | EditorGroup;
        return element.getActiveTab() as Promise<IEditorTab>;
    }
}