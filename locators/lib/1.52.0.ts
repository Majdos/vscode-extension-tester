import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        DefaultTreeItem: {
            tooltip: By.className('monaco-icon-label-container')
        }
    }
}