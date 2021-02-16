const vscode = require('vscode');


function activate(context) {

	let disposable = vscode.commands.registerCommand('nais-starter.naisStart', function () {
		vscode.window.showInformationMessage('Hello World from nais-starter!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
