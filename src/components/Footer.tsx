import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, MapPin, Clock, Zap, Gift, Crown, Sparkles } from 'lucide-react';

const Footer = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);

  const algerianAds = [
    {
      id: 1,
      title: "Supermarché El Baraka",
      description: "Produits frais et de qualité à prix abordables",
      location: "Alger Centre",
      badge: "Partenaire Premium",
      image: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=150&h=100&fit=crop",
      discount: "25% de réduction",
      urgent: true
    },
    {
      id: 2,
      title: "Boulangerie Traditionnelle",
      description: "Pain frais quotidien et pâtisseries orientales",
      location: "Oran",
      badge: "Local Certifié",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=100&fit=crop",
      discount: "Livraison gratuite",
      urgent: false
    },
    {
      id: 3,
      title: "Ferme Bio Tassili",
      description: "Légumes bio et produits fermiers authentiques",
      location: "Constantine",
      badge: "Bio Certifié",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=150&h=100&fit=crop",
      discount: "30% sur les légumes",
      urgent: true
    },
    {
      id: 4,
      title: "Restaurant El Djazair",
      description: "Cuisine traditionnelle algérienne authentique",
      location: "Annaba",
      badge: "Nouveauté",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=100&fit=crop",
      discount: "Menu complet 800 DA",
      urgent: false
    },
    {
      id: 5,
      title: "Épicerie du Quartier",
      description: "Tous vos produits quotidiens à portée de main",
      location: "Tizi Ouzou",
      badge: "Service 24h/24",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=100&fit=crop",
      discount: "15% pour étudiants",
      urgent: false
    },
    {
      id: 6,
      title: "Marché Central",
      description: "Le plus grand choix de produits frais de la région",
      location: "Sétif",
      badge: "Leader du marché",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&h=100&fit=crop",
      discount: "Prix imbattables",
      urgent: true
    }
  ];

  const algerianSponsors = [
    {
      id: 1,
      name: "Banque Nationale d'Algérie",
      description: "Partenaire financier officiel",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=50&fit=crop",
      type: "Banque",
      featured: true
    },
    {
      id: 2,
      name: "Algérie Télécom",
      description: "Connectivité et innovation",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=50&fit=crop",
      type: "Télécom",
      featured: false
    },
    {
      id: 3,
      name: "Groupe Sonatrach",
      description: "Soutien au développement durable",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=50&fit=crop",
      type: "Énergie",
      featured: true
    },
    {
      id: 4,
      name: "Ministère de l'Environnement",
      description: "Partenaire institutionnel",
      logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=50&fit=crop",
      type: "Gouvernement",
      featured: false
    },
    {
      id: 5,
      name: "Cevital Group",
      description: "Innovation alimentaire algérienne",
      logo: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=80&h=50&fit=crop",
      type: "Agroalimentaire",
      featured: true
    },
    {
      id: 6,
      name: "Air Algérie",
      description: "Connecter l'Algérie au monde",
      logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=50&fit=crop",
      type: "Transport",
      featured: false
    },
    {
      id: 7,
      name: "Naftal",
      description: "Distribution énergétique nationale",
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=50&fit=crop",
      type: "Énergie",
      featured: true
    },
    {
      id: 8,
      name: "Mobilis",
      description: "Réseau mobile de confiance",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=50&fit=crop",
      type: "Télécom",
      featured: false
    }
  ];

  // Auto-scroll pour les publicités
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % Math.ceil(algerianAds.length / 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll pour les sponsors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsorIndex((prev) => (prev + 1) % Math.ceil(algerianSponsors.length / 4));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleAds = () => {
    const startIndex = currentAdIndex * 3;
    return algerianAds.slice(startIndex, startIndex + 3);
  };

  const getVisibleSponsors = () => {
    const startIndex = currentSponsorIndex * 4;
    return algerianSponsors.slice(startIndex, startIndex + 4);
  };

  return (
    <footer className="bg-gradient-to-b from-eco-50 to-white border-t border-eco-200 py-8 sm:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Publicités Algériennes Améliorées */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-eco-500 to-eco-600 px-6 py-3 rounded-full shadow-lg animate-pulse">
              <h3 className="text-white font-bold text-lg sm:text-xl flex items-center gap-2">
                🇩🇿 <Sparkles className="w-5 h-5" /> Publicités Premium
              </h3>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 transition-all duration-500 ease-in-out">
              {getVisibleAds().map((ad, index) => (
                <Card 
                  key={ad.id} 
                  className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-eco-200 relative overflow-hidden ${
                    ad.urgent ? 'animate-pulse ring-2 ring-orange-400' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animation: `fade-in 0.6s ease-out ${index * 200}ms both`
                  }}
                >
                  <div className="relative">
                    <img 
                      src={ad.image} 
                      alt={ad.title}
                      className="w-full h-32 sm:h-48 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <Badge className={`${ad.urgent ? 'bg-orange-500 hover:bg-orange-600' : 'bg-eco-500 hover:bg-eco-600'} text-xs animate-bounce`}>
                        {ad.urgent && <Zap className="w-2 h-2 mr-1" />}
                        {ad.badge}
                      </Badge>
                      {ad.urgent && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                          <Clock className="w-2 h-2 mr-1" />
                          Urgent!
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 hover:bg-green-600 text-xs font-bold">
                        {ad.discount}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
                    <CardTitle className="text-eco-800 text-lg flex items-center gap-2">
                      {ad.title}
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:rotate-45" />
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>{ad.location}</span>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-eco-500 to-eco-600 hover:from-eco-600 hover:to-eco-700 text-white font-semibold transition-all duration-300 hover:shadow-lg"
                      size="sm"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Profiter de l'offre
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Indicateurs de pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(algerianAds.length / 3) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentAdIndex ? 'bg-eco-500 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sponsors Algériens Premium */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-food-500 to-food-600 px-6 py-3 rounded-full shadow-lg">
              <h3 className="text-white font-bold text-lg sm:text-xl flex items-center gap-2">
                <Crown className="w-5 h-5" /> Sponsors Premium ⭐
              </h3>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 transition-all duration-500 ease-in-out">
              {getVisibleSponsors().map((sponsor, index) => (
                <Card 
                  key={sponsor.id} 
                  className={`hover:shadow-xl transition-all duration-500 border-food-200 bg-white/90 backdrop-blur-sm group relative overflow-hidden ${
                    sponsor.featured ? 'ring-2 ring-gold-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: `scale-in 0.5s ease-out ${index * 150}ms both`
                  }}
                >
                  {sponsor.featured && (
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-yellow-400">
                      <Star className="w-3 h-3 text-white absolute -top-4 -right-1" />
                    </div>
                  )}
                  
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 relative">
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name}
                        className="w-16 h-10 object-cover rounded mx-auto border border-gray-200 transition-transform duration-300 group-hover:scale-110"
                      />
                      {sponsor.featured && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                      )}
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-food-600 transition-colors">
                      {sponsor.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">{sponsor.description}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${sponsor.featured ? 'border-yellow-400 text-yellow-600' : ''}`}
                    >
                      {sponsor.type}
                      {sponsor.featured && <Crown className="w-3 h-3 ml-1" />}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Indicateurs de pagination pour sponsors */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(algerianSponsors.length / 4) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSponsorIndex ? 'bg-food-500 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright amélioré */}
        <div className="text-center pt-6 border-t border-eco-200">
          <p className="text-sm text-gray-600 mb-2">
            © 2025 Anti-Gaspillage Algeria - Plateforme de partage alimentaire algérienne
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Star className="w-4 h-4 text-eco-500 animate-pulse" />
            <span className="text-xs text-gray-500">Fait avec ❤️ en Algérie</span>
            <Star className="w-4 h-4 text-eco-500 animate-pulse" />
          </div>
          <div className="mt-3 flex justify-center space-x-4 text-xs text-gray-500">
            <span>Plus de 10,000 utilisateurs actifs</span>
            <span>•</span>
            <span>1000+ partenaires</span>
            <span>•</span>
            <span>Disponible 24h/24</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
