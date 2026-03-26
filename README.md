
# 🛠️ VisionFerre: E-Commerce Inteligente con IA

![.NET 8](https://img.shields.io/badge/.NET-8-512bd4?logo=dotnet) ![Angular](https://img.shields.io/badge/Angular-16-dd0031?logo=angular) ![AWS](https://img.shields.io/badge/AWS-Powered-ff9900?logo=amazons3)
VisionFerre es una ferretería en línea que resuelve el problema de identificar piezas técnicas (tornillería, abrazaderas, anclajes) mediante una imagen, utilizando Inteligencia Artificial.

## 🚀 Características Principales
**Reconocimiento de Imágenes (IA)**: Los usuarios pueden subir una foto de una pieza física y el sistema utiliza $\color{blue}{\text{AWS Rekognition (Custom Labels)}}$ para identificarla y mostrar productos coincidentes en el inventario.

**Asistente Inteligente (IA)**: un chatbot brinda detalles de las especificaciones de los productos en tiempo real con $\color{blue}{\text{AWS Bedrock}}$.

## ☁️ Stack Tecnológico

| Tecnología | Uso |
| :--- | :--- |
| **C# / .NET Core 8 / ADO.NET** | Desarrollo del Backend (Alojado en Railway) |
| **Angular** | Framework para la interfaz de usuario (Alojado en Vercel) | 
| **SQL Server** | Base de datos (Alojada en Somee) |
| **AWS Rekognition (Custom Labels)** | Modelo entrenado con 719 imágenes de piezas y 47 etiquetas, con un 93.5% de certeza |
| **AWS Bedrock** | Asistente inteligente (Modelo Llama 3.2 1B Instruct) | 
| **AWS S3** | Almacenamiento para las imágenes de los productos |
| **AWS IAM** | Permisos requeridos para acceder a los servicios de AWS desde .NET |
| **Json Web Token** | Autenticación y autorización del usuario |
| **Bootstrap** | Interfaz visual |
