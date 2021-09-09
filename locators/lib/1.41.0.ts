import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        ViewSection: {
            header: By.className('pane-header')
        },
        ScmView: {
            providerHeader: By.css(`div[class*='pane-header scm-provider']`)
        }
    }
}