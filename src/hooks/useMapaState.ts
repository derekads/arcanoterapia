import { useState, useRef, useCallback } from 'react';

export const useMapaState = () => {
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

    // Ref para acessar a div principal do Accordion onde os planetas moram
    const planetsListRef = useRef<HTMLDivElement>(null);

    // Sync: quando seleciona no SVG / Quick Nav, scrolla para card
    const selectPlanet = useCallback((name: string) => {
        setSelectedPlanet(name);

        // Auto Scroll Inteligente se estiver no mobile (dar tempo pro card abrir)
        setTimeout(() => {
            if (planetsListRef.current) {
                // Encontrar a tag div correspondente ao id do planeta
                const cardElement = document.getElementById(`planeta-card-${name}`);
                if (cardElement) {
                    // Offsets pra não ficar exato no topo do sticky header
                    const y = cardElement.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        }, 150);
    }, []);

    return { selectedPlanet, selectPlanet, planetsListRef };
};
