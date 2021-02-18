const assert = require("assert")
const vscode = require("vscode")
const fs = require("fs")

const fsOps = require("../../src/fsoperations")

suite("Operations that touch the file system", () => {
  vscode.window.showInformationMessage("Start all tests.")

  const projectTypes = {
    "pom.xml": "JVM_MAVEN",
    "build.gradle": "JVM_GRADLE",
    "build.gradle.kts": "JVM_GRADLE"
  }

  test("project types are identified", () => {
    for (const [key, value] of Object.entries(projectTypes)) {
	    vscode.window.showInformationMessage(key)
      createFile(key)
	    assert.strictEqual(value, fsOps.determineProjectType())
      deleteFile(key)
    }
  })
})

const createFile = (filePath) => {
  fs.writeFileSync(filePath, "whatever content")
}

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath)
}
