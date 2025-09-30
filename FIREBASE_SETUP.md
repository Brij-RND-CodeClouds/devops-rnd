# Firebase Deployment Setup Guide

This guide will help you set up Firebase auto deployment for your Next.js application.

## Prerequisites

1. A Firebase project
2. Firebase CLI installed globally: `npm install -g firebase-tools`
3. GitHub repository with the project

## Setup Steps

### 1. Firebase Project Configuration

1. **Create a Firebase Project** (if you haven't already):
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enable Firebase Hosting in your project

2. **Update Project ID**:
   - Replace `your-firebase-project-id` in `.firebaserc` with your actual Firebase project ID
   - You can find this in your Firebase Console project settings

### 2. Local Firebase Setup

```bash
# Login to Firebase (run this once)
npm run firebase:login

# Initialize Firebase in your project (if needed)
npm run firebase:init

# Test local deployment
npm run deploy
```

### 3. GitHub Secrets Configuration

For auto deployment to work, you need to add these secrets to your GitHub repository:

1. **Go to GitHub Repository Settings** → Secrets and variables → Actions

2. **Add the following secrets**:

   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_SERVICE_ACCOUNT`: Firebase service account JSON (see below)

3. **Generate Firebase Service Account**:
   ```bash
   # Login to Firebase CLI
   firebase login
   
   # Generate service account key
   firebase projects:list
   firebase serviceaccounts:list --project YOUR_PROJECT_ID
   
   # Or use the Firebase Console:
   # Project Settings → Service Accounts → Generate new private key
   ```

### 4. Available npm Scripts

- `npm run deploy` - Build and deploy to Firebase
- `npm run deploy:hosting` - Deploy only hosting (faster)
- `npm run export` - Build static export for hosting
- `npm run firebase:login` - Login to Firebase CLI
- `npm run firebase:init` - Initialize Firebase project

## How Auto Deployment Works

1. **Trigger**: Pushes to `main` branch trigger deployment
2. **Process**: 
   - Runs CI (lint, test, build)
   - If CI passes, builds static export
   - Deploys to Firebase Hosting
3. **Result**: Your app is live at `https://YOUR_PROJECT_ID.web.app`

## Manual Deployment

If you want to deploy manually:

```bash
# Build and deploy
npm run deploy

# Or just deploy hosting
npm run deploy:hosting
```

## Firebase Configuration Files

- `firebase.json` - Firebase project configuration
- `.firebaserc` - Project aliases and settings
- `next.config.ts` - Next.js export configuration

## Troubleshooting

### Common Issues:

1. **"Project not found"** - Update `.firebaserc` with correct project ID
2. **"Permission denied"** - Check GitHub secrets are correctly set
3. **"Build failed"** - Ensure all tests pass locally first

### Debug Commands:

```bash
# Check Firebase CLI status
firebase --version
firebase projects:list

# Test build locally
npm run export
npm run deploy:hosting
```

## Security Notes

- Never commit service account keys to Git
- Use GitHub secrets for sensitive information
- Regularly rotate service account keys
- Review Firebase security rules