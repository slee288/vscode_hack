// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
// const { default: fetch } = require('node-fetch');
const { seed, getWebViewContent } = require('./demo.js');
const { spawn } = require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "firstextension" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'firstextension.helloWorld',
    async () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('editor does not exist');
        return;
      }

      const text = editor.document.getText(editor.selection);
      // const seedMessage = seed(text);

      // Open the new python child processor
      const process = spawn('python', [
        __dirname + '/switch_to_pseudo.py',
        text,
      ]);
      process.stdout.on('data', (data) => {
        const view_html = data.toString();
        const panel = vscode.window.createWebviewPanel(
          'pseudocode',
          'Pseudo Code',
          vscode.ViewColumn.Beside,
          {
            // Enable scripts in webview
            enableScripts: true,
          }
        );

        panel.webview.html = getWebViewContent(view_html);
      });
      process.stderr.on('data', (err) => {
        console.log(err.toString());
      });
      // End Open the new python child processor

      // const panel = vscode.window.createWebviewPanel(
      //   'pseudocode',
      //   'Pseudo Code',
      //   vscode.ViewColumn.Beside,
      //   {}
      // );

      // panel.webview.html = getWebViewContent(seedMessage);

      // vscode.window.showInformationMessage(``,);

      // !!! OUR LAST RESORT ---- UNCOMMENT THE LINE BELOW
      // vscode.window.showInformationMessage('Your pseudocode is now available at: https://aristotle-256e4b.webflow.io/');


      //   const response = await fetch(`https://api.datamuse.com/words?ml=${text}`);
      //   const data = await response.json();

      //   const quickPick = vscode.window.createQuickPick();
      //   quickPick.items = data.map((x) => ({ label: x.word }));
      //   quickPick.onDidChangeSelection(([item]) => {
      //     if (item) {
      //       vscode.window.showInformationMessage(item.label);
      //       quickPick.dispose();
      //     }
      //   });
      //   quickPick.onDidHide(() => quickPick.dispose());
      //   quickPick.show();
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate,
};
