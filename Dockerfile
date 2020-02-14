FROM node:alpine

WORKDIR /app

# Copy build to /app
COPY . .

RUN ./Dockerfile.sh

EXPOSE ${app_port}

ENTRYPOINT [ "node" ]

CMD [ "index.js" ]
