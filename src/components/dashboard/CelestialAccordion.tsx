import React from 'react';
import { PlanetCard, PlanetCardData } from './PlanetCard';
import { interpretationsDB, getGenericInterpretation } from '../../data/astrologyInterpretations';

interface Props {
    planets: PlanetCardData[];
    selectedPlanet: PlanetCardData | null;
    onSelect: (planet: PlanetCardData) => void;
}

export const CelestialAccordion: React.FC<Props> = ({ planets, selectedPlanet, onSelect }) => {
    return (
        <div className="space-y-3">
            {planets.map((planet) => {
                // Resolver a interpretação junguiana do BD de dados
                const dbKey = `${planet.key}_${planet.sign.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`; // Tratamento básico de nome de signo para bater db
                let interpretation = interpretationsDB[dbKey];
                if (!interpretation) {
                    // Fallback map since we use standard key 'sun_cancer' etc.
                    // Adjust if necessary depending on the mock data exact casing. We will just pass lowercased keys.
                    interpretation = getGenericInterpretation(planet.key, planet.sign);
                }

                return (
                    <PlanetCard
                        key={planet.key}
                        data={planet}
                        interpretation={interpretation}
                        isExpanded={selectedPlanet?.key === planet.key}
                        onClick={() => onSelect(planet)}
                    />
                );
            })}
        </div>
    );
};
