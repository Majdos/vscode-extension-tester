import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        EditorView: {
            webView: By.xpath(`.//div[starts-with(@id, 'webview-editor')]`)
        },
        TerminalView: {
            newTerminal: By.xpath(`.//a[@title='New Terminal']`) 
        }
    }
}