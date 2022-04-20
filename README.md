# WunderGraph & Kubernetes

## Prerequisites

- Running kubernetes cluster (OKE, GKE, AKE or minikube)
- [`kbld`](https://carvel.dev/kbld/) for image building, pushing, and resolution
- [`kubectl`](https://kubernetes.io/de/docs/tasks/tools/install-kubectl/) to interact with your cluster

## Getting Started

Deploy your WunderGraph application to your kubernetes cluster. The application is exposed via a service of type [`load-balancer`](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/) which makes your application accessible to the public internet.

Before you can deploy your WunderNode you need to provide your own docker repository. Replace `docker.io/wundergraph/kubernetes-demo` in [`./k8s/build-push.yaml`](./k8s/build-push.yaml) with your own repository adn run:

```sh
make deploy
```

_This command will build and push a production ready docker image to the registry and deploy all kubernetes files under [`./k8s`](./k8s). We use the tool [`kbld`](https://carvel.dev/kbld/) for that seeamless integration._

### Access your WunderGraph

```sh
# Checkout the ip in "LoadBalancer Ingress"
make get-ip
curl --location --request GET 'http://${IP}/app/main/operations/Hello' \
--header 'Content-Type: application/json'
```

## Development

Start your local development environment.

```sh
make dev
```

Checkout the [`makefile`](./Makefile) for documentation and other commands.