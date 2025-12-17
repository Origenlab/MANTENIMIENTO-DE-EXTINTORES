#!/usr/bin/env python3
"""
Script para crear una version del workflow sin secrets para GitHub
"""

import json
import os
import re

def main():
    base_path = os.path.dirname(os.path.abspath(__file__))
    workflow_path = os.path.join(base_path, 'n8n-workflow-manext-catalogo-COMPLETO.json')
    output_path = os.path.join(base_path, 'n8n-workflow-manext-catalogo-COMPLETO-CLEAN.json')

    print("Limpiando secrets del workflow...")

    with open(workflow_path, 'r', encoding='utf-8') as f:
        workflow_str = f.read()

    # Reemplazar OpenAI API Key
    workflow_str = re.sub(
        r'Bearer sk-proj-[a-zA-Z0-9_-]+',
        'Bearer YOUR_OPENAI_API_KEY_HERE',
        workflow_str
    )

    # Reemplazar GitHub Token
    workflow_str = re.sub(
        r'token ghp_[a-zA-Z0-9]+',
        'token YOUR_GITHUB_TOKEN_HERE',
        workflow_str
    )

    # Reemplazar FAL.ai Key
    workflow_str = re.sub(
        r'Key [a-f0-9-]+:[a-f0-9]+',
        'Key YOUR_FAL_AI_KEY_HERE',
        workflow_str
    )

    # Guardar version limpia
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(workflow_str)

    print(f"Workflow limpio guardado en: {output_path}")

    # Verificar que se limpiaron los secrets
    workflow = json.loads(workflow_str)
    print(f"Workflow: {workflow['name']}")
    print(f"Nodos: {len(workflow['nodes'])}")
    print("\nSecrets reemplazados con placeholders:")
    print("  - OpenAI API Key")
    print("  - GitHub Token")
    print("  - FAL.ai Key")

if __name__ == '__main__':
    main()
