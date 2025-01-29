import * as path from "node:path";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
	setTimeout(() => {
		vscode.window.showInformationMessage(
			`resourceUri: ${vscode.window.activeTextEditor?.document.uri.toString()}`,
		);
	}, 5000);

	const disposable = vscode.commands.registerCommand(
		"ariakit-solid.openPortDiff",
		(uri: vscode.Uri) => {
			if (!uri || !uri.fsPath) {
				vscode.window.showErrorMessage("No file selected.");
				return;
			}

			const filePath: string = uri.fsPath;
			const workspaceFolder: string | undefined =
				vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
			if (!workspaceFolder) {
				vscode.window.showErrorMessage("No workspace folder found.");
				return;
			}

			const relativePath: string = path.relative(
				path.join(workspaceFolder, "packages/ariakit-solid-core/src"),
				filePath,
			);
			if (relativePath.startsWith("..")) {
				vscode.window.showErrorMessage(
					"File is not inside the required directory.",
				);
				return;
			}

			const leftFilePath: string = path.join(
				workspaceFolder,
				"packages/ariakit-react-core/src",
				relativePath,
			);
			const rightFilePath: string = filePath;

			const leftUri: vscode.Uri = vscode.Uri.file(leftFilePath);
			const rightUri: vscode.Uri = vscode.Uri.file(rightFilePath);

			vscode.commands.executeCommand(
				"vscode.diff",
				leftUri,
				rightUri,
				`Port Diff: ${path.basename(rightFilePath)}`,
			);
		},
	);

	context.subscriptions.push(disposable);

	vscode.commands.registerCommand("ariakit-solid.refresh", () => {
		vscode.commands.executeCommand(
			"workbench.files.action.refreshFilesExplorer",
		);
	});

	vscode.window.onDidChangeActiveTextEditor(
		(editor: vscode.TextEditor | undefined) => {
			if (
				editor?.document.uri.fsPath.includes(
					"/packages/ariakit-solid-core/src/",
				)
			) {
				vscode.commands.executeCommand(
					"setContext",
					"ariakitSolid.showContextOption",
					true,
				);
			} else {
				vscode.commands.executeCommand(
					"setContext",
					"ariakitSolid.showContextOption",
					false,
				);
			}
		},
	);

	vscode.commands.executeCommand(
		"setContext",
		"ariakitSolid.showContextOption",
		false,
	);
}

export function deactivate(): void {}
