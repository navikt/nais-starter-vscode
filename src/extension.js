const vscode = require('vscode')
const window = vscode.window

const filesystem = require('./filesystem')
const http = require('./http')
const utils = require('./utils')

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
	const projectType = filesystem.determineProjectType()
	if (projectType === 'UNKNOWN'){
		throw('Unable to recognize project type, I only know of Maven, Gradle and Node/NPM projects')
	} 

	const team = await window.showInputBox({
		placeholder: "team name",
		prompt: "What is the name of your team?"
	})
	if (!team) return

	const extraFeaturesString = await window.showInputBox({
		value: "idporten,aad,postgres,elastic,bigquery",
		placeholder: "idporten,aad,postgres,elastic,bigquery",
		prompt: "Need any of these extras?"
	})

	const kafkaTopicString = await window.showInputBox({
		value: "topic1,topic2",
		placeholder: "topic1,topic2",
		prompt: "Need any Kafka topics?"
	})

	return {
		appName: filesystem.lastSegmentOf(process.cwd()) || 'myapp', 
		team, 
		platform: projectType, 
		extras: utils.csvToArray(extraFeaturesString),
		kafkaTopics: utils.csvToArray(kafkaTopicString)
	}
}

const writeToDisk = (responseData) => {
	Object.keys(responseData).forEach((key) => filesystem.saveFile(key, utils.decodeB64(responseData[key])))
}

module.exports = {
	activate,
	deactivate
}
