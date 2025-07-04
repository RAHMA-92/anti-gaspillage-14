
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/contexts/ProductContext";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Users, 
  MapPin, 
  Camera, 
  MessageCircle, 
  Utensils,
  ShoppingBag,
  Wrench,
  Sparkles,
  Home as HomeIcon,
  BookOpen,
  Pill,
  Apple,
  Star,
  Bell
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const categories = [
  { key: 'food', icon: Utensils, color: 'bg-food-100 text-food-700' },
  { key: 'preparedMeals', icon: Utensils, color: 'bg-eco-100 text-eco-700' },
  { key: 'bakery', icon: ShoppingBag, color: 'bg-yellow-100 text-yellow-700' },
  { key: 'rawMaterials', icon: Wrench, color: 'bg-gray-100 text-gray-700' },
  { key: 'hygiene', icon: Sparkles, color: 'bg-blue-100 text-blue-700' },
  { key: 'household', icon: HomeIcon, color: 'bg-purple-100 text-purple-700' },
  { key: 'school', icon: BookOpen, color: 'bg-indigo-100 text-indigo-700' },
  { key: 'pharmacy', icon: Pill, color: 'bg-green-100 text-green-700' },
  { key: 'local', icon: Apple, color: 'bg-eco-100 text-eco-700' },
];

const Home = () => {
  const { t, language } = useLanguage();
  const { getStatistics } = useProducts();
  const { profileData, isLoggedIn } = useProfile();
  const navigate = useNavigate();
  
  const stats = getStatistics();

  const handleGetStarted = () => {
    console.log("Get started button clicked");
    navigate('/products');
  };

  const handleHowItWorks = () => {
    console.log("How it works button clicked");
    // Scroll to how it works section
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryKey: string) => {
    console.log(`Category ${categoryKey} clicked`);
    navigate(`/products?category=${categoryKey}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 to-food-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section - Mobile Responsive */}
      <section className="px-2 sm:px-4 py-6 sm:py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-eco-100 text-eco-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
              <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">{t('appSubtitle')}</span>
            </div>
            
            {isLoggedIn && profileData.name ? (
              <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {t('welcomeBack')}, {profileData.name.split(' ')[0]} ! 👋
                </h1>
                <p className="text-sm sm:text-lg text-eco-700 mb-2">
                  {t('readyToShare')}
                </p>
              </div>
            ) : (
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t('heroTitle')}
              </h1>
            )}
            
            <p className="text-sm sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              {t('heroDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-eco-500 to-eco-600 hover:from-eco-600 hover:to-eco-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                {isLoggedIn ? t('browseProducts') : t('getStarted')}
              </Button>
              <Button 
                onClick={handleHowItWorks}
                variant="outline" 
                size="lg"
                className="border-eco-300 text-eco-700 hover:bg-eco-50 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base"
              >
                {t('howItWorks')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Mobile Responsive */}
      <section id="how-it-works" className="px-2 sm:px-4 py-8 sm:py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-900 mb-2 sm:mb-4">
            {t('howItWorks')}
          </h2>
          <p className="text-center text-gray-600 mb-6 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">
            {t('howItWorksDescription')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-2">
            <Card className="animate-slide-up border-eco-200 hover:shadow-lg transition-shadow duration-300" style={{animationDelay: '0.1s'}}>
              <CardHeader className="text-center pb-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-eco-500 to-eco-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-eco-800 text-sm sm:text-base">{t('step1Title')}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <CardDescription className="text-center text-gray-600 text-xs sm:text-sm">
                  {t('step1Description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="animate-slide-up border-food-200 hover:shadow-lg transition-shadow duration-300" style={{animationDelay: '0.2s'}}>
              <CardHeader className="text-center pb-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-food-500 to-food-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-food-800 text-sm sm:text-base">{t('step2Title')}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <CardDescription className="text-center text-gray-600 text-xs sm:text-sm">
                  {t('step2Description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="animate-slide-up border-eco-200 hover:shadow-lg transition-shadow duration-300" style={{animationDelay: '0.3s'}}>
              <CardHeader className="text-center pb-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-eco-500 to-food-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-eco-800 text-sm sm:text-base">{t('step3Title')}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <CardDescription className="text-center text-gray-600 text-xs sm:text-sm">
                  {t('step3Description')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories - Mobile Responsive */}
      <section className="px-2 sm:px-4 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-900 mb-2 sm:mb-4">
            {t('categories')}
          </h2>
          <p className="text-center text-gray-600 mb-6 sm:mb-12 text-sm sm:text-base px-4">
            {t('categoriesDescription')}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-2">
            {categories.map((category, index) => (
              <Card 
                key={category.key} 
                onClick={() => handleCategoryClick(category.key)}
                className="animate-slide-up hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-gray-200"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 ${category.color}`}>
                    <category.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-800">
                    {t(category.key)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Stats - Mobile Responsive */}
      <section className="px-2 sm:px-4 py-8 sm:py-16 bg-gradient-to-r from-eco-500 to-food-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">{t('realTimeImpact')}</h2>
          <p className="text-eco-100 mb-6 sm:mb-8 text-sm sm:text-base px-4">{t('communityImpact')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 px-2">
            <div className="animate-fade-in">
              <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{stats.totalProducts}</div>
              <div className="text-eco-100 text-xs sm:text-sm">{t('sharedProducts')}</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{stats.totalWeight.toFixed(1)}kg</div>
              <div className="text-eco-100 text-xs sm:text-sm">{t('totalAvailableWeight')}</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{stats.reservedProducts}</div>
              <div className="text-eco-100 text-xs sm:text-sm">{t('reservedProducts')}</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{stats.reservedWeight.toFixed(1)}kg</div>
              <div className="text-eco-100 text-xs sm:text-sm">{t('wasteAvoided')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions - Mobile Specific */}
      <section className="px-2 sm:px-4 py-8 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Actions Rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/add-product')}>
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-eco-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-eco-600" />
                </div>
                <h3 className="font-semibold text-sm sm:text-lg mb-2">Ajouter un produit</h3>
                <p className="text-xs sm:text-sm text-gray-600">Partagez vos produits avec la communauté</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/messages')}>
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-food-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-food-600" />
                </div>
                <h3 className="font-semibold text-sm sm:text-lg mb-2">Mes Messages</h3>
                <p className="text-xs sm:text-sm text-gray-600">Communiquez avec les autres utilisateurs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
