import json

arcanos = {
    0: {"nome": "O Louco", "attr": "Liberdade e Caos", "acao": "Aventure-se no desconhecido"},
    1: {"nome": "O Mago", "attr": "Vontade e Início", "acao": "Inicie um projeto prático"},
    2: {"nome": "A Sacerdotisa", "attr": "Intuição e Mistério", "acao": "Silencie e medite"},
    3: {"nome": "A Imperatriz", "attr": "Criatividade e Abundância", "acao": "Crie algo belo"},
    4: {"nome": "O Imperador", "attr": "Estrutura e Ordem", "acao": "Organize suas finanças"},
    5: {"nome": "O Papa", "attr": "Sabedoria e Tradição", "acao": "Busque um conselho sábio"},
    6: {"nome": "Os Enamorados", "attr": "Escolha e União", "acao": "Siga seu coração"},
    7: {"nome": "O Carro", "attr": "Vitória e Movimento", "acao": "Avance com determinação"},
    8: {"nome": "A Justiça", "attr": "Equilíbrio e Verdade", "acao": "Seja honesto consigo mesmo"},
    9: {"nome": "O Eremita", "attr": "Introspecção e Luz", "acao": "Busque a resposta no silêncio"},
    10: {"nome": "A Roda da Fortuna", "attr": "Mudança e Ciclos", "acao": "Aceite as voltas que a vida dá"},
    11: {"nome": "A Força", "attr": "Domínio e Coragem", "acao": "Domine seus impulsos com amor"},
    12: {"nome": "O Pendurado", "attr": "Perspectiva e Pausa", "acao": "Mude seu ponto de vista"},
    13: {"nome": "A Morte", "attr": "Transformação e Fim", "acao": "Deixe o velho para trás"},
    14: {"nome": "A Temperança", "attr": "Alquimia e Paciência", "acao": "Equilibre seus opostos"},
    15: {"nome": "O Diabo", "attr": "Paixão e Sombra", "acao": "Enfrente seus desejos ocultos"},
    16: {"nome": "A Torre", "attr": "Ruptura e Libertação", "acao": "Deixe o falso cair"},
    17: {"nome": "A Estrela", "attr": "Esperança e Fé", "acao": "Confie no fluxo do universo"},
    18: {"nome": "A Lua", "attr": "Sonhos e Ilusão", "acao": "Cuidado com o que parece ser"},
    19: {"nome": "O Sol", "attr": "Sucesso e Alegria", "acao": "Brilhe e compartilhe sua luz"},
    20: {"nome": "O Julgamento", "attr": "Despertar e Chamado", "acao": "Ouça sua voz interior agora"},
    21: {"nome": "O Mundo", "attr": "Plenitude e Unidade", "acao": "Celebre sua jornada completa"}
}

def generate_matrix_a():
    matrix = {}
    for i in range(22):
        for j in range(22):
            if j == 0: j_num = 0
            else: j_num = j
            
            p = arcanos[i]
            d = arcanos[j]
            
            key = f"{i}-{j}"
            insight = f"{p['nome']} encontra {d['nome']}: A energia de {p['attr']} é hoje catalisada por {d['attr']}. Momento de unificar essas forças."
            alerta = f"Não deixe que o excesso de {d['attr'].split()[0]} bloqueie sua essência de {p['nome']}."
            acao = f"{d['acao']} hoje."
            
            matrix[key] = {
                "insight": insight,
                "alerta": alerta,
                "acao": acao
            }
    
    with open('src/data/matrices/matrix_arcano_day.json', 'w', encoding='utf-8') as f:
        json.dump(matrix, f, indent=2, ensure_ascii=False)

def generate_matrix_b():
    fases = ["nova", "crescente", "cheia", "minguante"]
    matrix = {}
    for i in range(22):
        for fase in fases:
            p = arcanos[i]
            key = f"{i}-{fase}"
            insight = f"{p['nome']} na Lua {fase.capitalize()}: Ciclo perfeito para alinhar {p['attr']} com as marés lunares."
            ritual = f"Durante esta lua, pratique: {p['acao']}."
            afirmacao = f"Eu sintonizo minha essência de {p['nome']} com o poder da Lua {fase.capitalize()}."
            
            matrix[key] = {
                "insight": insight,
                "ritual": ritual,
                "afirmacao": afirmacao
            }
            
    with open('src/data/matrices/matrix_arcano_moon.json', 'w', encoding='utf-8') as f:
        json.dump(matrix, f, indent=2, ensure_ascii=False)

def generate_matrix_c():
    signos = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"]
    matrix = {}
    for i in range(22):
        for signo in signos:
            p = arcanos[i]
            key = f"{i}-{signo}"
            perfil = f"O arquétipo d{p['nome']} encontra sua expressão solar em {signo}. Esta combinação funde a força de {p['attr']} com a modalidade zodiacal."
            matrix[key] = {
                "perfil": perfil,
                "ponto_cego": f"O excesso de {p['attr'].split()[0]} pode obscurecer a clareza de {signo}.",
                "lideranca": f"Inspirar equilíbrio entre o arquétipo e o signo."
            }
    with open('src/data/matrices/matrix_arcano_sign.json', 'w', encoding='utf-8') as f:
        json.dump(matrix, f, indent=2, ensure_ascii=False)

def generate_matrix_d():
    matrix = {}
    for i in range(22):
        for j in range(22):
            p = arcanos[i]
            d = arcanos[j]
            key = f"{i}-{j}"
            matrix[key] = {
                "titulo": f"De {p['nome']} para {d['nome']}",
                "conselho": f"O ciclo de {p['nome']} serviu como base para o despertar de {d['nome']}. Integre a sabedoria do passado para o novo ciclo.",
                "desafio": f"Não carregar o peso de {p['attr'].split()[0]} para o novo terreno de {d['attr'].split()[0]}."
            }
    with open('src/data/matrices/matrix_year_transition.json', 'w', encoding='utf-8') as f:
        json.dump(matrix, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    generate_matrix_a()
    generate_matrix_b()
    generate_matrix_c()
    generate_matrix_d()
    print("Todas as Matrizes (A, B, C, D) geradas com sucesso!")
