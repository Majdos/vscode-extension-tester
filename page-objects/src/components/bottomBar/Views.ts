
import { BottomBarPanel, ContentAssist, Workbench } from "../..";
import { TextView, ChannelView } from "./AbstractViews";
import * as clipboard from 'clipboardy';
import { ElementWithContexMenu } from "../ElementWithContextMenu";
import { IDebugConsoleView, IMenu, IOutputView, ITerminalView, Key } from "extension-tester-page-objects";

/**
 * Output view of the bottom panel
 */
export class OutputView extends TextView implements IOutputView {
    constructor(panel: BottomBarPanel = new BottomBarPanel()) {
        super(OutputView.locators.OutputView.constructor, panel);
        this.actionsLabel = OutputView.locators.OutputView.actionsLabel;
    }
}

/**
 * Debug Console view on the bottom panel
 * Most functionality will only be available when a debug session is running
 */
export class DebugConsoleView extends ElementWithContexMenu implements IDebugConsoleView {
    constructor(panel: BottomBarPanel = new BottomBarPanel()) {
        super(DebugConsoleView.locators.DebugConsoleView.constructor, panel);
    }

    /**
     * Get all text from the debug console
     */
    async getText(): Promise<string> {
        const menu = await this.openContextMenu();
        await menu.select('Copy All');
        const text = await clipboard.read();
        await clipboard.write('');
        return text;
    }

    /**
     * Clear the console of all text
     */
    async clearText(): Promise<void> {
        const menu = await this.openContextMenu();
        await menu.select('Clear Console');
    }

    /**
     * Type an expression into the debug console text area
     * @param expression expression in form of a string
     */
    async setExpression(expression: string): Promise<void> {
        const textarea = await this.findElement(DebugConsoleView.locators.BottomBarViews.textArea);
        await textarea.clear();
        await textarea.sendKeys(expression);
    } 

    /**
     * Evaluate an expression:
     *  - if no argument is supplied, evaluate the current expression present in debug console text area
     *  - if a string argument is supplied, replace the current expression with the `expression` argument and evaluate
     * 
     * @param expression expression to evaluate. To use existing contents of the debug console text area instead, don't define this argument
     */
    async evaluateExpression(expression?: string): Promise<void> {
        const textarea = await this.findElement(DebugConsoleView.locators.BottomBarViews.textArea);
        if (expression) {
            await this.setExpression(expression);
        }
        await textarea.sendKeys(Key.ENTER);
    }
    
    /**
     * Create a content assist page object
     * @returns promise resolving to ContentAssist object
     */
    async getContentAssist(): Promise<IMenu> {
        return new ContentAssist(this).wait();
    }
}

/**
 * Terminal view on the bottom panel
 */
export class TerminalView extends ChannelView implements ITerminalView {
    constructor(panel: BottomBarPanel = new BottomBarPanel()) {
        super(TerminalView.locators.TerminalView.constructor, panel);
        this.actionsLabel = TerminalView.locators.TerminalView.actionsLabel;
    }

    /**
     * Execute command in the internal terminal and wait for results
     * @param command text of the command
     * @param timeout optional maximum time to wait for completion in milliseconds, 0 for unlimited
     * @returns Promise resolving when the command is finished
     */
    async executeCommand(command: string, timeout: number = 0): Promise<void> {
        const input = await this.findElement(TerminalView.locators.TerminalView.textArea);

        try {
            await input.clear();
        } catch (err) {
            // try clearing, ignore if not available
        }
        await input.sendKeys(command, Key.ENTER);
        
        let timer = 0;
        let style = await input.getCssValue('left');
        do {
            if (timeout > 0 && timer > timeout) {
                throw new Error(`Timeout of ${timeout}ms exceeded`);
            }
            await new Promise(res => setTimeout(res, 500));
            timer += 500;
            style = await input.getCssValue('left');
        } while(style === '0px')
    }
    
    /**
     * Get all text from the internal terminal
     * Beware, no formatting.
     * @returns Promise resolving to all terminal text
     */
    async getText(): Promise<string> {
        const workbench = new Workbench();
        await workbench.executeCommand('terminal select all');
        await workbench.getDriver().sleep(500);
        await workbench.executeCommand('terminal copy selection');
        await workbench.getDriver().sleep(500);
        const text = clipboard.readSync();
        clipboard.writeSync('');
        return text;
    }

    /**
     * Destroy the currently open terminal
     * @returns Promise resolving when Kill Terminal button is pressed
     */
    async killTerminal(): Promise<void> {
        await new Workbench().executeCommand('terminal: kill the active terminal instance');
    }

    /**
     * Initiate new terminal creation
     * @returns Promise resolving when New Terminal button is pressed
     */
    async newTerminal(): Promise<void> {
        await new Workbench().executeCommand(TerminalView.locators.TerminalView.newCommand);
        const combo = await this.enclosingItem.findElements(ChannelView.locators.BottomBarViews.channelCombo);
        if (combo.length < 1) {
            await this.getDriver().wait(async () => {
                const list = await this.findElements(TerminalView.locators.TerminalView.tabList);
                return list.length > 0;
            }, 5000);
        }
    }

    async getCurrentChannel(): Promise<string> {
        const combo = await this.enclosingItem.findElements(ChannelView.locators.BottomBarViews.channelCombo);
        if (combo.length > 0) {
            return super.getCurrentChannel();
        }
        const singleTerm = await this.enclosingItem.findElements(TerminalView.locators.TerminalView.singleTab);
        if (singleTerm.length > 0) {
            return singleTerm[0].getText();
        }
        const list = await this.findElement(TerminalView.locators.TerminalView.tabList);
        const row = await list.findElement(TerminalView.locators.TerminalView.selectedRow);
        const label = (await row.getAttribute('aria-label')).split(' ');

        return `${label[1]}: ${label[2]}`
    }

    async selectChannel(name: string): Promise<void> {
        const combo = await this.enclosingItem.findElements(ChannelView.locators.BottomBarViews.channelCombo);
        if (combo.length > 0) {
            return super.selectChannel(name);
        }
        const singleTerm = await this.enclosingItem.findElements(TerminalView.locators.TerminalView.singleTab);
        if (singleTerm.length > 0) {
            return;
        }

        const matches = name.match(/.*(\d+).?\s.*/);
        if (matches === null || !matches[1]) {
            throw new Error(`Channel ${name} not found`);
        }
        const channelNumber = matches[1];        

        const list = await this.findElement(TerminalView.locators.TerminalView.tabList);
        const rows = await list.findElements(TerminalView.locators.TerminalView.row);

        for (const row of rows) {
            const label = await row.getAttribute('aria-label');
            if (label.includes(channelNumber)) {
                await row.click();
                return;
            }
        }
        throw new Error(`Channel ${name} not found`);
    }
}