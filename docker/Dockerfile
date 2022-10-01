FROM eclipse-temurin:19-jre-jammy AS build-env

ARG KEYCLOAK_DIST

ADD $KEYCLOAK_DIST /tmp/keycloak/

WORKDIR /tmp/keycloak

RUN (tar -xvf /tmp/keycloak/keycloak-*.tar.gz && \
     rm /tmp/keycloak/keycloak-*.tar.gz)

RUN mv /tmp/keycloak/keycloak-* /opt/keycloak && mkdir -p /opt/keycloak/data

RUN chmod -R g+rwX /opt/keycloak

FROM eclipse-temurin:19-jre-jammy
ENV LANG en_US.UTF-8

COPY --from=build-env --chown=1000:0 /opt/keycloak /opt/keycloak

RUN echo "keycloak:x:0:root" >> /etc/group && \
    echo "keycloak:x:1000:0:keycloak user:/opt/keycloak:/sbin/nologin" >> /etc/passwd

USER 1000

EXPOSE 8080
EXPOSE 8443

ENTRYPOINT [ "/opt/keycloak/bin/kc.sh" ]
