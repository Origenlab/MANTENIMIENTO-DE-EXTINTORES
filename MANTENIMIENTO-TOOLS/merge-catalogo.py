#!/usr/bin/env python3
"""
Script para fusionar el catalogo expandido de extintores al products.json principal
"""

import json
import os

def merge_catalogs():
    # Rutas de archivos
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    products_path = os.path.join(base_path, 'data', 'products.json')
    expanded_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'catalogo-expandido-extintores.json')

    # Cargar productos actuales
    with open(products_path, 'r', encoding='utf-8') as f:
        products_data = json.load(f)

    # Cargar productos nuevos
    with open(expanded_path, 'r', encoding='utf-8') as f:
        expanded_data = json.load(f)

    # Obtener IDs existentes
    existing_ids = {p['id'] for p in products_data['products']}

    # Agregar productos nuevos que no existan
    new_products = []
    for product in expanded_data['nuevos_productos']:
        if product['id'] not in existing_ids:
            new_products.append(product)
            existing_ids.add(product['id'])

    # Fusionar
    products_data['products'].extend(new_products)

    # Ordenar por categoria y capacidad
    products_data['products'].sort(key=lambda x: (x['category'], x.get('capacityValue', 0)))

    # Guardar archivo actualizado
    with open(products_path, 'w', encoding='utf-8') as f:
        json.dump(products_data, f, ensure_ascii=False, indent=2)

    print(f"Catalogo actualizado:")
    print(f"  - Productos existentes: {len(existing_ids) - len(new_products)}")
    print(f"  - Productos nuevos agregados: {len(new_products)}")
    print(f"  - Total de productos: {len(products_data['products'])}")

    # Mostrar distribucion por categoria
    print("\nDistribucion por categoria:")
    categories = {}
    for p in products_data['products']:
        cat = p['category']
        categories[cat] = categories.get(cat, 0) + 1

    for cat, count in sorted(categories.items()):
        print(f"  - {cat}: {count} productos")

if __name__ == '__main__':
    merge_catalogs()
