const vscode = require('vscode')
const window = vscode.window

const filesystem = require('./filesystem')
const http = require('./http')

const activate = (context) => {
	const startCmd = vscode.commands.registerCommand('nais-starter.naisStart', async () => {
		try {
			const appInfo  = await gatherInfo()
			if (!appInfo) return
			const serverResponse = await http.fetchAppConfig(appInfo)
			writeToDisk(serverResponse)
			vscode.window.showInformationMessage('NAIS config has been written to project directory')
		} catch (error) {
			vscode.window.showErrorMessage(`Something went wrong: ${error}`)
		}
	});
	context.subscriptions.push(startCmd)
}

const deactivate = () => {}

const gatherInfo = async () => {
	const team = await window.showInputBox({
		placeholder: "team name",
		prompt: "What is the name of your team?"
	})
	if (!team) return

	const extraFeaturesString = await window.showInputBox({
		value: "idporten,aad,postgres",
		placeholder: "idporten,aad,postgres",
		prompt: "Need any of these extras?"
	})
	if(!extraFeaturesString) return

	return {
		appName: vscode.workspace.appName || 'myapp', 
		team, 
		platform: filesystem.determineProjectType(), 
		extras: mapToArray(extraFeaturesString)
	}
}

const writeToDisk = (responseData) => {
	Object.keys(responseData).forEach((key) => filesystem.saveFile(key, decode(responseData[key])))
}

const mapToArray = (str) => 
	str ? str.split(',').map((feature) => feature.trim())  : []

const decode = (b64Txt) => Buffer.from(b64Txt, 'base64').toString()

module.exports = {
	activate,
	deactivate
}
