#!/usr/bin/env python3
"""
SCRIPT: fix-articulos.py
Corrige articulos del blog agregando header-spacer y estilos criticos

USO:
    python3 fix-articulos.py /ruta/a/tu/blog

FUNCIONES:
1. Agrega CSS inline critico despues del link a blog-article.css
2. Agrega div header-spacer despues del </header>
3. Elimina breadcrumb duplicado dentro del article-hero
"""

import os
import re
import glob
import sys

# CSS inline critico
INLINE_CSS = '''
<!-- FIX: Estilos criticos para header-spacer y breadcrumb -->
<style>
.header-spacer {
    height: 180px !important;
    width: 100% !important;
    display: block !important;
}
@media (max-width: 768px) {
    .header-spacer {
        height: 130px !important;
    }
}
.breadcrumb-section,
section.breadcrumb-section {
    margin-top: -10px !important;
    padding-top: 10px !important;
    padding-bottom: 5px !important;
}
.article-hero {
    padding-top: 150px !important;
    padding-bottom: 100px !important;
    min-height: 500px !important;
}
</style>
'''

HEADER_SPACER = '''
<!-- Espaciador para header fijo -->
<div class="header-spacer"></div>
'''

def fix_article(filepath):
    """Corrige un articulo individual"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        try:
            with open(filepath, 'r', encoding='latin-1') as f:
                content = f.read()
        except Exception as e:
            return f"ERROR: {e}"

    original = content
    changes = []

    # 1. Agregar CSS inline si no existe
    if 'FIX: Estilos criticos' not in content:
        patterns = [
            (r'(<link[^>]*blog-article\.css[^>]*>)\s*\n', r'\1\n' + INLINE_CSS + '\n'),
            (r'(<link[^>]*blog-article\.css[^>]*>)', r'\1\n' + INLINE_CSS),
        ]
        for pattern, replacement in patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content, count=1)
                changes.append("CSS inline agregado")
                break

    # 2. Agregar header-spacer si no existe
    if '<div class="header-spacer"' not in content:
        patterns = [
            (r'(</header>)\s*\n\s*(<section class="breadcrumb-section")', r'\1\n' + HEADER_SPACER + r'\n\2'),
            (r'(</header>)\s*\n\s*(<!--[^>]*-->)\s*\n\s*(<section class="breadcrumb-section")', r'\1\n' + HEADER_SPACER + r'\n\2\n\3'),
        ]
        for pattern, replacement in patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content, count=1)
                changes.append("header-spacer agregado")
                break

    # 3. Eliminar breadcrumb duplicado dentro del article-hero
    breadcrumb_pattern = r'<nav class="article-breadcrumb"[^>]*>.*?</nav>\s*'
    if re.search(breadcrumb_pattern, content, re.DOTALL):
        content = re.sub(breadcrumb_pattern, '', content, flags=re.DOTALL)
        changes.append("breadcrumb duplicado eliminado")

    # Guardar si hubo cambios
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes

    return None

def main():
    if len(sys.argv) < 2:
        print("Uso: python3 fix-articulos.py /ruta/a/tu/blog")
        print("Ejemplo: python3 fix-articulos.py /Users/usuario/mi-sitio/blog")
        sys.exit(1)

    blog_dir = sys.argv[1]

    if not os.path.isdir(blog_dir):
        print(f"ERROR: {blog_dir} no es un directorio valido")
        sys.exit(1)

    # Encontrar todos los articulos
    articles = []
    for pattern in ['**/*.html']:
        articles.extend(glob.glob(os.path.join(blog_dir, pattern), recursive=True))

    # Filtrar
    articles = [a for a in articles if
                'index.html' not in a and
                'TEMPLATE' not in a]

    print(f"Encontrados {len(articles)} articulos para revisar\n")

    fixed = 0
    errors = 0
    skipped = 0

    for article in sorted(articles):
        relpath = os.path.relpath(article, blog_dir)
        result = fix_article(article)

        if result is None:
            skipped += 1
        elif isinstance(result, str) and result.startswith("ERROR"):
            errors += 1
            print(f"ERROR: {relpath}")
        else:
            fixed += 1
            print(f"CORREGIDO: {relpath}")
            for change in result:
                print(f"  - {change}")

    print(f"\n{'='*50}")
    print(f"RESUMEN:")
    print(f"  Corregidos: {fixed}")
    print(f"  Ya correctos: {skipped}")
    print(f"  Errores: {errors}")
    print(f"  Total revisados: {len(articles)}")

if __name__ == '__main__':
    main()
