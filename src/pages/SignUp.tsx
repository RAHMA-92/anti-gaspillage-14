
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Mail, Lock, User, MapPin, Upload, Eye, EyeOff, ArrowLeft, Star, Gift, Shield, Crown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SignUp = () => {
  const { t } = useLanguage();
  const { registerUser } = useProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: ''
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "⚠️ Fichier trop volumineux",
          description: "L'image doit faire moins de 5MB",
          variant: "destructive"
        });
        return;
      }
      setAvatar(file);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "⚠️ Nom requis",
        description: "Veuillez entrer votre nom complet",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "⚠️ Email invalide",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "⚠️ Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "⚠️ Mots de passe différents",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.city.trim()) {
      toast({
        title: "⚠️ Ville requise",
        description: "Veuillez indiquer votre ville",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 1500));

      registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        avatar: avatar
      });

      toast({
        title: "🎉 Inscription réussie !",
        description: "Bienvenue sur Anti-Gaspillage Algeria ! Finalisez votre inscription avec le paiement de 500 DA.",
      });

      // Redirection vers la page de paiement d'inscription
      navigate('/payment?type=registration');
    } catch (error) {
      toast({
        title: "❌ Erreur d'inscription",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-food-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-eco-700 hover:bg-eco-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-eco-200 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Rejoignez Anti-Gaspillage Algeria
            </h1>
            <p className="text-gray-600 mb-4">
              Créez votre compte et contribuez à réduire le gaspillage alimentaire
            </p>
            
            {/* Avantages Premium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 p-3 bg-eco-50 rounded-lg">
                <div className="bg-eco-500 p-2 rounded-full">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-eco-800">Accès complet</h4>
                  <p className="text-xs text-eco-600">Publications illimitées</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-food-50 rounded-lg">
                <div className="bg-food-500 p-2 rounded-full">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-food-800">Sécurisé</h4>
                  <p className="text-xs text-food-600">Transactions protégées</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="bg-green-500 p-2 rounded-full">
                  <Gift className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Support prioritaire</h4>
                  <p className="text-xs text-green-600">Assistance dédiée</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="bg-yellow-500 p-2 rounded-full">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">Membre Premium</h4>
                  <p className="text-xs text-yellow-600">Badge exclusif</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-eco-100 to-food-100 rounded-lg border-2 border-eco-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-eco-600" />
                <span className="font-bold text-lg text-eco-800">Frais d'inscription unique</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-eco-600">500 DA</span>
                <p className="text-sm text-gray-600 mt-1">
                  Paiement unique - Accès à vie à la plateforme
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'inscription */}
        <Card className="border-eco-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-eco-800">
              <UserPlus className="w-5 h-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Photo de profil */}
              <div className="space-y-2">
                <Label htmlFor="avatar">Photo de profil (optionnel)</Label>
                <div className="flex items-center gap-4">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-eco-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-eco-100 flex items-center justify-center border-2 border-eco-200">
                      <User className="w-8 h-8 text-eco-500" />
                    </div>
                  )}
                  <div>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="avatar"
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-eco-50 hover:bg-eco-100 text-eco-700 rounded-md border border-eco-200"
                    >
                      <Upload className="w-4 h-4" />
                      Choisir une photo
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Mohammed Benali"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="mohammed@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone (optionnel)</Label>
                  <Input
                    id="phone"
                    placeholder="+213 555 123 456"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="city"
                      placeholder="Alger"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Bouton d'inscription */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-eco-600 hover:bg-eco-700 text-white font-semibold py-3 text-lg"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-top-transparent"></div>
                    Création du compte...
                  </div>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Créer mon compte (500 DA)
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Déjà membre ?{' '}
                <Link to="/signin" className="text-eco-600 hover:text-eco-700 font-medium">
                  Se connecter
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
