import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        EditorView: {
            settingsEditor: By.className('settings-editor')
        },
        TerminalView: {
            constructor: By.className('integrated-terminal')
        }
    }
}