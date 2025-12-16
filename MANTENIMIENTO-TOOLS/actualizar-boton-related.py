#!/usr/bin/env python3
"""
Script para actualizar los estilos del botón "Ver detalles" en productos relacionados.
El botón debe estar pegado al final de la tarjeta con diseño consistente.
"""

import os
import re
from pathlib import Path

BASE_DIR = Path("/Users/carsolio/Desktop/PAGINAS-HTML/MANTENIMIENTO-DE-EXTINTORES")
PRODUCTOS_DIR = BASE_DIR / "productos"

def process_file(file_path):
    """Procesa un archivo de producto para actualizar estilos del botón."""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # 1. Actualizar .related-card para que use flexbox y altura mínima
    old_card = r'\.related-card\s*\{[^}]*display:\s*block[^}]*\}'
    if re.search(old_card, content):
        new_card = """.related-card {
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
        height: 100%;
      }"""
        content = re.sub(old_card, new_card, content)
        modified = True

    # 2. Actualizar .related-card-content para usar flexbox y crecer
    old_content = r'\.related-card-content\s*\{\s*padding:\s*1\.5rem;?\s*\}'
    if re.search(old_content, content):
        new_content = """.related-card-content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }"""
        content = re.sub(old_content, new_content, content)
        modified = True

    # 3. Actualizar .related-card-link para que sea un botón real
    old_link = r'\.related-card-link\s*\{[^}]*display:\s*inline-flex[^}]*transition:\s*all[^}]*\}'
    if re.search(old_link, content):
        new_link = """.related-card-link {
        display: block;
        width: 100%;
        padding: 0.75rem 1rem;
        margin-top: auto;
        background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
        color: white;
        font-weight: 600;
        font-size: 0.95rem;
        text-align: center;
        border-radius: 8px;
        transition: all 0.3s ease;
      }"""
        content = re.sub(old_link, new_link, content)
        modified = True

    # 4. Actualizar hover del botón
    old_hover = r'\.related-card:hover\s+\.related-card-link\s*\{[^}]*\}'
    if re.search(old_hover, content):
        new_hover = """.related-card:hover .related-card-link {
        background: linear-gradient(135deg, #b71c1c 0%, #8b0000 100%);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(211, 47, 47, 0.4);
      }"""
        content = re.sub(old_hover, new_hover, content)
        modified = True

    # 5. Añadir estilos para que los badges tengan padding
    if '.related-card-badges .class-badge' not in content and '.related-card-badges' in content:
        # Buscar .related-card-badges y añadir estilos de badge
        old_badges = r'(\.related-card-badges\s*\{[^}]+\})'
        def add_badge_styles(match):
            return match.group(1) + """

      .related-card-badges .class-badge {
        padding: 0.3rem 0.6rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
      }"""
        content = re.sub(old_badges, add_badge_styles, content)
        modified = True

    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Actualizado: {file_path.name}")
        return True
    else:
        print(f"  Sin cambios: {file_path.name}")
        return False

def main():
    print("=" * 60)
    print("ACTUALIZAR BOTÓN VER DETALLES - PRODUCTOS RELACIONADOS")
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
    print(f"  - Archivos actualizados: {actualizados}")
    print(f"  - Sin cambios: {sin_cambios}")
    print("=" * 60)

if __name__ == "__main__":
    main()
