FROM mysql:5

ENV MYSQL_ROOT_PASSWORD 123  
ENV MYSQL_DATABASE Flights  
ENV MYSQL_USER users_service  
ENV MYSQL_PASSWORD toor

ADD scriptSchema.sql /docker-entrypoint-initdb.d 