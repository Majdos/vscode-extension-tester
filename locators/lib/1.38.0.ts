import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        EditorView: {
            settingsEditor: By.xpath(`.//div[@data-editor-id='workbench.editor.settings2']`),
            webView: By.xpath(`.//div[@data-editor-id='WebviewEditor']`)
        }
    }
}