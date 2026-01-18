<div align="center">
  <img src="landing/img/logo.png" alt="AndesRider Logo" width="150" />
  <h1>🏍️ AndesRider Motors</h1>
  <p><strong>Potencia para tu ruta diaria</strong></p>
  <p>Plataforma Full-Stack de gestión y venta para motocicletas urbanas, doble propósito y servicios de taller mecánico.</p>

[![Java](https://img.shields.io/badge/Java-25-orange?style=for-the-badge&logo=java)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.2.1-brightgreen?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![SQLite](https://img.shields.io/badge/SQLite-3-blue?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 📋 Descripción del Proyecto

AndesRider Motors es una solución integral que combina una **Landing Page** moderna y responsiva con un sistema de gestión robusto (**CRUD**) para el catálogo de productos.

Permite a los usuarios explorar una amplia gama de motocicletas y servicios, mientras ofrece a los administradores una interfaz sencilla para gestionar el inventario en tiempo real a través de una API RESTful construida con Spring Boot.

<div align="center">
  <img src="landing/img/landing.png" alt="AndesRider Landing" width="800" />
</div>

---

## 🚀 Características Principales

### 💻 Frontend (Cliente)

- **Diseño Responsivo:** Completamente adaptable a móviles, tablets y escritorio.
- **Tema Dinámico:** Soporte para Modo Claro/Oscuro (Dark Mode) con persistencia en `localStorage`.
- **Catálogo Interactivo:** Búsqueda dinámica, filtrado por categorías y ordenamiento de productos.
- **Gestión CRUD:** Interfaz intuitiva basada en modales para Crear, Editar y Eliminar productos.
- **Formularios con Validación:** Notificaciones tipo "Toast" para feedback inmediato del usuario.

### ⚙️ Backend (Servidor)

- **API RESTful:** Endpoints optimizados para la gestión de productos y contactos.
- **Arquitectura MVC:** Separación clara de responsabilidades (Model-View-Controller).
- **Persistencia:** Uso de Spring Data JPA con soporte para SQLite y H2.
- **Seguridad CORS:** Configuración para permitir conexiones seguras desde el frontend.

---

## 📂 Estructura del Proyecto

```text
.
├── landing/                # Archivos del Frontend
│   ├── index.html          # Estructura principal
│   ├── styles.css          # Estilos CSS y variables de diseño
│   ├── index.js            # Lógica de la interfaz y UI
│   ├── crud.js             # Servicios de Fetch para la API
│   └── img/                # Activos visuales (Logo, Banners)
├── src/                    # Código fuente del Backend (Java)
│   ├── main/java/...       # Controladores, Modelos, Repositorios, DTOs
│   └── main/resources/     # Configuración de Spring (application.properties)
├── pom.xml                 # Gestión de dependencias (Maven)
├── andesrider.db           # Base de Datos SQLite
└── README.md               # Documentación general
```

---

## 🛠️ Tecnologías Utilizadas

| Área              | Tecnologías                                           |
| :---------------- | :---------------------------------------------------- |
| **Frontend**      | HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+), jQuery |
| **Backend**       | Java 17, Spring Boot 3.x, Maven                       |
| **Base de Datos** | SQLite / H2 (In-memory)                               |
| **Herramientas**  | Git, Maven Wrapper, Visual Studio Code                |

---

## ⚙️ Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto localmente.

### 1. Requisitos Previos

- **JDK 17** o superior instalado.
- **Maven** (opcional, se incluye `mvnw`).

### 2. Ejecutar el Backend

Desde la raíz del proyecto, ejecuta:

```bash
./mvnw spring-boot:run
```

El servidor estará disponible en `http://localhost:8080`.

### 3. Ejecutar el Frontend

Navega a la carpeta `/landing` y abre `index.html` en tu navegador.

> [!TIP]
> Se recomienda usar la extensión **Live Server** de VS Code para evitar problemas de caché y disfrutar de recarga automática.

---

## 🔗 Documentación de la API

| Método   | Endpoint             | Descripción                                     |
| :------- | :------------------- | :---------------------------------------------- |
| `GET`    | `/api/products`      | Lista todos los productos disponibles.          |
| `GET`    | `/api/products/{id}` | Obtiene los detalles de un producto específico. |
| `POST`   | `/api/products`      | Crea un nuevo producto.                         |
| `PUT`    | `/api/products/{id}` | Actualiza un producto existente.                |
| `DELETE` | `/api/products/{id}` | Elimina un producto.                            |
| `GET`    | `/api/contacts`      | Lista todos los mensajes de contacto.           |
| `POST`   | `/api/contacts`      | Envía un nuevo formulario de contacto.          |

---

## 📄 Licencia

Este proyecto es de uso académico y demostrativo para **AndesRider Motors**.

---

<div align="center">
  <sub>Desarrollado con ❤️ para la comunidad motera.</sub>
</div>
