# Instrucciones para Actualizar el Sitio en Producción

## Archivos que DEBES subir al servidor

### 1. Archivo principal actualizado:
- `espuma-afff.html`

### 2. Carpeta completa de productos:
- `productos/espuma-afff/` (toda la carpeta con subcarpetas)
  - `productos/espuma-afff/img-espuma-afff/` (24 imágenes .webp)
  - `productos/espuma-afff/producto-extintor-espuma-afff-6L.html`
  - `productos/espuma-afff/producto-extintor-espuma-afff-9L.html`
  - `productos/espuma-afff/producto-extintor-espuma-afff-11L.html`
  - `productos/espuma-afff/producto-extintor-espuma-afff-15L.html`
  - `productos/espuma-afff/producto-extintor-espuma-afff-18L.html`
  - `productos/espuma-afff/producto-extintor-espuma-afff-20L.html`

### 3. Otras carpetas de productos (si has hecho cambios):
- `productos/agentes-limpios/`
- `productos/polvo-quimico-seco/`
- `productos/co2/`
- `productos/agua-presion/`
- `productos/tipo-k/`

## Método de Subida

### Opción A: FTP/SFTP (FileZilla, Cyberduck, etc.)
1. Conectarte a tu servidor FTP
2. Navegar a la carpeta raíz del sitio web
3. Subir `espuma-afff.html` a la raíz
4. Subir la carpeta `productos/` completa (sobrescribir archivos existentes)

### Opción B: cPanel File Manager
1. Iniciar sesión en cPanel
2. Abrir "Administrador de archivos"
3. Navegar a `public_html/` (o la carpeta donde está tu sitio)
4. Subir `espuma-afff.html`
5. Subir carpeta `productos/` completa

### Opción C: Git/GitHub (si lo usas)
```bash
git add espuma-afff.html
git add productos/
git commit -m "Actualizar imágenes de espuma AFFF"
git push origin main
```

## Limpiar Caché del Navegador

Después de subir los archivos, limpia el caché:

### Chrome/Edge:
- Ctrl + Shift + Delete (Windows/Linux)
- Cmd + Shift + Delete (Mac)
- Seleccionar "Imágenes y archivos en caché"

### Firefox:
- Ctrl + Shift + Delete
- Seleccionar "Caché"

### Safari:
- Cmd + Option + E (vaciar caché)

### O forzar recarga:
- Ctrl + F5 (Windows/Linux)
- Cmd + Shift + R (Mac)

## Verificar que funcionó

1. Visitar: https://mantenimientodeextintores.mx/espuma-afff.html
2. Abrir DevTools (F12)
3. Ir a la pestaña "Network"
4. Recargar la página (F5)
5. Verificar que las imágenes .webp se cargan correctamente (código 200)
6. Revisar que no haya errores 404

## Notas Importantes

- ✅ Los cambios YA funcionan en local (puerto 5500)
- ✅ Webpack config actualizado (para uso futuro)
- ⚠️ DEBES subir la carpeta productos/ completa al servidor
- ⚠️ Verifica los permisos de las carpetas (chmod 755)
- ⚠️ Verifica los permisos de los archivos (chmod 644)
