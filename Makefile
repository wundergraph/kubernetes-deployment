# dev: 		bootstrap and start your wundergraph project in development mode
# generate: builds your application as a wundergraph artifact
# build: 	builds your production ready docker image and push it to the registry
# deploy: 	builds, push and deploy your application to your cluster

dev:
	cd .wundergraph && npm run dev
generate:
	npm run wunderctl generate
build:
	kbld -f k8s
deploy:
	kbld -f k8s | kubectl apply -f -