# Migration Guide: Azure DevOps to GitHub

This guide will help you move your repository from Azure DevOps to GitHub as a public repository.

## Prerequisites

- GitHub account
- Git installed locally
- All changes committed (or ready to commit)

## Step-by-Step Instructions

### Step 1: Commit Your Current Changes

First, commit the security fix we just made:

```bash
git add azure-pipelines.yml
git commit -m "Remove hardcoded ACR name for security"
```

### Step 2: Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Repository name: `todo-api-cicd` (or your preferred name)
5. Description: "A production-ready CI/CD pipeline for containerized Node.js API on Azure Kubernetes Service"
6. Visibility: **Public** ✅
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **Create repository**

### Step 3: Update Git Remote

Replace the Azure DevOps remote with GitHub:

```bash
# Remove the old Azure DevOps remote
git remote remove origin

# Add the new GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/todo-api-cicd.git

# Verify the remote was added correctly
git remote -v
```

### Step 4: Push to GitHub

```bash
# Push all branches to GitHub
git push -u origin main

# If you have other branches, push them too:
# git push -u origin --all
```

### Step 5: Update Azure DevOps Pipeline (if using Azure Pipelines)

Since you're moving the repo to GitHub but may still use Azure DevOps for CI/CD:

1. Go to your Azure DevOps project
2. Navigate to **Pipelines** → **Create Pipeline**
3. Select **GitHub (YAML)**
4. Authorize Azure DevOps to access your GitHub account
5. Select your repository: `YOUR_USERNAME/todo-api-cicd`
6. Select the existing pipeline file: `/azure-pipelines.yml`
7. Save and run

**Note:** The pipeline YAML file works the same way whether the repo is on Azure DevOps or GitHub. You'll just need to reconnect the pipeline to the new GitHub repository.

### Step 6: Update Repository Settings (Optional)

#### Add Repository Topics/Tags:
- Go to your GitHub repository
- Click the gear icon ⚙️ next to "About"
- Add topics: `azure-devops`, `kubernetes`, `docker`, `cicd`, `nodejs`, `express`, `azure`, `aks`

#### Add a Description:
- "Production-ready CI/CD pipeline for containerized Node.js API with Azure Kubernetes Service, featuring automated testing, security scanning, and blue-green deployments."

### Step 7: Verify Everything Works

1. **Check the repository is public:**
   - Visit: `https://github.com/YOUR_USERNAME/todo-api-cicd`
   - Make sure you can view it without logging in (in incognito mode)

2. **Verify all files are present:**
   - Check that all files are visible
   - Verify no sensitive data is exposed

3. **Test the pipeline:**
   - Make a small change and push to GitHub
   - Verify Azure DevOps pipeline triggers correctly (if you set it up)

### Step 8: Clean Up (Optional)

If you want to remove the old Azure DevOps repository:

1. Go to Azure DevOps
2. Navigate to your project
3. Go to **Repos** → **Files**
4. Click on the **...** menu → **Repository settings**
5. Scroll down and click **Delete repository**
6. Confirm deletion

**⚠️ Warning:** Only do this after verifying everything works on GitHub!

## Troubleshooting

### Issue: Authentication Error
If you get authentication errors when pushing:

```bash
# Use SSH instead of HTTPS (recommended)
git remote set-url origin git@github.com:YOUR_USERNAME/todo-api-cicd.git

# Or use GitHub CLI
gh repo create todo-api-cicd --public --source=. --remote=origin --push
```

### Issue: Remote Already Exists
If you get "remote origin already exists":

```bash
# Update existing remote instead of removing
git remote set-url origin https://github.com/YOUR_USERNAME/todo-api-cicd.git
```

### Issue: Large File Warning
If you have large files, GitHub has a 100MB file size limit. Check for large files:

```bash
# Find large files
find . -type f -size +10M -not -path "./.git/*" -not -path "./node_modules/*"
```

## Next Steps

1. **Update README** (optional): The README mentions Azure DevOps, but since Azure Pipelines can work with GitHub repos, this is fine. You might want to add a note that the repo is now on GitHub.

2. **Add GitHub Actions** (optional): You could also add a GitHub Actions workflow as an alternative to Azure DevOps pipelines.

3. **Add a License**: Consider adding a LICENSE file (MIT is common for portfolio projects).

4. **Add GitHub Topics**: Add relevant topics to make your repo discoverable.

## Important Notes

- ✅ The `azure-pipelines.yml` file works with GitHub repositories when connected via Azure DevOps
- ✅ All secrets are stored in Azure DevOps variable groups (not in the repo)
- ✅ The repository is now safe to make public (no sensitive data)
- ✅ Service connections in Azure DevOps will continue to work

## Support

If you encounter any issues during migration, check:
- [GitHub Documentation](https://docs.github.com)
- [Azure DevOps GitHub Integration](https://docs.microsoft.com/en-us/azure/devops/pipelines/repos/github)

