import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        CustomTreeItem: {
            constructor: (label: string) => By.xpath(`.//div[@role='listitem' and .//span[text()='${label}']]`)
        }
    }
}