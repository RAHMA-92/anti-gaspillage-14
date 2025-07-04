import { useLanguage } from "@/contexts/LanguageContext";
import { useProfile } from "@/contexts/ProfileContext";
import { useProducts } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, User, MapPin, Mail, Phone, Package, Heart, Calendar, MessageCircle, LogOut, Gift } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { t, language } = useLanguage();
  const { profileData, updateProfile, saveProfile, clearProfile, isProfileEmpty } = useProfile();
  const { products, reservedProducts, getUserProducts, getUserDonations } = useProducts();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);

  // Get user's shared products
  const userSharedProducts = getUserProducts(profileData.name);
  const userDonations = getUserDonations(profileData.name);

  console.log("Profile data:", profileData);
  console.log("User shared products:", userSharedProducts);
  console.log("User donations:", userDonations);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille du fichier ne doit pas dépasser 2MB",
          variant: "destructive"
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Format invalide",
          description: "Veuillez sélectionner un fichier image (JPG, PNG, GIF)",
          variant: "destructive"
        });
        return;
      }

      console.log("Avatar uploaded:", file.name);
      updateProfile({ avatar: file });
      toast({
        title: "✅ Photo ajoutée",
        description: `${file.name} a été ajoutée avec succès`,
      });
    }
  };

  const handleInputChange = (field: keyof typeof profileData, value: string) => {
    updateProfile({ [field]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const success = await saveProfile();
      
      if (success) {
        toast({
          title: "✅ Profil mis à jour",
          description: "Vos informations ont été sauvegardées avec succès",
        });
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearProfile();
    toast({
      title: "👋 Déconnecté",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 to-food-50 p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('profile')}</h1>
            <p className="text-gray-600">Gérez vos informations personnelles et suivez vos activités</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </div>

        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Informations
            </TabsTrigger>
            <TabsTrigger value="reserved" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Réservations ({reservedProducts.length})
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Partages ({userSharedProducts.length})
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Dons ({userDonations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card className="shadow-lg border-eco-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-800">
                  <User className="w-5 h-5" />
                  {t('personalInfo')}
                </CardTitle>
                <CardDescription>
                  Mettez à jour vos informations de profil
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src={profileData.avatarUrl || "/placeholder.svg"} 
                      alt={profileData.name || "Utilisateur"} 
                    />
                    <AvatarFallback className="bg-eco-500 text-white text-xl">
                      {profileData.name ? profileData.name.split(' ').map(n => n[0]).join('') : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button
                      variant="outline"
                      className="border-eco-300 text-eco-700 hover:bg-eco-50"
                      onClick={() => document.getElementById('avatar')?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Changer la photo
                    </Button>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, PNG ou GIF (max. 2MB)
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {t('name')}
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-eco-200 focus:border-eco-500"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {t('email')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border-eco-200 focus:border-eco-500"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t('phone')}
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="border-eco-200 focus:border-eco-500"
                      placeholder="+213 XXX XXX XXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {t('city')}
                    </Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="border-eco-200 focus:border-eco-500"
                      placeholder="Votre ville"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-eco-500 to-eco-600 hover:from-eco-600 hover:to-eco-700 text-white"
                  >
                    {isLoading ? "Sauvegarde en cours..." : t('saveChanges')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reserved">
            <Card className="shadow-lg border-eco-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-800">
                  <Heart className="w-5 h-5" />
                  Mes produits réservés
                </CardTitle>
                <CardDescription>
                  Suivez vos réservations et organisez la récupération
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reservedProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun produit réservé pour le moment</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {reservedProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 border border-eco-200 rounded-lg hover:bg-eco-50 transition-colors">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {product.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Réservé le {format(new Date(product.reservedDate), 'dd/MM/yyyy', { locale: fr })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{product.price}</Badge>
                          <Button size="sm" className="bg-eco-600 hover:bg-eco-700">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Contacter
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shared">
            <Card className="shadow-lg border-eco-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-800">
                  <Package className="w-5 h-5" />
                  Mes produits partagés
                </CardTitle>
                <CardDescription>
                  Gérez les produits que vous avez mis à disposition
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userSharedProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Vous n'avez partagé aucun produit pour le moment</p>
                    <Button 
                      className="mt-4 bg-eco-600 hover:bg-eco-700"
                      onClick={() => navigate('/add-product')}
                    >
                      Partager un produit
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {userSharedProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 border border-eco-200 rounded-lg hover:bg-eco-50 transition-colors">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {product.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Expire le {format(new Date(product.expiryDate), 'dd/MM/yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.reserved ? (
                            <Badge className="bg-green-100 text-green-800">Réservé</Badge>
                          ) : (
                            <Badge variant="outline">Disponible</Badge>
                          )}
                          <Badge variant="outline">{product.price}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations">
            <Card className="shadow-lg border-eco-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-800">
                  <Gift className="w-5 h-5" />
                  Mes dons
                </CardTitle>
                <CardDescription>
                  Suivez les produits que vous avez offerts gratuitement
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userDonations.length === 0 ? (
                  <div className="text-center py-8">
                    <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Vous n'avez fait aucun don pour le moment</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Les produits gratuits apparaîtront automatiquement ici
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {userDonations.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {product.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Expire le {format(new Date(product.expiryDate), 'dd/MM/yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.reserved ? (
                            <Badge className="bg-green-100 text-green-800">Don accepté</Badge>
                          ) : (
                            <Badge className="bg-blue-100 text-blue-800">Don en attente</Badge>
                          )}
                          <Badge className="bg-green-500 text-white">
                            <Gift className="w-3 h-3 mr-1" />
                            Don
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
