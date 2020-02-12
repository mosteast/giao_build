FROM node:alpine

WORKDIR /app

# Copy build to /app
COPY . .

RUN ./docker/main.sh

EXPOSE ${app_port}

ENTRYPOINT [ "node" ]

CMD [ "index.js" ]
