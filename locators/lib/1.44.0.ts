import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        Input: {
            quickPickIndex: (index: number) => By.xpath(`.//div[@role='option' and @data-index='${index}']`)
        }
    }
}