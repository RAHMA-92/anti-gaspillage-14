
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Trash, Plus, Minus, MapPin, Calendar } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: any;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress?: string;
}

const CartComponent = () => {
  const { t } = useLanguage();
  const { products } = useProducts();
  const { profileData } = useProfile();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const addToCart = (productId: number, deliveryOption: 'pickup' | 'delivery' = 'pickup') => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.productId === productId);
    
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        productId,
        quantity: 1,
        product,
        deliveryOption
      };
      setCartItems(prev => [...prev, newItem]);
    }

    toast({
      title: "✅ Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "🗑️ Produit retiré",
      description: "Le produit a été retiré de votre panier",
    });
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.isDonation ? 0 : parseInt(item.product.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const processOrder = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "⚠️ Panier vide",
        description: "Ajoutez des produits à votre panier avant de commander",
        variant: "destructive"
      });
      return;
    }

    if (!profileData.name) {
      toast({
        title: "⚠️ Connexion requise",
        description: "Veuillez vous connecter pour passer commande",
        variant: "destructive"
      });
      return;
    }

    setIsProcessingOrder(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart after successful order
      setCartItems([]);
      
      toast({
        title: "🎉 Commande confirmée !",
        description: "Votre commande a été enregistrée avec succès",
      });
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors du traitement de votre commande",
        variant: "destructive"
      });
    } finally {
      setIsProcessingOrder(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Mon Panier ({cartItems.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Votre panier est vide</p>
            <p className="text-sm">Ajoutez des produits pour commencer</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.product.description}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {item.product.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.product.expiryDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={item.deliveryOption === 'delivery' ? 'default' : 'secondary'}>
                      {item.deliveryOption === 'delivery' ? 'Livraison' : 'Retrait'}
                    </Badge>
                    {item.product.isDonation && (
                      <Badge className="bg-eco-500">
                        Gratuit
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <div className="font-bold">
                    {item.product.isDonation ? 'Gratuit' : `${parseInt(item.product.price) * item.quantity} DA`}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>{getTotalPrice()} DA</span>
            </div>
            
            <Button 
              onClick={processOrder}
              disabled={isProcessingOrder}
              className="w-full bg-eco-600 hover:bg-eco-700"
            >
              {isProcessingOrder ? 'Traitement...' : 'Confirmer la commande'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CartComponent;
