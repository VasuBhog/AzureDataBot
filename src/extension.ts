'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('AzureDataBot', () => {
            // Create and show a new webview
            const panel = vscode.window.createWebviewPanel(
                'AzureDataBot', // Identifies the type of the webview. Used internally
                'Azure Data Bot', // Title of the panel displayed to the user
                vscode.ViewColumn.One, // Editor column to show the new webview panel in.
                {
                    enableScripts: true
                } // Webview options. More on these later.
            );
            panel.webview.html = getWebViewContent();
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

function getWebViewContent() {
    return `<!DOCTYPE html>
    <html>
      <head>
        <script
          crossorigin="anonymous"
          src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"
        ></script>
        <style>
          html,
          body {
             height: 100%;
          }
    
          body {
            margin: 0;
          }
    
          #webchat {
            height: 100%;
            width: 100%;
          }
        </style>
    </head>
   <body>
      <div id="webchat" role="main"></div>
      <script>
         window.WebChat.renderWebChat(
            {
               directLine: window.WebChat.createDirectLine({
                    token: 'ew0KICAiYWxnIjogIlJTMjU2IiwNCiAgImtpZCI6ICJMaXMyNEY4cUFxa2VQeW1ZUk9xVzd3anJKdFEiLA0KICAieDV0IjogIkxpczI0RjhxQXFrZVB5bVlST3FXN3dqckp0USIsDQogICJ0eXAiOiAiSldUIg0KfQ.ew0KICAiYm90IjogIkFEU0NVSXYxIiwNCiAgInNpdGUiOiAiQkF2MVNmWlc1NGsiLA0KICAiY29udiI6ICJDSHpUSkxDSExhVUdrUnExbnVQaXRKLWYiLA0KICAibmJmIjogMTU5NjA2MTIxOCwNCiAgImV4cCI6IDE1OTYwNjQ4MTgsDQogICJpc3MiOiAiaHR0cHM6Ly9kaXJlY3RsaW5lLmJvdGZyYW1ld29yay5jb20vIiwNCiAgImF1ZCI6ICJodHRwczovL2RpcmVjdGxpbmUuYm90ZnJhbWV3b3JrLmNvbS8iDQp9.dcAHW63KqDTOQZJCZNjgsAM1I7ECDfyjT9H2x-rkeHzZTX7woK-EIiSp0ac-iESaBoGot_nIDfSQClrIaxHnOIDuYrn4UgsOa9ynSQwOumRpX2E9CkIAiGFmGPf8h_SaKQVE7enfhsiA65WkM6lBgAinNO30ZJBbokLCZQaY7G6o4u7w_tFPC9FmGSw6AUY7T6QR0F28oSdpvuNpkWsxsq9Lzhxo1_Fs8YrJ3KI8WZtMn0gwqfuhGEh4YHu4B7GkHMRtB_DygWczSupIEg0iyBYOIUYcccUIvEFOrfzBHs1Ch9n_9d2Hs4ciKPpCGOwERn1kwgJyt6X82FYh_qVHcw'
               }),
            },
            document.getElementById('webchat')
         );
      </script>
   </body>
</html>`;
}
