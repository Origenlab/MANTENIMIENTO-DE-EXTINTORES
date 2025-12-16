#!/usr/bin/env python3
"""
Script para generar páginas de categoría del blog automáticamente.
Lee las categorías desde data/articles.json y genera las páginas HTML.
"""

import json
import os
from pathlib import Path

# Directorio base
BASE_DIR = Path(__file__).parent.parent
BLOG_DIR = BASE_DIR / 'blog'
DATA_FILE = BASE_DIR / 'data' / 'articles.json'

# Template de categoría
CATEGORY_TEMPLATE = '''<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{name} | Blog MANEXT</title>

    <!-- Preload -->
    <link rel="preload" href="../menu.html" as="fetch" crossorigin>
    <link rel="preload" href="../footer.html" as="fetch" crossorigin>
    <link rel="preload" href="../data/articles.json" as="fetch" crossorigin>

    <!-- CSS -->
    <link rel="stylesheet" href="../css/style.css?v=15">
    <link rel="stylesheet" href="../css/blog-system.css?v=1">

    <meta name="description" content="{description} - Blog MANEXT sobre protección contra incendios en CDMX."/>

    <meta property="og:title" content="{name} - Blog MANEXT" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://mantenimientodeextintores.mx/blog/{slug}.html" />
    <meta property="og:image" content="../img/og-image.jpg" />

    <link rel="icon" href="../favicon.ico" sizes="any">
    <link rel="icon" href="../icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="../icon.png">
    <link rel="manifest" href="../site.webmanifest">
    <meta name="theme-color" content="#d32f2f">
  </head>

  <body>
    <!-- MENU -->
    <div id="menu-container"></div>

    <!-- BREADCRUMBS -->
    <nav class="breadcrumbs" aria-label="Navegación">
      <div class="container">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item">
            <a href="../index.html">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              Inicio
            </a>
          </li>
          <li class="breadcrumb-item">
            <a href="../blog.html">Blog</a>
          </li>
          <li class="breadcrumb-item">
            <span>{name}</span>
          </li>
        </ol>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero" style="padding: 3rem 0;">
      <div class="container">
        <div style="text-align: center; max-width: 800px; margin: 0 auto;">
          <span class="category-badge" style="background: {color}; color: white; padding: 0.5rem 1.2rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-bottom: 1rem;">{name}</span>
          <h1 class="hero-title">{name}</h1>
          <p class="hero-subtitle">{description}</p>
        </div>
      </div>
    </section>

    <!-- ARTÍCULOS -->
    <section class="blog-section">
      <div class="container">
        <div class="blog-layout">
          <!-- CONTENIDO PRINCIPAL -->
          <main id="articles-container" class="blog-main">
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
              <p>Cargando artículos...</p>
            </div>
          </main>

          <!-- SIDEBAR -->
          <aside class="blog-sidebar">
            <!-- Buscador -->
            <div class="sidebar-widget search-widget">
              <h3 class="widget-title">Buscar Artículos</h3>
              <form class="search-form">
                <input type="search" placeholder="Buscar..." class="search-input">
                <button type="submit" class="search-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </form>
            </div>

            <!-- Categorías -->
            <div class="sidebar-widget">
              <h3 class="widget-title">Categorías</h3>
              <ul class="categories-list">
{categories_list}
              </ul>
            </div>

            <!-- Artículos Populares -->
            <div class="sidebar-widget">
              <h3 class="widget-title">Otros Artículos Populares</h3>
              <div id="popular-articles" class="popular-posts">
                <!-- Se cargan dinámicamente -->
              </div>
            </div>

            <!-- CTA -->
            <div class="sidebar-widget cta-widget">
              <h3 class="widget-title">¿Necesitas Asesoría?</h3>
              <p>Cotiza tu proyecto de protección contra incendios sin compromiso</p>
              <a href="../contacto.html" class="sidebar-cta-btn">Contactar Ahora</a>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <div id="footer-container"></div>

    <!-- Scripts -->
    <script>
      const basePath = '../';

      // Cargar menu
      fetch(basePath + 'menu.html')
        .then(response => response.text())
        .then(data => {{
          let adjustedData = data
            .replace(/src="(?!http|https|\\/\\/)([^"]+)"/g, 'src="' + basePath + '$1"')
            .replace(/href="(?!http|https|tel:|mailto:|#|\\/\\/)([^"]+)"/g, 'href="' + basePath + '$1"');
          document.getElementById('menu-container').innerHTML = adjustedData;

          const scripts = document.getElementById('menu-container').querySelectorAll('script');
          scripts.forEach(oldScript => {{
            const newScript = document.createElement('script');
            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
          }});
        }});

      // Cargar footer
      fetch(basePath + 'footer.html')
        .then(response => response.text())
        .then(data => {{
          let adjustedData = data
            .replace(/src="(?!http|https|\\/\\/)([^"]+)"/g, 'src="' + basePath + '$1"')
            .replace(/href="(?!http|https|tel:|mailto:|#|\\/\\/)([^"]+)"/g, 'href="' + basePath + '$1"');
          document.getElementById('footer-container').innerHTML = adjustedData;
        }});
    </script>

    <!-- Blog System para Categoría -->
    <script src="../js/blog-system.js?v=1"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {{
        ManextBlog.initCategory('{id}');
      }});
    </script>
    <script src="../js/app.js"></script>
  </body>
</html>
'''

def generate_categories_list(categories, current_slug):
    """Genera la lista HTML de categorías para el sidebar."""
    lines = []
    for cat in categories:
        active = ' class="active"' if cat['slug'] == current_slug else ''
        lines.append(f'                <li><a href="{cat["slug"]}.html"{active}>{cat["name"]}</a></li>')
    return '\n'.join(lines)

def main():
    print("=" * 60)
    print("GENERADOR DE PÁGINAS DE CATEGORÍA")
    print("=" * 60)

    # Crear directorio scripts si no existe
    os.makedirs(BASE_DIR / 'scripts', exist_ok=True)

    # Leer datos del JSON
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    categories = data['categories']

    # Crear directorio blog si no existe
    os.makedirs(BLOG_DIR, exist_ok=True)

    # Generar cada página de categoría
    for category in categories:
        categories_list = generate_categories_list(categories, category['slug'])

        html_content = CATEGORY_TEMPLATE.format(
            id=category['id'],
            name=category['name'],
            slug=category['slug'],
            description=category['description'],
            color=category['color'],
            categories_list=categories_list
        )

        output_file = BLOG_DIR / f"{category['slug']}.html"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html_content)

        print(f"[OK] Generado: blog/{category['slug']}.html")

    print("\n" + "=" * 60)
    print(f"TOTAL: {len(categories)} páginas de categoría generadas")
    print("=" * 60)

if __name__ == '__main__':
    main()
