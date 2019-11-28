import * as path from 'path';
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

            let itemName: string = oplugin.packageJSON.displayName;
            if (!itemName) { itemName = oplugin.packageJSON.name; }

            let extPath: string = oplugin.extensionPath;
            let iconname: string = oplugin.packageJSON.icon;
            let iconPath: string;
            if (typeof iconname === 'undefined') { iconPath = misc.darkRes("dependency.svg"); }
            else { iconPath = path.join(extPath, iconname); }

            items.push(new DyExtensionsItem(
                itemName,
                vscode.TreeItemCollapsibleState.None,
                oplugin.packageJSON.version,
                oplugin.packageJSON.description,
                iconPath,
                oplugin.id,
                vscode.Uri.parse(oplugin.packageJSON.homepage),
                oplugin.extensionPath
            ));
        });
        return Promise.resolve(items);
    }
}

export class DyExtensionsItem extends vscode.TreeItem {
    constructor(
        public readonly name: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly version: string,
        public readonly des: string,
        public readonly iconPath: string,
        public readonly id: string,
        public readonly resourceUri:vscode.Uri,
        public readonly dir:string
    ) {
        super(name, collapsibleState);
    }

    get tooltip(): string {
        return this.des;
    }

    get description(): string {
        return this.version;
    }

    contextValue = "DYExtension";
}