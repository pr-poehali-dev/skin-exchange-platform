import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  chance: number;
}

interface Case {
  id: string;
  name: string;
  price: number;
  image: string;
  items: CaseItem[];
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-amber-500',
};

const cases: Case[] = [
  {
    id: '1',
    name: 'Neon Case',
    price: 250,
    image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/4fd9dc3a-2376-43e1-9789-65fcb9902947.jpg',
    items: [
      { id: '1', name: 'Neon Glock', rarity: 'common', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9518c12f-37c1-44f3-a3ec-875b536392f8.jpg', chance: 40 },
      { id: '2', name: 'Cyber AK-47', rarity: 'rare', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9692cbb3-3c06-4cb7-986a-3710116b3776.jpg', chance: 30 },
      { id: '3', name: 'Plasma M4A4', rarity: 'epic', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9518c12f-37c1-44f3-a3ec-875b536392f8.jpg', chance: 20 },
      { id: '4', name: 'Dragon AWP', rarity: 'legendary', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9c1a0a5e-02cf-4683-aaef-3a05dcb45efb.jpg', chance: 10 },
    ],
  },
  {
    id: '2',
    name: 'Dragon Case',
    price: 500,
    image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/4fd9dc3a-2376-43e1-9789-65fcb9902947.jpg',
    items: [
      { id: '5', name: 'Fire Pistol', rarity: 'common', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9518c12f-37c1-44f3-a3ec-875b536392f8.jpg', chance: 35 },
      { id: '6', name: 'Flame Rifle', rarity: 'rare', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9692cbb3-3c06-4cb7-986a-3710116b3776.jpg', chance: 35 },
      { id: '7', name: 'Inferno Sniper', rarity: 'epic', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9c1a0a5e-02cf-4683-aaef-3a05dcb45efb.jpg', chance: 20 },
      { id: '8', name: 'Dragon Lore', rarity: 'legendary', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9c1a0a5e-02cf-4683-aaef-3a05dcb45efb.jpg', chance: 10 },
    ],
  },
  {
    id: '3',
    name: 'Elite Case',
    price: 1000,
    image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/4fd9dc3a-2376-43e1-9789-65fcb9902947.jpg',
    items: [
      { id: '9', name: 'Gold USP', rarity: 'rare', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9518c12f-37c1-44f3-a3ec-875b536392f8.jpg', chance: 40 },
      { id: '10', name: 'Diamond AK', rarity: 'epic', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9692cbb3-3c06-4cb7-986a-3710116b3776.jpg', chance: 35 },
      { id: '11', name: 'Platinum M4', rarity: 'epic', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9518c12f-37c1-44f3-a3ec-875b536392f8.jpg', chance: 20 },
      { id: '12', name: 'Howl Legendary', rarity: 'legendary', image: 'https://cdn.poehali.dev/projects/70a92364-3a8e-4df8-8e07-799dfa0b8197/files/9692cbb3-3c06-4cb7-986a-3710116b3776.jpg', chance: 5 },
    ],
  },
];

interface CaseOpeningProps {
  selectedCase: Case;
  onClose: () => void;
  onItemWon: (item: CaseItem) => void;
}

function CaseRoulette({ selectedCase, onClose, onItemWon }: CaseOpeningProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState<CaseItem | null>(null);
  const [items, setItems] = useState<CaseItem[]>([]);

  useEffect(() => {
    const repeatedItems: CaseItem[] = [];
    for (let i = 0; i < 50; i++) {
      repeatedItems.push(...selectedCase.items);
    }
    setItems(repeatedItems);
  }, [selectedCase]);

  const spinRoulette = () => {
    setIsSpinning(true);
    setWonItem(null);

    const random = Math.random() * 100;
    let cumulative = 0;
    let selected = selectedCase.items[0];

    for (const item of selectedCase.items) {
      cumulative += item.chance;
      if (random <= cumulative) {
        selected = item;
        break;
      }
    }

    setTimeout(() => {
      setWonItem(selected);
      setIsSpinning(false);
      onItemWon(selected);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-2 border-primary/30 bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {selectedCase.name}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" className="w-6 h-6" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden bg-muted/30 rounded-lg h-48 mb-6">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary z-10"></div>
            
            <div
              className={`flex gap-4 p-8 transition-transform ${
                isSpinning ? 'duration-[5000ms] ease-out' : 'duration-0'
              }`}
              style={{
                transform: isSpinning
                  ? `translateX(-${(items.length - 10) * 144}px)`
                  : 'translateX(0)',
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-32 h-32 rounded-lg border-2 ${
                    rarityColors[item.rarity]
                  } border-opacity-50 bg-card flex items-center justify-center`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {!wonItem && !isSpinning && (
            <Button
              onClick={spinRoulette}
              className="w-full h-14 text-lg bg-primary hover:bg-primary/90 glow-primary"
            >
              <Icon name="Play" className="mr-2 w-6 h-6" />
              Открыть за {selectedCase.price} ₽
            </Button>
          )}

          {isSpinning && (
            <div className="text-center">
              <p className="text-xl text-muted-foreground animate-pulse">Открываем кейс...</p>
            </div>
          )}

          {wonItem && !isSpinning && (
            <div className="space-y-4 animate-slide-in">
              <div className="text-center p-6 border-2 border-primary rounded-lg bg-card/50">
                <p className="text-2xl font-bold mb-4 text-primary text-glow">Поздравляем! Вы выиграли:</p>
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-48 h-48 rounded-lg border-4 ${rarityColors[wonItem.rarity]} flex items-center justify-center glow-${wonItem.rarity}`}
                  >
                    <img
                      src={wonItem.image}
                      alt={wonItem.name}
                      className="w-40 h-40 object-cover rounded"
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">{wonItem.name}</h3>
                <Badge className={`${rarityColors[wonItem.rarity]} text-white text-lg px-4 py-2`}>
                  {wonItem.rarity.toUpperCase()}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button onClick={spinRoulette} className="flex-1 bg-secondary hover:bg-secondary/90">
                  <Icon name="RefreshCw" className="mr-2 w-4 h-4" />
                  Открыть ещё
                </Button>
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Закрыть
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6 grid grid-cols-4 gap-4">
            {selectedCase.items.map((item) => (
              <div
                key={item.id}
                className={`p-2 rounded-lg border-2 ${rarityColors[item.rarity]} border-opacity-30 bg-card/50`}
              >
                <img src={item.image} alt={item.name} className="w-full h-16 object-cover rounded mb-2" />
                <p className="text-xs text-center font-semibold truncate">{item.name}</p>
                <p className="text-xs text-center text-muted-foreground">{item.chance}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface CaseOpeningComponentProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onItemWon: (item: CaseItem) => void;
}

export { rarityColors };
export type { CaseItem };

export default function CaseOpeningComponent({ balance, onBalanceChange, onItemWon }: CaseOpeningComponentProps) {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const handleOpenCase = (caseItem: Case) => {
    if (balance >= caseItem.price) {
      setSelectedCase(caseItem);
      onBalanceChange(balance - caseItem.price);
    }
  };

  const handleItemWon = (item: CaseItem) => {
    onItemWon(item);
  };

  return (
    <div className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Открытие кейсов
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((caseItem) => (
          <Card
            key={caseItem.id}
            className="group border-2 border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary transition-all hover:scale-105 cursor-pointer"
          >
            <CardHeader>
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-muted to-background mb-4">
                <img
                  src={caseItem.image}
                  alt={caseItem.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardTitle className="text-xl">{caseItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="Package" className="text-primary w-5 h-5" />
                  <span className="text-2xl font-bold text-primary text-glow">
                    {caseItem.price} ₽
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {caseItem.items.map((item) => (
                  <div
                    key={item.id}
                    className={`aspect-square rounded border ${rarityColors[item.rarity]} border-opacity-30 p-1`}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                  </div>
                ))}
              </div>
              <Button
                onClick={() => handleOpenCase(caseItem)}
                disabled={balance < caseItem.price}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
              >
                <Icon name="Unlock" className="mr-2 w-4 h-4" />
                Открыть кейс
              </Button>
              {balance < caseItem.price && (
                <p className="text-xs text-destructive text-center mt-2">
                  Недостаточно средств
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCase && (
        <CaseRoulette
          selectedCase={selectedCase}
          onClose={() => setSelectedCase(null)}
          onItemWon={handleItemWon}
        />
      )}
    </div>
  );
}