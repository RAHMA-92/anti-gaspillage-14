
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogIn, UserPlus, Leaf, Users, Heart, Star, Zap, Shield, Globe, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 via-white to-food-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-eco-100/20 to-food-100/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center">
            <Badge className="mb-6 bg-eco-100 text-eco-800 hover:bg-eco-200 transition-colors animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              Nouvelle plateforme révolutionnaire
            </Badge>
            
            <div className="flex justify-center mb-8 animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-eco-400 to-eco-600 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-eco-500 to-eco-600 p-6 rounded-full shadow-2xl">
                  <Leaf className="w-20 h-20 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Bienvenue sur{" "}
              <span className="bg-gradient-to-r from-eco-600 via-eco-700 to-eco-800 bg-clip-text text-transparent">
                Anti-Gaspillage
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto animate-fade-in">
              La première communauté collaborative pour
            </p>
            <p className="text-xl lg:text-2xl font-semibold text-eco-700 mb-12 max-w-3xl mx-auto animate-fade-in">
              ✨ Partager • 💰 Économiser • 🌱 Réduire le gaspillage
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-in-right">
              <Button
                onClick={handleSignUp}
                size="lg"
                className="bg-gradient-to-r from-eco-600 to-eco-700 hover:from-eco-700 hover:to-eco-800 text-white px-10 py-4 text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="w-6 h-6 mr-3" />
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                onClick={handleSignIn}
                variant="outline"
                size="lg"
                className="border-2 border-eco-300 text-eco-700 hover:bg-eco-50 hover:border-eco-400 px-10 py-4 text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <LogIn className="w-6 h-6 mr-3" />
                Se connecter
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 mb-16">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-eco-600" />
                <span>100% Sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-eco-600" />
                <span>Inscription rapide</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-eco-600" />
                <span>Communauté mondiale</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Anti-Gaspillage ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les fonctionnalités qui font d'Anti-Gaspillage la plateforme de partage la plus avancée
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="group border-2 border-eco-100 hover:border-eco-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-eco-100 to-eco-200 p-4 rounded-2xl group-hover:from-eco-200 group-hover:to-eco-300 transition-all duration-300">
                  <Leaf className="w-12 h-12 text-eco-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-eco-800 group-hover:text-eco-700 transition-colors">
                Partage Intelligent
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Partagez vos produits non utilisés avec notre système de géolocalisation intelligent et notifications en temps réel
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group border-2 border-eco-100 hover:border-eco-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-food-100 to-food-200 p-4 rounded-2xl group-hover:from-food-200 group-hover:to-food-300 transition-all duration-300">
                  <Users className="w-12 h-12 text-food-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-eco-800 group-hover:text-eco-700 transition-colors">
                Communauté Active
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Rejoignez une communauté de passionnés avec chat intégré, système de reviews et événements locaux
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group border-2 border-eco-100 hover:border-eco-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-red-100 to-red-200 p-4 rounded-2xl group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300">
                  <Heart className="w-12 h-12 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-eco-800 group-hover:text-eco-700 transition-colors">
                Impact Mesurable
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Suivez votre impact environnemental avec des statistiques détaillées et des badges de récompense
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-gradient-to-r from-eco-600 to-eco-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Notre Impact en Temps Réel
            </h2>
            <p className="text-xl text-eco-100">
              Des chiffres qui parlent d'eux-mêmes
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Star className="w-8 h-8 text-yellow-400" />
                2.5K+
              </div>
              <div className="text-eco-100 text-lg">Produits partagés</div>
              <div className="text-eco-200 text-sm">+127 cette semaine</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2">850+</div>
              <div className="text-eco-100 text-lg">Utilisateurs actifs</div>
              <div className="text-eco-200 text-sm">+43 aujourd'hui</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2">12T</div>
              <div className="text-eco-100 text-lg">CO₂ évité</div>
              <div className="text-eco-200 text-sm">Impact environnemental</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2">95%</div>
              <div className="text-eco-100 text-lg">Satisfaction</div>
              <div className="text-eco-200 text-sm">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-eco-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Prêt à faire la différence ?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Rejoignez des milliers d'utilisateurs qui transforment déjà leur quotidien
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleSignUp}
              size="lg"
              className="bg-gradient-to-r from-eco-600 to-eco-700 hover:from-eco-700 hover:to-eco-800 text-white px-12 py-4 text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Créer mon compte
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Gratuit • Sans engagement • Inscription en 2 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
