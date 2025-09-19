
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from './ui/button';
import { User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="border-b bg-white py-3">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <Logo className="ml-0" />
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.home')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/checkup">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.checkup')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/features">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.features')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.about')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/health-goals">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.healthGoals')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/lifestyle">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.lifestyle')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.contact')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-2 items-center">
          <LanguageSwitcher />
          {user ? (
            <>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleProfile}>
                <User size={18} />
                {t('nav.profile')}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                {t('auth.logout')}
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className="flex items-center gap-2 bg-acuveda-blue hover:bg-acuveda-blue/90">
                <LogIn size={18} />
                {t('auth.login')}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
