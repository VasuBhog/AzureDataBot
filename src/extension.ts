'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/** 
 * The module 'azdata' contains the Azure Data Studio extensibility API
 * This is a complementary set of APIs that add SQL / Data-specific functionality to the app
 * Import the module and reference it with the alias azdata in your code below
*/
import * as azdata from 'azdata';

import * as path from 'path';
import * as fs from 'fs';

/**
 * This method is called when your extension is activated
 * your extension is activated the very first time the command is executed
*/
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
            const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'index.html'));
            panel.webview.html = getWebViewContent();
        })
    );

}

// this method is called when your extension is deactivated
export function deactivate() {
}

function getWebViewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <head>
      <script crossorigin="anonymous" src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>
      <style>
        .ac-pushButton.style-default {
          background-color: "var(--vscode-editor-background)";
          color: "var(--vscode-editor-foreground)";
        }
    
        .ac-pushButton {
          background-color: "var(--vscode-editor-background)";
          color: "var(--vscode-editor-foreground)";
        }
    
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
          color: "var(--vscode-editor-foreground)";
        }
      </style>
    </head>
    
    <body>
      <div id="webchat" role="main"></div>
      <script>
        const adaptiveCardsHostConfig = {
          "hostCapabilities": {
            "capabilities": null
          },
          "choiceSetInputValueSeparator": ",",
          "supportsInteractivity": true,
          "fontTypes": {
            "default": {
              "fontFamily": "Calibri, sans-serif",
              "fontSizes": {
                "small": 12,
                "default": 14,
                "medium": 17,
                "large": 21,
                "extraLarge": 26
              },
              "fontWeights": {
                "lighter": 200,
                "default": 400,
                "bolder": 600
              }
            },
            "monospace": {
              "fontFamily": "'Courier New', Courier, monospace",
              "fontSizes": {
                "small": 12,
                "default": 14,
                "medium": 17,
                "large": 21,
                "extraLarge": 26
              },
              "fontWeights": {
                "lighter": 200,
                "default": 400,
                "bolder": 600
              }
            }
          },
          "spacing": {
            "small": 3,
            "default": 8,
            "medium": 20,
            "large": 30,
            "extraLarge": 40,
            "padding": 10
          },
          "separator": {
            "lineThickness": 1,
            "lineColor": "#EEEEEE"
          },
          "imageSizes": {
            "small": 40,
            "medium": 80,
            "large": 160
          },
          "containerStyles": {
            "default": {
              "foregroundColors": {
                "default": {
                  "default": "var(--vscode-editor-foreground)",
                  "subtle": "#767676",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "dark": {
                  "default": "var(--vscode-editor-foreground)",
                  "subtle": "#66000000",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "light": {
                  "default": "var(--vscode-editor-foreground)",
                  "subtle": "#33000000",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "accent": {
                  "default": "var(--vscode-editor-foreground)",
                  "subtle": "#0063B1",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "good": {
                  "default": "var(--vscode-editor-foreground)",
                  "subtle": "#DD54a254",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "warning": {
                  "default": "var(--vscode-editor-foreground)",
                  "subtle": "#DDc3ab23",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "attention": {
                  "default": "var(--vscode-editor-foreground)",
                  "subtle": "#DDFF0000",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                }
              },
              "backgroundColor": "var(--vscode-editor-background)"
            },
            "emphasis": {
              "foregroundColors": {
                "default": {
                  "default": "var(--vscode-editor-foreground)",
                  "subtle": "#767676",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "dark": {
                  "default": "#000000",
                  "subtle": "#66000000",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "light": {
                  "default": "#FFFFFF",
                  "subtle": "#33000000",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "accent": {
                  "default": "#2E89FC",
                  "subtle": "#882E89FC",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "good": {
                  "default": "#54a254",
                  "subtle": "#DD54a254",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "warning": {
                  "default": "#c3ab23",
                  "subtle": "#DDc3ab23",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                },
                "attention": {
                  "default": "#FF0000",
                  "subtle": "#DDFF0000",
                  "highlightColors": {
                    "default": "#22000000",
                    "subtle": "#11000000"
                  }
                }
              },
              "backgroundColor": "var(--vscode-editor-background)"
            }
          },
          "actions": {
            "maxActions": 100,
            "spacing": "Default",
            "buttonSpacing": 8,
            "showCard": {
              "actionMode": "Inline",
              "inlineTopMargin": 8,
              "style": "default"
            },
            "preExpandSingleShowCardAction": false,
            "actionsOrientation": "vertical",
            "actionAlignment": "Stretch",
            "wrap": true
          },
          "adaptiveCard": {
            "allowCustomStyle": true
          },
          "imageSet": {
            "maxImageHeight": 100
          },
          "media": {
            "allowInlinePlayback": true
          },
          "factSet": {
            "title": {
              "size": "Default",
              "color": "var(--vscode-editor-foreground)",
              "isSubtle": false,
              "weight": "Bolder",
              "wrap": true
            },
            "value": {
              "size": "Default",
              "color": "var(--vscode-editor-foreground)",
              "isSubtle": false,
              "weight": "Default",
              "wrap": true
            },
            "spacing": 8
          },
          "cssClassNamePrefix": null,
          "_legacyFontType": {
            "fontFamily": "Segoe UI,Segoe,Segoe WP,Helvetica Neue,Helvetica,sans-serif",
            "fontSizes": {
              "small": 12,
              "default": 14,
              "medium": 17,
              "large": 21,
              "extraLarge": 26
            },
            "fontWeights": {
              "lighter": 200,
              "default": 400,
              "bolder": 600
            }
          }
        };
    
        let styleSet = createStyleSet({
            backgroundColor: 'rgba(var(--vscode-editor-background), 0.4)',
            bubbleBackground: 'var(--vscode-editor-background)',
            bubbleFromUserBackground: 'rgba(var(--vscode-editor-background), 0.4)',
            bubbleFromUserTextColor: 'var(--vscode-editor-foreground)',
            bubbleTextColor: 'var(--vscode-editor-foreground)',
            sendBoxBackground: 'rgba(var(--vscode-editor-background), 0.8)',
            sendBoxTextColor: 'var(--vscode-editor-foreground)',
            suggestedActionBackground: 'rgba(var(--vscode-editor-background), 0.4)',
            suggestedActionTextColor: 'var(--vscode-editor-foreground)',
        });
    
        styleSet = {
          ...styleSet,
          adaptiveCardRenderer: {
            ...styleSet.adaptiveCardRenderer,
            '& .ac-pushButton.style-default': { backgroundColor: 'var(--vscode-editor-background)', color: 'var(--vscode-editor-foreground)' },
          }
        }
        var webChatToken;
        const userID = "dl_" + Math.random().toString(36).substr(2, 9);
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
            var obj = JSON.parse(response);
            webChatToken = obj.token;
          }
          window.WebChat.renderWebChat(
            {
              adaptiveCardsHostConfig,
              directLine: window.WebChat.createDirectLine({ token: webChatToken }),
              styleSet
            },
    
            document.getElementById('webchat')
          );
          document.querySelector('#webchat > *').focus();
        };
    
      </script>
    </body>
    
    </html> `;
}