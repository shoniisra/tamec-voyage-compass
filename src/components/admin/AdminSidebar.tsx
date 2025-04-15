import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Tag,
  Plane
} from 'lucide-react';

interface NavItemProps {
  name: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: { name: string; href: string; current: boolean }[];
  current?: boolean;
  open?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ name, icon, href, submenu, current, open }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(open || false);
  
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };
  
  if (submenu) {
    return (
      <li className="mb-1">
        <button
          className={cn(
            "flex items-center w-full p-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            isSubmenuOpen ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )}
          onClick={toggleSubmenu}
        >
          {icon}
          <span className="ml-3 flex-1">{name}</span>
          <svg
            className={cn(
              "ml-2 h-4 w-4 shrink-0 transition-transform duration-200",
              isSubmenuOpen ? "rotate-90" : ""
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isSubmenuOpen && (
          <ul className="ml-6 mt-2 space-y-1">
            {submenu.map(sub => (
              <li key={sub.name}>
                <NavLink
                  to={sub.href}
                  className={({ isActive }) =>
                    cn(
                      "block p-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )
                  }
                >
                  {sub.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  } else {
    return (
      <li>
        <NavLink
          to={href || '#'}
          className={({ isActive }) =>
            cn(
              "flex items-center p-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )
          }
        >
          {icon}
          <span className="ml-3">{name}</span>
        </NavLink>
      </li>
    );
  }
};

const AdminSidebar: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  
  const navItems = [
    { 
      name: language === 'en' ? 'Dashboard' : 'Panel', 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      href: '/admin/dashboard',
      current: location.pathname === '/admin/dashboard'
    },
    { 
      name: 'Blog', 
      icon: <FileText className="w-5 h-5" />,
      submenu: [
        { 
          name: language === 'en' ? 'Posts' : 'Publicaciones', 
          href: '/admin/blog/posts',
          current: location.pathname === '/admin/blog/posts'
        },
        { 
          name: language === 'en' ? 'Tags' : 'Etiquetas', 
          href: '/admin/blog/tags',
          current: location.pathname === '/admin/blog/tags'
        }
      ],
      open: location.pathname.includes('/admin/blog')
    },
    { 
      name: language === 'en' ? 'Tours' : 'Tours', 
      icon: <Plane className="w-5 h-5" />,
      submenu: [
        { 
          name: language === 'en' ? 'All Tours' : 'Todos los Tours', 
          href: '/admin/tours',
          current: location.pathname === '/admin/tours'
        },
        { 
          name: language === 'en' ? 'Destinations' : 'Destinos', 
          href: '/admin/destinations',
          current: location.pathname === '/admin/destinations'
        }
      ],
      open: location.pathname.includes('/admin/tours') || location.pathname.includes('/admin/destinations')
    }
  ];

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 border rounded-md p-4 max-w-xs">
      <nav className="flex flex-col space-y-1">
        <ul>
          {navItems.map(item => (
            <NavItem key={item.name} {...item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
