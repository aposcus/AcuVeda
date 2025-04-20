
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-acuveda-light">
      <div className="container px-4 py-8 mx-auto">
        <header className="flex items-center justify-between mb-12">
          <Logo />
        </header>

        <div className="flex-1 flex items-center justify-center flex-col text-center">
          <h1 className="text-6xl font-bold text-acuveda-blue mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
          <p className="text-md text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button className="bg-acuveda-blue hover:bg-acuveda-blue/90" asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
      
      <footer className="border-t mt-auto py-4 bg-white">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AcuVeda Health AI
          </p>
          <div className="text-sm">
            <a href="#" className="text-acuveda-blue hover:underline mr-4">Privacy Policy</a>
            <a href="#" className="text-acuveda-blue hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
