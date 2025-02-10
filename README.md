# vscode-ariakit-solid

A VS Code extension to facilitate porting Ariakit React into Ariakit Solid.

## Setup

You'll need [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`).

In Mac, you'll need the `code` command installed in your path ([instructions](https://code.visualstudio.com/docs/setup/mac#_configure-the-path-with-vs-code)).

### Install or update

One-liner that doesn't leave files behind:

```sh
sh -c 'cd /tmp && git clone git@github.com:DaniGuardiola/vscode-ariakit-solid.git && cd vscode-ariakit-solid && bun install && ./install.sh && rm -rf /tmp/vscode-ariakit-solid'
```

Alternatively, install:

1. Clone the repo: `git clone git@github.com:DaniGuardiola/vscode-ariakit-solid.git`
2. Navigate to it: `cd vscode-ariakit-solid`
3. Install deps: `bun install`
4. Install extension: `./install.sh`

Or update:

1. Navigate to the repo: `cd vscode-ariakit-solid`
2. Pull the latest changes: `git pull`
3. Install deps: `bun install`
4. Reinstall extension: `./install.sh`

### Uninstall

```sh
code --uninstall-extension diola.ariakit-solid
```

Or run `./uninstall.sh`. Or use the VS Code interface.

## Usage

### Source files

Right click on a source file inside `packages/ariakit-solid-core/src` and select `Ariakit Solid: open diff`.

### Example files

Right click on an example file inside `examples` with a `.solid.ts` or `.solid.tsx` extension and select `Ariakit Solid: open diff (example)`.

### Commands

You can run the following commands:

- `Port status`: shows the current porting status progress.
- `Test status`: shows the current test status progress.
- `Component deps`: opens a menu to select a component and shows its resolved dependencies.

These can also be run directly from the status bar (hover `Ariakit Solid`).

From an Ariakit Solid file, or a Solid example, you can run:

- `Ariakit Solid: open diff`: opens a diff view comparing the current file with the corresponding Ariakit React file.
- `Ariakit Solid: open diff (example)`: opens a diff view comparing the current file with the corresponding React example file.
