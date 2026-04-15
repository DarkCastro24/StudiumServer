# Studium - Backend

## Índice
- [Repositorio](#repositorio)
- [Aspectos generales](#aspectos-generales)
  - [Objetivos del documento](#objetivos-del-documento)
  - [Descripción general](#descripción-general)
  - [Requerimientos del sistema](#requerimientos-del-sistema)
  - [Software utilizado](#software-utilizado)
- [Arquitectura del sistema](#arquitectura-del-sistema)
  - [Módulos principales](#módulos-principales)
  - [Modelo lógico de información](#modelo-lógico-de-información)
- [Guía de configuración](#guía-de-configuración)
  - [Configuración para el backend del sistema](#configuración-para-el-backend-del-sistema)
- [Endpoints principales](#endpoints-principales)
  - [Cursos API](#cursos-api)
  - [Tutorados API](#tutorados-api)
  - [Autenticación API](#autenticación-api)
  - [Usuarios API](#usuarios-api)
  - [Correo API](#correo-api)
- [Compatibilidad de licencias](#compatibilidad-de-licencias)
- [Tipos de error](#tipos-de-error)
- [Tablero](#tablero)
- [Créditos](#créditos)

---

## Repositorio

**Backend:** [Repositorio backend](https://github.com/DarkCastro24/Studium-Web.git)

> Nota: según la guía compartida, el proyecto completo se encuentra en ese repositorio y el backend está dentro de la carpeta **Servicio web**.

---

## Aspectos generales

### Objetivos del documento

Este documento técnico describe la estructura, propósito, módulos funcionales, configuración y operación del backend de **Studium**. Su objetivo es servir como guía de instalación, consulta y mantenimiento para el equipo de desarrollo y futuros colaboradores del proyecto.

### Descripción general

El backend de **Studium** provee la lógica y los servicios necesarios para soportar la plataforma web orientada a círculos de estudio de la Universidad Centroamericana José Simeón Cañas.

La API permite administrar las principales operaciones del sistema, entre ellas:

- gestión de cursos
- administración de recursos asociados a cursos
- registro y autenticación de usuarios
- gestión de tutorados dentro de cursos
- actualización y consulta de perfiles
- manejo de materias de interés
- envío de correos electrónicos desde la plataforma

La estructura del backend está organizada por dominios funcionales, lo que facilita separar responsabilidades y mantener una arquitectura clara a nivel de servicios.

### Requerimientos del sistema

Para ejecutar el backend de Studium de forma local se requiere:

- **Node.js**
- **Yarn**

### Software utilizado

De acuerdo con la documentación disponible, el backend utiliza como base de ejecución:

- **Node.js**  
  Entorno de ejecución necesario para levantar el servicio web.

- **Yarn**  
  Gestor de paquetes utilizado para instalar dependencias y ejecutar el proyecto.

- **Servicio web del proyecto**  
  Carpeta donde se encuentra la parte backend del sistema y desde donde se levanta el servicio con `yarn dev`.

---

## Arquitectura del sistema

El backend de Studium se comporta como una **API web** orientada a recursos. Su diseño funcional está dividido en módulos principales que agrupan responsabilidades por entidad o proceso del sistema.

### Módulos principales

#### 1. Cursos
Gestiona la creación, consulta, filtrado y eliminación de cursos, además de la incorporación de recursos asociados a cada curso.

#### 2. Tutorados
Permite registrar, consultar y eliminar tutorados dentro de un curso específico.

#### 3. Autenticación
Maneja el registro de usuarios y el inicio de sesión, devolviendo la información necesaria para autenticación dentro de la aplicación.

#### 4. Usuarios
Permite consultar usuarios, filtrar por nombre, obtener perfiles, actualizar perfiles, agregar materias de interés y eliminar usuarios o materias.

#### 5. Correo
Habilita el envío de correos electrónicos desde la plataforma.

### Modelo lógico de información

A nivel funcional, el backend trabaja con las siguientes entidades principales:

- **Usuario**
- **Curso**
- **Recurso**
- **Tutorado**
- **Perfil**
- **Materia de interés**
- **Correo**

> La documentación compartida no incluye un diagrama formal del modelo de datos ni un esquema detallado de base de datos para este proyecto, por lo que este apartado se describe desde la lógica de negocio expuesta por la API.

---

## Guía de configuración

### Configuración para el backend del sistema

#### 1. Clonar el repositorio

```bash
git clone https://github.com/DarkCastro24/Studium-Web.git
```

#### 2. Entrar a la carpeta del backend

```bash
cd StudiumServer"
```

#### 3. Instalar dependencias

```bash
yarn install
```

#### 4. Ejecutar el backend en modo desarrollo

```bash
yarn dev
```

#### 5. Verificar funcionamiento

El servicio debe levantar correctamente y quedar disponible para ser consumido por el frontend.

> Importante: en la guía compartida aparece una nota que menciona `http://localhost:5173` como referencia de configuración local. Antes de dejar este dato como definitivo en el repositorio, conviene validar en el código fuente cuál es el puerto real del backend, ya que `5173` suele corresponder al frontend.

---

## Endpoints principales

### Cursos API

**URL Base:** `/api/cursos`

Operaciones documentadas:

- `POST /`  
  Guardar un nuevo curso.

- `GET /`  
  Obtener todos los cursos sin incluir recursos.

- `GET /?page=<número>&limit=<número>`  
  Obtener cursos con paginación.

- `GET /<id>`  
  Buscar un curso por ID.

- `DELETE /<id>`  
  Eliminar un curso por ID.

- `POST /filtrar-por-materia`  
  Filtrar cursos por materia.

- `POST /filtrar-por-nombre`  
  Filtrar cursos por nombre.

- `POST /<id>/recursos`  
  Añadir un recurso a un curso específico.

- `PUT /<cursoId>/recursos/<resourceId>`  
  Actualizar un recurso específico de un curso.

### Tutorados API

**URL Base:** `/api/cursos/:cursoId/tutorados`

Operaciones documentadas:

- `POST /:username`  
  Guardar un nuevo tutorado en un curso.

- `GET /`  
  Obtener todos los tutorados de un curso.

- `DELETE /:username`  
  Eliminar un tutorado de un curso.

- `GET /usernames`  
  Obtener los nombres de usuario de todos los tutorados de un curso.

### Autenticación API

Operaciones documentadas:

- `POST /api/register`  
  Registrar un nuevo usuario.

- `POST /api/login`  
  Iniciar sesión con nombre de usuario o correo y contraseña.

El sistema también indica el uso del encabezado `Authorization` para acceder a rutas protegidas.

### Usuarios API

**URL Base:** `/api/usuarios`

Operaciones documentadas:

- `GET /`  
  Obtener todos los usuarios.

- `POST /filtrar`  
  Filtrar usuarios por nombre.

- `POST /:userId/materia`  
  Añadir una materia de interés a un usuario.

- `GET /:userId/perfil`  
  Obtener el perfil de un usuario por ID.

- `PUT /:userId/perfil`  
  Actualizar el perfil de un usuario.

- `DELETE /:userId/materia/:materiaId`  
  Eliminar una materia de interés de un usuario.

- `DELETE /:userId`  
  Eliminar un usuario por ID.

### Correo API

**URL Base:** `/api/correo`

Operaciones documentadas:

- `POST /enviar`  
  Enviar un correo electrónico desde la aplicación.

---

## Compatibilidad de licencias

### Licencia del backend

Este proyecto backend se distribuye bajo la licencia:

**[AGPL v3]**

---

## Tipos de error

Según la documentación del backend, los tipos de error más comunes son:

- **400 - Bad Request**
  - errores de validación
  - formato inválido en el cuerpo de la solicitud

- **401 - Unauthorized**
  - contraseña incorrecta en inicio de sesión

- **404 - Not Found**
  - usuario no encontrado
  - curso no encontrado
  - recurso o perfil no localizado

- **500 - Internal Server Error**
  - fallos internos del servidor
  - errores durante operaciones de consulta, registro, actualización o envío de correo




