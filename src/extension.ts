import * as vscode from 'vscode';
import * as fs from 'fs';
var path = require("path");
var filePath:string;
var panel:vscode.WebviewPanel;
export function activate(context: vscode.ExtensionContext) 
{
	const disposable = vscode.commands.registerCommand('test.helloWorld', () => {
	if(panel)
	{
	   panel.dispose();	
	}
	panel = vscode.window.createWebviewPanel(
	'liveServer',
	'Live Server',
	vscode.ViewColumn.One,
	{});
	const activeEditor=vscode.window.activeTextEditor;
	if(!activeEditor)
	{
		console.log("No Active Editor");
		vscode.window.showInformationMessage('No Active Editor Exist');
		return;
	}
	filePath=activeEditor?.document.fileName;
	let currentlyOpenTabfilePath = activeEditor?.document.fileName;
	panel.webview.html = getWebviewContent();
	if(!currentlyOpenTabfilePath)
	{
	 return;
	}
	fs.watchFile(currentlyOpenTabfilePath,(curr,prev)=>
	{
	 vscode.window.showInformationMessage('File Changed');
	 panel.webview.html = getWebviewContent();
	 let onSuccess=()=>{};
	 let onError=(err:any)=>{
      console.log(err);
	 };
	 });
	});
	context.subscriptions.push(disposable);
}
function getWebviewContent() 
{
    let htmlContent:string="";
	if(filePath)
	{
		htmlContent=fs.readFileSync(filePath, 'utf8');
	}
    return htmlContent;
}
export function deactivate() 
{
	//right now,do nothing
}
