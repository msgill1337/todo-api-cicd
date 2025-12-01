# Screenshots Directory

This directory contains screenshots for the README.

## Directory Structure

```
screenshots/
├── pipeline/          # Azure DevOps pipeline screenshots
├── kubernetes/        # Kubernetes deployment screenshots
├── application/       # Application running screenshots
└── azure/            # Azure Portal screenshots (ACR, AKS, etc.)
```

## Instructions

1. See [SCREENSHOTS_GUIDE.md](../SCREENSHOTS_GUIDE.md) for detailed instructions
2. Capture screenshots from your actual deployments
3. Remove any sensitive information before committing
4. Optimize images for web (compress if needed)
5. Update README.md with screenshot paths

## Screenshot Checklist

- [ ] Pipeline overview (Azure DevOps)
- [ ] Build stage with tests
- [ ] Security scan results (Trivy)
- [ ] Deployment stages
- [ ] Kubernetes pods running
- [ ] Services with LoadBalancer IPs
- [ ] Application homepage
- [ ] Health check endpoint
- [ ] API response
- [ ] ACR images
- [ ] Blue-green deployment (production)

## Privacy Note

⚠️ **Before committing screenshots:**
- Remove subscription IDs
- Remove sensitive resource names
- Blur or remove IP addresses (if sensitive)
- Remove personal information
- Remove account names

