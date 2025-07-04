
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone, Camera, ArrowLeft, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const SignUp = () => {
  const { t, language } = useLanguage();
  const { registerUser } = useProfile();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: ""
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      toast({
        title: "📸 Photo ajoutée !",
        description: "Votre photo de profil a été sélectionnée",
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "❌ Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "❌ Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate account creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Register user with profile data
    registerUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      avatar: profileImage
    });
    
    toast({
      title: "🎉 Compte créé avec succès !",
      description: `Bienvenue ${formData.name} dans la communauté EcoShare !`,
    });
    
    setLoading(false);
    navigate('/home');
  };

  const handleGoogleSignUp = async () => {
    toast({
      title: "🚀 Inscription avec Google",
      description: "Création de votre compte en cours...",
    });
    
    // Simulate Google auth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Register with mock Google data
    registerUser({
      name: "Utilisateur Google",
      email: "user@gmail.com",
      phone: "+213 555 123 456",
      city: "Alger"
    });
    
    toast({
      title: "✅ Compte Google créé !",
      description: "Bienvenue ! Votre compte a été créé avec succès",
    });
    
    navigate('/home');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 via-white to-food-50 flex items-center justify-center p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-eco-600 hover:text-eco-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('backToHome')}
        </Link>
        
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-eco-500 to-eco-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-eco-600 to-eco-800 bg-clip-text text-transparent">
              {t('joinUs')}
            </CardTitle>
            <CardDescription className="text-lg">
              {t('createAccountDescription')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full h-12 text-base font-medium border-2 hover:border-eco-300 hover:bg-eco-50 transition-all duration-200 transform hover:scale-[1.02]"
              type="button"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('signUpWithGoogle')}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-muted-foreground font-medium">
                  {t('orCreateAccount')}
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative group">
                  <Avatar className="w-24 h-24 ring-4 ring-eco-100 transition-all group-hover:ring-eco-200">
                    <AvatarImage src={previewUrl} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-r from-eco-100 to-eco-200">
                      <Camera className="w-10 h-10 text-eco-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-eco-600 rounded-full p-2 shadow-lg group-hover:bg-eco-700 transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                </div>
                <Label htmlFor="profile-image" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" className="border-eco-200 hover:bg-eco-50" asChild>
                    <span>
                      <Camera className="w-4 h-4 mr-2" />
                      {previewUrl ? t('changePhoto') : t('addPhoto')}
                    </span>
                  </Button>
                </Label>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">{t('fullName')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t('fullNamePlaceholder')}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-2 focus:border-eco-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">{t('email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-2 focus:border-eco-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">{t('phone')}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-2 focus:border-eco-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">{t('city')}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder={t('cityPlaceholder')}
                      value={formData.city}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-2 focus:border-eco-400 transition-colors"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">{t('password')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-12 h-12 border-2 focus:border-eco-400 transition-colors"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{t('passwordRequirement')}</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">{t('confirmPassword')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-2 focus:border-eco-400 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-eco-600 to-eco-700 hover:from-eco-700 hover:to-eco-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('creatingAccount')}
                  </div>
                ) : (
                  t('createFreeAccount')
                )}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                {t('termsAcceptance')}
              </p>
            </form>
            
            <div className="text-center text-sm pt-4">
              <span className="text-muted-foreground">{t('alreadyHaveAccount')} </span>
              <Link to="/signin" className="text-eco-600 hover:text-eco-700 font-medium underline-offset-4 hover:underline">
                {t('signIn')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
