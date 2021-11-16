# Open all IEA data to research

[![Netlify Status](https://api.netlify.com/api/v1/badges/5493721b-5783-461e-a543-2d75048e104b/deploy-status)](https://app.netlify.com/sites/iea-cta/deploys)


This is the source code repository for the campaign website: [https://free-iea-data.com](https://free-iea-data.com)

Inspired by this excellent analysis: https://ourworldindata.org/iea-open-data

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding locale data

Locale data is hosted on a Google sheet to allow for easy collaboration. Running `node getData.js` updates the list
of allowed locales to `locales.json`.

**For private Google sheets:**

1. Provision a [Google service account](https://cloud.google.com/iam/docs/service-accounts)
2. Add the service account's email as a collaborator to the sheet
3. Either provide the service account as a `./service-account.json` file or as a stringified `SERVICE_ACCOUNT` environment variable
4. Provide the `SHEET_ID` as an environment variable

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
