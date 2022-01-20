## Plant tracker frontend

This repository contains frontend for plant tracker app.

## Prerequisites

- [Node](https://nodejs.org/en/) version 16.0.0 installed

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment variables

Add .env.local file in root folder with following values

```
NEXT_PUBLIC_APP_NAME="Plants Tracker"
NEXT_PUBLIC_API_URL="http://backend.growthops.localdomain/api"
NEXT_PUBLIC_AWS_DEFAULT_REGION="<<AWS_DEFAULT_REGION>>"
NEXT_PUBLIC_AWS_BUCKET="<<AWS_BUCKET>>"
NEXT_PUBLIC_AWS_ACCESS_KEY_ID="<<AWS_ACCESS_KEY_ID>>"
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY="<<AWS_SECRET_ACCESS_KEY>>"
NEXT_PUBLIC_AWS_BUCKET_URL="<<AWS_BUCKET_URL>>"
NEXT_PUBLIC_AWS_BUCKET_URL_WITH_HTTPS="<<AWS_BUCKET_URL_WITH_HTTPS>>"
```

## How to run

For prod build:

```bash
npm run build
# or
npm start
```

For dev build:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next.js relevant best practices

- Server-side Rendering - data fetching with getServerSideProps
- Next/router
- Next/link
- Next/image
- Next/head
- Next/error
- TypeScript
- Folder structure
- Responsive design

## Libraries used

- tailwindcss
- @mui/material
- @uiw/react-md-editor
- aws-sdk
- react-hook-form
- @hookform/resolvers
- yup
- axios
- next
- typescript
