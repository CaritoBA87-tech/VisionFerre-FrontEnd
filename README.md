
## 🛠️ VisionFerre: E-Commerce Inteligente con IA

<p align="left">
  <img src="https://img.shields.io/badge/.NET%208-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET 8" />
  &nbsp; &nbsp;
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  &nbsp; &nbsp;
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" />
</p>

VisionFerre es una ferretería en línea que resuelve el problema de identificar piezas técnicas (tornillería, abrazaderas, anclajes) mediante una imagen, utilizando Inteligencia Artificial.

[![Demo](https://img.shields.io/badge/VisiónFerre_en_vivo-FF9900?style=for-the-badge&logo=google-chrome&logoColor=white)](https://vision-ferre-front-end.vercel.app)

> **Nota:** Por motivos de optimización de costos en AWS, el modelo de **AWS Rekognition** y el asistente **AWS Bedrock** se encuentran pausados. Si desea una demostración en vivo de las capacidades de IA, no dude en contactarme para activarlos.

<br>

### 🚀 Características Principales
**Reconocimiento de Imágenes (IA)**: Los usuarios pueden subir una foto de una pieza física y el sistema utiliza **AWS Rekognition (Custom Labels)** para identificarla y mostrar productos coincidentes en el inventario.

**Asistente Inteligente (IA)**: un chatbot brinda detalles de las especificaciones de los productos disponibles en tiempo real con **AWS Bedrock**.

<br>

### ☁️ Stack Tecnológico

| Tecnología | Uso |
| :--- | :--- |
| **C# / .NET 8 / ADO.NET** | Desarrollo del Backend (Alojado en Railway) |
| **Angular** | Framework para la interfaz de usuario (Alojado en Vercel) | 
| **SQL Server** | Base de datos (Alojada en Somee) |
| **AWS Rekognition (Custom Labels)** | Modelo entrenado con 719 imágenes de piezas de ferretería y 47 etiquetas, con un 93.5% de certeza <kbd>(Actualmente offline para control de costos)</kbd> |
| **AWS Bedrock** | Asistente inteligente que proporciona las especificaciones de los productos disponibles -Modelo *Llama 3.2 1B Instruct*- <kbd> (Disponible bajo solicitud para demostraciones)</kbd> | 
| **AWS S3** | Almacenamiento para las imágenes de los productos |
| **AWS IAM** | Permisos requeridos para acceder a los servicios de AWS desde .NET |
| **Json Web Token** | Autenticación y autorización del usuario |
| **Bootstrap** | Interfaz visual |
| **Arquitectura Multicapa** | 4 capas: API, Lógica, Datos y Entidades |

<br>

### 📩 Contacto

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carolina-bolayna-alvarez-b475b4ba)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:carolinabolayna13@gmail.com)


**Carolina Bolayna Alvarez** 

*Desarrollador fullstack | AWS Certified Cloud Practitioner*


### 📸 Demostración Visual
![Home](assets/img/Screenshots/Home.png)
*Página principal*

