const fs = require('fs')

const determineProjectType = () => {
    const files = fs.readdirSync('.')
    if (files.includes('pom.xml')) return 'JVM_MAVEN'
    if (files.includes('build.gradle')) return 'JVM_GRADLE'
    if (files.includes('build.gradle.kts')) return 'JVM_GRADLE'
    if (files.includes('package.json')) return 'NODEJS'
    return 'UNKNOWN'
}

module.exports = {
    determineProjectType
}