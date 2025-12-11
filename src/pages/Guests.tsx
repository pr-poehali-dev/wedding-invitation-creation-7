import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Guest {
  id: number;
  name: string;
  message: string;
  willAttend: boolean;
  transfer: string;
  foodPreference: string;
  drinks: string;
  hasKids: boolean;
  createdAt: string;
}

const Guests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/1cc5dd29-31e1-419e-be42-84acb4aeeb6d');
      const data = await response.json();
      setGuests(data.guests || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Ошибка загрузки гостей:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FDE1D3] via-white to-[#E5DEFF] flex items-center justify-center">
        <div className="text-2xl font-serif">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE1D3] via-white to-[#E5DEFF] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-primary mb-4">
            Список гостей
          </h1>
          <p className="text-xl text-muted-foreground">
            Всего подтверждений: <span className="font-bold text-primary">{total}</span>
          </p>
        </div>

        {guests.length === 0 ? (
          <Card className="p-12 text-center">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">Пока нет подтверждений</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {guests.map((guest) => (
              <Card key={guest.id} className="p-6 sm:p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={32} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary mb-1">
                        {guest.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(guest.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name={guest.willAttend ? "Check" : "X"} size={16} className="text-primary" />
                        <span>Придёт: <strong>{guest.willAttend ? 'Да' : 'Нет'}</strong></span>
                      </div>
                      
                      {guest.transfer && (
                        <div className="flex items-center gap-2">
                          <Icon name="Car" size={16} className="text-primary" />
                          <span>Трансфер: <strong>{guest.transfer}</strong></span>
                        </div>
                      )}
                      
                      {guest.foodPreference && (
                        <div className="flex items-center gap-2">
                          <Icon name="Utensils" size={16} className="text-primary" />
                          <span>Еда: <strong>{guest.foodPreference}</strong></span>
                        </div>
                      )}
                      
                      {guest.drinks && (
                        <div className="flex items-center gap-2">
                          <Icon name="Wine" size={16} className="text-primary" />
                          <span>Напитки: <strong>{guest.drinks}</strong></span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Icon name="Baby" size={16} className="text-primary" />
                        <span>С ребёнком: <strong>{guest.hasKids ? 'Да' : 'Нет'}</strong></span>
                      </div>
                    </div>

                    {guest.message && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                        <p className="text-sm font-semibold mb-1 text-primary">Сообщение:</p>
                        <p className="text-sm italic">{guest.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guests;
