import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface UserStats {
  casesOpened: number;
  itemsWon: number;
  totalSpent: number;
  totalEarned: number;
  tradingLevel: number;
}

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    steamId: string;
    verified: boolean;
    joinDate: Date;
  };
  stats: UserStats;
  onLogout: () => void;
}

export default function UserProfile({ user, stats, onLogout }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const levelProgress = (stats.casesOpened % 10) * 10;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto p-2 hover:bg-card/50">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border-2 border-primary">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold flex items-center gap-1">
                {user.name}
                {user.verified && <Icon name="BadgeCheck" className="w-4 h-4 text-primary" />}
              </p>
              <p className="text-xs text-muted-foreground">Уровень {stats.tradingLevel}</p>
            </div>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl border-2 border-primary/30 bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Профиль трейдера
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-2 border-primary/30 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-24 h-24 border-4 border-primary glow-primary">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold">{user.name}</h3>
                    {user.verified && (
                      <Badge className="bg-green-500 text-white">
                        <Icon name="ShieldCheck" className="mr-1 w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Steam ID: {user.steamId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    На платформе с {user.joinDate.toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Уровень трейдера: {stats.tradingLevel}</span>
                  <span className="text-sm text-muted-foreground">{levelProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  До следующего уровня: {10 - (stats.casesOpened % 10)} кейсов
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card/50">
              <TabsTrigger value="stats">Статистика</TabsTrigger>
              <TabsTrigger value="achievements">Достижения</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-2 border-primary/30 bg-card/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Icon name="Package" className="text-primary w-4 h-4" />
                      Кейсов открыто
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-3xl font-bold text-primary">{stats.casesOpened}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary/30 bg-card/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Icon name="Trophy" className="text-secondary w-4 h-4" />
                      Предметов выиграно
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-3xl font-bold text-secondary">{stats.itemsWon}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent/30 bg-card/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Icon name="TrendingDown" className="text-accent w-4 h-4" />
                      Всего потрачено
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-3xl font-bold text-accent">{stats.totalSpent.toLocaleString()} ₽</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-500/30 bg-card/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Icon name="TrendingUp" className="text-green-500 w-4 h-4" />
                      Всего заработано
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-3xl font-bold text-green-500">{stats.totalEarned.toLocaleString()} ₽</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-2 border-primary/30 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-sm">Баланс прибыли</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {(stats.totalEarned - stats.totalSpent).toLocaleString()} ₽
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stats.totalEarned > stats.totalSpent ? 'В плюсе' : 'В минусе'}
                      </p>
                    </div>
                    <Icon 
                      name={stats.totalEarned > stats.totalSpent ? "TrendingUp" : "TrendingDown"} 
                      className={`w-12 h-12 ${stats.totalEarned > stats.totalSpent ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-3">
              {[
                { icon: "Star", title: "Первый кейс", desc: "Открыт первый кейс", unlocked: stats.casesOpened >= 1 },
                { icon: "Sparkles", title: "Удача начинающего", desc: "Выиграй 5 предметов", unlocked: stats.itemsWon >= 5 },
                { icon: "Crown", title: "Легендарный дроп", desc: "Выиграй легендарный предмет", unlocked: false },
                { icon: "Target", title: "Коллекционер", desc: "Открой 50 кейсов", unlocked: stats.casesOpened >= 50 },
                { icon: "Zap", title: "Торговец", desc: "Продай предметов на 10,000₽", unlocked: stats.totalEarned >= 10000 },
              ].map((achievement, index) => (
                <Card 
                  key={index}
                  className={`border-2 ${achievement.unlocked ? 'border-primary/50 bg-primary/10' : 'border-muted/30 bg-muted/5 opacity-50'}`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <Icon name={achievement.icon as any} className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                    </div>
                    {achievement.unlocked && (
                      <Icon name="CheckCircle" className="w-6 h-6 text-primary" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Icon name="LogOut" className="mr-2 w-4 h-4" />
            Выйти из аккаунта
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type { UserStats };
