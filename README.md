# ReliefOps Tracker

ReliefOps Tracker is a minimal Node.js service designed to demonstrate a GitOps workflow with ArgoCD. The app exposes a small API that lists community resources (water, food, medical supplies) and is meant as a meaningful example for emergency relief coordination.

The goal of this repo is to keep the application small and focus on the GitHub + CI + ArgoCD flow:

- GitHub Actions builds and pushes a Docker image to Docker Hub.
- The workflow updates the Kubernetes manifest with the new image tag.
- ArgoCD syncs the change from Git and deploys it to your cluster.

## What’s in this repo

- `app/` Node.js Express app
- `k8s/` Kubernetes manifests
- `.github/workflows/` GitHub Actions pipeline

## API Endpoints

- `GET /` service status and timestamp
- `GET /resources` static list of community resources

## Local Development

1. Install dependencies:

```bash
cd app
npm install
```

2. Run the app locally:

```bash
npm start
```

3. Test endpoints:

```bash
curl http://localhost:3000/
curl http://localhost:3000/resources
```

## Docker

Build and run locally:

```bash
docker build -t reliefops-tracker:local ./app
docker run -p 3000:3000 reliefops-tracker:local
```

## Kubernetes Manifests

Manifests live in `k8s/`.

- `k8s/deployment.yaml` Deployment for the app
- `k8s/service.yaml` ClusterIP Service

The image field is updated automatically by the CI pipeline to the latest pushed SHA tag.

## GitHub Actions CI (Build + Push + Manifest Update)

Workflow: `.github/workflows/docker-build.yml`

On every push to `main`:

1. Build and push image to Docker Hub
2. Tag image as `latest` and `sha-<7 chars>`
3. Update `k8s/deployment.yaml` with the new SHA tag
4. Commit and push the manifest update back to `main`

### Required GitHub Secrets

Set these in your GitHub repo:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

## ArgoCD Sync Behavior

ArgoCD watches the Git repo path you configure (recommended: `k8s/`).

- If auto-sync is enabled in your ArgoCD Application, it will deploy changes as soon as they appear in Git.
- If auto-sync is disabled, ArgoCD will show the drift and require manual sync.

For faster detection, configure a Git webhook to your ArgoCD instance.

## Typical GitOps Flow

1. Push code changes to `main`
2. GitHub Actions builds and pushes image
3. Workflow updates `k8s/deployment.yaml`
4. ArgoCD detects the Git change and syncs

## Notes

- The app is intentionally minimal to keep the focus on the GitOps flow.
- You can extend `GET /resources` to pull data from a database or API later.

