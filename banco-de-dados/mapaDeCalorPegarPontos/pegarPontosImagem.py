import pygame
import sys
from pygame.locals import *

clock = pygame.time.Clock()
screen = pygame.display.set_mode((800, 450))

imagem_mercado = pygame.image.load("mercado1.jpg");
imagem_mercado = pygame.transform.scale(imagem_mercado, (800,450))

screen.blit(imagem_mercado, (0, 0))

ordem_click = 1
posicoes_clicadas = []

pygame.init()

def clicou(posicao, ordem_click):
    pygame.draw.circle(screen, (255, 0, 0), [posicao[0], posicao[1]], 10, 10)
    
    font = pygame.font.SysFont(None, 18)
    texto = font.render(str(ordem_click), True, (255, 255, 255))
    screen.blit(texto, (posicao[0] - 5, posicao[1] - 5))

    return (posicao[0], posicao[1])


while True:
    # screen.fill([0, 0, 0])

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            contador = 1
            for posicao in posicoes_clicadas:
                print(f'{contador}º clique')
                print(f'x: {posicao[0]}, \ny: {posicao[1]},')
                contador += 1
            sys.exit()

        elif event.type == pygame.MOUSEBUTTONDOWN:
            posicoes_clicadas.append(clicou(event.pos, ordem_click))
            ordem_click += 1

    pygame.display.update()