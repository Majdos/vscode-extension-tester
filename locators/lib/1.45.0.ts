import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        EditorView: {
            tabSeparator: ''
        },
        NotificationsCenter: {
            clear: By.className('codicon-notifications-clear-all'),
            close: By.className('codicon-notifications-hide')
        },
        Notification: {
            dismiss: By.className('codicon-notifications-clear')
        },
        ScmView: {
            more: By.className('codicon-toolbar-more')
        }
    }
}