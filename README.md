# vscode-akdiff

A VS Code extension to facilitate porting Ariakit React into Ariakit Solid.

## Setup

You'll need [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`).

In Mac, you'll need the `code` command installed in your path ([instructions](https://code.visualstudio.com/docs/setup/mac#_configure-the-path-with-vs-code)).

### Install or update

One-liner that doesn't leave files behind:

```sh
sh -c 'cd /tmp && git clone git@github.com:DaniGuardiola/vscode-akdiff.git && cd vscode-akdiff && bun install && ./install.sh && rm -rf /tmp/vscode-akdiff'
```

Alternatively, install:

1. Clone the repo: `git clone git@github.com:DaniGuardiola/vscode-akdiff.git`
2. Navigate to it: `cd vscode-akdiff`
3. Install deps: `bun install`
4. Install extension: `./install.sh`

Or update:

1. Navigate to the repo: `cd vscode-akdiff`
2. Pull the latest changes: `git pull`
3. Install deps: `bun install`
4. Reinstall extension: `./install.sh`

### Uninstall

```sh
code --uninstall-extension diola.akdiff
```

Or run `./uninstall.sh`. Or use the VS Code interface.

## Usage

### Source files

Right click on a source file inside `packages/ariakit-solid-core/src` and select `Open Ariakit Solid diff`.

### Example files

Right click on an example file inside `examples` with a `.solid.ts` or `.solid.tsx` extension and select `Open Ariakit Example diff`.

### Commands

You can run the following commands:

- `Port status`: shows the current porting status progress.
- `Test status`: shows the current test status progress.

These can also be run directly from the status bar (hover `Ariakit Solid`).
