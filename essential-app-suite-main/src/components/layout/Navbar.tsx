import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "About us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-background border-b border-border">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="relative w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
          <span className="text-background font-bold text-sm">Xr</span>
          <span className="text-primary text-[10px] absolute top-0 right-0 translate-x-1 -translate-y-1">54</span>
        </div>
        <span className="font-semibold text-lg tracking-wide">XENON</span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive(link.path)
                ? "text-foreground underline underline-offset-4"
                : "text-muted-foreground"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Auth Button */}
      <div className="hidden md:block">
        {user ? (
          <Button
            onClick={handleLogout}
            className="rounded-full px-6 bg-primary hover:bg-primary/90"
          >
            Logout
          </Button>
        ) : (
          <Link to="/auth">
            <Button className="rounded-full px-6 bg-primary hover:bg-primary/90">
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden z-50">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-foreground underline underline-offset-4"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                Logout
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;