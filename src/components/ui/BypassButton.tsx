
import { useEffect, useState } from "react";
import { ZenoraButton } from "./button-zenora";
import { authBypass } from "@/utils/auth-bypass";
import { LogIn, LogOut, ShieldAlert } from "lucide-react";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const BypassButton = () => {
  const [bypassEnabled, setBypassEnabled] = useState(false);
  const [userType, setUserType] = useState<"regular" | "admin">("regular");
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial bypass status
    setBypassEnabled(authBypass.isEnabled());
    setUserType(authBypass.getUserType());
  }, []);

  const handleEnable = (type: "regular" | "admin") => {
    authBypass.enable(type);
    setBypassEnabled(true);
    setUserType(type);
  };

  const handleDisable = () => {
    authBypass.disable();
    setBypassEnabled(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="fixed bottom-4 right-4 z-50 p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center">
          <ShieldAlert size={24} />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Development Testing Mode</DrawerTitle>
            <DrawerDescription>
              This feature allows you to bypass login and access protected pages during development.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4">
            <Tabs defaultValue={userType} onValueChange={(value) => setUserType(value as "regular" | "admin")}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="regular">Property Owner</TabsTrigger>
                <TabsTrigger value="admin">Administrator</TabsTrigger>
              </TabsList>
              
              <TabsContent value="regular" className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Access the application as a property owner with standard permissions.
                </p>
                {bypassEnabled && userType === "regular" ? (
                  <div className="space-y-3">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-md text-green-700 dark:text-green-400 text-sm">
                      Property Owner bypass is currently active
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ZenoraButton 
                        variant="outline" 
                        onClick={() => navigateTo('/dashboard')}
                      >
                        Go to Dashboard
                      </ZenoraButton>
                      <ZenoraButton 
                        variant="destructive" 
                        onClick={handleDisable}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Disable Bypass
                      </ZenoraButton>
                    </div>
                  </div>
                ) : (
                  <ZenoraButton 
                    onClick={() => handleEnable("regular")}
                    className="w-full"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Enable Property Owner Bypass
                  </ZenoraButton>
                )}
              </TabsContent>
              
              <TabsContent value="admin" className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Access the application as an administrator with elevated permissions.
                </p>
                {bypassEnabled && userType === "admin" ? (
                  <div className="space-y-3">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-md text-green-700 dark:text-green-400 text-sm">
                      Administrator bypass is currently active
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ZenoraButton 
                        variant="outline" 
                        onClick={() => navigateTo('/admin')}
                      >
                        Go to Admin Panel
                      </ZenoraButton>
                      <ZenoraButton 
                        variant="destructive" 
                        onClick={handleDisable}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Disable Bypass
                      </ZenoraButton>
                    </div>
                  </div>
                ) : (
                  <ZenoraButton 
                    onClick={() => handleEnable("admin")}
                    className="w-full"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Enable Administrator Bypass
                  </ZenoraButton>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <DrawerFooter>
            <DrawerClose asChild>
              <ZenoraButton variant="outline">Close</ZenoraButton>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BypassButton;
