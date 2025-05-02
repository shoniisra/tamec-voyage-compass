
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Settings, ChevronDown, FileText, Plane, Book, Globe, GraduationCap } from "lucide-react";
import LanguageSwitch from "../language/LanguageSwitch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useTheme } from "@/providers/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const { user, signOut, isAdmin } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdminDashboard = () => {
    navigate("/admin");
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/auth");
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Updated services with language-specific URLs
  const services = [
    {
      title: t("nav.visaProcessing"),
      description: t("nav.visaProcessingDesc"),
      href: language === 'en' ? "/en/services/visa-processing" : "/es/servicios/tramite-de-visas",
      icon: <FileText className="h-5 w-5 text-tamec-600" />,
    },
    {
      title: t("nav.flights"),
      description: t("nav.flightsDesc"),
      href: language === 'en' ? "/en/services/flights" : "/es/servicios/vuelos",
      icon: <Plane className="h-5 w-5 text-tamec-600" />,
    },
    {
      title: t("nav.galapagos"),
      description: t("nav.galapagosDesc"),
      href: language === 'en' ? "/en/services/galapagos" : "/es/servicios/galapagos",
      icon: <Globe className="h-5 w-5 text-tamec-600" />,
    },
    {
      title: t("nav.toursPrograms"),
      description: t("nav.toursProgramsDesc"),
      href: "#",
      icon: <Book className="h-5 w-5 text-tamec-600" />,
    },
    {
      title: t("nav.exchangePrograms"),
      description: t("nav.exchangeProgramsDesc"),
      href: "#",
      icon: <GraduationCap className="h-5 w-5 text-tamec-600" />,
    },
  ];

  // Language-specific navigation URLs
  const getNavUrls = () => {
    if (language === 'en') {
      return {
        home: "/en/destinations",
        about: "/en/about-us",
        blog: "/en/blog",
        contact: "/en/contact",
        destinations: "/en/destinations"
      };
    } else {
      return {
        home: "/es/destinos",
        about: "/es/sobre-nosotros",
        blog: "/es/blog",
        contact: "/es/contacto",
        destinations: "/es/destinos"
      };
    }
  };

  const navUrls = getNavUrls();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center">
          <img
            src={`/assets/images/logos/${
              theme === "dark" ? "dark" : "light"
            } horizontal.png`}
            alt="TAMEC Travel Agency"
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            to={navUrls.destinations}
            className="text-foreground hover:text-tamec-600 transition-colors"
          >
            {t("nav.destinations")}
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className=" text-base text-foreground hover:text-tamec-600 transition-colors">
                  {t("nav.services")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {services.map((service) => (
                      <li key={service.title} className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-accent"
                            to={service.href}
                          >
                            <div className="mb-2 mt-4 flex items-center gap-2 text-sm font-medium">
                              {service.icon}
                              {service.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link
            to={navUrls.about}
            className="text-foreground hover:text-tamec-600 transition-colors"
          >
            {t("nav.about")}
          </Link>

          <Link
            to={navUrls.blog}
            className="text-foreground hover:text-tamec-600 transition-colors"
          >
            {t("nav.blog")}
          </Link>
          <Link
            to={navUrls.contact}
            className="text-foreground hover:text-tamec-600 transition-colors"
          >
            {t("nav.contact")}
          </Link>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitch />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <User size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={handleAdminDashboard}
                      className="cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("nav.logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin}>{t("nav.login")}</Button>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitch />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b animate-fade-in">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link
              to={navUrls.destinations}
              className="text-foreground hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.destinations")}
            </Link>
            
            <div className="py-2">
              <div 
                className="flex items-center justify-between text-foreground hover:text-tamec-600 transition-colors"
                onClick={() => {
                  const servicesSubmenu = document.getElementById('services-submenu');
                  if (servicesSubmenu) {
                    servicesSubmenu.classList.toggle('hidden');
                  }
                }}
              >
                <span>{t("nav.services")}</span>
                <ChevronDown size={16} />
              </div>
              <div id="services-submenu" className="hidden pl-4 mt-2 space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    to={service.href}
                    className="flex items-center py-1 text-foreground hover:text-tamec-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {service.icon}
                    <span className="ml-2">{service.title}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to={navUrls.about}
              className="text-foreground hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              to={navUrls.blog}
              className="text-foreground hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.blog")}
            </Link>
            <Link
              to={navUrls.contact}
              className="text-foreground hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            {user ? (
              <>
                {isAdmin && (
                  <Button
                    variant="outline"
                    className="w-full flex justify-start"
                    onClick={handleAdminDashboard}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full flex justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("nav.logout")}
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={handleLogin}>
                {t("nav.login")}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
