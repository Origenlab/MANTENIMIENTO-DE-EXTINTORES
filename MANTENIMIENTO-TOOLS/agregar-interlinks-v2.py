#!/usr/bin/env python3
"""
AGREGAR INTERLINKS V2 - Script robusto para agregar interlinking a todos los articulos
"""

import os
import re
from pathlib import Path

BASE_DIR = Path('/Users/carsolio/Desktop/PAGINAS-HTML/MANTENIMIENTO-DE-EXTINTORES')
BLOG_DIR = BASE_DIR / 'blog'

# Mapa de articulos con sus interlinks
ARTICULOS = {
    'como-elegir-extintor-correcto-negocio-cdmx': {
        'categoria': 'seguridad-contra-incendios',
        'titulo_corto': 'Como Elegir Extintor',
        'relacionados': [
            ('tipos-de-extintores', 'extintor-polvo-quimico-seco-pqs-usos-ventajas', 'Extintor PQS: Usos y Ventajas'),
            ('normativas-y-certificaciones', 'nom-154-scfi-guia-completa-cumplimiento-extintores', 'Guia NOM-154-SCFI'),
            ('seguridad-contra-incendios', 'venta-extintores-cdmx-guia-compra-empresas', 'Venta de Extintores CDMX'),
        ]
    },
    'venta-extintores-cdmx-guia-compra-empresas': {
        'categoria': 'seguridad-contra-incendios',
        'titulo_corto': 'Venta de Extintores CDMX',
        'relacionados': [
            ('seguridad-contra-incendios', 'como-elegir-extintor-correcto-negocio-cdmx', 'Como Elegir el Extintor Correcto'),
            ('tipos-de-extintores', 'extintor-polvo-quimico-seco-pqs-usos-ventajas', 'Extintor PQS: Usos y Ventajas'),
            ('mantenimiento-y-recarga', 'mantenimiento-extintores-cdmx-servicio-profesional', 'Mantenimiento de Extintores'),
        ]
    },
    'extintor-polvo-quimico-seco-pqs-usos-ventajas': {
        'categoria': 'tipos-de-extintores',
        'titulo_corto': 'Extintor PQS',
        'relacionados': [
            ('seguridad-contra-incendios', 'como-elegir-extintor-correcto-negocio-cdmx', 'Como Elegir el Extintor'),
            ('mantenimiento-y-recarga', 'cuando-recargar-extintor-senales-frecuencia-normativa', 'Cuando Recargar tu Extintor'),
            ('mantenimiento-y-recarga', 'vida-util-extintor-cuando-reemplazarlo', 'Vida Util del Extintor'),
        ]
    },
    'mantenimiento-extintores-cdmx-servicio-profesional': {
        'categoria': 'mantenimiento-y-recarga',
        'titulo_corto': 'Mantenimiento de Extintores',
        'relacionados': [
            ('mantenimiento-y-recarga', 'cuando-recargar-extintor-senales-frecuencia-normativa', 'Cuando Recargar tu Extintor'),
            ('mantenimiento-y-recarga', 'vida-util-extintor-cuando-reemplazarlo', 'Vida Util del Extintor'),
            ('normativas-y-certificaciones', 'nom-154-scfi-guia-completa-cumplimiento-extintores', 'Guia NOM-154-SCFI'),
        ]
    },
    'cuando-recargar-extintor-senales-frecuencia-normativa': {
        'categoria': 'mantenimiento-y-recarga',
        'titulo_corto': 'Cuando Recargar Extintor',
        'relacionados': [
            ('mantenimiento-y-recarga', 'mantenimiento-extintores-cdmx-servicio-profesional', 'Mantenimiento de Extintores CDMX'),
            ('mantenimiento-y-recarga', 'vida-util-extintor-cuando-reemplazarlo', 'Vida Util del Extintor'),
            ('tipos-de-extintores', 'extintor-polvo-quimico-seco-pqs-usos-ventajas', 'Extintor PQS'),
        ]
    },
    'vida-util-extintor-cuando-reemplazarlo': {
        'categoria': 'mantenimiento-y-recarga',
        'titulo_corto': 'Vida Util del Extintor',
        'relacionados': [
            ('mantenimiento-y-recarga', 'mantenimiento-extintores-cdmx-servicio-profesional', 'Mantenimiento de Extintores'),
            ('mantenimiento-y-recarga', 'cuando-recargar-extintor-senales-frecuencia-normativa', 'Cuando Recargar tu Extintor'),
            ('seguridad-contra-incendios', 'venta-extintores-cdmx-guia-compra-empresas', 'Venta de Extintores CDMX'),
        ]
    },
    'nom-154-scfi-guia-completa-cumplimiento-extintores': {
        'categoria': 'normativas-y-certificaciones',
        'titulo_corto': 'Guia NOM-154-SCFI',
        'relacionados': [
            ('mantenimiento-y-recarga', 'mantenimiento-extintores-cdmx-servicio-profesional', 'Mantenimiento de Extintores'),
            ('prevencion-empresarial', 'prevencion-incendios-empresas-protocolo-completo-cdmx', 'Prevencion de Incendios'),
            ('seguridad-contra-incendios', 'como-elegir-extintor-correcto-negocio-cdmx', 'Como Elegir el Extintor'),
        ]
    },
    'sistemas-proteccion-integral-empresas-cdmx-2025': {
        'categoria': 'equipos-contra-incendio',
        'titulo_corto': 'Sistemas Proteccion Integral',
        'relacionados': [
            ('prevencion-empresarial', 'prevencion-incendios-empresas-protocolo-completo-cdmx', 'Prevencion de Incendios'),
            ('normativas-y-certificaciones', 'nom-154-scfi-guia-completa-cumplimiento-extintores', 'Guia NOM-154-SCFI'),
            ('tipos-de-extintores', 'extintor-polvo-quimico-seco-pqs-usos-ventajas', 'Extintor PQS'),
        ]
    },
    'prevencion-incendios-empresas-protocolo-completo-cdmx': {
        'categoria': 'prevencion-empresarial',
        'titulo_corto': 'Prevencion Incendios Empresas',
        'relacionados': [
            ('normativas-y-certificaciones', 'nom-154-scfi-guia-completa-cumplimiento-extintores', 'Guia NOM-154-SCFI'),
            ('equipos-contra-incendio', 'sistemas-proteccion-integral-empresas-cdmx-2025', 'Sistemas de Proteccion'),
            ('seguridad-contra-incendios', 'como-elegir-extintor-correcto-negocio-cdmx', 'Como Elegir el Extintor'),
        ]
    }
}

CATEGORIAS = {
    'seguridad-contra-incendios': {'color': '#d32f2f', 'nombre': 'Seguridad'},
    'tipos-de-extintores': {'color': '#f57c00', 'nombre': 'Tipos'},
    'mantenimiento-y-recarga': {'color': '#1976d2', 'nombre': 'Mantenimiento'},
    'equipos-contra-incendio': {'color': '#7b1fa2', 'nombre': 'Equipos'},
    'normativas-y-certificaciones': {'color': '#00796b', 'nombre': 'Normativas'},
    'prevencion-empresarial': {'color': '#c62828', 'nombre': 'Prevencion'},
}

def generate_internal_links_box(slug, info):
    """Genera el HTML del box de articulos relacionados"""
    relacionados = info.get('relacionados', [])
    if not relacionados:
        return ''

    links_html = ''
    for cat, rel_slug, titulo in relacionados[:4]:
        links_html += f'''
              <li><a href="../{cat}/{rel_slug}.html">{titulo}</a></li>'''

    return f'''
          <div class="internal-links-box">
            <h4>Te puede interesar</h4>
            <ul>{links_html}
            </ul>
          </div>'''

def update_related_articles_div(html, slug, categoria):
    """Actualiza el div de related-articles con los data attributes correctos"""

    # Patron para encontrar el div de related-articles sin data attributes
    pattern = r'<div id="related-articles" class="related-grid">'
    replacement = f'<div id="related-articles" class="related-grid" data-category="{categoria}" data-slug="{slug}">'

    if pattern in html:
        html = html.replace(pattern, replacement)

    # Si ya tiene data attributes pero diferentes, actualizarlos
    pattern2 = r'<div id="related-articles" class="related-grid" data-category="[^"]*" data-slug="[^"]*">'
    html = re.sub(pattern2, replacement, html)

    return html

def add_internal_links_box(html, slug, info):
    """Agrega el box de internal links antes del CTA si no existe"""
    if 'internal-links-box' in html:
        return html

    links_box = generate_internal_links_box(slug, info)
    if not links_box:
        return html

    # Buscar donde insertar (antes de cta-box, article-tags, o related-section)
    patterns = [
        (r'(<div class="cta-box")', links_box + '\n\n          \\1'),
        (r'(<div class="article-tags")', links_box + '\n\n          \\1'),
        (r'(<section class="related-section")', links_box + '\n\n        \\1'),
        (r'(</article>)', links_box + '\n\n      \\1'),
    ]

    for pattern, replacement in patterns:
        if re.search(pattern, html):
            html = re.sub(pattern, replacement, html, count=1)
            break

    return html

def process_article(filepath):
    """Procesa un articulo individual"""
    slug = filepath.stem
    categoria = filepath.parent.name

    if slug not in ARTICULOS:
        print(f"  [SKIP] {slug}")
        return False

    info = ARTICULOS[slug]
    print(f"  [PROC] {slug}")

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # 1. Actualizar version de CSS
    html = re.sub(r'blog-system\.css\?v=\d+', 'blog-system.css?v=4', html)
    html = re.sub(r'style\.css\?v=\d+', 'style.css?v=15', html)

    # 2. Actualizar div de related-articles
    html = update_related_articles_div(html, slug, categoria)

    # 3. Agregar box de internal links
    html = add_internal_links_box(html, slug, info)

    # 4. Convertir FAQ de details a div si es necesario
    def convert_faq(match):
        pregunta = match.group(1).strip()
        respuesta = match.group(2).strip()
        return f'''<div class="faq-item">
                    <button class="faq-question" aria-expanded="false">
                      <span class="faq-icon">
                        <svg class="icon-plus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <svg class="icon-minus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                      <span class="faq-question-text">{pregunta}</span>
                    </button>
                    <div class="faq-answer">
                      <div class="faq-answer-content">
                        <p>{respuesta}</p>
                      </div>
                    </div>
                  </div>'''

    html = re.sub(
        r'<details class="faq-item">\s*<summary>([^<]+)</summary>\s*<div class="faq-answer">\s*<p>([^<]+)</p>\s*</div>\s*</details>',
        convert_faq,
        html,
        flags=re.DOTALL
    )

    # 5. Cambiar content-section a faq-section
    html = re.sub(
        r'<section id="preguntas-frecuentes" class="content-section">',
        '<section id="preguntas-frecuentes" class="faq-section">',
        html
    )

    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True

    return False

def main():
    print("=" * 60)
    print("AGREGAR INTERLINKS V2")
    print("=" * 60)

    # Procesar articulos
    updated = 0
    for cat_dir in BLOG_DIR.iterdir():
        if cat_dir.is_dir() and cat_dir.name in CATEGORIAS:
            for html_file in cat_dir.glob('*.html'):
                if process_article(html_file):
                    updated += 1

    print(f"\nArticulos actualizados: {updated}")
    print("\nInterlinking aplicado:")
    for slug, info in ARTICULOS.items():
        print(f"  {info['titulo_corto']}:")
        for cat, rel_slug, titulo in info['relacionados'][:2]:
            print(f"    -> {titulo}")

if __name__ == '__main__':
    main()
