import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        EditorView: {
            closeTab: By.className('codicon-close')
        }
    }
}