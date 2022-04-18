# WunderGraph & Kubernetes

## Prerequisites

- Any running kubernetes cluster
- [`kbld`](https://carvel.dev/kbld/) for image building, pushing, and resolution
- [`kubectl`](https://kubernetes.io/de/docs/tasks/tools/install-kubectl/) to interact with your cluster

## Getting Started

Deploy your WunderGraph application to your kubernetes cluster.

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