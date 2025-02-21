import { LocatorDiff } from "monaco-page-objects";
import { By } from "extension-tester-page-objects";

export const diff: LocatorDiff = {
    locators: {
        TerminalView: {
            newTerminal: By.xpath(`.//a[starts-with(@title, 'Create New Integrated Terminal')]`),
            killTerminal: By.xpath(`.//a[@title='Kill the Active Terminal Instance']`)  
        }
    }
}