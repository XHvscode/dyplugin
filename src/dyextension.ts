import * as vscode from 'vscode';

import * as misc from './misc';
import * as plugin from './plugin';

export class DyExtensionsProvider implements vscode.TreeDataProvider<DyExtensionsItem> {

    //当发生改变后进行刷新UI
    private _onDidChangeTreeData: vscode.EventEmitter<DyExtensionsItem | undefined> = new vscode.EventEmitter<DyExtensionsItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<DyExtensionsItem | undefined> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: DyExtensionsItem): vscode.TreeItem {
        return element;
    }

    getChildren(element: DyExtensionsItem): Thenable<DyExtensionsItem[]> {
        let items: DyExtensionsItem[] = [];
        if (element) { return Promise.resolve(items); }
        let pluginlist = plugin.Plugin.GetExtensionList2();
        pluginlist.forEach(oplugin => {
            let name = oplugin.packageJSON.displayName;
            let version = oplugin.packageJSON.version;
            let des = oplugin.packageJSON.description;
            items.push(new DyExtensionsItem(name, vscode.TreeItemCollapsibleState.None, version, des));
        });
        return Promise.resolve(items);
    }
}

export class DyExtensionsItem extends vscode.TreeItem {
    constructor(
        public readonly name: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly version: string,
        public readonly des: string
    ) {
        super(name, collapsibleState);
    }

    get tooltip(): string {
        return this.des;
    }

    get description(): string {
        return this.version;
    }

    iconPath = {
        light: misc.lightRes("dependency.svg"),
        dark: misc.darkRes("dependency.svg")
    };

    contextValue = "DYExtension";
}