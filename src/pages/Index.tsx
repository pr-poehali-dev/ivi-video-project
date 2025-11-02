import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface Video {
  id: number;
  title: string;
  cover: string;
  type: 'movie' | 'series' | 'anime';
  year: number;
  rating: number;
  episodes?: number;
  watched: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      title: 'Космическая Одиссея',
      cover: 'https://cdn.poehali.dev/projects/5b286b17-0f31-4f74-be53-ee524b61ade7/files/b4b43625-fe55-447c-8d61-4d48bca951cf.jpg',
      type: 'movie',
      year: 2024,
      rating: 8.9,
      watched: false
    },
    {
      id: 2,
      title: 'Атака Титанов',
      cover: 'https://cdn.poehali.dev/projects/5b286b17-0f31-4f74-be53-ee524b61ade7/files/ef2ba2bd-ef07-42a0-b2a6-fef10f62dbcf.jpg',
      type: 'anime',
      year: 2023,
      rating: 9.2,
      episodes: 24,
      watched: false
    },
    {
      id: 3,
      title: 'Тёмные Воды',
      cover: 'https://cdn.poehali.dev/projects/5b286b17-0f31-4f74-be53-ee524b61ade7/files/645f0ad3-5048-4365-b481-9807ee697f41.jpg',
      type: 'series',
      year: 2024,
      rating: 8.5,
      episodes: 10,
      watched: true
    }
  ]);

  const toggleWatched = (id: number) => {
    setVideos(videos.map(v => v.id === id ? { ...v, watched: !v.watched } : v));
  };

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const VideoCard = ({ video }: { video: Video }) => (
    <div className="group relative overflow-hidden rounded-lg hover-scale cursor-pointer">
      <div className="aspect-[2/3] relative">
        <img 
          src={video.cover} 
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            className="w-full mb-2"
            onClick={() => toggleWatched(video.id)}
          >
            <Icon name={video.watched ? "Check" : "Play"} className="mr-2" size={16} />
            {video.watched ? 'Просмотрено' : 'Смотреть'}
          </Button>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="flex-1">
              <Icon name="Plus" size={16} />
            </Button>
            <Button size="sm" variant="secondary" className="flex-1">
              <Icon name="Info" size={16} />
            </Button>
          </div>
        </div>
        {video.watched && (
          <div className="absolute top-2 right-2 bg-primary rounded-full p-1.5">
            <Icon name="Check" size={16} className="text-primary-foreground" />
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-sm line-clamp-1">{video.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{video.year}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={12} className="fill-primary text-primary" />
            <span>{video.rating}</span>
          </div>
          {video.episodes && (
            <>
              <span>•</span>
              <span>{video.episodes} эп.</span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gradient">КИНОПОИСК</h1>
              <nav className="hidden md:flex gap-6">
                <button 
                  onClick={() => setActiveTab('main')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'main' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Каталог
                </button>
                <button 
                  onClick={() => setActiveTab('my')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'my' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Мои видео
                </button>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'favorites' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Избранное
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Поиск фильмов, сериалов, аниме..."
                  className="pl-10 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Icon name="Upload" size={18} />
                    <span className="hidden sm:inline">Загрузить</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Загрузить видео</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Название</Label>
                      <Input placeholder="Введите название" />
                    </div>
                    <div className="space-y-2">
                      <Label>Тип контента</Label>
                      <Tabs defaultValue="movie" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="movie">Фильм</TabsTrigger>
                          <TabsTrigger value="series">Сериал</TabsTrigger>
                          <TabsTrigger value="anime">Аниме</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    <div className="space-y-2">
                      <Label>Обложка (URL)</Label>
                      <Input placeholder="https://..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Год</Label>
                        <Input type="number" placeholder="2024" />
                      </div>
                      <div className="space-y-2">
                        <Label>Рейтинг</Label>
                        <Input type="number" step="0.1" placeholder="8.5" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Описание</Label>
                      <Textarea placeholder="Краткое описание..." rows={3} />
                    </div>
                    <Button className="w-full">Загрузить видео</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="ghost" className="rounded-full">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'main' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative h-[500px] rounded-2xl overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/5b286b17-0f31-4f74-be53-ee524b61ade7/files/b4b43625-fe55-447c-8d61-4d48bca951cf.jpg"
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-2xl">
                <Badge className="w-fit mb-4">Новинка</Badge>
                <h2 className="text-5xl font-bold mb-4">Космическая Одиссея</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Захватывающее путешествие через галактику, где команда исследователей сталкивается с невероятными открытиями.
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <span className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="fill-primary text-primary" />
                    8.9
                  </span>
                  <span>2024</span>
                  <span>2ч 25м</span>
                  <Badge variant="secondary">Sci-Fi</Badge>
                </div>
                <div className="flex gap-3">
                  <Button size="lg" className="gap-2">
                    <Icon name="Play" size={20} />
                    Смотреть
                  </Button>
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Icon name="Plus" size={20} />
                    В избранное
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Популярное сейчас</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Каталог</h2>
              <Tabs defaultValue="all" className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="movie">Фильмы</TabsTrigger>
                  <TabsTrigger value="series">Сериалы</TabsTrigger>
                  <TabsTrigger value="anime">Аниме</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'my' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Мои видео</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить видео
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Загрузить видео</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Название</Label>
                      <Input placeholder="Введите название" />
                    </div>
                    <div className="space-y-2">
                      <Label>Обложка (URL)</Label>
                      <Input placeholder="https://..." />
                    </div>
                    <Button className="w-full">Загрузить</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {videos.filter(v => v.id === 1 || v.id === 2).map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Избранное</h2>
            {videos.filter(v => v.watched).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {videos.filter(v => v.watched).map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Icon name="Heart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Избранное пусто</h3>
                <p className="text-muted-foreground">Добавьте видео в избранное, чтобы они отображались здесь</p>
              </Card>
            )}
          </div>
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around p-2">
          <Button 
            variant={activeTab === 'main' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('main')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Icon name="Home" size={20} />
            <span className="text-xs">Главная</span>
          </Button>
          <Button 
            variant={activeTab === 'catalog' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('catalog')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Icon name="Grid3x3" size={20} />
            <span className="text-xs">Каталог</span>
          </Button>
          <Button 
            variant={activeTab === 'my' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('my')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Icon name="Video" size={20} />
            <span className="text-xs">Мои</span>
          </Button>
          <Button 
            variant={activeTab === 'favorites' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveTab('favorites')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Icon name="Heart" size={20} />
            <span className="text-xs">Избранное</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
