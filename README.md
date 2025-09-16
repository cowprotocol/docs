<p align="center">
   <img alt="Documentation - CoW DAO" width="600" src="./static/img/og-meta-cowprotocol.png">
</p>

# CoW Protocol Documentation

The documentation is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Devcontainer

The easiest way to run this repo, is to open it in a Github Devcontainer from the main github page.

![create a devcontainer](.devcontainer/devcontainer.png)

> [!IMPORTANT]  
> Under options, make sure to select the branch you want to preview (or `main` if you are starting a new PR from scratch).
> If you cannot find the branch, you can also go to the existing PR and launch a codespace directly from there.

Wait for the container to build (this can take some time).
Then either preview the current version, or make a change and then build an updated preview by typing

```bash
yarn serve --build
```

The preview should load in a new tab.

### Installation

This project requires both Yarn and pnpm to be installed:

```bash
# Install pnpm globally (required for external dependencies)
npm install -g pnpm

# Install project dependencies
yarn
```

### Build

You will also need to `build` the app, to ensure external dependent projects are cloned and setup properly. This process requires pnpm to be installed globally.

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

This documentation site is automatically deployed using Vercel. When changes are pushed to the main branch, Vercel automatically builds and deploys the updated documentation.

### Local Development

```bash
yarn serve --build
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.


