# Screenshots Guide for README

This guide will help you capture the best screenshots for your portfolio README.

## Recommendation: Use Real Screenshots

**✅ Use actual deployment screenshots** - They show:
- Real working deployments
- Actual Azure DevOps pipeline runs
- Live Kubernetes deployments
- Authentic proof of your work
- Professional portfolio quality

## Required Screenshots Checklist

### 1. Azure DevOps Pipeline (Most Important)
**What to capture:**
- [ ] Pipeline run overview (all stages)
- [ ] Build stage with tests passing
- [ ] Security scan (Trivy) results
- [ ] Deployment stages (Dev, Staging, Prod)
- [ ] Pipeline success notification

**Where to take it:**
- Azure DevOps → Pipelines → Runs → Select a successful run

**Tips:**
- Capture when all stages are green (passed)
- Show the full pipeline flow
- Include build numbers and timestamps
- Crop to show relevant stages only

---

### 2. Azure Kubernetes Service (AKS) Deployment
**What to capture:**
- [ ] Kubernetes pods running (kubectl get pods)
- [ ] Services with LoadBalancer IPs
- [ ] Deployment status
- [ ] Namespaces (dev, staging, prod)

**Where to take it:**
- Azure Portal → Kubernetes services → Your AKS cluster
- Or: Terminal with `kubectl` commands

**Commands to screenshot:**
```bash
# Show all pods across namespaces
kubectl get pods -A

# Show services with external IPs
kubectl get svc -A

# Show deployments
kubectl get deployments -A

# Describe a pod (showing it's running)
kubectl describe pod <pod-name> -n todo-dev
```

---

### 3. Azure Container Registry (ACR)
**What to capture:**
- [ ] Container images list
- [ ] Image tags with build numbers
- [ ] Repository overview

**Where to take it:**
- Azure Portal → Container registries → Your ACR → Repositories

**Tips:**
- Show multiple image tags (build numbers)
- Show the repository structure
- Include image size and last pushed date

---

### 4. Application Running (Optional but Recommended)
**What to capture:**
- [ ] Application homepage (the Todo API UI)
- [ ] Health check endpoint response
- [ ] API response (curl or browser)
- [ ] Application logs

**Where to take it:**
- Browser: `http://<LOADBALANCER-IP>`
- Terminal: `curl http://<LOADBALANCER-IP>/health`
- Terminal: `curl http://<LOADBALANCER-IP>/api/todos`

**Example commands:**
```bash
# Get the LoadBalancer IP
kubectl get svc todo-api -n todo-dev

# Test health endpoint
curl http://<EXTERNAL-IP>/health | jq .

# Test API endpoint
curl http://<EXTERNAL-IP>/api/todos | jq .
```

---

### 5. Security Scan Results (Trivy)
**What to capture:**
- [ ] Trivy scan output (if visible in pipeline logs)
- [ ] Vulnerability report (if any)
- [ ] Security scan passing

**Where to take it:**
- Azure DevOps → Pipeline run → Security Scan step → View logs

---

### 6. Blue-Green Deployment (Production)
**What to capture:**
- [ ] Blue and green deployments
- [ ] Service selector switching
- [ ] Deployment status before/after switch
- [ ] Zero-downtime deployment process

**Where to take it:**
- Terminal: `kubectl get deployments -n todo-prod`
- Terminal: `kubectl get svc todo-api-service -n todo-prod`
- Azure DevOps pipeline logs showing the blue-green process

---

### 7. Architecture Diagram (Optional)
**What to capture:**
- [ ] Azure Portal resource group view
- [ ] Resource diagram showing AKS, ACR, etc.
- [ ] Network topology (if visible)

**Where to take it:**
- Azure Portal → Resource groups → Your resource group
- Azure Portal → Your AKS cluster → Overview

---

## Screenshot Best Practices

### 1. Quality
- ✅ Use high resolution (at least 1920x1080)
- ✅ Crop to relevant areas only
- ✅ Remove sensitive information (names, IDs, etc.)
- ✅ Use consistent sizing across screenshots

### 2. Annotations
- ✅ Add arrows or highlights to important areas
- ✅ Add text labels explaining what's shown
- ✅ Use tools like:
  - **macOS:** Preview, Skitch, or built-in Markup
  - **Windows:** Snipping Tool, Greenshot
  - **Online:** Photopea, Canva

### 3. Privacy & Security
- ⚠️ **Remove sensitive data:**
  - Subscription IDs
  - Resource group names (if sensitive)
  - Personal information
  - IP addresses (can blur or use placeholder)
  - Account names
  - Tenant IDs

- ✅ **Safe to show:**
  - Pipeline structure
  - Deployment status
  - Container images (without sensitive tags)
  - Kubernetes resources (with generic names)
  - Application UI

### 4. File Organization
```
screenshots/
├── pipeline/
│   ├── pipeline-overview.png
│   ├── build-stage.png
│   └── deployment-stages.png
├── kubernetes/
│   ├── pods-running.png
│   ├── services.png
│   └── deployments.png
├── application/
│   ├── homepage.png
│   ├── health-check.png
│   └── api-response.png
└── azure/
    ├── acr-images.png
    └── aks-cluster.png
```

## Step-by-Step Screenshot Capture Process

### Phase 1: Pipeline Screenshots
1. **Trigger a pipeline run** (push a commit or manually trigger)
2. **Wait for pipeline to complete** (all stages should pass)
3. **Capture screenshots:**
   - Pipeline overview
   - Each stage (Build, Deploy Dev, Deploy Staging, Deploy Prod)
   - Security scan results
   - Smoke test results

### Phase 2: Kubernetes Screenshots
1. **Connect to your AKS cluster:**
   ```bash
   az aks get-credentials --resource-group <rg-name> --name <aks-name>
   ```

2. **Capture deployment status:**
   ```bash
   kubectl get pods -A
   kubectl get svc -A
   kubectl get deployments -A
   ```

3. **Take screenshots of:**
   - Terminal output showing pods running
   - Services with external IPs
   - Deployment status

### Phase 3: Application Screenshots
1. **Get the LoadBalancer IP:**
   ```bash
   kubectl get svc todo-api -n todo-dev
   ```

2. **Test the application:**
   - Open browser: `http://<EXTERNAL-IP>`
   - Test API: `curl http://<EXTERNAL-IP>/api/todos`

3. **Capture:**
   - Application homepage
   - Health check response
   - API response

### Phase 4: Azure Portal Screenshots
1. **Navigate to Azure Portal**
2. **Capture:**
   - ACR repository with images
   - AKS cluster overview
   - Resource group (optional, remove sensitive info)

## Cost Considerations

**Free/Cheap Options:**
- Use Azure free tier credits ($200 credit for new accounts)
- Use Dev/Test pricing
- Deploy to smaller instances
- Delete resources after screenshots
- Use Azure DevOps free tier (unlimited for public repos)

**Minimize Costs:**
- Take screenshots quickly
- Use small VM sizes
- Delete resources when done
- Use spot instances if available

## Alternative: Use Mock Screenshots (Not Recommended)

If you can't deploy right now, you could:
- Create mockups using design tools
- Use placeholder images
- Add "Screenshots coming soon" section

**But real screenshots are much better for a portfolio!**

## README Integration

After capturing screenshots, add them to your README:

```markdown
## Screenshots

### Pipeline Overview
![Pipeline](screenshots/pipeline/pipeline-overview.png)

### Kubernetes Deployment
![Kubernetes](screenshots/kubernetes/pods-running.png)

### Application Running
![Application](screenshots/application/homepage.png)
```

## Tools for Screenshots

### macOS
- **Built-in:** `Cmd + Shift + 4` (select area)
- **Preview:** Annotate and edit
- **Skitch:** Free annotation tool

### Windows
- **Snipping Tool:** Built-in screenshot tool
- **Greenshot:** Free, powerful screenshot tool

### Linux
- **Flameshot:** Great annotation features
- **GNOME Screenshot:** Built-in tool

### Online Editors
- **Photopea:** Free Photoshop alternative
- **Canva:** Easy image editing
- **Figma:** Design and annotate

## Quick Checklist

Before adding screenshots to README:
- [ ] All screenshots captured
- [ ] Sensitive data removed
- [ ] Images optimized (compressed)
- [ ] Consistent sizing
- [ ] Annotations added (if needed)
- [ ] Screenshots organized in folder
- [ ] README updated with image paths
- [ ] Images committed to repository

## Example Screenshot Workflow

1. **Deploy to Dev environment** (wait for pipeline)
2. **Take pipeline screenshots** (Azure DevOps)
3. **Take Kubernetes screenshots** (terminal/kubectl)
4. **Take application screenshots** (browser/curl)
5. **Deploy to Staging** (optional, for more screenshots)
6. **Take ACR screenshots** (Azure Portal)
7. **Edit and annotate screenshots**
8. **Add to README**
9. **Commit and push**

---

## Recommendation

**Do the actual deployment and take real screenshots.** It's worth it because:
- Shows real working systems
- Demonstrates actual DevOps experience
- More impressive for portfolio
- Can be done with free Azure credits
- Takes 1-2 hours total

Good luck with your screenshots! 🚀

