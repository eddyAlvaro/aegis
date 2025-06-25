# Usa una imagen base más liviana.
FROM node:22.4.1-alpine3.20

# Establece el directorio de trabajo inicial.
WORKDIR /usr/src/app

# Instala dependencias globales necesarias (incluye pnpm).
RUN apk add --no-cache bash \
  && corepack enable \
  && npm install -g pnpm

# Copia solo los archivos necesarios para instalar dependencias.
COPY package.json pnpm-lock.yaml ./

# Instala dependencias de la aplicación.
RUN pnpm install --frozen-lockfile

# Copia el resto del código (exceptuando `node_modules`, según `.dockerignore`).
COPY . .

# Asegúrate de que los scripts sean ejecutables y sin saltos de línea de Windows.
COPY ./wait-for-it.sh /opt/wait-for-it.sh
COPY ./startup.relational.dev.sh /opt/startup.relational.dev.sh
RUN chmod +x /opt/wait-for-it.sh /opt/startup.relational.dev.sh \
  && sed -i 's/\r//g' /opt/wait-for-it.sh \
  && sed -i 's/\r//g' /opt/startup.relational.dev.sh

# Construye la aplicación.
RUN pnpm build

# Define el comando de inicio del contenedor.
CMD ["/opt/startup.relational.dev.sh"]
