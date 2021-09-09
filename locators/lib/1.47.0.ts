import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        CustomTreeItem: {
            constructor: (label: string) => By.xpath(`.//div[@role='treeitem' and .//span[text()='${label}']]`)
        },
        ScmView: {
            changes: By.xpath(`.//div[@role="treeitem" and .//div/text()="Changes"]`),
            stagedChanges: By.xpath(`.//div[@role="treeitem" and .//div/text()="Staged Changes"]`),
            providerTitle: By.className('name'),
            providerType: By.className('description'),
        }
    }
}