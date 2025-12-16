#!/usr/bin/env python3
"""
Script para mejorar estilos CSS de productos relacionados en todos los productos.
Añade propiedades faltantes para que funcionen como tarjetas clickeables.
"""

import os
import re
from pathlib import Path

BASE_DIR = Path("/Users/carsolio/Desktop/PAGINAS-HTML/MANTENIMIENTO-DE-EXTINTORES")
PRODUCTOS_DIR = BASE_DIR / "productos"

# Estilos de badges de clases de fuego para añadir
CLASS_BADGE_STYLES = """
      .class-badge.class-k {
        background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
        color: white;
      }

      .class-badge.class-a {
        background: #4caf50;
        color: white;
      }

      .class-badge.class-b {
        background: #ff9800;
        color: white;
      }

      .class-badge.class-c {
        background: #2196f3;
        color: white;
      }

      .class-badge.class-d {
        background: #795548;
        color: white;
      }"""

def process_file(file_path):
    """Procesa un archivo de producto para mejorar estilos."""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # 1. Mejorar .related-card para que funcione como enlace
    # Buscar el patrón existente y reemplazarlo
    old_related_card = r'\.related-card\s*\{[^}]*background:\s*white[^}]*\}'

    if re.search(old_related_card, content):
        # Reemplazar con versión mejorada
        new_related_card = """.related-card {
        display: block;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
      }"""
        content = re.sub(old_related_card, new_related_card, content)
        modified = True

    # 2. Mejorar .related-card:hover
    old_hover = r'\.related-card:hover\s*\{[^}]*transform:[^}]*\}'
    if re.search(old_hover, content):
        new_hover = """.related-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 30px rgba(0,0,0,0.15);
      }"""
        content = re.sub(old_hover, new_hover, content)
        modified = True

    # 3. Mejorar .related-card-image para añadir transición
    old_image = r'\.related-card-image\s*\{[^}]*height:\s*200px[^}]*\}'
    if re.search(old_image, content):
        new_image = """.related-card-image {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
      }"""
        content = re.sub(old_image, new_image, content)
        modified = True

    # 4. Mejorar .related-card-image img
    old_img = r'\.related-card-image img\s*\{[^}]*object-fit:\s*cover[^}]*\}'
    if re.search(old_img, content):
        new_img = """.related-card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      .related-card:hover .related-card-image img {
        transform: scale(1.08);
      }"""
        content = re.sub(old_img, new_img, content)
        modified = True

    # 5. Mejorar .related-card-title
    old_title = r'\.related-card-title\s*\{[^}]*font-size:[^}]*\}'
    if re.search(old_title, content):
        new_title = """.related-card-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
        line-height: 1.3;
      }"""
        content = re.sub(old_title, new_title, content)
        modified = True

    # 6. Mejorar .related-card-link
    old_link = r'\.related-card-link\s*\{[^}]*font-weight:\s*600[^}]*\}'
    if re.search(old_link, content):
        new_link = """.related-card-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: #d32f2f;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.2s;
      }

      .related-card:hover .related-card-link {
        color: #b71c1c;
        gap: 0.75rem;
      }"""
        content = re.sub(old_link, new_link, content)
        modified = True

    # 7. Eliminar .related-card-link:hover redundante si existe
    content = re.sub(r'\s*\.related-card-link:hover\s*\{[^}]*\}', '', content)

    # 8. Añadir estilos de class-badge si no existen
    if '.class-badge.class-k' not in content and '.class-badge' in content:
        # Buscar dónde insertar (antes de /* Responsive */ o @media)
        insert_point = re.search(r'(/\*\s*Responsive\s*\*/|@media\s*\(max-width)', content)
        if insert_point:
            pos = insert_point.start()
            content = content[:pos] + CLASS_BADGE_STYLES + '\n\n      ' + content[pos:]
            modified = True

    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Mejorado: {file_path.name}")
        return True
    else:
        print(f"  Sin cambios: {file_path.name}")
        return False

def main():
    print("=" * 60)
    print("MEJORAR ESTILOS DE PRODUCTOS RELACIONADOS")
    print("=" * 60)

    product_files = list(PRODUCTOS_DIR.rglob("producto-*.html"))

    print(f"\nEncontrados {len(product_files)} archivos de productos")
    print("-" * 60)

    actualizados = 0
    sin_cambios = 0

    for file_path in sorted(product_files):
        rel_path = file_path.relative_to(PRODUCTOS_DIR)
        print(f"\nProcesando: {rel_path}")

        if process_file(file_path):
            actualizados += 1
        else:
            sin_cambios += 1

    print("\n" + "=" * 60)
    print(f"RESUMEN:")
    print(f"  - Archivos mejorados: {actualizados}")
    print(f"  - Sin cambios: {sin_cambios}")
    print("=" * 60)

if __name__ == "__main__":
    main()
