# Community Conserved Areas Mobile

Mobile Application for Community Conserved Areas

## Getting Started

```sh
yarn install              # installing dependencies
npx cap add android       # add android platform
npx cap sync

yarn start                # starts local development server at port 3000
```

### Avoiding CORS while development

```sh
npm i -g local-cors-proxy
lcp --proxyUrl https://api-server.dev
```
