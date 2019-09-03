docker run -d --rm --name runtime -e "NODE_ENV=local" -e "DB_HOSTNAME=host.docker.internal" -e "DB_NAME=auth-db" -p 8080:3000 nestjs-boilerplate:latest
