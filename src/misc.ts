import * as path from "path";

export function lightRes(filename: string) {
    return path.join(__filename, "..", "..", "resources", "light", filename);
}

export function darkRes(filename: string) {
    return path.join(__filename, "..", "..", "resources", "dark", filename);
}
