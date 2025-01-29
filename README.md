# vscode-akdiff

A VS Code extension to facilitate porting Ariakit React into Ariakit Solid.

## Installation

You'll need [Bun](https://bun.sh/) installed. In Mac, you'll need the `code` command installed in your path ([instructions](https://code.visualstudio.com/docs/setup/mac#_configure-the-path-with-vs-code)).

1. Clone the repo: `git clone git@github.com:DaniGuardiola/vscode-akdiff.git`
2. Navigate to it: `cd vscode-akdiff`
3. Install deps: `bun install`
4. Install extension: `./install.sh`

## Uninstallation

Either run `./uninstall.sh`, execute `code --uninstall-extension diola.akdiff`, or use the VS Code interface.

## Usage

Right click on a source file inside `packages/ariakit-solid-core/src` and select `Open Ariakit Solid diff`.
