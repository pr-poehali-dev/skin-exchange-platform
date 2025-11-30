import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSteamLogin: () => void;
}

export default function AuthDialog({ open, onOpenChange, onSteamLogin }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-primary/30 bg-card">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Вход в SKIN TRADE
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Войдите через Steam, чтобы начать торговлю скинами
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted/50 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="Shield" className="text-primary w-8 h-8 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-2">Безопасная авторизация</p>
                <p className="text-sm text-muted-foreground">
                  Мы используем официальный Steam API для входа. Ваши данные защищены.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Icon name="CheckCircle" className="text-secondary w-8 h-8 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-2">Что вы получите:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Доступ к торговле и обмену</li>
                  <li>• Персональный инвентарь</li>
                  <li>• Открытие кейсов</li>
                  <li>• Историю транзакций</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            onClick={onSteamLogin}
            className="w-full h-14 text-lg bg-gradient-to-r from-[#171a21] to-[#1b2838] hover:from-[#1b2838] hover:to-[#171a21] border-2 border-primary/30 glow-primary"
          >
            <svg className="mr-3 w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/>
            </svg>
            Войти через Steam
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Продолжая, вы соглашаетесь с{' '}
              <button className="text-primary hover:underline">
                Условиями использования
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
