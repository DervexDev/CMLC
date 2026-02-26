const vscode = require("vscode")

const MAX_LENGTH = 72

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("cmlc.count", function () {
      const repositories = vscode.extensions
        .getExtension("vscode.git")
        .exports.getAPI(1).repositories

      if (repositories.length === 0) {
        return
      }

      const length = repositories[0].inputBox.value.length
      const diff = MAX_LENGTH - length
      const absolute = Math.abs(diff)

      let message = diff == 0 ? "no" : String(absolute)
      message += absolute == 1 ? " char" : " chars"
      message += diff < 0 ? " too long" : " left"

      vscode.window.showInformationMessage(
        `Commit message length: ${length} (${message})`
      )
    })
  )
}

module.exports = { activate }
