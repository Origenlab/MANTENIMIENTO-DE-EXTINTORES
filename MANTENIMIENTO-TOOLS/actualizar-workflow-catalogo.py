#!/usr/bin/env python3
"""
Script para actualizar el nodo 'Generar HTML Producto v3' en el workflow de catalogo
con el codigo mas reciente de html-generator-v3.js
"""

import json
import os

def main():
    print("=" * 60)
    print("ACTUALIZADOR WORKFLOW CATALOGO MANEXT v1.0")
    print("=" * 60)

    # Rutas
    base_path = os.path.dirname(os.path.abspath(__file__))
    workflow_path = os.path.join(base_path, 'n8n-workflow-manext-catalogo-COMPLETO.json')
    js_code_path = os.path.join(base_path, 'html-generator-v3.js')

    # 1. Leer el codigo JS actualizado
    print("\n[1] Leyendo codigo HTML Generator v3...")
    with open(js_code_path, 'r', encoding='utf-8') as f:
        new_js_code = f.read()
    print(f"    Codigo leido: {len(new_js_code)} caracteres")

    # 2. Leer el workflow actual
    print("\n[2] Leyendo workflow...")
    with open(workflow_path, 'r', encoding='utf-8') as f:
        workflow = json.load(f)
    print(f"    Workflow: {workflow['name']}")
    print(f"    Nodos: {len(workflow['nodes'])}")

    # 3. Buscar el nodo "Generar HTML Producto v3"
    print("\n[3] Buscando nodo 'Generar HTML Producto v3'...")
    node_found = False
    for node in workflow['nodes']:
        if node['name'] == 'Generar HTML Producto v3':
            node_found = True
            old_code_len = len(node['parameters']['jsCode'])
            print(f"    Nodo encontrado: {node['id']}")
            print(f"    Codigo anterior: {old_code_len} caracteres")

            # Actualizar codigo
            node['parameters']['jsCode'] = new_js_code
            print(f"    Codigo nuevo: {len(new_js_code)} caracteres")
            break

    if not node_found:
        print("    ERROR: No se encontro el nodo 'Generar HTML Producto v3'")
        return

    # 4. Actualizar nombre/version del workflow
    workflow['name'] = "MANEXT - Generador Productos Catalogo v3.0"
    print(f"\n[4] Nombre del workflow actualizado: {workflow['name']}")

    # 5. Guardar workflow actualizado
    print("\n[5] Guardando workflow actualizado...")
    with open(workflow_path, 'w', encoding='utf-8') as f:
        json.dump(workflow, f, ensure_ascii=False, indent=2)
    print(f"    Guardado en: {workflow_path}")

    print("\n" + "=" * 60)
    print("WORKFLOW ACTUALIZADO EXITOSAMENTE")
    print("=" * 60)
    print("\nCambios realizados:")
    print("  - Codigo del nodo 'Generar HTML Producto v3' actualizado")
    print("  - Version del workflow actualizada a v3.0")
    print("\nCaracteristicas del codigo actualizado:")
    print("  - Incluye catalog-system.css para estilos de productos relacionados")
    print("  - Galeria de 4 imagenes con thumbnails")
    print("  - Productos relacionados dinamicos")
    print("  - Colores por categoria")
    print("  - SEO optimizado con Schema.org")
    print("\nPara usar el workflow actualizado:")
    print("  1. Abre n8n")
    print("  2. Importa el archivo: n8n-workflow-manext-catalogo-COMPLETO.json")
    print("  3. Verifica las credenciales (OpenAI, FAL.ai, GitHub)")
    print("  4. Ejecuta el workflow")

if __name__ == '__main__':
    main()
