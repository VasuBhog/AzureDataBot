'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';

import * as path from 'path';
import * as fs from 'fs';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('AzureDataBot', () => {
            // Create and show a new webview
            const panel = vscode.window.createWebviewPanel(
                'AzureDataBot', // Identifies the type of the webview. Used internally
                'Azure Data Bot', // Title of the panel displayed to the user
                vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
                {
                    enableScripts: true
                } 
            );

            const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'index.html'));

            panel.webview.html = fs.readFileSync(filePath.fsPath, 'utf8');
        })
    );

    context.subscriptions.push(vscode.commands.registerCommand('extension.showCurrentConnection', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        azdata.connection.getCurrentConnection().then(connection => {
            let connectionId = connection ? connection.connectionId : 'No connection found!';
            vscode.window.showInformationMessage(connectionId);
        }, error => {
            console.info(error);
        });
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}