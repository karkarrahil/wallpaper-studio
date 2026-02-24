
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              {/* <span className="material-icons-round text-background-dark">wallpaper</span> */}
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">WallVibe</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-primary underline underline-offset-8 decoration-2' : 'text-slate-500 hover:text-primary'} transition-colors`}
            >
              Discover
            </Link>
            <Link 
              to="/favorites" 
              className={`${isActive('/favorites') ? 'text-primary underline underline-offset-8 decoration-2' : 'text-slate-500 hover:text-primary'} transition-colors`}
            >
              Favorites
            </Link>
            <button className="text-slate-500 hover:text-primary transition-colors">Categories</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden lg:block">
            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Search wallpapers..." 
              className="bg-slate-200 dark:bg-card-dark border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary/50 transition-all text-slate-900 dark:text-white"
            />
          </div>
          
          <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-card-dark transition-colors text-slate-500">
            <span className="material-icons-round">notifications</span>
          </button>
          
          <Link to="/auth" className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary ring-2 ring-primary/20">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRbadG3SrGP7L_NmjzVHMttpWHjuV6qR_A50kj2myZQacD4biOnH-IDx6JbCmN2E__BidyWIWHmgu9i9BQXv6dJLa51Jmpy1PJrdafHbaBzUNTUFSO38Xa0TAdS63K6PiIigcrKtnr0mi80YijOAqdCrmEzB6xwKkYm5rQELvHMQTnBPEL_0GdyaKQyhFmWpdW3z6HEIYa6noDcY4TZU14Itn3r3rnT1YtRSoTTq3eugaRnJPSmxAV2mlMvvsQzaVRmSWsqP-_xRE" 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
