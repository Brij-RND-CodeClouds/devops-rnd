This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This project is configured for automatic deployment to Firebase Hosting via GitHub Actions.

### Firebase Auto Deployment

- **Production**: Pushes to `main` branch trigger deployment after CI passes
- **Preview**: Pull requests automatically get preview deployments
- **Manual**: Use `npm run deploy` for manual deployment
- **Setup**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions

### Available Deployment Scripts

```bash
npm run deploy              # Build and deploy to production
npm run deploy:hosting      # Deploy only hosting (faster)
npm run deploy:preview      # Deploy to preview channel
npm run deploy:pr           # Deploy to PR-style channel
npm run export             # Build static export
npm run preview:list        # List all preview channels
npm run preview:delete      # Delete preview channels
npm run firebase:login     # Login to Firebase CLI
```

### Preview Deployments

Every pull request gets an automatic preview deployment:
- **URL**: `https://fir-zoo-f1c5c--pr-{NUMBER}-{ID}.web.app`
- **Expiry**: 7 days (auto-cleanup)
- **GitHub Integration**: Preview URLs posted as PR comments
- **Guide**: See [PREVIEW_DEPLOYMENTS.md](./PREVIEW_DEPLOYMENTS.md) for details

### Alternative: Deploy on Vercel

You can also deploy to [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
