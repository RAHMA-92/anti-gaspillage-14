
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, Package, Plus, MessageCircle, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: 'home',
    url: '/',
    icon: Home,
  },
  {
    title: 'products',
    url: '/products',
    icon: Package,
  },
  {
    title: 'addProduct',
    url: '/add-product',
    icon: Plus,
  },
  {
    title: 'messages',
    url: '/messages',
    icon: MessageCircle,
  },
  {
    title: 'profile',
    url: '/profile',
    icon: User,
  },
];

export function AppSidebar() {
  const { t, language } = useLanguage();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-eco-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-eco-500 to-eco-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AG</span>
          </div>
          <div>
            <h2 className="font-bold text-eco-800">{t('appTitle')}</h2>
            <p className="text-xs text-eco-600">{t('appSubtitle')}</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-eco-700">{t('categories')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-eco-50 hover:text-eco-700 data-[active=true]:bg-eco-100 data-[active=true]:text-eco-800"
                  >
                    <Link to={item.url} className={language === 'ar' ? 'flex-row-reverse' : ''}>
                      <item.icon className="w-4 h-4" />
                      <span>{t(item.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-eco-50 hover:text-eco-700">
              <Link to="/settings" className={`${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Settings className="w-4 h-4" />
                <span>{t('settings')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
