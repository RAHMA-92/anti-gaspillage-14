
import React, { useState, useEffect } from 'react';
import { useProducts } from '@/contexts/ProductContext';
import { useMessages } from '@/contexts/MessageContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Calendar, User, MessageCircle, Heart, Gift, Star, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Products = () => {
  const { t, language } = useLanguage();
  const { products, reserveProduct } = useProducts();
  const { addMessage } = useMessages();
  const { profileData } = useProfile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [showDonationsOnly, setShowDonationsOnly] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [showFlashOffers, setShowFlashOffers] = useState(false);

  const categories = [
    { value: 'all', label: t('allCategories') },
    { value: 'food', label: t('food') },
    { value: 'preparedMeals', label: t('preparedMeals') },
    { value: 'bakery', label: t('bakery') },
    { value: 'rawMaterials', label: t('rawMaterials') },
    { value: 'hygiene', label: t('hygiene') },
    { value: 'household', label: t('household') },
    { value: 'school', label: t('school') },
    { value: 'pharmacy', label: t('pharmacy') },
    { value: 'local', label: t('local') }
  ];

  const priceRanges = [
    { value: 'all', label: t('allPrices') },
    { value: 'free', label: t('free') },
    { value: 'under50', label: 'Moins de 50 DA' },
    { value: 'under100', label: 'Moins de 100 DA' },
    { value: 'under200', label: 'Moins de 200 DA' },
    { value: 'over200', label: 'Plus de 200 DA' }
  ];

  const locations = [
    { value: 'all', label: t('allLocations') },
    { value: 'alger', label: 'Alger' },
    { value: 'oran', label: 'Oran' },
    { value: 'constantine', label: 'Constantine' },
    { value: 'annaba', label: 'Annaba' }
  ];

  // Check URL params for category filter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Check for flash offers (products expiring soon)
  const isFlashOffer = (product: any) => {
    const expiryDate = new Date(product.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2; // Products expiring in 2 days or less
  };

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesDonationFilter = !showDonationsOnly || product.isDonation;

      const matchesPriceRange = priceRange === 'all' || 
        (priceRange === 'free' && product.isDonation) ||
        (priceRange === 'under50' && !product.isDonation && parseInt(product.price) < 50) ||
        (priceRange === 'under100' && !product.isDonation && parseInt(product.price) < 100) ||
        (priceRange === 'under200' && !product.isDonation && parseInt(product.price) < 200) ||
        (priceRange === 'over200' && !product.isDonation && parseInt(product.price) >= 200);

      const matchesLocation = locationFilter === 'all' || 
        product.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesFlashOffer = !showFlashOffers || isFlashOffer(product);
      
      return matchesSearch && matchesCategory && matchesDonationFilter && 
             matchesPriceRange && matchesLocation && matchesFlashOffer;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, showDonationsOnly, priceRange, locationFilter, showFlashOffers]);

  const isOwnProduct = (product: any) => {
    if (!profileData.name) return false;
    
    const normalizedUserName = profileData.name.toLowerCase().trim();
    const normalizedProductUser = product.user.toLowerCase().trim();
    const firstName = normalizedUserName.split(' ')[0];
    
    return normalizedProductUser === normalizedUserName || 
           normalizedProductUser.includes(firstName) ||
           normalizedUserName.includes(normalizedProductUser.split(' ')[0]);
  };

  const handleReserve = (product: any) => {
    if (!profileData.name) {
      toast({
        title: "⚠️ " + t('loginRequired'),
        description: t('loginRequiredDescription'),
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }

    if (isOwnProduct(product)) {
      toast({
        title: "⚠️ " + t('cannotReserveOwnProduct'),
        description: t('cannotReserveOwnProductDescription'),
        variant: "destructive"
      });
      return;
    }

    if (product.reserved) {
      toast({
        title: "⚠️ " + t('alreadyReserved'),
        description: t('productAlreadyReserved'),
        variant: "destructive"
      });
      return;
    }

    reserveProduct(product.id);
    toast({
      title: "🎉 " + product.name + " " + t('reservedSuccess'),
      description: t('productReservedSuccess'),
    });

    // Send notification about new reservation
    toast({
      title: "🔔 " + t('notificationSent'),
      description: t('sellerNotified'),
    });

    // Send automatic contact message when reserving
    const reservationMessage = t('reservationMessage').replace('{productName}', product.name);
    addMessage({
      sender: profileData.name,
      recipient: product.user,
      content: reservationMessage,
      productId: product.id
    });

    navigate('/reserved');
  };

  const handleContact = (product: any) => {
    if (!profileData.name) {
      toast({
        title: "⚠️ " + t('loginRequired'),
        description: t('loginRequiredDescription'),
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }

    if (isOwnProduct(product)) {
      toast({
        title: "⚠️ " + t('cannotContactYourself'),
        description: t('cannotContactYourselfDescription'),
        variant: "destructive"
      });
      return;
    }

    setSelectedProduct(product);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "⚠️ " + t('error'),
        description: t('messageRequired'),
        variant: "destructive"
      });
      return;
    }

    addMessage({
      sender: profileData.name,
      recipient: selectedProduct.user,
      content: message,
      productId: selectedProduct.id
    });

    toast({
      title: "✅ " + t('messageSent'),
      description: t('messageDelivered'),
    });

    setMessage('');
    setSelectedProduct(null);
    setTimeout(() => navigate('/messages'), 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR');
  };

  const donationCount = products.filter(p => p.isDonation && !p.reserved).length;
  const flashOfferCount = products.filter(p => isFlashOffer(p) && !p.reserved).length;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 to-food-50 p-2 sm:p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-8 text-center px-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            {t('discoverProducts')}
          </h1>
          <p className="text-sm sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('discoverProductsDescription')}
          </p>
        </div>

        {/* Search and Filters - Mobile Responsive */}
        <div className="mb-4 sm:mb-8 space-y-3 sm:space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 sm:h-12 border-2 focus:border-eco-400 text-sm sm:text-base"
            />
          </div>

          {/* Filters Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-10 sm:h-12 border-2 text-sm sm:text-base">
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-10 sm:h-12 border-2 text-sm sm:text-base">
                <SelectValue placeholder="Prix" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-10 sm:h-12 border-2 text-sm sm:text-base">
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="h-10 sm:h-12 px-3 sm:px-6 border-2 text-sm sm:text-base"
              onClick={() => setShowDonationsOnly(!showDonationsOnly)}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {showDonationsOnly ? t('allProducts') : t('donations')}
            </Button>
          </div>

          {/* Special Offers Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {/* Donations Banner */}
            {donationCount > 0 && (
              <Card className="bg-gradient-to-r from-eco-100 to-food-100 border-eco-200">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-eco-500 p-1.5 sm:p-2 rounded-full">
                        <Gift className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-eco-800">{t('freeDonations')}</h3>
                        <p className="text-xs sm:text-sm text-eco-600">
                          {donationCount} {t('donationsAvailable')}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDonationsOnly(!showDonationsOnly)}
                      className="border-eco-300 text-eco-700 hover:bg-eco-50 text-xs sm:text-sm"
                    >
                      {showDonationsOnly ? t('closeList') : t('viewDonations')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Flash Offers Banner */}
            {flashOfferCount > 0 && (
              <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-orange-500 p-1.5 sm:p-2 rounded-full">
                        <Bell className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-orange-800">Offres Flash ⚡</h3>
                        <p className="text-xs sm:text-sm text-orange-600">
                          {flashOfferCount} produits proche péremption
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFlashOffers(!showFlashOffers)}
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 text-xs sm:text-sm"
                    >
                      {showFlashOffers ? 'Fermer' : 'Voir'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Products Grid - Mobile Responsive */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 sm:h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isDonation && (
                      <Badge className="bg-eco-500 hover:bg-eco-600 text-xs">
                        <Heart className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                        {t('free')}
                      </Badge>
                    )}
                    {isFlashOffer(product) && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">
                        ⚡ Flash
                      </Badge>
                    )}
                  </div>
                  {product.reserved && (
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-xs">
                      {t('reserved')}
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm sm:text-lg text-gray-900 group-hover:text-eco-700 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="text-sm sm:text-lg font-bold text-eco-600 ml-2">
                      {product.price}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-3 sm:p-6 pt-0">
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">{product.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{t('expiresOn')} {formatDate(product.expiryDate)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{product.user}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 sm:gap-2">
                    {!product.reserved && !isOwnProduct(product) && (
                      <Button 
                        onClick={() => handleReserve(product)}
                        className="flex-1 bg-eco-600 hover:bg-eco-700 text-xs sm:text-sm h-8 sm:h-10"
                        size="sm"
                      >
                        {t('reserve')}
                      </Button>
                    )}
                    
                    {!isOwnProduct(product) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            onClick={() => handleContact(product)}
                            className={`${product.reserved || isOwnProduct(product) ? 'flex-1' : ''} border-eco-200 text-eco-700 hover:bg-eco-50 text-xs sm:text-sm h-8 sm:h-10`}
                            size="sm"
                          >
                            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {t('contact')}
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    )}
                    
                    {isOwnProduct(product) && (
                      <div className="flex-1 text-center py-2 text-xs sm:text-sm text-gray-500 bg-gray-50 rounded">
                        {t('yourProduct')}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {t('noProductsFound')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {t('tryModifyingFilters')}
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setShowDonationsOnly(false);
                setPriceRange('all');
                setLocationFilter('all');
                setShowFlashOffers(false);
              }}
              variant="outline"
              className="border-eco-200 text-eco-700 hover:bg-eco-50 text-sm sm:text-base"
            >
              {t('clearFilters')}
            </Button>
          </div>
        )}

        {/* Contact Dialog - Mobile Responsive */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
            <DialogContent className={`${language === 'ar' ? 'rtl' : 'ltr'} max-w-[95vw] sm:max-w-md`}>
              <DialogHeader>
                <DialogTitle className="text-sm sm:text-base">{t('contactOwner')}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-700">
                    {t('product')}
                  </Label>
                  <p className="text-sm sm:text-lg font-semibold">{selectedProduct.name}</p>
                </div>
                
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-700">
                    {t('owner')}
                  </Label>
                  <p className="text-sm sm:text-lg">{selectedProduct.user}</p>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-xs sm:text-sm font-medium text-gray-700">
                    {t('messageContent')}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t('typeMessage')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  />
                </div>
                
                <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <Button
                    onClick={handleSendMessage}
                    className="flex-1 bg-eco-600 hover:bg-eco-700 text-xs sm:text-sm h-8 sm:h-10"
                  >
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {t('sendMessage')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedProduct(null)}
                    className="border-gray-300 text-xs sm:text-sm h-8 sm:h-10"
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Products;
