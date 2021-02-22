const filesystem = require('fs')
const path = require('path')

const determineProjectType = () => {
    const files = filesystem.readdirSync('.')
    if (files.includes('pom.xml')) return 'JVM_MAVEN'
    if (files.includes('build.gradle')) return 'JVM_GRADLE'
    if (files.includes('build.gradle.kts')) return 'JVM_GRADLE'
    if (files.includes('package.json')) return 'NODEJS'
    return 'UNKNOWN'
}

const saveFile = (filePath, fileContents) => {
    const dir = filePath.substring(0, filePath.lastIndexOf(path.sep))
    filesystem.mkdirSync(dir, { recursive: true })
    filesystem.writeFileSync(filePath, fileContents)
}

const lastSegmentOf = (aPath) => {
    const sepIdx = aPath.lastIndexOf(path.sep)
    if (path.sep === -1) return aPath
    return aPath.substring(sepIdx + 1)
}

module.exports = {
    determineProjectType,
    saveFile,
    lastSegmentOf
}