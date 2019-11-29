import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class Plugin {

    static extensionDir = "/home/duoyi/下载/vscode";
    static extensionExt = ".vsix";

    public static GetExtensionList() {
        let list1 = vscode.extensions.all;
        let list2 = list1.filter(ext => !ext.packageJSON.isBuiltin);
        return list2;
    }

    public static async ShowInstallBox() {
        let info: vscode.InputBoxOptions = {
            prompt: "输入扩展名",
            placeHolder: "搜索扩展"
        };
        await vscode.window.showInputBox(info).then(input => {
            if (input) { Plugin.ShowExtensionPick(input); }
        });
    }


    public static async ShowExtensionPick(name: string) {
        const modules: string[] = [
            "111111111",
            "222222222",
            "33333333",
            "44444444",
            "55555555",
            "66666666"
        ];
        vscode.window.showQuickPick(modules, {
            placeHolder: '选择插件',
        }).then((moduleName) => {
            console.log(moduleName);
        });
    }


    public static async SearchExtension() {
        let subfiles = fs.readdirSync(Plugin.extensionDir);
        const modules: string[] = [];
        subfiles.forEach(file => {
            let ext = path.extname(file);
            if (ext === Plugin.extensionExt) {
                let basename = path.basename(file, Plugin.extensionExt);
                modules.push(basename);
            }
        });

        vscode.window.showQuickPick(modules, {
            placeHolder: '选择插件',
        }).then((moduleName) => {
            console.log(moduleName);
        });
    }
}