import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Skin {
  id: string;
  name: string;
  game: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  image: string;
  verified: boolean;
  tradeLock: boolean;
}

const mockSkins: Skin[] = [
  {
    id: '1',
    name: 'Dragon Lore AWP',
    game: 'CS:GO',
    rarity: 'legendary',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    verified: true,
    tradeLock: false,
  },
  {
    id: '2',
    name: 'Neon Rider M4A4',
    game: 'CS:GO',
    rarity: 'epic',
    price: 850,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    verified: true,
    tradeLock: false,
  },
  {
    id: '3',
    name: 'Elderflame Vandal',
    game: 'Valorant',
    rarity: 'legendary',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
    verified: true,
    tradeLock: true,
  },
  {
    id: '4',
    name: 'Asiimov AK-47',
    game: 'CS:GO',
    rarity: 'rare',
    price: 450,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
    verified: false,
    tradeLock: false,
  },
  {
    id: '5',
    name: 'Howl M4A4',
    game: 'CS:GO',
    rarity: 'legendary',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400',
    verified: true,
    tradeLock: false,
  },
  {
    id: '6',
    name: 'Hyper Beast',
    game: 'CS:GO',
    rarity: 'epic',
    price: 920,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
    verified: true,
    tradeLock: false,
  },
];

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

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [balance, setBalance] = useState(45750);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTopUp = () => {
    if (topUpAmount && parseFloat(topUpAmount) > 0) {
      const yumoneyUrl = `https://yoomoney.ru/quickpay/confirm?receiver=410011234567890&sum=${topUpAmount}&label=SkinTrade&quickpay-form=button`;
      window.open(yumoneyUrl, '_blank');
      setIsDialogOpen(false);
      setTopUpAmount('');
    }
  };

  const filteredSkins = mockSkins.filter((skin) => {
    const matchesSearch = skin.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || skin.game.toLowerCase().includes(selectedTab.toLowerCase());
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#1a0a2e] to-[#0A0A0F]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF620_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF620_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="relative container mx-auto px-4 py-8">
          <header className="mb-12 text-center animate-slide-in">
            <div className="flex justify-end mb-4">
              <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur-sm glow-primary">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Ваш баланс</p>
                    <p className="text-2xl font-bold text-primary text-glow">{balance.toLocaleString()} ₽</p>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        <Icon name="Plus" className="mr-1 w-4 h-4" />
                        Пополнить
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md border-2 border-primary/30 bg-card">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          Пополнение баланса
                        </DialogTitle>
                        <DialogDescription>
                          Введите сумму для пополнения через ЮМани
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Сумма пополнения (₽)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Введите сумму..."
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(e.target.value)}
                            className="border-2 border-primary/30 focus:border-primary"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setTopUpAmount('500')}
                            className="flex-1"
                          >
                            500 ₽
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setTopUpAmount('1000')}
                            className="flex-1"
                          >
                            1000 ₽
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setTopUpAmount('5000')}
                            className="flex-1"
                          >
                            5000 ₽
                          </Button>
                        </div>
                        <div className="bg-muted/50 border border-primary/20 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Icon name="Wallet" className="text-primary w-6 h-6 mt-1" />
                            <div>
                              <p className="font-semibold text-sm mb-1">Оплата через ЮМани</p>
                              <p className="text-xs text-muted-foreground">
                                После нажатия кнопки откроется страница ЮМани для безопасной оплаты
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={handleTopUp}
                          disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                        >
                          <Icon name="CreditCard" className="mr-2 w-4 h-4" />
                          Перейти к оплате
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
            <div className="inline-flex items-center gap-3 mb-4">
              <Icon name="Shield" className="text-primary w-12 h-12 animate-pulse-glow" />
              <h1 className="text-6xl font-bold text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                SKIN TRADE
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Безопасный обмен и продажа игровых скинов с защитой от мошенничества
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge variant="outline" className="border-primary text-primary glow-primary px-4 py-2">
                <Icon name="CheckCircle" className="mr-2 w-4 h-4" />
                15,000+ Верифицированных
              </Badge>
              <Badge variant="outline" className="border-secondary text-secondary glow-secondary px-4 py-2">
                <Icon name="Users" className="mr-2 w-4 h-4" />
                50,000+ Трейдеров
              </Badge>
              <Badge variant="outline" className="border-accent text-accent glow-accent px-4 py-2">
                <Icon name="TrendingUp" className="mr-2 w-4 h-4" />
                $2M+ Оборот
              </Badge>
            </div>
          </header>

          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Поиск скинов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-primary/30 bg-card/50 backdrop-blur-sm focus:border-primary glow-primary"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-card/50 backdrop-blur-sm border border-primary/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Все
              </TabsTrigger>
              <TabsTrigger value="csgo" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                CS:GO
              </TabsTrigger>
              <TabsTrigger value="valorant" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Valorant
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkins.map((skin, index) => (
              <Card
                key={skin.id}
                className="group relative overflow-hidden border-2 border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${rarityColors[skin.rarity]}`}></div>
                
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    {skin.verified && (
                      <Badge variant="default" className="bg-green-500 text-white border-0">
                        <Icon name="ShieldCheck" className="mr-1 w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                    {skin.tradeLock && (
                      <Badge variant="destructive" className="border-0">
                        <Icon name="Lock" className="mr-1 w-3 h-3" />
                        Lock
                      </Badge>
                    )}
                  </div>
                  <div className={`relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-muted to-background shadow-lg ${rarityGlow[skin.rarity]}`}>
                    <img
                      src={skin.image}
                      alt={skin.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </CardHeader>

                <CardContent>
                  <CardTitle className="mb-2 text-xl">{skin.name}</CardTitle>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className={`${rarityColors[skin.rarity]} text-white border-0`}>
                      {skin.rarity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{skin.game}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" className="text-primary w-5 h-5" />
                    <span className="text-2xl font-bold text-primary text-glow">
                      ${skin.price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                    disabled={skin.tradeLock}
                  >
                    <Icon name="Repeat" className="mr-2 w-4 h-4" />
                    Обменять
                  </Button>
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    <Icon name="ShoppingCart" className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredSkins.length === 0 && (
            <div className="text-center py-16">
              <Icon name="SearchX" className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Скины не найдены</p>
            </div>
          )}
        </div>
      </div>

      <section className="relative py-16 mt-16 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Система защиты от мошенничества
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary transition-all hover:scale-105">
              <CardHeader>
                <Icon name="ShieldCheck" className="w-12 h-12 text-primary mb-4 animate-pulse-glow" />
                <CardTitle>Верификация личности</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Многоуровневая проверка аккаунтов с использованием документов и игровой истории
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/30 bg-card/50 backdrop-blur-sm hover:border-secondary transition-all hover:scale-105">
              <CardHeader>
                <Icon name="Lock" className="w-12 h-12 text-secondary mb-4 animate-pulse-glow" />
                <CardTitle>Escrow система</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Предметы блокируются на платформе до завершения сделки обеими сторонами
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/30 bg-card/50 backdrop-blur-sm hover:border-accent transition-all hover:scale-105">
              <CardHeader>
                <Icon name="AlertTriangle" className="w-12 h-12 text-accent mb-4 animate-pulse-glow" />
                <CardTitle>Мониторинг сделок</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI-алгоритмы отслеживают подозрительную активность и блокируют мошенников
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}