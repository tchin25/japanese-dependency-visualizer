# Cabocha Python Docker

This backend was created with the help of [this repo](https://github.com/Marco888Space/CaboCha-Ubuntu-18-04-LTS-Installation-Guide) and with functions taken from [this blog post](https://hiroshiu.blogspot.com/2018/08/basic-usage-of-cabocha-in-python.html).

## How to use with Google Cloud Run
```
docker build -t gcr.io/[YOUR_PROJECT_NAME]/[DOCKER_NAME] .
```
### Push to container registry (requires authentication)
```
docker push gcr.io/[YOUR_PROJECT_NAME]/[DOCKER_NAME]
```
Then log into GCP and spin a GCR instance with port 5000 open