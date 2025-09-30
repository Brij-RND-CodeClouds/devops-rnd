# Preview Deployments Guide

This project is configured with automatic preview deployments for pull requests using Firebase Hosting preview channels.

## How Preview Deployments Work

### Automatic Preview Deployments
- **Trigger**: Every pull request to `main` or `develop` branches
- **URL Pattern**: `https://fir-zoo-f1c5c--pr-{PR_NUMBER}-{RANDOM_ID}.web.app`
- **Expiration**: 7 days (automatically cleaned up)
- **Comments**: GitHub bot automatically comments on PR with preview URL

### Deployment Flow
```
PR Created/Updated → CI Tests → Build → Deploy to Preview Channel → Comment with URL
```

## Preview Deployment Features

### ✅ What You Get:
- **Unique URL** for each pull request
- **Automatic cleanup** after 7 days
- **GitHub integration** with status checks
- **Real-time updates** when PR is updated
- **Safe testing** without affecting production

### 🔗 URL Examples:
- **Production**: https://fir-zoo-f1c5c.web.app
- **PR #42**: https://fir-zoo-f1c5c--pr-42-abc123.web.app
- **PR #15**: https://fir-zoo-f1c5c--pr-15-def456.web.app

## Manual Preview Management

### Local Preview Deployment
```bash
# Deploy to a preview channel
npm run deploy:preview

# Deploy to a specific channel
firebase hosting:channel:deploy my-feature --expires 3d

# Deploy to a PR-style channel
npm run deploy:pr pr-123 --expires 7d
```

### Managing Preview Channels
```bash
# List all preview channels
npm run preview:list

# Delete a specific channel
npm run preview:delete pr-123

# Delete expired channels (automatic cleanup)
firebase hosting:channel:delete --expired
```

## GitHub Integration

### PR Comments
When a preview deployment is successful, GitHub will automatically comment:

```
🚀 Preview deployment ready!

✨ Preview: https://fir-zoo-f1c5c--pr-42-abc123.web.app
🔍 Inspect: https://console.firebase.google.com/project/fir-zoo-f1c5c/hosting

Built from commit: abc1234
```

### Status Checks
- ✅ **CI Tests**: Lint, test, build
- ✅ **Preview Deploy**: Preview channel deployment
- 🔄 **Production Deploy**: Only on merge to main

## Workflow Examples

### Creating a Pull Request
1. Create feature branch: `git checkout -b feature/new-component`
2. Make changes and commit
3. Push and create PR: `git push origin feature/new-component`
4. **Automatic**: Preview deployment starts
5. **Result**: Preview URL posted in PR comments

### Updating a Pull Request
1. Make additional changes
2. Commit and push: `git push`
3. **Automatic**: Preview deployment updates
4. **Result**: Same preview URL with updated content

### Merging to Production
1. Merge PR to `main`
2. **Automatic**: Production deployment starts
3. **Result**: Changes live at https://fir-zoo-f1c5c.web.app

## Best Practices

### For Developers
- **Test preview links** before requesting review
- **Share preview URLs** with stakeholders for feedback
- **Check mobile responsiveness** on preview deployments
- **Verify API integrations** work in preview environment

### For Reviewers
- **Always check preview** before approving PR
- **Test all functionality** on preview URL
- **Check for console errors** in preview deployment
- **Verify responsive design** on different devices

## Troubleshooting

### Common Issues

**Preview deployment failed:**
```bash
# Check Firebase CLI version
firebase --version

# Re-authenticate if needed
firebase login

# Check project permissions
firebase projects:list
```

**Preview URL not working:**
- Wait 2-3 minutes for deployment to complete
- Check GitHub Actions logs for errors
- Verify Firebase hosting is enabled

**GitHub comments not appearing:**
- Check `GITHUB_TOKEN` secret is set
- Verify repository permissions for GitHub Actions

### Debug Commands
```bash
# Test local preview deployment
npm run deploy:preview

# Check Firebase hosting status
firebase hosting:sites:list

# View deployment history
firebase hosting:channel:list --limit 10
```

## Configuration Files

- **`.github/workflows/ci.yml`**: GitHub Actions workflow
- **`firebase.json`**: Firebase hosting configuration
- **`.firebaserc`**: Firebase project settings
- **`next.config.ts`**: Next.js export configuration

## Security & Permissions

### Required Secrets
- `FIREBASE_SERVICE_ACCOUNT`: Service account with hosting permissions
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

### Firebase Permissions
The service account needs these roles:
- **Firebase Hosting Admin**
- **Firebase Hosting Viewer**
- **Service Account User**