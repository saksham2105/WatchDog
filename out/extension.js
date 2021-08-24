"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
var path = require("path");
var filePath;
var panel;
function activate(context) {
    const disposable = vscode.commands.registerCommand('test.helloWorld', () => {
        if (panel) {
            panel.dispose();
        }
        panel = vscode.window.createWebviewPanel('liveServer', 'Live Server', vscode.ViewColumn.One, {});
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            console.log("No Active Editor");
            vscode.window.showInformationMessage('No Active Editor Exist');
            return;
        }
        filePath = activeEditor === null || activeEditor === void 0 ? void 0 : activeEditor.document.fileName;
        let currentlyOpenTabfilePath = activeEditor === null || activeEditor === void 0 ? void 0 : activeEditor.document.fileName;
        panel.webview.html = getWebviewContent();
        if (!currentlyOpenTabfilePath) {
            return;
        }
        fs.watchFile(currentlyOpenTabfilePath, (curr, prev) => {
            vscode.window.showInformationMessage('File Changed');
            if (panel) {
                panel.dispose();
            }
            panel = vscode.window.createWebviewPanel('liveServer', 'Live Server', vscode.ViewColumn.One, {});
            panel.webview.html = getWebviewContent();
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function getWebviewContent() {
    let htmlContent = "";
    if (filePath) {
        htmlContent = fs.readFileSync(filePath, 'utf8');
    }
    return htmlContent;
}
function deactivate() {
    //right now,do nothing
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map