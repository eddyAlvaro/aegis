# # Usa una imagen base más liviana.
# FROM node:22.4.1-alpine3.20

# # Establece el directorio de trabajo inicial.
# WORKDIR /usr/src/app


# RUN apk add --no-cache bash
# RUN npm i -g @nestjs/cli typescript ts-node

# COPY package*.json /tmp/app/
# RUN cd /tmp/app && npm install

# COPY . /usr/src/app
# RUN cp -a /tmp/app/node_modules /usr/src/app
# COPY ./wait-for-it.sh /opt/wait-for-it.sh
# RUN chmod +x /opt/wait-for-it.sh
# COPY ./startup.relational.dev.sh /opt/startup.relational.dev.sh
# RUN chmod +x /opt/startup.relational.dev.sh
# RUN sed -i 's/\r//g' /opt/wait-for-it.sh
# RUN sed -i 's/\r//g' /opt/startup.relational.dev.sh

# WORKDIR /usr/src/app
# RUN if [ ! -f .env ]; then cp env-example-relational .env; fi
# RUN npm run build

# CMD ["/opt/startup.relational.dev.sh"]

# Usa una imagen base más liviana.
FROM node:22.4.1-alpine3.20

# Establece el directorio de trabajo inicial.
WORKDIR /usr/src/app

# Instala dependencias globales necesarias (incluye pnpm).
RUN apk add --no-cache \
    bash \
    && corepack enable \
    && corepack prepare pnpm@latest --activate
    # chromium \
    # nss \
    # freetype \
    # harfbuzz \
    # ca-certificates \
    # ttf-freefont \


# Copia solo los archivos necesarios para instalar dependencias.
COPY package.json pnpm-lock.yaml ./

# Instala dependencias de la aplicación.
RUN pnpm install --frozen-lockfile

# Copia el resto del código (exceptuando `node_modules`, según `.dockerignore`).
COPY . .

# Asegúrate de que los scripts sean ejecutables.
COPY ./wait-for-it.sh /opt/wait-for-it.sh
COPY ./startup.relational.dev.sh /opt/startup.relational.dev.sh
RUN chmod +x /opt/wait-for-it.sh /opt/startup.relational.dev.sh
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.relational.dev.sh

# Construye la aplicación.
RUN pnpm build

# Define el comando de inicio del contenedor.
CMD ["/opt/startup.relational.dev.sh"]
