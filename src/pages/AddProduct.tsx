
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/contexts/ProductContext";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WilayaSelect from "@/components/WilayaSelect";
import { useToast } from "@/hooks/use-toast";
import { Camera, Package, Clock, MapPin, Tag, Weight, DollarSign } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { t, language } = useLanguage();
  const { addProduct } = useProducts();
  const { profileData } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    expiryDate: "",
    location: "",
    image: "",
    price: "",
    weight: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: "food", label: t('food') },
    { value: "preparedMeals", label: t('preparedMeals') },
    { value: "bakery", label: t('bakery') },
    { value: "rawMaterials", label: t('rawMaterials') },
    { value: "tableware", label: t('tableware') },
    { value: "hygiene", label: t('hygiene') },
    { value: "household", label: t('household') },
    { value: "school", label: t('school') },
    { value: "pharmacy", label: t('pharmacy') },
    { value: "local", label: t('local') },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast({
        title: t('imageAdded'),
        description: `${file.name} ${t('addedSuccessfully')}`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category || !formData.location) {
      toast({
        title: t('error'),
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const currentUserName = profileData.name || "Utilisateur anonyme";
      
      addProduct({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        expiryDate: formData.expiryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        location: formData.location,
        image: formData.image || "/placeholder.svg",
        price: formData.price || "Gratuit",
        user: currentUserName,
        weight: parseFloat(formData.weight) || 1.0,
        reserved: false,
        condition: 'Excellent',
        isDonation: formData.price === 'Gratuit' || formData.price === '0 DA' || formData.price === ''
      });

      toast({
        title: t('productAdded'),
        description: t('productAddedSuccess'),
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        expiryDate: "",
        location: "",
        image: "",
        price: "",
        weight: ""
      });

      // Navigate to products page
      navigate('/products');
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: t('error'),
        description: "Une erreur est survenue lors de l'ajout du produit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 to-food-50 p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('addProduct')}</h1>
          <p className="text-gray-600">{t('shareProduct')}</p>
        </div>

        <Card className="shadow-xl border-eco-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-eco-800">
              <Package className="w-6 h-6" />
              {t('productDetails')}
            </CardTitle>
            <CardDescription>
              Remplissez les informations de votre produit
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Image */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Photo du produit
                </Label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-lg border border-eco-200"
                    />
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="border-eco-300 text-eco-700 hover:bg-eco-50"
                    onClick={() => document.getElementById('image')?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Ajouter une photo
                  </Button>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Nom du produit *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-eco-200 focus:border-eco-500"
                  placeholder="Ex: Pain artisanal, Légumes frais..."
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-24 border-eco-200 focus:border-eco-500"
                  placeholder="Décrivez votre produit, son état, sa qualité..."
                  required
                />
              </div>

              {/* Category and Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Catégorie *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="border-eco-200">
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <WilayaSelect
                  value={formData.location}
                  onChange={(value) => handleInputChange('location', value)}
                  label="Wilaya *"
                  placeholder="Sélectionnez votre wilaya"
                />
              </div>

              {/* Price and Weight */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Prix
                  </Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="border-eco-200 focus:border-eco-500"
                    placeholder="Ex: 100 DA ou Gratuit"
                  />
                  <p className="text-xs text-gray-500">
                    Laissez vide ou écrivez "Gratuit" pour un don
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-2">
                    <Weight className="w-4 h-4" />
                    Poids (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="border-eco-200 focus:border-eco-500"
                    placeholder="1.0"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Date d'expiration
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="border-eco-200 focus:border-eco-500"
                />
                <p className="text-xs text-gray-500">
                  Si non spécifiée, la date sera fixée à 7 jours
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-eco-500 to-eco-600 hover:from-eco-600 hover:to-eco-700 text-white text-lg py-3"
              >
                {isLoading ? "Ajout en cours..." : t('addProduct')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
