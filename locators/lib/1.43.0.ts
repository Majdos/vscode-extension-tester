import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        Input: {
            quickPickIndex: (index: number) => By.xpath(`.//div[@role='listitem' and @data-index='${index}']`)
        },
        NotificationsCenter: {
            close: By.className('codicon-chevron-down')
        }
    }
}