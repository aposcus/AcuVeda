
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from './ui/button';
import { User, LogIn } from 'lucide-react';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  
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
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/checkup">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Check-up
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/features">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Features
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex gap-2">
          {loggedIn ? (
            <Button variant="outline" className="flex items-center gap-2">
              <User size={18} />
              My Profile
            </Button>
          ) : (
            <Link to="/login">
              <Button className="flex items-center gap-2 bg-acuveda-blue hover:bg-acuveda-blue/90">
                <LogIn size={18} />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
