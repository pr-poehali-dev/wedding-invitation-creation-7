import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    willAttend: true,
    transfer: 'no',
    foodPreference: 'no',
    drinks: [] as string[],
    hasKids: false
  });

  const weddingDate = new Date('2026-09-05T14:30:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/6104a888-245b-43b7-a2a7-880e754d1d4b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Спасибо за подтверждение! 💕",
          description: "Мы получили ваш ответ и очень ждем встречи!"
        });
        setShowForm(false);
      } else {
        toast({
          title: "Ошибка отправки",
          description: "Попробуйте еще раз или свяжитесь с нами напрямую",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами напрямую",
        variant: "destructive"
      });
    }
  };

  const schedule = [
    { time: '14:40', title: 'Торжественная роспись', location: 'ЗАГС', icon: 'Heart' },
    { time: '17:00', title: 'Фуршет', location: 'Банкетный зал', icon: 'Wine' },
    { time: '22:00', title: 'Торт', location: 'Банкетный зал', icon: 'Cake' },
    { time: '23:30', title: 'Окончание', location: '', icon: 'Moon' }
  ];

  const colors = ['#FDE1D3', '#E5DEFF', '#FFDEE2', '#F2FCE2', '#FEF7CD', '#FEC6A1'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE1D3] via-white to-[#E5DEFF]">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary animate-pulse"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl animate-fade-in px-2">
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
            <span className="font-serif font-light text-3xl sm:text-6xl">ДАНИЛ</span>
            <Icon name="Heart" size={32} className="text-primary animate-scale-in sm:w-12 sm:h-12" />
            <span className="font-serif font-light text-3xl sm:text-6xl">АЛЕНА</span>
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-8xl font-serif font-bold mb-4 sm:mb-6 text-primary leading-tight">
            ПРИГЛАШАЕМ НА СВАДЬБУ
          </h1>

          <p className="text-xl sm:text-3xl mb-2 sm:mb-4 font-light">05 сентября 2026</p>
          <p className="text-base sm:text-xl mb-8 sm:mb-12 text-muted-foreground">Ждем Вас на свадьбе</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12 max-w-2xl mx-auto">
            {[
              { value: timeLeft.days, label: 'дней' },
              { value: timeLeft.hours, label: 'часов' },
              { value: timeLeft.minutes, label: 'минут' },
              { value: timeLeft.seconds, label: 'секунд' }
            ].map((item, idx) => (
              <Card key={idx} className="p-3 sm:p-6 bg-white/80 backdrop-blur-sm border-primary/20 animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-primary mb-1 sm:mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{item.label}</div>
              </Card>
            ))}
          </div>

          <Button 
            size="lg" 
            className="text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-full bg-primary hover:bg-primary/90 shadow-xl"
            onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Узнать подробности
            <Icon name="ChevronDown" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section id="details" className="py-12 sm:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-4 sm:mb-6 text-primary">Дорогой Гость!</h2>
            <p className="text-base sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Мы приглашаем Вас разделить с нами радость самого незабываемого дня в нашей жизни.
            </p>
            <div className="mt-6 sm:mt-8 text-lg sm:text-2xl">
              <p className="font-semibold mb-2">05.09.2026 в 14:30</p>
              <p className="text-base sm:text-lg text-muted-foreground">Место встречи: ЗАГС</p>
            </div>
          </div>

          <blockquote className="text-center text-lg sm:text-2xl font-serif italic text-primary mb-12 sm:mb-20 py-6 sm:py-8 border-y border-primary/20">
            Там, где посеяна любовь, растёт радость.
          </blockquote>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
            <Card className="p-6 sm:p-8 text-center animate-fade-in bg-gradient-to-br from-[#FDE1D3] to-white border-primary/20">
              <Icon name="User" size={36} className="mx-auto mb-3 sm:mb-4 text-primary sm:w-12 sm:h-12" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Жених</h3>
              <p className="text-3xl sm:text-5xl font-serif text-primary">Данил</p>
            </Card>
            <Card className="p-6 sm:p-8 text-center animate-fade-in bg-gradient-to-br from-[#E5DEFF] to-white border-primary/20">
              <Icon name="User" size={36} className="mx-auto mb-3 sm:mb-4 text-secondary sm:w-12 sm:h-12" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Невеста</h3>
              <p className="text-3xl sm:text-5xl font-serif text-secondary">Алена</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-[#E5DEFF]/30 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-center mb-10 sm:mb-16 text-primary">
            Расписание дня
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {schedule.map((item, idx) => (
              <Card 
                key={idx} 
                className="p-4 sm:p-8 animate-fade-in hover:shadow-xl transition-all duration-300 border-primary/20"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-3 sm:gap-6">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={item.icon as any} size={24} className="text-primary sm:w-8 sm:h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl sm:text-3xl font-serif font-bold text-primary mb-1 sm:mb-2">{item.time}</div>
                    <div className="text-lg sm:text-2xl font-semibold mb-1">{item.title}</div>
                    {item.location && <div className="text-muted-foreground">{item.location}</div>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
            <Card className="p-6 sm:p-8 animate-fade-in border-primary/20">
              <Icon name="Utensils" size={28} className="text-primary mb-3 sm:mb-4 sm:w-9 sm:h-9" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4">МЕНЮ</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Меню разнообразно, поэтому сообщите нам заранее, если у вас есть какие-либо предпочтения 
                или диетические ограничения. После подтверждения вы сможете пройти опрос о своих 
                вкусовых предпочтениях и напитках.
              </p>
            </Card>

            <Card className="p-6 sm:p-8 animate-fade-in border-primary/20">
              <Icon name="Gift" size={28} className="text-primary mb-3 sm:mb-4 sm:w-9 sm:h-9" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4">ПОЖЕЛАНИЯ ПО ПОДАРКАМ</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                Ваше присутствие в день нашей свадьбы - самый значимый подарок для нас!
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Мы понимаем, что дарить цветы на свадьбу - это традиция, но мы не сможем насладиться 
                их красотой в полной мере... Будем рады любой другой альтернативе (вино или в денежном эквиваленте).
              </p>
            </Card>

            <Card className="p-6 sm:p-8 animate-fade-in border-primary/20">
              <Icon name="AlertCircle" size={28} className="text-primary mb-3 sm:mb-4 sm:w-9 sm:h-9" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4">ПРИМЕЧАНИЕ</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Будем благодарны, если вы воздержитесь от криков "Горько" на празднике, 
                ведь поцелуй — это знак выражения чувств, он не может быть по заказу.
              </p>
            </Card>

            <Card className="p-6 sm:p-8 animate-fade-in border-primary/20">
              <Icon name="Camera" size={28} className="text-primary mb-3 sm:mb-4 sm:w-9 sm:h-9" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4">ФОТО</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Опубликуйте фото дня нашей свадьбы в соц.сетях с хештегом <span className="font-semibold text-primary">#ДанилИАлена2026</span>
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-[#FDE1D3]/30 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-6 sm:mb-8 text-primary">Дресс-код</h2>
          <p className="text-base sm:text-xl mb-8 sm:mb-12 text-muted-foreground">
            Будем благодарны, если при выборе нарядов на наше торжество вы придержитесь следующей палитры
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12">
            {colors.map((color, idx) => (
              <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div 
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg border-2 sm:border-4 border-white hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-6 sm:mb-8 text-primary">
            Подтверждение присутствия
          </h2>
          <p className="text-base sm:text-xl mb-8 sm:mb-12 text-muted-foreground">
            Пожалуйста подтвердите свое присутствие до 01.05.26
          </p>

          {!showForm ? (
            <Button 
              size="lg"
              className="text-base sm:text-xl px-10 sm:px-16 py-6 sm:py-8 rounded-full bg-primary hover:bg-primary/90 shadow-xl"
              onClick={() => setShowForm(true)}
            >
              <Icon name="Check" className="mr-2" size={20} />
              Подтвердить присутствие
            </Button>
          ) : (
            <Card className="p-4 sm:p-8 text-left animate-scale-in border-primary/20">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base sm:text-lg">Ваше имя *</Label>
                  <Input 
                    id="name" 
                    required
                    className="mt-2 text-base sm:text-lg"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label className="text-base sm:text-lg mb-3 sm:mb-4 block">Потребуется ли вам трансфер?</Label>
                  <RadioGroup value={formData.transfer} onValueChange={(value) => setFormData({...formData, transfer: value})}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">Нет</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="before" id="before" />
                      <Label htmlFor="before">Только до торжества</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="after" id="after" />
                      <Label htmlFor="after">Только после торжества</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">До и после торжества</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base sm:text-lg mb-3 sm:mb-4 block">Есть ли у вас особые предпочтения по еде?</Label>
                  <RadioGroup value={formData.foodPreference} onValueChange={(value) => setFormData({...formData, foodPreference: value})}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="no" id="food-no" />
                      <Label htmlFor="food-no">Нет</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="no-meat" id="no-meat" />
                      <Label htmlFor="no-meat">Не ем мясо</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="no-fish" id="no-fish" />
                      <Label htmlFor="no-fish">Не ем рыбу</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegetarian" id="vegetarian" />
                      <Label htmlFor="vegetarian">Вегетарианец</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base sm:text-lg mb-3 sm:mb-4 block">Какой алкоголь вы предпочитаете?</Label>
                  <div className="space-y-2">
                    {['Красное вино', 'Белое вино', 'Шампанское', 'Виски/коньяк', 'Водка', 'Не буду пить алкоголь'].map((drink) => (
                      <div key={drink} className="flex items-center space-x-2">
                        <Checkbox 
                          id={drink}
                          checked={formData.drinks.includes(drink)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({...formData, drinks: [...formData.drinks, drink]});
                            } else {
                              setFormData({...formData, drinks: formData.drinks.filter(d => d !== drink)});
                            }
                          }}
                        />
                        <Label htmlFor={drink}>{drink}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base sm:text-lg mb-3 sm:mb-4 block">Будет ли с вами на празднике ребенок?</Label>
                  <RadioGroup value={formData.hasKids ? 'yes' : 'no'} onValueChange={(value) => setFormData({...formData, hasKids: value === 'yes'})}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="yes" id="kids-yes" />
                      <Label htmlFor="kids-yes">Да</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="kids-no" />
                      <Label htmlFor="kids-no">Нет</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="message" className="text-base sm:text-lg">Добавить сообщение для жениха и невесты</Label>
                  <Textarea 
                    id="message"
                    className="mt-2 min-h-32"
                    placeholder="Ваши пожелания..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button type="submit" size="lg" className="flex-1 text-base sm:text-lg bg-primary hover:bg-primary/90">
                    Отправить
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => setShowForm(false)}>
                    Отмена
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </section>

      <footer className="py-10 sm:py-12 px-4 bg-gradient-to-b from-[#FDE1D3] to-[#E5DEFF] text-center">
        <h3 className="text-3xl sm:text-4xl font-serif font-bold mb-3 sm:mb-4 text-primary">Ждем Вас!</h3>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">05 сентября 2026</p>
        <div className="flex justify-center gap-4 sm:gap-6">
          <div className="text-3xl sm:text-5xl">💍</div>
          <div className="text-3xl sm:text-5xl">💕</div>
          <div className="text-3xl sm:text-5xl">🎉</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;