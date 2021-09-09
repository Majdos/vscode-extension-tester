import { ViewSection } from "../ViewSection";
import { TreeItem } from "../ViewItem";
import { ITreeItem } from "extension-tester-page-objects";

/**
 * Abstract representation of a view section containing a tree
 */
export abstract class TreeSection extends ViewSection {
    async openItem(...path: string[]): Promise<ITreeItem[]> {
        let items: TreeItem[] = [];

        for (let i = 0; i < path.length; i++) {
            const item = await this.findItem(path[i], i + 1);
            if (await item?.hasChildren() && !await item?.isExpanded()) {
                await item?.expand();
            }
        }

        let currentItem = await this.findItem(path[0], 1);
        for (let i = 0; i < path.length; i++) {
            if (!currentItem) {
                if (i === 0) {
                    items = await this.getVisibleItems();
                }
                let names = await Promise.all(items.map(item => item.getLabel()));
                names = names.sort((a, b) => a > b ? 1 : (a < b ? -1 : 0));
                const message = names.length < 1 ? `Current directory is empty.` : `Available items in current directory: [${names.toString()}]`;

                throw new Error(`Item '${path[i]}' not found. ${message}`);
            }
            items = await currentItem.getChildren() as TreeItem[];
            if (items.length < 1) {
                await currentItem.select();
                return items;
            }
            if (i + 1 < path.length) {
                currentItem = undefined;
                for (const item of items) {
                    if (await item.getLabel() === path[i + 1]) {
                        currentItem = item;
                        break;
                    }
                }
            }
        }
        return items;
    }

    abstract findItem(label: string, maxLevel?: number): Promise<TreeItem | undefined>
    abstract getVisibleItems(): Promise<TreeItem[]>
}
