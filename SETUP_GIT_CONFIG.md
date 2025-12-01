# Git Configuration Setup

Git requires your name and email to be configured before you can make commits. This identity will be associated with all your commits.

## Quick Setup

### Option 1: Configure Globally (Recommended)
This will set your Git identity for all repositories on your computer:

```bash
# Set your name (replace with your actual name)
git config --global user.name "Your Name"

# Set your email (use your GitHub email, or the email associated with your GitHub account)
git config --global user.email "your.email@example.com"
```

### Option 2: Configure for This Repository Only
If you want different identity for this specific repository:

```bash
# Set your name (replace with your actual name)
git config user.name "Your Name"

# Set your email (use your GitHub email)
git config user.email "your.email@example.com"
```

## Verify Configuration

After setting your identity, verify it:

```bash
# Check global configuration
git config --global user.name
git config --global user.email

# Or check repository-specific configuration
git config user.name
git config user.email
```

## Important Notes

1. **GitHub Email Privacy**: If you have GitHub email privacy enabled, you can use GitHub's no-reply email format:
   - Format: `username@users.noreply.github.com`
   - Or: `ID+username@users.noreply.github.com`
   - Find it in GitHub: Settings → Emails → "Keep my email addresses private"

2. **Email Matching**: The email you use in Git config doesn't have to match your GitHub login email, but it's recommended for better commit attribution.

3. **Name**: Use your real name or preferred name (this will be visible in commit history).

## Example

```bash
# Example configuration
git config --global user.name "Mehdeep Singh"
git config --global user.email "mehdeep@example.com"

# Or with GitHub no-reply email
git config --global user.name "Mehdeep Singh"
git config --global user.email "mehdeep@users.noreply.github.com"
```

## After Configuration

Once configured, you can proceed with committing your changes:

```bash
git add -A
git commit -m "Security: Remove hardcoded ACR name and add GitHub migration guide"
```

