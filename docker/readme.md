Slightly modified version of original Dockerfile - https://github.com/keycloak/keycloak/blob/main/quarkus/container/Dockerfile

Base image was changed from ubi8-minimal to eclipse-temurin as I wanted to experiment with keycloak on my old raspberry pi 3b

In order to build the image you need to provide URL to keycloak distribution:
```
docker build --build-arg KEYCLOAK_DIST=http://<HOST>:<PORT>/keycloak-<VERSION>.tar.gz . -t <YOUR_TAG>
```
For example:
```
docker build --build-arg KEYCLOAK_DIST=https://github.com/keycloak/keycloak/releases/download/19.0.2/keycloak-19.0.2.tar.gz . -t keycloak-rpi
```
