# WunderGraph & Kubernetes

## Prerequisites

- Running kubernetes cluster (OKE, GKE, AKE or minikube)
- [`kbld`](https://carvel.dev/kbld/) for image building, pushing, and resolution
- [`kubectl`](https://kubernetes.io/de/docs/tasks/tools/install-kubectl/) to interact with your cluster

## Getting Started

Deploy your WunderGraph application to your kubernetes cluster. The application is exposed via a service of type [`load-balancer`](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/) which makes your application accessible to the public internet.

```sh
make deploy
```

_This command will build and push a production ready docker image to the registry and deploy all kubernetes files under [`./k8s`](./k8s). We use the tool [`kbld`](https://carvel.dev/kbld/) for that seeamless integration._

## Development

Start your local development environment.

```sh
make dev
```

Checkout the [`makefile`](./Makefile) for documentation and other commands.