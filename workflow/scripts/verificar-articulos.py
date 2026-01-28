#!/usr/bin/env python3
"""
SCRIPT: verificar-articulos.py
Verifica que todos los articulos del blog tengan la estructura correcta

USO:
    python3 verificar-articulos.py /ruta/a/tu/blog

VERIFICA:
1. CSS inline critico
2. div header-spacer
3. breadcrumb-section
4. article-hero
"""

import os
import glob
import sys

def verificar_articulo(filepath):
    """Verifica un articulo individual"""
    errores = []

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        return [f"No se pudo leer: {e}"]

    # Verificar CSS critico
    if 'FIX: Estilos criticos' not in content and '.header-spacer' not in content:
        errores.append("Falta CSS critico inline")

    # Verificar header-spacer
    if '<div class="header-spacer"' not in content:
        errores.append("Falta div header-spacer")

    # Verificar breadcrumb-section
    if 'breadcrumb-section' not in content:
        errores.append("Falta breadcrumb-section")

    # Verificar article-hero
    if 'article-hero' not in content:
        errores.append("Falta article-hero")

    return errores

def main():
    if len(sys.argv) < 2:
        print("Uso: python3 verificar-articulos.py /ruta/a/tu/blog")
        sys.exit(1)

    blog_dir = sys.argv[1]

    if not os.path.isdir(blog_dir):
        print(f"ERROR: {blog_dir} no es un directorio valido")
        sys.exit(1)

    # Encontrar todos los articulos
    articles = glob.glob(os.path.join(blog_dir, '**/*.html'), recursive=True)
    articles = [a for a in articles if 'index.html' not in a and 'TEMPLATE' not in a]

    print(f"Verificando {len(articles)} articulos...\n")

    correctos = 0
    con_errores = 0

    for article in sorted(articles):
        relpath = os.path.relpath(article, blog_dir)
        errores = verificar_articulo(article)

        if not errores:
            correctos += 1
        else:
            con_errores += 1
            print(f"ERRORES en {relpath}:")
            for e in errores:
                print(f"  - {e}")

    print(f"\n{'='*50}")
    print(f"RESUMEN:")
    print(f"  Correctos: {correctos}")
    print(f"  Con errores: {con_errores}")
    print(f"  Total: {len(articles)}")

    if con_errores > 0:
        print(f"\nEjecuta fix-articulos.py para corregir los errores")

if __name__ == '__main__':
    main()
