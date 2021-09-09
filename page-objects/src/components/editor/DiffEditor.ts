import { Editor } from './Editor';
import { TextEditor } from './TextEditor';
import { EditorView } from './EditorView';
import { IDiffEditor, ITextEditor } from "extension-tester-page-objects";


/**
 * Page object representing a diff editor
 */
export class DiffEditor extends Editor implements IDiffEditor {

    /**
     * Gets the text editor corresponding to the originalside.
     * (The left side of the diff editor)
     * @returns Promise resolving to TextEditor object
     */
    async getOriginalEditor(): Promise<ITextEditor> {
        const element = await this.getEnclosingElement().findElement(DiffEditor.locators.DiffEditor.originalEditor);
        return new TextEditor(new EditorView(), element);
    }

    /**
     * Gets the text editor corresponding to the modified side.
     * (The right side of the diff editor)
     * @returns Promise resolving to TextEditor object
     */
    async getModifiedEditor(): Promise<ITextEditor> {
        const element = await this.getEnclosingElement().findElement(DiffEditor.locators.DiffEditor.modifiedEditor);
        return new TextEditor(new EditorView(), element);
    }
}