import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        NotificationsCenter: {
            close: By.className('codicon-close'),
            clear: By.className('codicon-clear-all')
        }
    }
}