# DriveHub API

La API DriveHub es una plataforma que te permite crear, gestionar y organizar directorios y archivos en tu unidad virtual. Con esta API, podrás realizar diversas operaciones, como crear directorios, agregar archivos, eliminar elementos y mucho más.

## Funcionalidades principales

La API DriveHub ofrece las siguientes funcionalidades principales:

- **Autenticación segura**: Login y registro de usuarios con contraseñas encriptadas.
- **Crear directorios**: Puedes crear directorios en tu unidad virtual para organizar tus archivos de manera estructurada.
- **Agregar archivos**: Permite agregar archivos a los directorios existentes en tu unidad virtual.
- **Eliminar elementos**: Puedes eliminar tanto directorios como archivos de tu unidad virtual.
- **Gestionar contenido**: La API te permite acceder y modificar el contenido de los archivos almacenados en los directorios.
- **Compartir archivos**: Genera enlaces encriptados y códigos QR para compartir archivos de forma segura.
- **Acceso seguro**: La API DriveHub utiliza autenticación JWT y autorización para garantizar un acceso seguro a tus datos.

## Instalación




Para comenzar a utilizar la API DriveHub, sigue los siguientes pasos:

1. Clona el repositorio del proyecto desde GitHub:

```bash
git clone https://github.com/tu-usuario/APIDRIVEHUB.git
```

2. Ingresa al directorio del proyecto:

```bash
cd APIDRIVEHUB
```

3. Usando Docker

Para construir y ejecutar la API DriveHub con Docker, sigue estos pasos:

1. Construye la imagen de Docker sin usar caché:

```bash
docker build --no-cache -t apidrivehub:0.0.0 .
```

2. Ejecuta el contenedor con las variables de entorno definidas en un archivo `.env` y mapea el puerto 4000:

```bash
docker run \
  --env-file .env \
  -p 4000:4000 \
  apidrivehub:0.0.0
```

4. Instala las dependencias necesarias utilizando npm:

```bash
npm install
```

4. Configura las variables de entorno necesarias para la API. Puedes encontrar los detalles de configuración en el archivo `.env`.

5. Inicia el servidor:

```bash
npm start
```

## Documentación Completa

La documentación completa de la API DriveHub está disponible en Swagger. Accede a: `http://localhost:4000/api-docs/`

## Ejemplos de uso

### 1. Autenticación

#### Login

```http
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "camidev@gmail.com",
  "password": "camidev20042813"
}
```

**Respuesta exitosa**: Token JWT para usar en requests autenticados.

#### Registro

```http
POST http://localhost:4000/api/users/
Content-Type: application/json

{
  "email": "camidev@gmail.com",
  "password": "camidev20042813",
  "userName": "camidev"
}
```

**Respuesta**:

```json
{
  "userCreated": {
    "avatar": "userDefault.png",
    "userName": "camidev",
    "email": "camidev@gmail.com",
    "directories": [
      {
        "directoryName": "Defaultcamidev",
        "files": [],
        "_id": "69238ffb9ab1ce57a9855a29"
      }
    ],
    "premium": false,
    "space": 0,
    "_id": "69238ffb9ab1ce57a9855a28"
  }
}
```

### 2. Gestión de Directorios

#### Crear un directorio

```http
POST http://localhost:4000/api/users/camidev/directories/Defaultcamidev
Authorization: Bearer <token>
Content-Type: application/json

{
  "directoryName": "test"
}
```

**Parámetros**:

- `username`: Nombre del usuario
- `baseDir`: Directorio base (ej: Defaultcamidev) - es el directorio que se crea por defecto al registrarse

**Respuesta**:

```json
{
  "message": "Directory created successfully",
  "directories": [
    {
      "directoryName": "Defaultcamidev",
      "files": [],
      "_id": "69238ffb9ab1ce57a9855a29"
    },
    {
      "directoryName": "test",
      "_id": "6923902c9ab1ce57a9855a3f",
      "files": []
    }
  ]
}
```

#### Eliminar un directorio

```http
DELETE http://localhost:4000/api/users/deleteDirectory/camidev/test
Authorization: Bearer <token>
```

**Parámetros**:

- `username`: Nombre del usuario
- `dir`: Nombre del directorio a eliminar

### 3. Gestión de Archivos

#### Subir archivos

```http
POST http://localhost:4000/api/users/camidev/directories/Defaultcamidev/folder/barcelona/files
Authorization: Bearer <token>
Content-Type: multipart/form-data

Archivo: [archivo_binario]
```

**Parámetros**:

- `username`: Nombre del usuario
- `directory`: Directorio base (ej: Defaultcamidev)
- `folder`: Subcarpeta donde guardar el archivo (ej: barcelona)

**Datos del formulario**:

- `gallery`: Archivo a subir

**Respuesta**:

```json
{
  "userFileUpdate": {
    "_id": "692371e0005418b5788fe8ac",
    "avatar": "userDefault.png",
    "userName": "camidev",
    "directories": [
      {
        "directoryName": "Defaultcamidev",
        "files": [
          {
            "nameFile": "Screenshot 2025-11-23 at 17-10-24 Instagram.png",
            "Date": "2025-11-23",
            "size": 423677,
            "_id": "692386653cc10e6226867229"
          }
        ]
      }
    ],
    "space": 23065431
  }
}
```

#### Obtener un archivo

```http
GET http://localhost:4000/api/files/unidad/camidev/Defaultcamidev/Screenshot%202025-11-23%20at%2017-10-24%20Instagram.png
```

**Parámetros**:

- `username`: Nombre del usuario
- `dir`: Directorio base
- `filename`: Nombre del archivo

#### Eliminar archivos

```http
DELETE http://localhost:4000/api/users/deleteFiles/camidev/barcelona
Authorization: Bearer <token>
Content-Type: application/json

{
  "files": ["Screenshot 2025-11-23 at 17-10-24 Instagram.png"]
}
```

**Parámetros**:

- `username`: Nombre del usuario
- `dir`: Directorio del archivo

**Body**:

- `files`: Array con los nombres de los archivos a eliminar

### 4. Compartir Archivos

#### Generar enlace y QR para compartir

```http
GET http://localhost:4000/api/files/getlink?identifier=Screenshot%202025-11-23%20at%2017-07-28%20Instagram.png&dir=Defaultcamidev
Authorization: Bearer <token>
```

**Parámetros de query**:

- `identifier`: Nombre del archivo a compartir
- `dir`: Directorio base donde está el archivo

**Respuesta**:

```json
{
  "response": {
    "link": "https://example.com/api/files/open-file?file=bdb8b7dc0dd0d6bb0a3f3c5e816fac7b26347876e66acef3a0ab1bad86f3781d7d9ee1fa5b4a4ea5dbbcff95d7e9c736&dir=Defaultcamidev&signature=405c786fce16ecb6d856447bbbc9917e61cd70efd8ef680b2eb381115b7ae087",
    "QR": "iVBORw0KGgoAAAANSUhEUgAAASQAAAEkCAYAAACG+UzsAAAAAklEQVR4AewaftIAABT5SURBVO3BQW7kWhLAQFLw/a/M8TJXDxBU5dYfZIT9Yq21XuBirbVe4mKttV7iYq21XuJirbVe4mKtlLtZa6yUu1lrrJS7WWusl/geFgZJLDIJwJgAAAABJRU5ErkJggg=="
  }
}
```

#### Acceder a archivo compartido

```http
GET http://localhost:4000/api/files/open-file?file=bdb8b7dc0dd0d6bb0a3f3c5e816fac7b26347876e66acef3a0ab1bad86f3781d7d9ee1fa5b4a4ea5dbbcff95d7e9c736&dir=Defaultcamidev&signature=405c786fce16ecb6d856447bbbc9917e61cd70efd8ef680b2eb381115b7ae087
```

Este endpoint permite descargar un archivo compartido usando el enlace generado anteriormente.

## Variables de Entorno

Configura las siguientes variables en tu archivo `.env`:

```env
CONEXION_STRING_DATABASE=tu_uri_de_mongodb_produccion
CONEXION_STRING_DATABASE_DEVELOPMENT=tu_uri_de_mongodb_desarrollo
SECRET_KEY=tu_clave_secreta_jwt
HOST=http://localhost:4000
SECRET_HASH=tu_clave_secreta_hash
PRIVATE_EMAIL=tu_email_para_notificaciones
PRIVATE_PASSWORD=tu_contraseña_email
PORT=4000
```

Puedes usar el archivo `.env.example` como referencia para configurar tus variables de entorno.

## Estructura de Directorios del Usuario

Cuando se crea un usuario, se genera automáticamente un directorio base con el formato: `Default{username}`

Ejemplo: Si el usuario es `camidev`, el directorio será `Defaultcamidev`

Este directorio base puede contener subcarpetas para organizar los archivos de forma jerárquica.
