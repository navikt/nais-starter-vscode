const vscode = require('vscode')
const window = vscode.window

const fs = require('./fsoperations')

const activate = (context) => {
	const startCmd = vscode.commands.registerCommand('nais-starter.naisStart', () => {
		showDialog()
	});
	context.subscriptions.push(startCmd)
}

const deactivate = () => {}

async function showDialog() {
	const team = await window.showInputBox({
		placeholder: "team name",
		prompt: "What is the name of your team?"
	})
	if ((!team) || team.trim().length === 0) return

	const extraFeaturesString = await window.showInputBox({
		value: "idporten,aad,postgres",
		placeholder: "idporten,aad,postgres",
		prompt: "Need any of these extras?"
	})
	const extras = extraFeaturesString && extraFeaturesString.trim().length !== 0 ? 
		extraFeaturesString.split(',').map((feature) => feature.trim()) : [];
	window.showInformationMessage(`Team: ${team}`)
	window.showInformationMessage(`Extras: ${extras}`)
	window.showInformationMessage(fs.determineProjectType())
}

module.exports = {
	activate,
	deactivate
}
