import React, { useState, useEffect } from "react";
import { Heart, Share2, History, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface FavoriteItem {
  id: string;
  type: "empresa" | "cnae" | "estado";
  name: string;
  subtitle?: string;
  url: string;
  addedAt: string;
}

interface SearchHistoryItem {
  id: string;
  query: string;
  type: string;
  timestamp: string;
  results: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dadosdocnpj_favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (item: Omit<FavoriteItem, "addedAt">) => {
    const newItem: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString()
    };
    
    const updated = [...favorites.filter(f => f.id !== item.id), newItem];
    setFavorites(updated);
    localStorage.setItem("dadosdocnpj_favorites", JSON.stringify(updated));
    
    toast({
      title: "Adicionado aos favoritos",
      description: `${item.name} foi salvo em seus favoritos.`
    });
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("dadosdocnpj_favorites", JSON.stringify(updated));
    
    toast({
      title: "Removido dos favoritos",
      description: "Item removido com sucesso."
    });
  };

  const isFavorite = (id: string) => favorites.some(f => f.id === id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dadosdocnpj_search_history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addToHistory = (item: Omit<SearchHistoryItem, "id" | "timestamp">) => {
    const newItem: SearchHistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString()
    };
    
    const updated = [newItem, ...history.filter(h => h.query !== item.query).slice(0, 49)];
    setHistory(updated);
    localStorage.setItem("dadosdocnpj_search_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("dadosdocnpj_search_history");
    toast({
      title: "Histórico limpo",
      description: "Seu histórico de pesquisas foi apagado."
    });
  };

  return { history, addToHistory, clearHistory };
};

interface FavoriteButtonProps {
  item: Omit<FavoriteItem, "addedAt">;
  size?: "sm" | "default" | "lg";
}

export const FavoriteButton = ({ item, size = "default" }: FavoriteButtonProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(item.id);

  const handleClick = () => {
    if (favorited) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return (
    <Button
      variant={favorited ? "default" : "outline"}
      size={size}
      onClick={handleClick}
      className={favorited ? "bg-red-500 hover:bg-red-600 text-white" : ""}
    >
      <Heart className={`h-4 w-4 ${favorited ? "fill-current" : ""}`} />
      {size !== "sm" && <span className="ml-2">{favorited ? "Favoritado" : "Favoritar"}</span>}
    </Button>
  );
};

export const ShareButton = ({ title, url }: { title: string; url: string }) => {
  const shareData = {
    title: `${title} | Dados do CNPJ`,
    text: `Confira informações sobre ${title} no Dados do CNPJ`,
    url: url
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Erro ao compartilhar:", err);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para sua área de transferência."
    });
  };

  return (
    <Button variant="outline" onClick={handleShare}>
      <Share2 className="h-4 w-4 mr-2" />
      Compartilhar
    </Button>
  );
};

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistorySidebar = ({ isOpen, onClose }: HistorySidebarProps) => {
  const { history, clearHistory } = useSearchHistory();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-lg p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Histórico de Pesquisas</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        {history.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma pesquisa ainda
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {history.length} pesquisas
              </span>
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                Limpar histórico
              </Button>
            </div>

            {history.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.query}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {item.results} resultados
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const HistoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <History className="h-4 w-4 mr-2" />
        Histórico
      </Button>
      <HistorySidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};