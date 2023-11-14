# DriveHub API

La API DriveHub es una plataforma que te permite crear, gestionar y organizar directorios y archivos en tu unidad virtual. Con esta API, podrás realizar diversas operaciones, como crear directorios, agregar archivos, eliminar elementos y mucho más.

## Funcionalidades principales

La API DriveHub ofrece las siguientes funcionalidades principales:

- **Crear directorios**: Puedes crear directorios en tu unidad virtual para organizar tus archivos de manera estructurada.
- **Agregar archivos**: Permite agregar archivos a los directorios existentes en tu unidad virtual.
- **Eliminar elementos**: Puedes eliminar tanto directorios como archivos de tu unidad virtual.
- **Gestionar contenido**: La API te permite acceder y modificar el contenido de los archivos almacenados en los directorios.
- **Recuperación de versiones**: DriveHub ofrece la posibilidad de acceder a versiones anteriores de los archivos almacenados, lo que te permite restaurar contenido previo si es necesario.
- **Acceso seguro**: La API DriveHub utiliza autenticación y autorización para garantizar un acceso seguro a tus datos.

## Instalación

Para comenzar a utilizar la API DriveHub, sigue los siguientes pasos:

1. Clona el repositorio del proyecto desde GitHub:

```bash
git clone https://github.com/tu-usuario/DriveHub.git
```

2. Ingresa al directorio del proyecto:

```bash
cd DriveHub
```

3. Instala las dependencias necesarias utilizando npm:

```bash
npm install
```

4. Configura las variables de entorno necesarias para la API. Puedes encontrar los detalles de configuración en el archivo `.env`.

## Documentación

La documentación completa de la API DriveHub está disponible en [este enlace]([https://drivehub-api-docs.com](https://api-drivehub-production.up.railway.app/api-docs/)](https://api-drivehub-production.up.railway.app/api-docs/)). Aquí encontrarás detalles sobre los diferentes endpoints, los parámetros necesarios, las respuestas esperadas y ejemplos de uso. Te recomendamos revisar la documentación antes de comenzar a utilizar la API.

## Ejemplos de uso

A continuación, se presentan algunos ejemplos básicos de cómo utilizar la API DriveHub:

- **Crear un directorio**:

```bash
POST api/users/createDirectory/:userName

Body:
{
  "nameDriectory": "Directorio Ejemplo"
}
```

- **Agregar un archivo a un directorio**:

```bash
POST /api/users/addFields/:userName/:nameDirectory
Body:
{
  "gallery": "Contenido del archivo"
}
```

- **Eliminar un directorio**:

```bash
DELETE /api/users/deleteDirectory/:userName/:nameDirectory
```

- **Eliminar un archivo**:

```bash
DELETE /deleteFiles/:userName/:nameDirectory
Body:
{
  "fields": ["nameFiles"]
}
```

Estos son solo ejemplos básicos, y hay muchas más operaciones y opciones disponibles en la API DriveHub.

## Contribuciones

Si deseas contribuir al desarrollo de la API DriveHub, ¡eres bienvenido! Puedes abrir un issue en GitHub para informar sobre problemas o sugerencias, o enviar un pull request con tus mejoras propuestas.

¡Gracias por utilizar la API DriveHub! Esperamos que esta herramienta sea útil para tus necesidades de gestión de archivos y directorios en tu unidad virtual.
