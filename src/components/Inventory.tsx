import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface InventoryItem {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  value: number;
  wonAt: Date;
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-amber-500',
};

const rarityGlow = {
  common: 'shadow-gray-500/50',
  rare: 'shadow-blue-500/50',
  epic: 'shadow-purple-500/50',
  legendary: 'shadow-amber-500/50',
};

const rarityValues = {
  common: 50,
  rare: 150,
  epic: 400,
  legendary: 1200,
};

interface InventoryProps {
  items: InventoryItem[];
  onSellItem: (itemId: string, value: number) => void;
}

export default function Inventory({ items, onSellItem }: InventoryProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const totalValue = Array.from(selectedItems).reduce((sum, itemId) => {
    const item = items.find(i => i.id === itemId);
    return sum + (item?.value || 0);
  }, 0);

  const toggleItemSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSellSelected = () => {
    selectedItems.forEach(itemId => {
      const item = items.find(i => i.id === itemId);
      if (item) {
        onSellItem(itemId, item.value);
      }
    });
    setSelectedItems(new Set());
  };

  const selectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-16">
        <div className="text-center">
          <Icon name="PackageOpen" className="w-24 h-24 mx-auto text-muted-foreground mb-6 animate-float" />
          <h3 className="text-2xl font-bold mb-2">Инвентарь пуст</h3>
          <p className="text-muted-foreground mb-6">Откройте кейсы, чтобы получить предметы</p>
          <Button className="bg-primary hover:bg-primary/90 glow-primary">
            <Icon name="Package" className="mr-2 w-4 h-4" />
            Открыть кейсы
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Мой инвентарь
          </h2>
          <p className="text-muted-foreground mt-2">
            Всего предметов: {items.length} • Выбрано: {selectedItems.size}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={selectAll}
            className="border-primary/30"
          >
            <Icon name="CheckSquare" className="mr-2 w-4 h-4" />
            {selectedItems.size === items.length ? 'Снять выделение' : 'Выбрать все'}
          </Button>
          {selectedItems.size > 0 && (
            <Button
              onClick={handleSellSelected}
              className="bg-secondary hover:bg-secondary/90 glow-secondary"
            >
              <Icon name="DollarSign" className="mr-2 w-4 h-4" />
              Продать за {totalValue} ₽
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <Card
            key={item.id}
            className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 animate-slide-in ${
              selectedItems.has(item.id)
                ? 'border-4 border-primary glow-primary'
                : 'border-2 border-primary/20 hover:border-primary'
            } bg-card/80 backdrop-blur-sm`}
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => toggleItemSelection(item.id)}
          >
            <div className={`absolute top-0 left-0 right-0 h-1 ${rarityColors[item.rarity]}`}></div>
            
            {selectedItems.has(item.id) && (
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-primary rounded-full p-1">
                  <Icon name="Check" className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            )}

            <CardHeader className="p-3">
              <div className={`relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-muted to-background shadow-lg ${rarityGlow[item.rarity]}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </CardHeader>

            <CardContent className="p-3 pt-0">
              <CardTitle className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{item.name}</CardTitle>
              <Badge className={`${rarityColors[item.rarity]} text-white text-xs mb-2 w-full justify-center`}>
                {item.rarity.toUpperCase()}
              </Badge>
              <div className="flex items-center justify-center gap-1 text-primary">
                <Icon name="DollarSign" className="w-3 h-3" />
                <span className="text-sm font-bold">{item.value} ₽</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-2 border-primary/30 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" className="text-primary w-5 h-5" />
            Как работает инвентарь?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <Icon name="Package" className="text-secondary w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>Все выигранные предметы из кейсов попадают в ваш инвентарь</p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="MousePointer" className="text-accent w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>Кликайте на предметы, чтобы выбрать их для продажи</p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="DollarSign" className="text-primary w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>Продавайте предметы мгновенно и получайте деньги на баланс</p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="TrendingUp" className="text-secondary w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>Цена зависит от редкости: Common ~50₽, Rare ~150₽, Epic ~400₽, Legendary ~1200₽</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { rarityValues };
export type { InventoryItem };
