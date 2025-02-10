import * as path from "node:path";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
	const disposableSource = vscode.commands.registerCommand(
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

	context.subscriptions.push(disposableSource);

	const disposableExamples = vscode.commands.registerCommand(
		"ariakit-solid.openExampleDiff",
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
				path.join(workspaceFolder, "examples"),
				filePath,
			);
			if (!relativePath.includes(".solid.")) {
				vscode.window.showErrorMessage(
					"File is not a .solid.ts or .solid.tsx file.",
				);
				return;
			}

			const leftFilePath: string = filePath.replace(".solid.", ".react.");
			const rightFilePath: string = filePath;

			const leftUri: vscode.Uri = vscode.Uri.file(leftFilePath);
			const rightUri: vscode.Uri = vscode.Uri.file(rightFilePath);

			vscode.commands.executeCommand(
				"vscode.diff",
				leftUri,
				rightUri,
				`Example Diff: ${path.basename(rightFilePath)}`,
			);
		},
	);

	context.subscriptions.push(disposableExamples);

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
