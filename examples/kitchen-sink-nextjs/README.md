## Prerequisites
1. Node via NVM
2. Stackbit CLI `npm install -g @stackbit/cli`


## Getting Started

1. Run `pnpm install` in the root of this repository.
2. Run `pnpm build:packages` in the root of this repository to include the temporary Unified Connector
3. Setup your `.env` with the appropriate credentials

```
CONTENTFUL_ACCESS_TOKEN=THIS_IS_THE_CONTENTFUL_MGMT_TOKEN
CONTENTFUL_SPACE_ID=THIS_IS_THE_CONTENTFUL_SPACE
CONTENTFUL_PREVIEW_TOKEN=THIS_IS_THE_CONTENTFUL_PREVIEW_ACCESS_TOKEN
PORT=THIS_IS_THE_PORT_OF_YOUR_UI_APP
LOCAL_NETLIFY_CONNECT_API_URL="http://localhost:7070/__graphql"
```

4. To run the site _only_ using Connect run `pnpm dev` in the root of the `kitchen-sink-nextjs` folder
5. To run the site with Create and Connect run `pnpm dev:create` in one terminal window. And `stackbit dev` in another terminal window.