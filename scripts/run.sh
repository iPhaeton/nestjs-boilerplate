docker run -d --rm --name runtime -e "NODE_ENV=local" -e "DB_HOSTNAME=host.docker.internal" -p 8080:3000 nestjs-boilerplate:latest
