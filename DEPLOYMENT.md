# 🚀 GitHub Pages Deployment Guide

This guide explains how to deploy your EscapeXperience React TypeScript Vite project to GitHub Pages.

## 📋 Prerequisites

- GitHub repository with your React project
- GitHub Actions enabled in your repository
- Node.js and npm installed locally for development

## ⚙️ Configuration Overview

### 1. **Vite Configuration** (`vite.config.ts`)
- **Base URL**: Set to `/ProjetReac/` for GitHub Pages
- **Build optimization**: Configured for production deployment
- **Asset handling**: Proper paths for GitHub Pages

### 2. **Package.json Updates**
- **Homepage field**: Points to your GitHub Pages URL
- **Build scripts**: Optimized for deployment

### 3. **Router Configuration** (`src/App.tsx`)
- **Basename**: Dynamically set based on environment
- **Production**: Uses `/ProjetReac` base path
- **Development**: Uses root path `/`

### 4. **GitHub Actions Workflows**
- **CI Workflow** (`.github/workflows/ci-cd.yaml`): Tests and validates code
- **Deploy Workflow** (`.github/workflows/deploy.yml`): Builds and deploys to GitHub Pages

## 🔧 Repository Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### Step 2: Configure Repository Permissions

1. In your repository, go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
3. Click **Save**

### Step 3: Set Up Environment (Optional)

1. Go to **Settings** → **Environments**
2. Click **New environment**
3. Name it `github-pages`
4. Add any protection rules if needed
5. Click **Configure environment**

## 🚀 Deployment Process

### Automatic Deployment

The deployment happens automatically when you:

1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Workflow execution**:
   - ✅ **CI Workflow** runs first (linting, testing, build validation)
   - ✅ **Deploy Workflow** runs after CI passes
   - ✅ **Site deployed** to GitHub Pages

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow**

## 🌐 Accessing Your Deployed Site

After successful deployment, your site will be available at:

**URL**: `https://[your-username].github.io/ProjetReac/`

For example: `https://pes.github.io/ProjetReac/`

### Finding Your URL

1. Go to **Settings** → **Pages**
2. Your site URL will be displayed at the top
3. Click **Visit site** to open your deployed application

## 🔍 Monitoring Deployments

### GitHub Actions Dashboard

1. Go to **Actions** tab in your repository
2. Monitor workflow runs:
   - 🟢 **Green checkmark**: Successful deployment
   - 🔴 **Red X**: Failed deployment
   - 🟡 **Yellow circle**: In progress

### Deployment Status

- **CI Status**: Shows if tests and linting pass
- **Deploy Status**: Shows if build and deployment succeed
- **Pages Status**: Shows if GitHub Pages is serving the site

## 🐛 Troubleshooting

### Common Issues

#### 1. **404 Error on Refresh**
- ✅ **Fixed**: `404.html` and SPA routing configured
- **Cause**: GitHub Pages doesn't handle client-side routing by default

#### 2. **Assets Not Loading**
- ✅ **Fixed**: Base URL configured in `vite.config.ts`
- **Cause**: Incorrect asset paths for GitHub Pages subdirectory

#### 3. **Build Failures**
- **Check**: GitHub Actions logs for specific error messages
- **Common fixes**:
  - Ensure all dependencies are in `package.json`
  - Fix TypeScript errors
  - Resolve linting issues

#### 4. **Tests Failing**
- **Check**: Run `npm run test:run` locally
- **Fix**: Resolve failing tests before pushing

### Debugging Steps

1. **Check Actions logs**:
   - Go to Actions tab
   - Click on failed workflow
   - Review error messages

2. **Test locally**:
   ```bash
   npm run build
   npm run preview
   ```

3. **Verify configuration**:
   - Check `vite.config.ts` base URL
   - Verify `package.json` homepage field
   - Ensure repository name matches config

## 🔄 Workflow Details

### CI Workflow (`.github/workflows/ci-cd.yaml`)
```yaml
Triggers: Push to main, Pull requests
Steps:
1. Checkout code
2. Setup Node.js with npm cache
3. Install dependencies
4. Lint code
5. Run tests
6. Build project (validation)
```

### Deploy Workflow (`.github/workflows/deploy.yml`)
```yaml
Triggers: Push to main, Manual dispatch
Steps:
1. Checkout code
2. Setup Node.js with npm cache
3. Install dependencies
4. Lint code
5. Run tests
6. Build for production
7. Configure GitHub Pages
8. Upload build artifacts
9. Deploy to GitHub Pages
```

## 📊 Performance Optimization

### Build Optimizations
- **Code splitting**: Vendor and router chunks separated
- **Asset optimization**: Images and CSS optimized
- **Source maps**: Disabled for production builds

### Caching Strategy
- **npm cache**: Speeds up dependency installation
- **Build cache**: Reuses unchanged build artifacts

## 🔐 Security Considerations

- **Permissions**: Minimal required permissions set
- **Secrets**: No sensitive data in public repository
- **Environment**: Production environment configured

## 📝 Maintenance

### Regular Updates
- Keep GitHub Actions up to date
- Update Node.js version as needed
- Monitor for security vulnerabilities

### Monitoring
- Check deployment status regularly
- Monitor site performance
- Review GitHub Actions usage

---

## 🎉 Success!

Your EscapeXperience website is now automatically deployed to GitHub Pages! 

Every time you push changes to the main branch, your site will be automatically updated after passing all tests and builds.
