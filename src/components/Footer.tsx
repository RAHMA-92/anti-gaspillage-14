import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, MapPin } from 'lucide-react';

const Footer = () => {
  const algerianAds = [
    {
      id: 1,
      title: "Supermarché El Baraka",
      description: "Produits frais et de qualité à prix abordables",
      location: "Alger Centre",
      badge: "Partenaire Premium",
      image: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=150&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Boulangerie Traditionnelle",
      description: "Pain frais quotidien et pâtisseries orientales",
      location: "Oran",
      badge: "Local Certifié",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=100&fit=crop"
    },
    {
      id: 3,
      title: "Ferme Bio Tassili",
      description: "Légumes bio et produits fermiers authentiques",
      location: "Constantine",
      badge: "Bio Certifié",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=150&h=100&fit=crop"
    }
  ];

  const algerianSponsors = [
    {
      id: 1,
      name: "Banque Nationale d'Algérie",
      description: "Partenaire financier officiel",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=50&fit=crop",
      type: "Banque"
    },
    {
      id: 2,
      name: "Algérie Télécom",
      description: "Connectivité et innovation",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=50&fit=crop",
      type: "Télécom"
    },
    {
      id: 3,
      name: "Groupe Sonatrach",
      description: "Soutien au développement durable",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=50&fit=crop",
      type: "Énergie"
    },
    {
      id: 4,
      name: "Ministère de l'Environnement",
      description: "Partenaire institutionnel",
      logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=50&fit=crop",
      type: "Gouvernement"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-eco-50 to-white border-t border-eco-200 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Publicités Algériennes */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-eco-500 px-4 py-2 rounded-full">
              <h3 className="text-white font-bold text-lg sm:text-xl">🇩🇿 Publicités Algériennes</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {algerianAds.map((ad) => (
              <Card key={ad.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-eco-200">
                <div className="relative">
                  <img 
                    src={ad.image} 
                    alt={ad.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-eco-500 hover:bg-eco-600 text-xs">
                    {ad.badge}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-eco-800 text-lg flex items-center gap-2">
                    {ad.title}
                    <ExternalLink className="w-4 h-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{ad.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sponsors Algériens */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-food-500 px-4 py-2 rounded-full">
              <h3 className="text-white font-bold text-lg sm:text-xl">⭐ Sponsors Algériens</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {algerianSponsors.map((sponsor) => (
              <Card key={sponsor.id} className="hover:shadow-md transition-all duration-300 border-food-200 bg-white/80">
                <CardContent className="p-4 text-center">
                  <div className="mb-3">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className="w-16 h-10 object-cover rounded mx-auto border border-gray-200"
                    />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">{sponsor.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{sponsor.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {sponsor.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-eco-200">
          <p className="text-sm text-gray-600">
            © 2024 EcoShare Algeria - Plateforme de partage alimentaire algérienne
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Star className="w-4 h-4 text-eco-500" />
            <span className="text-xs text-gray-500">Fait avec ❤️ en Algérie</span>
            <Star className="w-4 h-4 text-eco-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;