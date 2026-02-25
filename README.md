# Sauce Demo Automation Framework (Senior SDET Level)

Este proyecto es una suite de pruebas automatizadas de nivel empresarial para [SauceDemo](https://www.saucedemo.com). Implementa **Clean Architecture** aplicando patrones como Page Object Model (POM), Business Tasks, y Dependency Injection mediante Custom Fixtures.

## 🚀 Características Principales

- **Arquitectura Multicapa**: Separación clara entre modelos, páginas, tareas de negocio y pruebas.
- **Dependency Injection**: Uso avanzado de Playwright Fixtures para inyectar Page Objects y Tasks.
- **Nomenclatura de Negocio**: Variables y métodos con nombres descriptivos orientados al dominio (e.g., `catalogProducts`, `shoppingCartCounter`).
- **Pruebas Exploratorias (Discovery)**: Detección automatizada de bugs visuales y lógicas inconsistentes.
- **Reporting Senior**: Pasos jerárquicos con `test.step` y anotaciones dinámicas (`test.info().annotations`) para documentar hallazgos.
- **Gestión Automática de Evidencias**: Limpieza automática de reportes y capturas previos antes de cada ejecución.
- **CI/CD Ready**: Configuración preparada para GitHub Actions mediante flujos de trabajo automatizados.

---

## 🛠️ Requisitos Previos

- **Node.js**: Versión 16 o superior.
- **NPM**: Incluido con Node.js.

---

## 📥 Instalación

Sigue este orden para configurar el entorno local:

1. **Clonar/Descargar el repositorio** en una carpeta local.
2. **Instalar dependencias de Node**:
   ```bash
   npm install
   ```
3. **Instalar navegadores de Playwright**:
   ```bash
   npx playwright install chromium --with-deps
   ```

---

## 🏃 Orden de Ejecución e Instrucciones

El framework está configurado para ejecutarse mediante scripts de NPM definidos en `package.json`.

### 1. Ejecutar Suite Completa (Recomendado)
Este comando activa el script `pretest` (limpia evidencias antiguas) y luego corre los 11 escenarios.
```bash
npm test
```

### 2. Ejecutar por Módulos
Si deseas ejecutar una suite específica para debugging o validación rápida:
- **Flujos Guiados (Compra, Login, Detalles)**:
  ```bash
  npm run test:guided
  ```
- **Descubrimientos Exploratorios (Bugs, Persistencia, Reset)**:
  ```bash
  npm run test:random
  ```

### 3. Visualizar Reporte HTML
Después de cualquier ejecución, puedes abrir el reporte detallado generado por Playwright:
```bash
npm run report
```

---

## 📂 Estructura del Proyecto

- `pages/`: Page Object Models con selectores robustos y nombres de negocio.
- `src/tasks/`: Abstracción de lógica de negocio (Business Tasks).
- `src/fixtures/`: Extensión de Playwright `test` para inyección de dependencias.
- `src/models/`: Interfaces de datos (CustomerInfo).
- `data/`: Datos de prueba parametrizados (JSON).
- `tests/`: Especificaciones de pruebas (Specs).
- `evidence/`: Capturas de pantalla de los hallazgos y escenarios finalizados.
- `docs/reports/`: Documentación técnica detallada y reporte de hallazgos.

---

## 🔴 Hallazgos de QA (Reporte de Issues)

El framework ha detectado y documentado automáticamente:
1. **Bug Visual**: Imágenes rotas para el usuario `problem_user`.
2. **Falla de Lógica**: Acceso permitido al checkout con el carrito vacío.
3. **Persistencia**: Comportamiento del carrito tras logout.

Para más detalles, consulta: `RESULTS.md`

---

## ⚙️ CI/CD (GitHub Actions)

El proyecto incluye un pipeline configurado en `.github/workflows/playwright.yml` que:
1. Se activa automáticamente con cada `push` o `pull_request` a las ramas `main` o `master`.
2. Instala dependencias y navegadores en un entorno Ubuntu.
3. Ejecuta la suite completa de pruebas.
4. **Almacena Artifactos**:
   - Guarda el reporte HTML por 30 días.
   - Guarda las capturas de evidencia (`evidence/`) por 7 días incluso si los tests fallan.

> **Nota**: Una vez configurado en GitHub, el reporte estará disponible en `[https://d4chury.github.io/Playwright-Automation-Framework-with-CI-CD/]`.


