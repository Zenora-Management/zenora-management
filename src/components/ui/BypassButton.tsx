
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authBypass } from '@/utils/auth-bypass';
import { Button } from '@/components/ui/button';
import { Fingerprint, Lock, LogIn, Home } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const BypassButton = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsActive(authBypass.isEnabled());
    
    // Subscribe to changes
    const unsubscribe = authBypass.subscribe((active) => {
      setIsActive(active);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = () => {
    authBypass.toggle();
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className={`rounded-full shadow-lg transition-all duration-300 ${
              isActive 
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {isActive ? <Fingerprint className="h-5 w-5 text-white" /> : <Lock className="h-5 w-5 text-white" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="end" className="w-56">
          <DropdownMenuLabel>Auth Bypass</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleToggle}>
            <Fingerprint className="mr-2 h-4 w-4" />
            <span>{isActive ? 'Disable Bypass' : 'Enable Bypass'}</span>
          </DropdownMenuItem>
          
          {isActive && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Navigate To</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigateTo('/dashboard')}>
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigateTo('/admin')}>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BypassButton;
