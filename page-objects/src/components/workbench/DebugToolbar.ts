import { until, WebElement } from "extension-tester-page-objects";
import { AbstractElement } from "../AbstractElement";
import { Workbench } from "./Workbench";

/**
 * Page object for the Debugger Toolbar
 */
export class DebugToolbar extends AbstractElement {
    constructor() {
        super(DebugToolbar.locators.DebugToolbar.ctor, new Workbench());
    }

    /**
     * Wait for the debug toolbar to appear and instantiate it.
     * Assumes that debug session is already starting and it is just
     * a matter of waiting for the toolbar to appear.
     * 
     * @param timeout max time to wait in milliseconds, default 5000
     */
    static async create(timeout = 5000): Promise<DebugToolbar> {
        await DebugToolbar.driver.wait(until.elementLocated(DebugToolbar.locators.DebugToolbar.ctor), timeout);
        return new DebugToolbar().wait(timeout);
    }

    /**
     * Wait for the execution to pause at the next breakpoint
     */
    async waitForBreakPoint(): Promise<void> {
        let btn = await this.getDriver().wait(until.elementLocated(DebugToolbar.locators.DebugToolbar.button('continue')));
        await this.getDriver().wait(async () => {
            try {
                const enabled = await btn.isEnabled();
                return enabled;
            } catch(err) {
                btn = await this.findElement(DebugToolbar.locators.DebugToolbar.button('continue'));
            }
        });
    }

    /**
     * Click Continue
     */
    async continue(): Promise<void> {
        await (await this.getButton('continue')).click();
    }

    /**
     * Click Pause
     */
    async pause(): Promise<void> {
        await (await this.getButton('pause')).click();
    }

    /**
     * Click Step Over
     */
    async stepOver(): Promise<void> {
        await (await this.getButton('step-over')).click();
    }

    /**
     * Click Step Into
     */
    async stepInto(): Promise<void> {
        await (await this.getButton('step-into')).click();
    }

    /**
     * Click Step Out
     */
    async stepOut(): Promise<void> {
        await (await this.getButton('step-out')).click();
    }

    /**
     * Click Restart
     */
    async restart(): Promise<void> {
        await (await this.getButton('restart')).click();
    }

    /**
     * Click Stop
     */
    async stop(): Promise<void> {
        await (await this.getButton('stop')).click();
    }

    private async getButton(name: string): Promise<WebElement> {
        return this.findElement(DebugToolbar.locators.DebugToolbar.button(name));
    }
}