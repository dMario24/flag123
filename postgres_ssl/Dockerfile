# This Dockerfile contains the image specification of our database
FROM postgres:15-alpine

COPY ./certs/out/postgresdb.key /var/lib/postgresql
COPY ./certs/out/postgresdb.crt /var/lib/postgresql

COPY ./certs/out/myCA.crt /var/lib/postgresql
COPY ./certs/out/myCA.crl /var/lib/postgresql

COPY ./ssl-conf.sh /usr/local/bin

RUN chown 0:70 /var/lib/postgresql/postgresdb.key && chmod 640 /var/lib/postgresql/postgresdb.key
RUN chown 0:70 /var/lib/postgresql/postgresdb.crt && chmod 640 /var/lib/postgresql/postgresdb.crt

RUN chown 0:70 /var/lib/postgresql/myCA.crt && chmod 640 /var/lib/postgresql/myCA.crt
RUN chown 0:70 /var/lib/postgresql/myCA.crl && chmod 640 /var/lib/postgresql/myCA.crl

ENTRYPOINT ["docker-entrypoint.sh"] 

CMD [ "-c", "ssl=on" , "-c", "ssl_cert_file=/var/lib/postgresql/postgresdb.crt", "-c",\
  "ssl_key_file=/var/lib/postgresql/postgresdb.key", "-c",\
  "ssl_ca_file=/var/lib/postgresql/myCA.crt", "-c", "ssl_crl_file=/var/lib/postgresql/myCA.crl" ]