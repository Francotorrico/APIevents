# API de Gestión de Salones y Eventos 🎉

Este proyecto es una API funcional creada con **NestJS** para gestionar salones de eventos y sus respectivas reservas. El objetivo principal es demostrar un CRUD básico, orientado a la administración de salones y el manejo de eventos.

## 🚀 Funcionalidades

### 🏢 Salones de eventos (EventHall)
- **Crear salón:** Se puede crear un salón con disponibilidad activa.
- **Modificar salón:** Se puede modificar y desactivar su disponibilidad.
- **Obtener salones:** Listado de salones sin incluir sus eventos.
- **Eliminar salón:** Solo se puede eliminar si no tiene eventos pendientes.
- **Ver eventos por salón:** Listado de eventos asociados a un salón.

### 📅 Eventos
- **Crear evento:** Se puede reservar un evento si el salón está disponible.
- **Consultar disponibilidad:** Por fecha, hora y salón.
- **Cancelar evento:** Elimina el evento de la base de datos.
- **Marcar como completado:** Se elimina también de la base para dejar solo eventos pendientes visibles.

> En esta demo, los eventos cancelados o completados se eliminan directamente para mantener la tabla limpia. En una versión escalada, podrían moverse a una tabla de historial.

## 🛠️ Tecnologías

- **NestJS** como framework principal
- **TypeScript** para tipado estático
- **Prisma** como ORM
- **PostgreSQL** como base de datos relacional



## 📦 Instalación


```bash
git clone <repositorio>
cd <carpeta-del-proyecto>
pnpm install
pnpm start:dev
```


## Pasos que segui para el desarrollo

nest new APIfuncional

Parte de mi DB

creando docker-compose para postgres y luego usar el comando 
docker compose up -d
luego usar prisma studio o en este caso localhost:8080

# agrego dependencia de prisma
 pnpm add -D prisma

 # inicializo prisma
pnpm prisma init

# configuro el env. de prisma

En esta parte ya configuro mi schema.prisma y aplico 
 pnpm prisma migrate dev --name init , se aplica generate 

## En carpeta src -> prisma, es donde guardo prisma.module.ts y prisma.service.ts

usamos validaciones como 
pnpm add class-validator class-transformer
y en main.ts agregamos ValidationPipe, seria 
app.useGlobalPipes(new ValidationPipe)

## pasos para generar el CRUD
nest g resource EventHall --no-spec
nest g resource Event --no-spec

