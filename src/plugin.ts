import * as vscode from 'vscode';


export class ExtensionMetadata {
    constructor(
        public galleryApiUrl: string,
        public id: string,
        public downloadUrl: string,
        public publisherId: string,
        public publisherDisplayName: string,
        public date: string
    ) { }
}

export class ExtensionInformation {
    constructor(
        public metadata: ExtensionMetadata,
        public name: string,
        public version: string,
        public publisher: string
    ) { }

    public static fromJSON(text: string) {
        try {
            // TODO: JSON.parse may throw error
            // Throw custom error should be more friendly
            const obj = JSON.parse(text);
            const meta = new ExtensionMetadata(
                obj.meta.galleryApiUrl,
                obj.meta.id,
                obj.meta.downloadUrl,
                obj.meta.publisherId,
                obj.meta.publisherDisplayName,
                obj.meta.date
            );
            const item = new ExtensionInformation(
                meta, obj.name, obj.publisher, obj.version
            );
            return item;
        } catch (err) {
            throw new Error(err);
        }
    }

    public static fromJSONList(text: string) {
        const extList: ExtensionInformation[] = [];
        try {
            // TODO: JSON.parse may throw error
            // Throw custom error should be more friendly
            const list = JSON.parse(text);
            list.forEach((obj: any) => {
                const meta = new ExtensionMetadata(
                    obj.metadata.galleryApiUrl,
                    obj.metadata.id,
                    obj.metadata.downloadUrl,
                    obj.metadata.publisherId,
                    obj.metadata.publisherDisplayName,
                    obj.metadata.date
                );
                const item = new ExtensionInformation(meta, obj.name, obj.publisher, obj.version);
                if (item.name !== "code-settings-sync") {
                    extList.push(item);
                }
            });
        } catch (err) {
            throw new Error(err);
        }
        return extList;
    }


}

export class Plugin {
    public static GetExtensionList() {
        let list1 = vscode.extensions.all;
        let list2 = list1.filter(ext => !ext.packageJSON.isBuiltin);
        let listr = list2.map(ext => {
            const meta = ext.packageJSON.__metadata || {
                id: ext.packageJSON.uuid,
                publisherId: ext.id,
                publisherDisplayName: ext.packageJSON.publisher
            };
            const data = new ExtensionMetadata(
                meta.galleryApiUrl,
                meta.id,
                meta.downloadUrl,
                meta.publisherId,
                meta.publisherDisplayName,
                meta.date
            );
            const info = new ExtensionInformation(
                data,
                ext.packageJSON.name,
                ext.packageJSON.publisher,
                ext.packageJSON.version);
            return info;
        });
        let list3 = list1.filter(ext => ext.id === "tabnine.tabnine-vscode");
        let list4 = list1.filter(ext => ext.id === "njpwerner.autodocstring");
        return listr;
    }

    public static GetExtensionList2() {
        let list1 = vscode.extensions.all;
        let list2 = list1.filter(ext => !ext.packageJSON.isBuiltin);
        return list2;
    }
}