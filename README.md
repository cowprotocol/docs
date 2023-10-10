![CoW Protocol Logo](/.github/cow.png)

# CoW Protocol Documentation

The documentation is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The website is automatically deployed to GitHub pages when a commit is pushed to the `main` branch.

For additional CI/CD integration, it is possible to dynamically configure docusaurus via environment variables:

- `URL`: The url for the website, such as `https://docs.cow.fi`
- `BASE_URL`: The base URL for the website. This is useful for hosting the website at a subpath, e.g. `/docs/`.
- `TRAILING_SLASH`: Whether to add a trailing slash to generated URLs.
