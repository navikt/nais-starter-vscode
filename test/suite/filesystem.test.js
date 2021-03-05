const assert = require("assert")
const vscode = require("vscode")
const fs = require("fs")

const filesystem = require("../../src/filesystem")

suite("Stuff that concerns the local file system", () => {
  vscode.window.showInformationMessage("Start all tests.")

  const projectTypes = {
    "pom.xml": "JVM_MAVEN",
    "build.gradle": "JVM_GRADLE",
    "build.gradle.kts": "JVM_GRADLE",
    "go.mod": "GO_MAKE"
    // No package.json as it will delete the one for this project :)
  }

  test("project types are identified", () => {
    for (const [key, value] of Object.entries(projectTypes)) {
      vscode.window.showInformationMessage(key)
      createFile(key)
      assert.strictEqual(value, filesystem.determineProjectType())
      deleteFile(key)
    }
  })

  test("pick out the last segment of a multi segment path", () => {
    const path = "/my/deep/dir"
    assert.strictEqual('dir', filesystem.lastSegmentOf(path))
  })

  test("pick out the last segment of a single segment path", () => {
    const path = "/dir"
    assert.strictEqual('dir', filesystem.lastSegmentOf(path))
  })

  test("path without separator is left as is", () => {
    const path = "dir_without_separator"
    assert.strictEqual('dir_without_separator', filesystem.lastSegmentOf(path))
  })

  test("paths with '..' are treated as suspicious", () => {
    const path = "/looks/../like/lfi"
    assert.throws(() => filesystem.saveFile(path))
  })
})

const createFile = (filePath) => {
  fs.writeFileSync(filePath, "whatever content")
}

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath)
}
