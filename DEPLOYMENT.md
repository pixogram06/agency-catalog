# GitHub Pages Deployment Guide

## Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/pixogram06/agency-catalog
2. Click **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
5. Click **Save**

## Step 2: Trigger the Workflow

After enabling GitHub Pages, you need to trigger the workflow:

### Option A: Manual Trigger (Recommended for first time)
1. Go to the **Actions** tab in your repository
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button (top right)
4. Select branch: **main**
5. Click **Run workflow**

### Option B: Push a commit
The workflow will automatically run on any push to the `main` branch.

## Step 3: Check Deployment Status

1. Go to **Actions** tab
2. You should see the workflow running
3. Wait 2-3 minutes for it to complete
4. Once complete, your app will be live at:
   **https://pixogram06.github.io/agency-catalog/**

## Troubleshooting

### Workflow not showing up?
- Make sure the `.github/workflows/deploy.yml` file exists in your repository
- Check that you're on the `main` branch
- Refresh the Actions tab

### Workflow fails?
- Check the workflow logs in the Actions tab
- Common issues:
  - Node version mismatch
  - Build errors
  - Missing dependencies

### Pages not accessible?
- Make sure GitHub Pages is enabled (Step 1)
- Wait a few minutes after deployment completes
- Check repository Settings → Pages for the URL

## Alternative: Use Vercel (Easier)

If GitHub Pages is giving you trouble, Vercel is much easier:

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import `agency-catalog` repository
5. Click "Deploy"
6. Done! Your app is live in ~30 seconds

