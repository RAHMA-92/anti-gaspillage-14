
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, Shield, ArrowLeft, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Payment = () => {
  const { t } = useLanguage();
  const { profileData } = useProfile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const productName = searchParams.get('product') || 'Produit';
  const productPrice = parseInt(searchParams.get('price') || '0');
  const isRegistration = searchParams.get('type') === 'registration';
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);

  // Calcul des frais
  const platformFee = isRegistration ? 0 : Math.round(productPrice * 0.1); // 10% pour les produits, 0% pour l'inscription
  const totalAmount = isRegistration ? 500 : productPrice + platformFee;

  const handlePayment = async () => {
    if (!profileData.isLoggedIn && !isRegistration) {
      toast({
        title: "⚠️ Connexion requise",
        description: "Veuillez vous connecter pour effectuer un achat",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardName) {
        toast({
          title: "⚠️ Informations manquantes",
          description: "Veuillez remplir tous les champs de la carte",
          variant: "destructive"
        });
        return;
      }
    }

    setProcessing(true);

    // Simulation du traitement de paiement
    setTimeout(() => {
      setProcessing(false);
      
      toast({
        title: "🎉 Paiement réussi !",
        description: `Votre paiement de ${totalAmount} DA a été traité avec succès`,
      });

      if (isRegistration) {
        navigate('/home');
      } else {
        navigate('/products');
      }
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-food-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-eco-700 hover:bg-eco-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isRegistration ? 'Finaliser votre inscription' : 'Finaliser votre achat'}
            </h1>
            <p className="text-gray-600">
              {isRegistration 
                ? 'Frais d\'inscription unique pour rejoindre EcoShare Algeria'
                : 'Paiement sécurisé pour votre commande'
              }
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Résumé de commande */}
          <Card className="border-eco-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-800">
                <Shield className="w-5 h-5" />
                Résumé de {isRegistration ? 'l\'inscription' : 'la commande'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {isRegistration ? 'Frais d\'inscription EcoShare' : productName}
                </span>
                <span className="font-bold text-eco-600">
                  {isRegistration ? '500 DA' : `${productPrice} DA`}
                </span>
              </div>
              
              {!isRegistration && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Frais de plateforme (10%)
                    </span>
                    <span className="text-sm text-gray-600">{platformFee} DA</span>
                  </div>
                  
                  <Separator />
                </>
              )}
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total à payer</span>
                <span className="text-eco-600">{totalAmount} DA</span>
              </div>

              {isRegistration && (
                <div className="bg-eco-50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-eco-800 mb-2">Avantages inclus :</h4>
                  <ul className="space-y-1 text-sm text-eco-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Accès complet à la plateforme
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Publication illimitée de produits
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Messagerie sécurisée
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Support client prioritaire
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Méthodes de paiement */}
          <Card className="border-eco-200">
            <CardHeader>
              <CardTitle className="text-eco-800">Méthode de paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-eco-50 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="w-5 h-5 text-eco-600" />
                    <div>
                      <div className="font-medium">Carte bancaire</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard, CIB</div>
                    </div>
                  </Label>
                  <Badge className="bg-green-100 text-green-800">Recommandé</Badge>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-eco-50 transition-colors">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Smartphone className="w-5 h-5 text-eco-600" />
                    <div>
                      <div className="font-medium">Paiement mobile</div>
                      <div className="text-sm text-gray-500">Mobilis Money, Djezzy Pay</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'card' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nom sur la carte</Label>
                    <Input
                      id="cardName"
                      placeholder="MOHAMMED BENALI"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Numéro de carte</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Date d'expiration</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'mobile' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Vous serez redirigé vers votre application de paiement mobile pour finaliser la transaction.
                  </p>
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-eco-600 hover:bg-eco-700 text-white font-semibold py-3"
                size="lg"
              >
                {processing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-top-transparent"></div>
                    Traitement en cours...
                  </div>
                ) : (
                  `Payer ${totalAmount} DA`
                )}
              </Button>

              <div className="text-center text-xs text-gray-500 mt-4">
                <Shield className="w-4 h-4 inline mr-1" />
                Paiement sécurisé - Vos données sont protégées
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
