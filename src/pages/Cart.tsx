
import React from 'react';
import CartComponent from '@/components/CartComponent';
import { useLanguage } from '@/contexts/LanguageContext';

const Cart = () => {
  const { language } = useLanguage();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 to-food-50 p-2 sm:p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Mon Panier
          </h1>
          <p className="text-sm sm:text-xl text-gray-600">
            Gérez vos produits sélectionnés et passez commande
          </p>
        </div>
        
        <CartComponent />
      </div>
    </div>
  );
};

export default Cart;
