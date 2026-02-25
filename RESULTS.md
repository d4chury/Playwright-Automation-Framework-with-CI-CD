# Reporte de Issues y Escenarios Fallidos - Sauce Demo

Este documento detalla los hallazgos encontrados durante la fase de automatización exploratoria y guiada.

## 🔴 Issues Encontrados

### 1. Bug Visual: Problem User (Imágenes Rotas)
- **Descripción**: Al ingresar con el usuario `problem_user`, todas las imágenes del catálogo de productos muestran una imagen de error estática (`sl-404`).
- **Impacto**: Experiencia de usuario degradada y falta de información visual sobre los productos.
- **Evidencia**: `evidence/discovery_visual_bug_...png`.
- **Reproducción**: Login con `problem_user` -> Revisar lista de productos.

### 2. Navegación a Checkout con Carrito Vacío
- **Descripción**: El sistema permite al usuario navegar directamente a `checkout-step-one.html` incluso si el carrito tiene 0 productos.
- **Impacto**: Flujo de negocio incoherente.
- **Evidencia**: Ver logs de `guided-exploration.spec.ts`.

### 3. Persistencia de Sesión (Inconsistencia)
- **Descripción**: El carrito mantiene los productos después de un Logout y Login inmediato.
- **Evidencia**: Log: `Persistence badge count is 1`.

## 🟡 Escenarios Adicionales Implementados
- **Product Detail Consistency**: Validación de integridad de datos entre catálogo y detalle.
- **Reset App State**: Validación de limpieza de estado del sistema.

## 📁 Gestión de Evidencias
- El proyecto limpia automáticamente las evidencias previas.
