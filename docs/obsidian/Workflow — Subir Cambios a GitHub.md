---
proyecto: MANEXT
tipo: workflow-operativo
estado: vigente
actualizado: 2026-07-15
repo: Origenlab/MANTENIMIENTO-DE-EXTINTORES
produccion: https://mantenimientodeextintores.mx/
tags:
  - manext
  - github
  - cloudflare-pages
  - deploy
---

# Workflow — Subir Cambios a GitHub

## Convención permanente

Cuando Frank indique **“commit y push”**, el trabajo se considera terminado únicamente cuando:

1. Los cambios aprobados están validados y confirmados en Git.
2. La rama correspondiente está publicada.
3. Los cambios están integrados en `main`.
4. El workflow **Deploy to Cloudflare Pages** terminó correctamente.
5. El dominio `mantenimientodeextintores.mx` sirve el SHA integrado.

Un commit local, un push de rama o un Pull Request abierto no equivalen por sí solos a tener la página live.

## Datos operativos

- Ruta local: `/Users/frankoropeza/Documents/Claude/Projects/MANEXT`
- Repositorio: `https://github.com/Origenlab/MANTENIMIENTO-DE-EXTINTORES.git`
- Cuenta GitHub: `Origenlab`
- Rama de producción: `main`
- Workflow: `.github/workflows/deploy.yml`
- Proyecto Cloudflare Pages: `manext`
- Dominio: `https://mantenimientodeextintores.mx/`
- Huella de producción: `https://mantenimientodeextintores.mx/build-id.txt`

## Procedimiento

### 1. Verificar alcance y estado

```bash
git status -sb
git diff --check
```

No incluir cambios ajenos al trabajo aprobado.

### 2. Ejecutar el gate técnico

```bash
npm run build
npm test
npx astro check
git diff --check
```

No continuar con fallos. Los hints preexistentes de Astro deben registrarse, pero cualquier error o warning nuevo se corrige antes de publicar.

### 3. Commit y publicación de rama

```bash
git add <rutas-aprobadas>
git commit -m "descripción concreta"
git push -u origin <rama>
```

Si el trabajo usa una rama de función, abrir o actualizar su Pull Request hacia `main`.

### 4. Integrar en producción

- Confirmar que el PR sea fusionable y que los checks requeridos estén verdes.
- Fusionar el PR en `main` con el método aprobado por el repositorio.
- Obtener el SHA exacto resultante en `main`.

### 5. Vigilar el despliegue

El push a `main` activa **Deploy to Cloudflare Pages**. Supervisar el run hasta su conclusión y revisar los logs si falla.

```bash
gh run list --repo Origenlab/MANTENIMIENTO-DE-EXTINTORES --branch main --limit 5
gh run watch <run-id> --repo Origenlab/MANTENIMIENTO-DE-EXTINTORES --exit-status
```

### 6. Verificar el dominio live

```bash
git ls-remote origin refs/heads/main
curl -fsSL "https://mantenimientodeextintores.mx/build-id.txt?cb=$(date +%s)"
```

La huella devuelta por el dominio debe coincidir con el SHA de `origin/main`. Después, revisar la URL pública afectada y confirmar que responde correctamente.

## Manejo de fallos

- Autenticación: comprobar `gh auth status`; la cuenta activa debe ser `Origenlab`.
- CI rojo: revisar el job y corregir la causa antes de volver a fusionar o desplegar.
- Deploy verde pero SHA distinto: esperar la propagación prevista por el workflow y volver a comprobar; si persiste, revisar dominio, proyecto y logs de Cloudflare.
- Nunca declarar “live” basándose únicamente en el build local o en un preview de rama.

#workflow #git #github #cloudflare #MANEXT
