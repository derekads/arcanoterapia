import json

path = r'c:\Users\Derek\Downloads\arcanoterapia (2)\data\arcanos.json'

with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for arcano in data['arcanos']:
    num = arcano['numero']
    if num <= 1:
        continue  # Already updated Arcanos 0 and 1
    
    # Add new fields with defaults
    if 'cor_secundaria' not in arcano: arcano['cor_secundaria'] = "#ffffff"
    if 'nota_musical' not in arcano: arcano['nota_musical'] = "N/A"
    if 'chacra_regente' not in arcano: arcano['chacra_regente'] = "N/A"
    if 'planeta_regente' not in arcano: arcano['planeta_regente'] = "N/A"
    if 'signo_zodiacal' not in arcano: arcano['signo_zodiacal'] = "N/A"
    if 'carta_oposta' not in arcano: arcano['carta_oposta'] = "N/A"
    if 'dia_semana' not in arcano: arcano['dia_semana'] = "N/A"
    if 'numero_sorte' not in arcano: arcano['numero_sorte'] = num
    
    if 'alimentacao' not in arcano: arcano['alimentacao'] = []
    if 'banho_terapeutico' not in arcano: arcano['banho_terapeutico'] = ""
    if 'movimento_corporal' not in arcano: arcano['movimento_corporal'] = ""
    
    if 'pergunta_junguiana' not in arcano: arcano['pergunta_junguiana'] = ""
    if 'meditacao_guiada' not in arcano: arcano['meditacao_guiada'] = ""
    if 'musicas_recomendadas' not in arcano: arcano['musicas_recomendadas'] = []
    
    if 'alerta_saude' not in arcano['previsao2026']:
        arcano['previsao2026']['alerta_saude'] = ""
        
    for sombra in arcano.get('sombras', []):
        if 'modalidade_terapia' not in sombra:
            sombra['modalidade_terapia'] = ""
            
    for area, detail in arcano.get('rodadaVida', {}).items():
        if 'check_diario' not in detail:
            detail['check_diario'] = ""

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Migration completed successfully.")
