
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/contexts/ProductContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Package, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ReservedProducts = () => {
  const { language } = useLanguage();
  const { reservedProducts } = useProducts();

  if (reservedProducts.length === 0) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-eco-50 to-food-50 p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Aucun produit réservé
            </h2>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore réservé de produits. Parcourez notre catalogue pour découvrir des produits disponibles.
            </p>
            <Button 
              onClick={() => window.location.href = '/products'}
              className="bg-eco-600 hover:bg-eco-700"
            >
              Parcourir les produits
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 to-food-50 p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mes produits réservés
          </h1>
          <p className="text-gray-600">
            Suivez vos réservations et organisez la récupération de vos produits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservedProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-green-600">
                  Réservé
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>Partagé par {product.user}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Réservé le {format(new Date(product.reservedDate), 'dd MMMM yyyy', { locale: fr })}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline">
                    {product.price}
                  </Badge>
                  <Button size="sm" className="bg-eco-600 hover:bg-eco-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Date limite : {format(new Date(product.expiryDate), 'dd/MM/yyyy')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservedProducts;
