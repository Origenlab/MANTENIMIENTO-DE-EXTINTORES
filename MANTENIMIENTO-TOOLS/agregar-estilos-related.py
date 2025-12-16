#!/usr/bin/env python3
"""
Script para agregar estilos CSS de productos relacionados a todos los productos.
"""

import os
import re
from pathlib import Path

BASE_DIR = Path("/Users/carsolio/Desktop/PAGINAS-HTML/MANTENIMIENTO-DE-EXTINTORES")
PRODUCTOS_DIR = BASE_DIR / "productos"

# Estilos CSS para productos relacionados
RELATED_STYLES = """.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2rem}
    .related-card{display:block;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,.08);transition:all .3s ease;text-decoration:none;color:inherit}
    .related-card:hover{transform:translateY(-8px);box-shadow:0 12px 30px rgba(0,0,0,.15)}
    .related-card-image{position:relative;width:100%;height:200px;overflow:hidden;background:linear-gradient(135deg,#f8f8f8 0%,#e8e8e8 100%)}
    .related-card-image img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}
    .related-card:hover .related-card-image img{transform:scale(1.08)}
    .related-card-content{padding:1.5rem}
    .related-card-title{font-size:1.1rem;font-weight:700;color:#1a1a1a;margin-bottom:.5rem;line-height:1.3}
    .related-card-capacity{font-size:.9rem;color:#666;margin-bottom:1rem;display:block}
    .related-card-badges{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem}
    .related-card-badges .class-badge{padding:.35rem .75rem;border-radius:20px;font-size:.8rem;font-weight:600}
    .class-badge.class-k{background:linear-gradient(135deg,#9c27b0 0%,#7b1fa2 100%);color:#fff}
    .class-badge.class-a{background:#4caf50;color:#fff}
    .class-badge.class-b{background:#ff9800;color:#fff}
    .class-badge.class-c{background:#2196f3;color:#fff}
    .related-card-link{display:inline-flex;align-items:center;gap:.5rem;color:#d32f2f;font-weight:600;font-size:.95rem;transition:all .2s}
    .related-card:hover .related-card-link{color:#b71c1c;gap:.75rem}"""

def process_file(file_path):
    """Procesa un archivo de producto para agregar estilos de related."""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Verificar si ya tiene los estilos
    if '.related-grid{' in content or '.related-card{' in content:
        print(f"  Saltando (ya tiene estilos): {file_path.name}")
        return False

    # Verificar que tiene la sección de related-products
    if '.related-products' not in content:
        print(f"  Saltando (sin related-products): {file_path.name}")
        return False

    # Buscar el patrón para insertar los estilos
    # Patrón: .related-products h2{...} seguido de @media o }
    pattern = r'(\.related-products h2\{[^}]+\})\s*(@media|</style>|\})'

    def replacement(match):
        return match.group(1) + '\n    ' + RELATED_STYLES + '\n    ' + match.group(2)

    new_content, count = re.subn(pattern, replacement, content)

    if count == 0:
        # Intentar otro patrón más simple
        pattern2 = r'(\.related-products h2\{font-size:[^}]+\})'

        def replacement2(match):
            return match.group(1) + '\n    ' + RELATED_STYLES

        new_content, count = re.subn(pattern2, replacement2, content)

    if count == 0:
        print(f"  Advertencia: No se encontró patrón en {file_path.name}")
        return False

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"  ✓ Actualizado: {file_path.name}")
    return True

def main():
    print("=" * 60)
    print("AGREGAR ESTILOS DE PRODUCTOS RELACIONADOS")
    print("=" * 60)

    # Encontrar todos los archivos HTML de productos
    product_files = list(PRODUCTOS_DIR.rglob("producto-*.html"))

    print(f"\nEncontrados {len(product_files)} archivos de productos")
    print("-" * 60)

    actualizados = 0
    saltados = 0

    for file_path in sorted(product_files):
        rel_path = file_path.relative_to(PRODUCTOS_DIR)
        print(f"\nProcesando: {rel_path}")

        if process_file(file_path):
            actualizados += 1
        else:
            saltados += 1

    print("\n" + "=" * 60)
    print(f"RESUMEN:")
    print(f"  - Archivos actualizados: {actualizados}")
    print(f"  - Archivos saltados: {saltados}")
    print("=" * 60)

if __name__ == "__main__":
    main()
