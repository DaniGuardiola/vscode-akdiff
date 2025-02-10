import * as fs from "node:fs";
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

			if (
				editor?.document.uri.fsPath.includes(
					"/packages/ariakit-solid-core/src/",
				)
			) {
				vscode.commands.executeCommand(
					"setContext",
					"ariakitSolid.showPortDiff",
					true,
				);
			} else {
				vscode.commands.executeCommand(
					"setContext",
					"ariakitSolid.showPortDiff",
					false,
				);
			}

			if (
				editor?.document.uri.fsPath.includes("/examples/") &&
				editor.document.uri.fsPath.includes(".solid.")
			) {
				vscode.commands.executeCommand(
					"setContext",
					"ariakitSolid.showExampleDiff",
					true,
				);
			} else {
				vscode.commands.executeCommand(
					"setContext",
					"ariakitSolid.showExampleDiff",
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

	vscode.commands.executeCommand(
		"setContext",
		"ariakitSolid.showPortDiff",
		false,
	);

	vscode.commands.executeCommand(
		"setContext",
		"ariakitSolid.showExampleDiff",
		false,
	);

	const workspaceFolder: string | undefined =
		vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	if (
		workspaceFolder &&
		fs.existsSync(path.join(workspaceFolder, "packages/ariakit-core"))
	) {
		const statusBarItem = vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Left,
		);
		statusBarItem.text = "Ariakit Solid";
		statusBarItem.tooltip = new vscode.MarkdownString(
			"[Port status](command:ariakit-solid.portStatus) | [Test status](command:ariakit-solid.testStatus) | [Component deps](command:ariakit-solid.componentDeps)",
		);
		statusBarItem.tooltip.supportHtml = true;
		statusBarItem.tooltip.isTrusted = true;
		statusBarItem.show();
		context.subscriptions.push(statusBarItem);
	}

	const portStatusCommand = vscode.commands.registerCommand(
		"ariakit-solid.portStatus",
		() => {
			const terminal = vscode.window.createTerminal("Port Status");
			terminal.sendText("bun packages/ariakit-solid-core/port-utils/status.ts");
			terminal.show();
		},
	);

	const testStatusCommand = vscode.commands.registerCommand(
		"ariakit-solid.testStatus",
		() => {
			const terminal = vscode.window.createTerminal("Test Status");
			terminal.sendText(
				"bun packages/ariakit-solid-core/port-utils/test-status.ts",
			);
			terminal.show();
		},
	);

	const componentDepsCommand = vscode.commands.registerCommand(
		"ariakit-solid.componentDeps",
		async () => {
			if (!workspaceFolder) return;
			const reactCorePath = path.join(
				workspaceFolder,
				"packages/ariakit-react-core/src",
			);
			const files = fs
				.readdirSync(reactCorePath, { withFileTypes: true })
				.flatMap((dirent) =>
					dirent.isDirectory()
						? fs
								.readdirSync(path.join(reactCorePath, dirent.name))
								.map((file) => `${dirent.name}/${file}`)
						: [dirent.name],
				)
				.filter((file) => file.endsWith(".tsx"))
				.map((file) => file.replace(".tsx", ""));

			const selectedOption = await vscode.window.showQuickPick(files, {
				placeHolder: "Select a component",
			});

			if (selectedOption) {
				const terminal = vscode.window.createTerminal("Component Deps");
				terminal.sendText(
					`bun packages/ariakit-solid-core/port-utils/deps.ts -r ${selectedOption}`,
				);
				terminal.show();
			}
		},
	);

	context.subscriptions.push(
		portStatusCommand,
		testStatusCommand,
		componentDepsCommand,
	);
}

export function deactivate(): void {}
