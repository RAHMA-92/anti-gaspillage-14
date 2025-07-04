
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, Gift, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { useProfile } from '@/contexts/ProfileContext';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'new_product' | 'message' | 'reservation' | 'review' | 'donation';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  productId?: number;
  userId?: string;
  redirectTo?: string;
}

const NotificationSystem = () => {
  const { products } = useProducts();
  const { profileData } = useProfile();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastProductCount, setLastProductCount] = useState(products.length);

  // Monitor for new products
  useEffect(() => {
    if (products.length > lastProductCount) {
      const newProducts = products.slice(0, products.length - lastProductCount);
      
      newProducts.forEach(product => {
        // Don't notify about user's own products
        if (product.user !== profileData.name) {
          const notification: Notification = {
            id: `product-${product.id}-${Date.now()}`,
            type: 'new_product',
            title: 'Nouveau produit disponible !',
            message: `${product.name} a été ajouté dans ${product.location}`,
            timestamp: new Date(),
            isRead: false,
            productId: product.id,
            redirectTo: '/products'
          };
          
          setNotifications(prev => [notification, ...prev]);
          
          // Show toast notification
          toast({
            title: "🔔 Nouveau produit !",
            description: `${product.name} disponible à ${product.location}`,
          });
        }
      });
    }
    
    setLastProductCount(products.length);
  }, [products.length, lastProductCount, profileData.name]);

  // Simulate other types of notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate notifications for demo purposes
      const randomNotifications = [
        {
          type: 'donation' as const,
          title: 'Nouveau don disponible !',
          message: 'Un utilisateur a partagé des produits gratuits près de chez vous',
          redirectTo: '/products'
        },
        {
          type: 'message' as const,
          title: 'Nouveau message',
          message: 'Vous avez reçu un message concernant votre produit',
          redirectTo: '/messages'
        },
        {
          type: 'reservation' as const,
          title: 'Produit réservé',
          message: 'Quelqu\'un s\'intéresse à votre produit',
          redirectTo: '/reserved'
        }
      ];

      if (Math.random() < 0.3 && profileData.name) { // 30% chance every 30 seconds
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        
        const notification: Notification = {
          id: `${randomNotification.type}-${Date.now()}`,
          type: randomNotification.type,
          title: randomNotification.title,
          message: randomNotification.message,
          timestamp: new Date(),
          isRead: false,
          redirectTo: randomNotification.redirectTo
        };
        
        setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep only 10 notifications
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [profileData.name]);

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setIsOpen(false);
    
    if (notification.redirectTo) {
      navigate(notification.redirectTo);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_product':
        return <ShoppingBag className="w-4 h-4" />;
      case 'donation':
        return <Gift className="w-4 h-4" />;
      case 'message':
        return <MessageCircle className="w-4 h-4" />;
      case 'reservation':
        return <Star className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new_product':
        return 'bg-blue-100 text-blue-700';
      case 'donation':
        return 'bg-eco-100 text-eco-700';
      case 'message':
        return 'bg-purple-100 text-purple-700';
      case 'reservation':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-96 overflow-y-auto z-50 shadow-lg">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Tout marquer comme lu
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Aucune notification</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-1 h-auto"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationSystem;
