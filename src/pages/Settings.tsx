
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Globe, Bell, Shield, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    newProducts: true,
    messages: true,
    expiryReminders: false
  });
  
  const [privacy, setPrivacy] = useState({
    locationSharing: true,
    contactPermission: true,
    profileVisibility: true
  });

  const handleLanguageChange = (newLanguage: 'fr' | 'ar') => {
    console.log(`Language changed to: ${newLanguage}`);
    setLanguage(newLanguage);
    toast({
      title: t('language'),
      description: `${t('language')} ${newLanguage === 'fr' ? t('french') : t('arabic')}`,
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    console.log(`Notification ${key} changed to: ${!notifications[key]}`);
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    console.log(`Privacy ${key} changed to: ${!privacy[key]}`);
  };

  const handleHelpAction = (action: string) => {
    console.log(`Help action: ${action}`);
    toast({
      title: action,
      description: "Cette fonctionnalité sera bientôt disponible",
    });
  };

  const handleAccountAction = (action: string) => {
    console.log(`Account action: ${action}`);
    if (action === 'delete') {
      if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
        toast({
          title: "Compte supprimé",
          description: "Votre compte a été supprimé avec succès",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: action,
        description: "Cette fonctionnalité sera bientôt disponible",
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-50 to-food-50 p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('settingsTitle')}</h1>
          <p className="text-gray-600">{t('settingsDescription')}</p>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <Card className="border-eco-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-800">
                <Globe className="w-5 h-5" />
                {t('language')}
              </CardTitle>
              <CardDescription>
                {t('chooseLanguage')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="language-select">{t('interfaceLanguage')}</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-48 border-eco-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">🇫🇷 {t('french')}</SelectItem>
                      <SelectItem value="ar">🇩🇿 {t('arabic')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-eco-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-800">
                <Bell className="w-5 h-5" />
                {t('notifications')}
              </CardTitle>
              <CardDescription>
                {t('manageNotifications')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-products">{t('newProducts')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('newProductsDesc')}
                  </p>
                </div>
                <Switch 
                  id="new-products" 
                  checked={notifications.newProducts}
                  onCheckedChange={() => handleNotificationChange('newProducts')}
                />
              </div>
              
              <Separator className="bg-eco-200" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="messages">{t('messagesNotif')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('messagesDesc')}
                  </p>
                </div>
                <Switch 
                  id="messages" 
                  checked={notifications.messages}
                  onCheckedChange={() => handleNotificationChange('messages')}
                />
              </div>
              
              <Separator className="bg-eco-200" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="expiry-reminders">{t('expiryReminders')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('expiryRemindersDesc')}
                  </p>
                </div>
                <Switch 
                  id="expiry-reminders" 
                  checked={notifications.expiryReminders}
                  onCheckedChange={() => handleNotificationChange('expiryReminders')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="border-eco-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-800">
                <Shield className="w-5 h-5" />
                {t('privacy')}
              </CardTitle>
              <CardDescription>
                {t('privacyDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="location-sharing">{t('locationSharing')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('locationSharingDesc')}
                  </p>
                </div>
                <Switch 
                  id="location-sharing" 
                  checked={privacy.locationSharing}
                  onCheckedChange={() => handlePrivacyChange('locationSharing')}
                />
              </div>
              
              <Separator className="bg-eco-200" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="contact-permission">{t('contactPermission')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('contactPermissionDesc')}
                  </p>
                </div>
                <Switch 
                  id="contact-permission" 
                  checked={privacy.contactPermission}
                  onCheckedChange={() => handlePrivacyChange('contactPermission')}
                />
              </div>
              
              <Separator className="bg-eco-200" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profile-visibility">{t('profileVisibility')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('profileVisibilityDesc')}
                  </p>
                </div>
                <Switch 
                  id="profile-visibility" 
                  checked={privacy.profileVisibility}
                  onCheckedChange={() => handlePrivacyChange('profileVisibility')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className="border-eco-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-800">
                <HelpCircle className="w-5 h-5" />
                {t('helpSupport')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start border-eco-300 text-eco-700 hover:bg-eco-50"
                onClick={() => handleHelpAction(t('helpCenter'))}
              >
                {t('helpCenter')}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-eco-300 text-eco-700 hover:bg-eco-50"
                onClick={() => handleHelpAction(t('contactUs'))}
              >
                {t('contactUs')}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-eco-300 text-eco-700 hover:bg-eco-50"
                onClick={() => handleHelpAction(t('termsOfService'))}
              >
                {t('termsOfService')}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-eco-300 text-eco-700 hover:bg-eco-50"
                onClick={() => handleHelpAction(t('privacyPolicy'))}
              >
                {t('privacyPolicy')}
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">{t('accountActions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
                onClick={() => handleAccountAction('export')}
              >
                {t('exportData')}
              </Button>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => handleAccountAction('delete')}
              >
                {t('deleteAccount')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
