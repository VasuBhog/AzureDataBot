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
                vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
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
      <script crossorigin="anonymous" src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>
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
        var webChatToken;
        const userID = "dl_"+ Math.random().toString(36).substr(2, 9);
        var body = {
          "user": {
            "id": userID
          }
        };
        var request = new XMLHttpRequest();
        request.open("POST", 'https://directline.botframework.com/v3/directline/tokens/generate', true);
        request.setRequestHeader("Authorization", 'Bearer ' + 'L9N5vQbHbOE.3ktVdAJQasxq_-1s0RoAkndtKnYjSyRya2tB7Q3GpqA');
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader('Accept', 'application/json');
        request.send(JSON.stringify(body));
        request.onreadystatechange = function () {
          if (request.readyState === request.DONE) {
            var response = request.responseText;
            console.log(response);
            var obj = JSON.parse(response);
            webChatToken = obj.token;
          }
          window.WebChat.renderWebChat(
            {
              directLine: window.WebChat.createDirectLine({ token: webChatToken }),
            },
    
            document.getElementById('webchat')
          );
          document.querySelector('#webchat > *').focus();
        };
    
      </script>
    </body>
    
    </html>`;
}