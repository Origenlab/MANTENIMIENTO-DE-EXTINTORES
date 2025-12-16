#!/usr/bin/env python3
"""
HOMOGENEIZAR ARTICULOS V3
- Agrega internal-links-box a articulos que no lo tienen
- Agrega blog-system.css a articulos que no lo tienen
- Actualiza articles.json con campo related para articulos nuevos
"""

import os
import re
import json
from pathlib import Path

BASE_DIR = Path('/Users/carsolio/Desktop/PAGINAS-HTML/MANTENIMIENTO-DE-EXTINTORES')
BLOG_DIR = BASE_DIR / 'blog'
ARTICLES_JSON = BASE_DIR / 'data' / 'articles.json'

# Mapa de relacionados para TODOS los articulos
RELATED_MAP = {
    'como-elegir-extintor-correcto-negocio-cdmx': [
        'extintor-polvo-quimico-seco-pqs-usos-ventajas',
        'nom-154-scfi-guia-completa-cumplimiento-extintores',
        'venta-extintores-cdmx-guia-compra-empresas'
    ],
    'venta-extintores-cdmx-guia-compra-empresas': [
        'como-elegir-extintor-correcto-negocio-cdmx',
        'extintor-polvo-quimico-seco-pqs-usos-ventajas',
        'nom-154-scfi-guia-completa-cumplimiento-extintores'
    ],
    'clases-fuego-a-b-c-d-k-guia-completa': [
        'como-elegir-extintor-correcto-negocio-cdmx',
        'extintor-polvo-quimico-seco-pqs-usos-ventajas',
        'prevencion-incendios-empresas-protocolo-completo-cdmx'
    ],
    'extintor-polvo-quimico-seco-pqs-usos-ventajas': [
        'como-elegir-extintor-correcto-negocio-cdmx',
        'cuando-recargar-extintor-senales-frecuencia-normativa',
        'mantenimiento-extintores-cdmx-servicio-profesional'
    ],
    'mantenimiento-extintores-cdmx-servicio-profesional': [
        'cuando-recargar-extintor-senales-frecuencia-normativa',
        'vida-util-extintor-cuando-reemplazarlo',
        'nom-154-scfi-guia-completa-cumplimiento-extintores'
    ],
    'cuando-recargar-extintor-senales-frecuencia-normativa': [
        'mantenimiento-extintores-cdmx-servicio-profesional',
        'vida-util-extintor-cuando-reemplazarlo',
        'nom-154-scfi-guia-completa-cumplimiento-extintores'
    ],
    'vida-util-extintor-cuando-reemplazarlo': [
        'mantenimiento-extintores-cdmx-servicio-profesional',
        'cuando-recargar-extintor-senales-frecuencia-normativa',
        'venta-extintores-cdmx-guia-compra-empresas'
    ],
    'nom-154-scfi-guia-completa-cumplimiento-extintores': [
        'mantenimiento-extintores-cdmx-servicio-profesional',
        'cuando-recargar-extintor-senales-frecuencia-normativa',
        'prevencion-incendios-empresas-protocolo-completo-cdmx'
    ],
    'nom-002-stps-seguridad-incendios-trabajo': [
        'nom-154-scfi-guia-completa-cumplimiento-extintores',
        'prevencion-incendios-empresas-protocolo-completo-cdmx',
        'mantenimiento-extintores-cdmx-servicio-profesional'
    ],
    'proteccion-civil-cdmx-requisitos-extintores': [
        'nom-154-scfi-guia-completa-cumplimiento-extintores',
        'nom-002-stps-seguridad-incendios-trabajo',
        'prevencion-incendios-empresas-protocolo-completo-cdmx'
    ],
    'sistemas-proteccion-integral-empresas-cdmx-2025': [
        'prevencion-incendios-empresas-protocolo-completo-cdmx',
        'nom-154-scfi-guia-completa-cumplimiento-extintores',
        'mantenimiento-extintores-cdmx-servicio-profesional'
    ],
    'prevencion-incendios-empresas-protocolo-completo-cdmx': [
        'nom-154-scfi-guia-completa-cumplimiento-extintores',
        'sistemas-proteccion-integral-empresas-cdmx-2025',
        'como-elegir-extintor-correcto-negocio-cdmx'
    ],
    'precios-extintores-cdmx-guia-actualizada': [
        'venta-extintores-cdmx-guia-compra-empresas',
        'como-elegir-extintor-correcto-negocio-cdmx',
        'extintor-polvo-quimico-seco-pqs-usos-ventajas'
    ]
}

# Info de categorias para construir URLs
CATEGORIAS = {
    'seguridad-contra-incendios': 'Seguridad Contra Incendios',
    'tipos-de-extintores': 'Tipos de Extintores',
    'mantenimiento-y-recarga': 'Mantenimiento y Recarga',
    'equipos-contra-incendio': 'Equipos Contra Incendio',
    'normativas-y-certificaciones': 'Normativas y Certificaciones',
    'prevencion-empresarial': 'Prevencion Empresarial',
    'guias-y-comparativas': 'Guias y Comparativas',
}

# Mapa de slugs a categorias
SLUG_TO_CATEGORY = {
    'como-elegir-extintor-correcto-negocio-cdmx': 'seguridad-contra-incendios',
    'venta-extintores-cdmx-guia-compra-empresas': 'seguridad-contra-incendios',
    'clases-fuego-a-b-c-d-k-guia-completa': 'seguridad-contra-incendios',
    'extintor-polvo-quimico-seco-pqs-usos-ventajas': 'tipos-de-extintores',
    'mantenimiento-extintores-cdmx-servicio-profesional': 'mantenimiento-y-recarga',
    'cuando-recargar-extintor-senales-frecuencia-normativa': 'mantenimiento-y-recarga',
    'vida-util-extintor-cuando-reemplazarlo': 'mantenimiento-y-recarga',
    'nom-154-scfi-guia-completa-cumplimiento-extintores': 'normativas-y-certificaciones',
    'nom-002-stps-seguridad-incendios-trabajo': 'normativas-y-certificaciones',
    'proteccion-civil-cdmx-requisitos-extintores': 'normativas-y-certificaciones',
    'sistemas-proteccion-integral-empresas-cdmx-2025': 'equipos-contra-incendio',
    'prevencion-incendios-empresas-protocolo-completo-cdmx': 'prevencion-empresarial',
    'precios-extintores-cdmx-guia-actualizada': 'guias-y-comparativas',
}

# Titulos cortos para los links
TITULOS_CORTOS = {
    'como-elegir-extintor-correcto-negocio-cdmx': 'Como Elegir el Extintor Correcto',
    'venta-extintores-cdmx-guia-compra-empresas': 'Venta de Extintores CDMX',
    'clases-fuego-a-b-c-d-k-guia-completa': 'Clases de Fuego A B C D K',
    'extintor-polvo-quimico-seco-pqs-usos-ventajas': 'Extintor PQS: Usos y Ventajas',
    'mantenimiento-extintores-cdmx-servicio-profesional': 'Mantenimiento de Extintores',
    'cuando-recargar-extintor-senales-frecuencia-normativa': 'Cuando Recargar tu Extintor',
    'vida-util-extintor-cuando-reemplazarlo': 'Vida Util del Extintor',
    'nom-154-scfi-guia-completa-cumplimiento-extintores': 'Guia NOM-154-SCFI',
    'nom-002-stps-seguridad-incendios-trabajo': 'NOM-002-STPS Seguridad',
    'proteccion-civil-cdmx-requisitos-extintores': 'Requisitos Proteccion Civil',
    'sistemas-proteccion-integral-empresas-cdmx-2025': 'Sistemas Proteccion Integral',
    'prevencion-incendios-empresas-protocolo-completo-cdmx': 'Prevencion de Incendios',
    'precios-extintores-cdmx-guia-actualizada': 'Precios de Extintores CDMX',
}


def generate_internal_links_html(slug):
    """Genera el HTML del box de internal links"""
    if slug not in RELATED_MAP:
        return ''

    related_slugs = RELATED_MAP[slug][:4]

    links_html = ''
    for rel_slug in related_slugs:
        cat = SLUG_TO_CATEGORY.get(rel_slug, 'seguridad-contra-incendios')
        titulo = TITULOS_CORTOS.get(rel_slug, rel_slug.replace('-', ' ').title())
        links_html += f'''
              <li><a href="../{cat}/{rel_slug}.html">{titulo}</a></li>'''

    return f'''
          <div class="internal-links-box">
            <h4>Te puede interesar</h4>
            <ul>{links_html}
            </ul>
          </div>'''


def add_blog_system_css(html):
    """Agrega blog-system.css si no existe"""
    if 'blog-system.css' not in html:
        # Buscar donde insertar (despues del style.css)
        pattern = r'(<link rel="stylesheet" href="[^"]*style\.css[^"]*"[^>]*>)'
        replacement = r'\1\n  <link rel="stylesheet" href="../../css/blog-system.css?v=4">'
        html = re.sub(pattern, replacement, html)
    return html


def add_internal_links_box(html, slug):
    """Agrega internal-links-box si no existe"""
    if 'internal-links-box' in html:
        return html

    links_box = generate_internal_links_html(slug)
    if not links_box:
        return html

    # Buscar donde insertar
    # Patron 1: antes del cta-box o cta-final
    patterns = [
        (r'(<div class="cta-box")', links_box + '\n\n          \\1'),
        (r'(<div class="cta-final")', links_box + '\n\n          \\1'),
        (r'(<section class="cta-section")', links_box + '\n\n        \\1'),
        (r'(<div class="article-cta")', links_box + '\n\n          \\1'),
        (r'(<!-- CTA -->)', links_box + '\n\n          \\1'),
        (r'(</article>)', links_box + '\n\n      \\1'),
        (r'(</main>)', links_box + '\n\n        \\1'),
    ]

    for pattern, replacement in patterns:
        if re.search(pattern, html):
            html = re.sub(pattern, replacement, html, count=1)
            break

    return html


def update_related_articles_div(html, slug, categoria):
    """Actualiza el div de related-articles con data attributes"""
    # Patron para div sin data attributes
    pattern = r'<div id="related-articles"([^>]*)>'

    # Verificar si ya tiene los data attributes correctos
    if f'data-slug="{slug}"' in html and f'data-category="{categoria}"' in html:
        return html

    # Buscar y actualizar
    def replace_div(match):
        attrs = match.group(1)
        # Eliminar data attributes existentes si los hay
        attrs = re.sub(r'\s*data-category="[^"]*"', '', attrs)
        attrs = re.sub(r'\s*data-slug="[^"]*"', '', attrs)
        return f'<div id="related-articles"{attrs} data-category="{categoria}" data-slug="{slug}">'

    html = re.sub(pattern, replace_div, html)
    return html


def process_article(filepath):
    """Procesa un articulo individual"""
    slug = filepath.stem
    categoria = filepath.parent.name

    # Solo procesar archivos de articulos (en subdirectorios de categorias)
    if categoria not in CATEGORIAS:
        return False

    print(f"  Procesando: {slug}")

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # 1. Agregar blog-system.css si no existe
    html = add_blog_system_css(html)

    # 2. Agregar internal-links-box
    html = add_internal_links_box(html, slug)

    # 3. Actualizar related-articles div
    html = update_related_articles_div(html, slug, categoria)

    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True

    return False


def update_articles_json():
    """Actualiza articles.json con campo related para todos los articulos"""
    with open(ARTICLES_JSON, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updated = False
    for article in data['articles']:
        slug = article['slug']
        if slug in RELATED_MAP:
            if 'related' not in article or article['related'] != RELATED_MAP[slug]:
                article['related'] = RELATED_MAP[slug]
                updated = True
                print(f"  JSON: Actualizado related para {slug}")

    if updated:
        with open(ARTICLES_JSON, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\n  articles.json actualizado")

    return updated


def main():
    print("=" * 60)
    print("HOMOGENEIZAR ARTICULOS V3")
    print("=" * 60)

    # Encontrar todos los articulos
    article_files = []
    for cat_dir in BLOG_DIR.iterdir():
        if cat_dir.is_dir() and cat_dir.name in CATEGORIAS:
            for html_file in cat_dir.glob('*.html'):
                article_files.append(html_file)

    print(f"\nEncontrados {len(article_files)} articulos")

    # Procesar articulos
    updated = 0
    print("\nProcesando articulos HTML:")
    for filepath in sorted(article_files):
        if process_article(filepath):
            updated += 1

    print(f"\nArticulos HTML actualizados: {updated}")

    # Actualizar JSON
    print("\nActualizando articles.json:")
    update_articles_json()

    print("\n" + "=" * 60)
    print("COMPLETADO")
    print("=" * 60)


if __name__ == '__main__':
    main()
