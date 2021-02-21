const fs = require('fs')
const path = require('path')

const determineProjectType = () => {
    const files = fs.readdirSync('.')
    if (files.includes('pom.xml')) return 'JVM_MAVEN'
    if (files.includes('build.gradle')) return 'JVM_GRADLE'
    if (files.includes('build.gradle.kts')) return 'JVM_GRADLE'
    if (files.includes('package.json')) return 'NODEJS'
    return 'UNKNOWN'
}

const saveFile = (filePath, fileContents) => {
    const dir = filePath.substring(0, filePath.lastIndexOf(path.sep))
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(filePath, fileContents)
}

module.exports = {
    determineProjectType,
    saveFile
}