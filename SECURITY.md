# Security Guidelines

This document outlines security practices and measures implemented in this project.

## 🔒 Security Measures Implemented

### Pre-commit Security Hooks
- **Sensitive file detection**: Prevents committing `.pem`, `.key`, service account files
- **Secret scanning**: Detects potential hardcoded secrets in code
- **Large file warnings**: Alerts for files >5MB
- **Automatic blocking**: Stops commits with security issues

### Protected File Types
```
✅ Automatically blocked:
- *.pem, *.key, *.p12, *.pfx (certificates/keys)
- *firebase*adminsdk*.json (service accounts)
- .env, .env.* (environment files)
- service-account*.json (auth files)
- *private*key, *secret*, *password* (sensitive files)
```

### Environment Variables
- **Template**: `.env.example` provided for safe reference
- **Protection**: All `.env*` files are gitignored
- **Client vs Server**: Clear separation of public vs private variables

## 🛡️ Security Commands

### Manual Security Checks
```bash
# Run security scan on staged files
npm run security:check

# Scan source code for potential secrets
npm run security:scan

# Test pre-commit hooks without committing
git add . && .husky/pre-commit-security
```

### Firebase Security
```bash
# List Firebase projects (verify access)
firebase projects:list

# Check current authentication
firebase login:ci

# Validate Firebase configuration
firebase use --add
```

## 🚨 What to Do If Secrets Are Exposed

### If you accidentally commit secrets:

1. **Immediate Actions**:
   ```bash
   # Remove from staging
   git reset HEAD <sensitive-file>
   
   # Remove from history (if already committed)
   git filter-branch --index-filter 'git rm --cached --ignore-unmatch <sensitive-file>'
   ```

2. **Rotate Credentials**:
   - Generate new Firebase service account keys
   - Update GitHub secrets with new values
   - Revoke old credentials in Firebase Console

3. **Update Repository**:
   - Add file patterns to `.gitignore`
   - Force push cleaned history (coordinate with team)
   - Document incident and lessons learned

## 🔍 Security Monitoring

### Pre-commit Checks
The security hook automatically scans for:

- **API Keys**: `api_key=`, `apikey=`, `API_KEY=`
- **Passwords**: `password=`, `PASSWORD=`, `pwd=`
- **Tokens**: `token=`, `TOKEN=`, `auth_token=`
- **Firebase**: `firebase_config`, `service_account`
- **AWS Keys**: `AKIA[0-9A-Z]{16}` (AWS Access Keys)
- **Private Keys**: `-----BEGIN PRIVATE KEY-----`

### Regular Security Practices

1. **Weekly**: Run `npm run security:scan` to check for new secrets
2. **Monthly**: Review and rotate Firebase service accounts
3. **Per Release**: Audit dependencies for vulnerabilities
4. **Per Feature**: Review new environment variables

## 📋 Security Checklist

### Before Committing
- [ ] No hardcoded secrets in code
- [ ] Environment variables used for sensitive data
- [ ] No service account files in staging area
- [ ] Pre-commit hooks passing
- [ ] Large files reviewed and approved

### Before Deploying
- [ ] Environment variables configured in deployment
- [ ] Firebase security rules reviewed
- [ ] HTTPS enforced for all endpoints
- [ ] Access permissions follow principle of least privilege

### Regular Maintenance
- [ ] Dependencies updated and scanned
- [ ] Service accounts rotated quarterly
- [ ] Access logs reviewed monthly
- [ ] Security practices documented and shared

## 🔗 Resources

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)

## 🚨 Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Email security concerns to [team-email]
3. Include detailed steps to reproduce
4. Allow time for assessment and fixes before disclosure