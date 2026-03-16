# Aegis NestJS

Este proyecto es un boilerplate robusto basado en NestJS, diseñado con principios de arquitectura limpia (DDD/Hexagonal) para facilitar la escalabilidad y mantenibilidad.

## 🚀 Scripts Relevantes

El proyecto cuenta con comandos predefinidos para facilitar el ciclo de desarrollo y despliegue:

### Desarrollo y Ejecución
- `npm run start:dev`: Inicia la aplicación en modo desarrollo con recarga automática (*watch mode*).
- `npm run build`: Compila el proyecto para producción.
- `npm run start:prod`: Ejecuta la versión compilada en `dist`.

### Base de Datos
- `npm run migration:run`: Ejecuta las migraciones pendientes.
- `npm run migration:generate -- name=MIGRATION_NAME`: Genera una nueva migración basada en los cambios de las entidades.
- `npm run seed:run:relational`: Ejecuta los seeds para poblar la base de datos con información inicial.

### Calidad y Pruebas
- `npm run lint`: Ejecuta el linter (ESLint) para asegurar la calidad del código.
- `npm run test`: Ejecuta las pruebas unitarias con Jest.
- `npm run test:e2e`: Ejecuta las pruebas de integración (*end-to-end*).

## 🏗️ Arquitectura y Módulos

El proyecto sigue una arquitectura modular ubicada en `src/modules`. Cada módulo está diseñado para ser independiente y cohesivo:

- **creadentials-management**: Manejo de credenciales y autenticación.
- **driving-management**: Gestión de procesos relacionados con la conducción y registros técnicos.
- **enrollment-management**: Control de inscripciones y registros de participación.
- **role-configuration**: Configuración dinámica de roles y permisos del sistema.
- **users-management**: Administración central de usuarios, perfiles y estados.
- **shared-kernel**: Contiene lógica y tipos compartidos entre múltiples módulos (Value Objects, agregados base, etc.).

Cada módulo sigue internamente una estructura de capas: `domain`, `application`, `infrastructure` y `presentation`.

## 🗄️ Base de Datos y Migraciones

El sistema utiliza **TypeORM** para la gestión de la base de datos PostgreSQL. Las migraciones se encuentran en `src/database/migrations` y se encargan de la evolución del esquema:

- **BaseTable**: Inicialización del esquema base (tablas de usuarios, roles, sesiones, eventos auditables, etc.).
- **CredentialTable**: Estructura para el manejo de credenciales.
- **Migraciones de Cambio**: Ajustes incrementales como `ChangeIdVehicle`, `ChangeEnrollment`, `ChangeTrainingLog` y `EvaluationEntities`.

Para lanzar las migraciones, el sistema utiliza la configuración definida en `src/database/data-source.ts`.

## ⚠️ Manejo de Errores

El manejo de errores está centralizado en la capa `platform` (`src/platform`).

- **GlobalErrorFilter**: Un filtro de excepciones global (`error.exception-filter.ts`) que captura cualquier error no manejado y lo transforma en una respuesta estandarizada de tipo `ApiErrorResponse`.
- **ApiErrorResponse**: Estructura uniforme que devuelve el código de error, un mensaje legible y metadatos adicionales para depuración.
- **Validación**: Se integra con `ValidationPipe` en `main.ts` para capturar errores de entrada antes de que lleguen a los controladores.

## 🐳 Docker y Entorno de Desarrollo

El archivo `docker-compose.yaml` define la infraestructura necesaria para el desarrollo local:

- **postgres**: Base de datos principal (PostgreSQL 17.4).
- **maildev**: Servidor SMTP de prueba para previsualizar correos electrónicos enviados por la aplicación.
- **pgadmin**: Interfaz web para la administración de la base de datos PostgreSQL.

Los puertos y credenciales se configuran a través de variables de entorno en el archivo `.env`.