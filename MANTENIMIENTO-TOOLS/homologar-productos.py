#!/usr/bin/env python3
"""
Script para homologar todos los productos del catálogo.
Embebe el menu y footer directamente en cada HTML de producto.
"""

import os
import re
from pathlib import Path

# Directorio base
BASE_DIR = Path("/Users/carsolio/Desktop/PAGINAS-HTML/MANTENIMIENTO-DE-EXTINTORES")
PRODUCTOS_DIR = BASE_DIR / "productos"

# Archivo ya homologado que usaremos como referencia (excluir)
ARCHIVO_YA_HOMOLOGADO = "producto-extintor-tipo-k-1-6gal.html"

def get_base_path(file_path):
    """Determina el basePath según la profundidad del archivo."""
    rel_path = file_path.relative_to(PRODUCTOS_DIR)
    depth = len(rel_path.parts) - 1  # -1 porque el archivo en sí no cuenta
    if depth == 0:
        return "../"
    else:
        return "../" * (depth + 1)

def get_header_html(base_path):
    """Genera el HTML del header con las rutas correctas."""
    return f'''<!-- Menu de Navegación -->
<header class="header">
  <div class="container">
    <nav class="navbar">
      <div class="logo">
        <a href="https://mantenimientodeextintores.mx/">
          <img src="{base_path}img/img-index/venta-y-mantenimiento-de-extintores.webp" alt="MANEXT - Mantenimiento de Extintores" class="logo-img">
        </a>
      </div>

      <button class="menu-toggle" aria-label="Abrir menú" id="menuToggle">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="menu-overlay" id="menuOverlay"></div>

      <ul class="nav-menu" id="navMenu">
        <li class="dropdown">
          <a href="{base_path}servicios.html" class="nav-link dropdown-toggle">Servicios <span class="arrow">▼</span></a>
          <ul class="dropdown-menu">
            <li><a href="{base_path}venta-de-extintores.html">Venta de Extintores</a></li>
            <li><a href="{base_path}mantenimiento-preventivo.html">Mantenimiento Preventivo</a></li>
            <li><a href="{base_path}recarga-de-extintores.html">Recarga de Extintores</a></li>
            <li><a href="{base_path}prueba-hidrostatica.html">Prueba Hidrostática</a></li>
            <li><a href="{base_path}capacitacion-brigadas.html">Capacitación y Brigadas</a></li>
            <li><a href="{base_path}senalizacion.html">Señalización</a></li>
          </ul>
        </li>
        <li><a href="{base_path}extintores.html" class="nav-link">Extintores</a></li>
        <li class="dropdown">
          <a href="{base_path}catalogo.html" class="nav-link dropdown-toggle">Catálogo <span class="arrow">▼</span></a>
          <ul class="dropdown-menu">
            <li><a href="{base_path}catalogo.html"><strong>Ver Catálogo Completo</strong></a></li>
            <li><a href="{base_path}polvo-quimico-seco.html">Polvo Químico Seco (PQS)</a></li>
            <li><a href="{base_path}co2.html">Dióxido de Carbono (CO2)</a></li>
            <li><a href="{base_path}agua-presion.html">Agua a Presión</a></li>
            <li><a href="{base_path}tipo-k.html">Agente Húmedo (Tipo K)</a></li>
            <li><a href="{base_path}espuma-afff.html">Espuma (AFFF)</a></li>
            <li><a href="{base_path}agentes-limpios.html">Agentes Limpios</a></li>
          </ul>
        </li>
        <li><a href="{base_path}nosotros.html" class="nav-link">Nosotros</a></li>
        <li><a href="{base_path}blog.html" class="nav-link">Blog</a></li>
        <li><a href="{base_path}contacto.html" class="nav-link">Contacto</a></li>
        <li><a href="tel:5539689272" class="nav-link nav-phone">55 3968 9272</a></li>
      </ul>
    </nav>
  </div>
</header>'''

def get_footer_html(base_path):
    """Genera el HTML del footer con las rutas correctas."""
    return f'''<footer>
  <div class="footer-container">

    <!-- Columna 1 - Marca y Contacto -->
    <div class="footer-col">
      <h4>MANEXT</h4>
      <p>Protegiendo a México desde 1943</p>
      <p>Especialistas en mantenimiento, recarga y venta de extintores.</p>

      <p style="margin-top: 1.5rem;"><strong>Contacto:</strong></p>
      <p class="footer-phone"><a href="tel:5539689272">55 3968 9272</a></p>
      <p class="footer-whatsapp"><a href="https://wa.me/5215539689272" target="_blank" rel="noopener">WhatsApp</a></p>

      <p style="margin-top: 1rem;"><strong>Horario:</strong><br>
      Lun-Vie: 8:00-18:00<br>
      Sáb: 9:00-14:00</p>
    </div>

    <!-- Columna 2 - Servicios -->
    <div class="footer-col">
      <h4>Servicios</h4>
      <p><a href="{base_path}venta-de-extintores.html">Venta de Extintores</a></p>
      <p><a href="{base_path}mantenimiento-preventivo.html">Mantenimiento Preventivo</a></p>
      <p><a href="{base_path}recarga-de-extintores.html">Recarga de Extintores</a></p>
      <p><a href="{base_path}prueba-hidrostatica.html">Prueba Hidrostática</a></p>
      <p><a href="{base_path}capacitacion-brigadas.html">Capacitación y Brigadas</a></p>
      <p><a href="{base_path}senalizacion.html">Señalización</a></p>
    </div>

    <!-- Columna 3 - Tipos de Extintores -->
    <div class="footer-col">
      <h4>Tipos de Extintores</h4>
      <p><a href="{base_path}polvo-quimico-seco.html">Polvo Químico Seco</a></p>
      <p><a href="{base_path}co2.html">CO2 (Dióxido de Carbono)</a></p>
      <p><a href="{base_path}agua-presion.html">Agua a Presión</a></p>
      <p><a href="{base_path}tipo-k.html">Tipo K (Cocinas)</a></p>
      <p><a href="{base_path}espuma-afff.html">Espuma AFFF</a></p>
      <p><a href="{base_path}agentes-limpios.html">Agentes Limpios</a></p>
    </div>

    <!-- Columna 4 - Navegación y Recursos -->
    <div class="footer-col">
      <h4>Navegación</h4>
      <p><a href="{base_path}index.html">Inicio</a></p>
      <p><a href="{base_path}servicios.html">Servicios</a></p>
      <p><a href="{base_path}extintores.html">Extintores</a></p>
      <p><a href="{base_path}nosotros.html">Nosotros</a></p>
      <p><a href="{base_path}blog.html">Blog</a></p>
      <p><a href="{base_path}contacto.html">Contacto</a></p>

      <p style="margin-top: 1.5rem;"><strong>Recursos:</strong></p>
      <p><a href="{base_path}catalogo.html">Catálogo Digital</a></p>
      <p><a href="{base_path}preguntas-frecuentes.html">FAQ</a></p>
      <p><a href="{base_path}terminos.html">Términos</a></p>
      <p><a href="{base_path}privacidad.html">Privacidad</a></p>
    </div>

  </div>

  <div class="footer-bottom">
    <div class="footer-bottom-container">
      <p>&copy; 2025 MANEXT - Mantenimiento de Extintores. Todos los derechos reservados.</p>
      <p><strong>Protegiendo a México desde 1943</strong> | Certificaciones: NOM-154-SCFI, NOM-002-STPS</p>
      <p>Especialistas en mantenimiento, recarga y venta de extintores en CDMX y Área Metropolitana</p>
      <p class="footer-legal">
        <a href="{base_path}privacidad.html">Política de Privacidad</a> |
        <a href="{base_path}terminos.html">Términos y Condiciones</a> |
        <a href="{base_path}sitemap.xml">Mapa del Sitio</a>
      </p>
    </div>
  </div>
</footer>'''

def get_scripts_html(base_path):
    """Genera los scripts necesarios."""
    return f'''<script>
// Menu Toggle
(function() {{
  'use strict';
  var menuToggle = document.getElementById('menuToggle');
  var navMenu = document.getElementById('navMenu');
  var menuOverlay = document.getElementById('menuOverlay');
  var body = document.body;
  var dropdowns = document.querySelectorAll('.dropdown');

  if (!menuToggle || !navMenu || !menuOverlay) return;

  function openMenu() {{
    navMenu.classList.add('active');
    menuToggle.classList.add('active');
    menuOverlay.classList.add('active');
    body.classList.add('menu-open');
  }}

  function closeMenu() {{
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
    dropdowns.forEach(function(dropdown) {{
      dropdown.classList.remove('active');
    }});
  }}

  menuToggle.addEventListener('click', function(e) {{
    e.preventDefault();
    e.stopPropagation();
    if (navMenu.classList.contains('active')) {{
      closeMenu();
    }} else {{
      openMenu();
    }}
  }});

  menuOverlay.addEventListener('click', function() {{
    closeMenu();
  }});

  dropdowns.forEach(function(dropdown) {{
    var dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    if (dropdownToggle) {{
      dropdownToggle.addEventListener('click', function(e) {{
        if (window.innerWidth <= 768) {{
          e.preventDefault();
          e.stopPropagation();
          var isActive = dropdown.classList.contains('active');
          dropdowns.forEach(function(otherDropdown) {{
            if (otherDropdown !== dropdown) {{
              otherDropdown.classList.remove('active');
            }}
          }});
          if (isActive) {{
            dropdown.classList.remove('active');
          }} else {{
            dropdown.classList.add('active');
          }}
        }}
      }});
    }}
  }});

  var navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  navLinks.forEach(function(link) {{
    link.addEventListener('click', function() {{
      closeMenu();
    }});
  }});

  var dropdownLinks = navMenu.querySelectorAll('.dropdown-menu a');
  dropdownLinks.forEach(function(link) {{
    link.addEventListener('click', function() {{
      closeMenu();
    }});
  }});

  navMenu.addEventListener('click', function(e) {{
    e.stopPropagation();
  }});

  document.addEventListener('keydown', function(e) {{
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {{
      closeMenu();
    }}
  }});

  var resizeTimer;
  window.addEventListener('resize', function() {{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {{
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {{
        closeMenu();
      }}
    }}, 250);
  }});
}})();

// Cambiar imagen principal de la galería
function changeImage(thumbnail, imgSrc) {{
  document.getElementById('mainImage').src = imgSrc;
  var thumbnails = document.querySelectorAll('.product-thumbnail');
  thumbnails.forEach(function(thumb) {{
    thumb.classList.remove('active');
  }});
  thumbnail.classList.add('active');
}}
</script>
<script src="{base_path}js/app.js"></script>'''

def process_product_file(file_path):
    """Procesa un archivo de producto para homologarlo."""
    # Excluir archivo ya homologado
    if file_path.name == ARCHIVO_YA_HOMOLOGADO:
        print(f"  Saltando (ya homologado): {file_path.name}")
        return False

    # Excluir archivos que no son de producto
    if not file_path.name.startswith("producto-"):
        print(f"  Saltando (no es producto): {file_path.name}")
        return False

    base_path = get_base_path(file_path)

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Verificar si ya está homologado (tiene el header embebido)
    if '<!-- Menu de Navegación -->' in content and '<header class="header">' in content:
        print(f"  Saltando (ya tiene header embebido): {file_path.name}")
        return False

    # Verificar que tenga el contenedor de menu para reemplazar
    if '<div id="menu-container"></div>' not in content:
        print(f"  Advertencia: No se encontró menu-container en {file_path.name}")
        return False

    # 1. Reemplazar el menu-container con el header embebido
    header_html = get_header_html(base_path)
    content = content.replace(
        '<!-- MENU (se cargará dinámicamente) -->\n    <div id="menu-container"></div>',
        header_html
    )
    content = content.replace(
        '<div id="menu-container"></div>',
        header_html
    )

    # 2. Reemplazar el footer-container con el footer embebido
    footer_html = get_footer_html(base_path)
    content = content.replace(
        '<!-- FOOTER (se cargará dinámicamente) -->\n    <div id="footer-container"></div>',
        footer_html
    )
    content = content.replace(
        '<div id="footer-container"></div>',
        footer_html
    )

    # 3. Eliminar los preloads de menu.html y footer.html
    content = re.sub(
        r'<link rel="preload" href="[^"]*menu\.html[^"]*" as="fetch"[^>]*>\s*',
        '',
        content
    )
    content = re.sub(
        r'<link rel="preload" href="[^"]*footer\.html[^"]*" as="fetch"[^>]*>\s*',
        '',
        content
    )

    # 4. Eliminar los scripts de fetch duplicados y el script de app.js existente
    # Primero eliminar bloques de script que cargan menu/footer via fetch
    content = re.sub(
        r'<script>\s*const basePath = [\'"][^"\']+[\'"];\s*//.*?fetch.*?</script>',
        '',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'<script>\s*//\s*Cargar menu y ajustar rutas\s*fetch.*?</script>',
        '',
        content,
        flags=re.DOTALL
    )

    # Eliminar script de app.js existente (lo añadiremos con los nuevos scripts)
    content = re.sub(
        r'<script src="[^"]*js/app\.js[^"]*"></script>\s*',
        '',
        content
    )

    # 5. Añadir los nuevos scripts antes de </body>
    scripts_html = get_scripts_html(base_path)
    content = content.replace('</body>', f'{scripts_html}\n</body>')

    # 6. Limpiar líneas vacías múltiples
    content = re.sub(r'\n{3,}', '\n\n', content)

    # Guardar el archivo
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✓ Homologado: {file_path.name}")
    return True

def main():
    """Función principal."""
    print("=" * 60)
    print("HOMOLOGACIÓN DE PRODUCTOS - MANEXT")
    print("=" * 60)

    # Encontrar todos los archivos HTML de productos
    product_files = list(PRODUCTOS_DIR.rglob("producto-*.html"))

    print(f"\nEncontrados {len(product_files)} archivos de productos")
    print("-" * 60)

    homologados = 0
    saltados = 0

    for file_path in sorted(product_files):
        rel_path = file_path.relative_to(PRODUCTOS_DIR)
        print(f"\nProcesando: {rel_path}")

        if process_product_file(file_path):
            homologados += 1
        else:
            saltados += 1

    print("\n" + "=" * 60)
    print(f"RESUMEN:")
    print(f"  - Archivos homologados: {homologados}")
    print(f"  - Archivos saltados: {saltados}")
    print("=" * 60)

if __name__ == "__main__":
    main()
