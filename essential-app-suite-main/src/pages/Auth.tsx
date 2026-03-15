import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

type UserType = "candidate" | "recruiter";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get("type") as UserType) || "candidate";
  
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>(initialType);
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const type = searchParams.get("type") as UserType;
    if (type === "candidate" || type === "recruiter") {
      setUserType(type);
      setIsLogin(false);
    }
  }, [searchParams]);

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const uploadCV = async (userId: string): Promise<string | null> => {
    if (!cvFile) return null;
    
    const fileExt = cvFile.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from("cvs")
      .upload(fileName, cvFile);
    
    if (error) {
      console.error("CV upload error:", error);
      return null;
    }
    
    return fileName;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login flow
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        // Signup flow
        const redirectUrl = `${window.location.origin}/`;
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });

        if (authError) throw authError;

        if (authData.user) {
          // Upload CV if candidate
          let cvUrl: string | null = null;
          if (userType === "candidate" && cvFile) {
            cvUrl = await uploadCV(authData.user.id);
          }

          // Create profile
          const { error: profileError } = await supabase
            .from("profiles")
            .insert({
              user_id: authData.user.id,
              first_name: firstName,
              last_name: lastName,
              email: email,
              user_type: userType,
              company: userType === "recruiter" ? company : null,
              cv_url: cvUrl,
            });

          if (profileError) throw profileError;

          toast({
            title: "Account created!",
            description: "Welcome to XENON. You are now logged in.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="auth-card-gradient w-full max-w-md">
          <div className="auth-card-inner p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? "Login" : "Sign Up"}
              </h1>
              <p className="text-muted-foreground">
                Enter your information to {isLogin ? "access account" : "create account"}
              </p>
            </div>

            {/* User Type Toggle for Signup */}
            {!isLogin && (
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant={userType === "candidate" ? "default" : "outline"}
                  className="flex-1 rounded-full"
                  onClick={() => setUserType("candidate")}
                >
                  Candidate
                </Button>
                <Button
                  type="button"
                  variant={userType === "recruiter" ? "default" : "outline"}
                  className="flex-1 rounded-full"
                  onClick={() => setUserType("recruiter")}
                >
                  Recruiter
                </Button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name fields - show for login too based on design */}
              {isLogin ? (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="eg:John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="eg:Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Signup fields based on user type */}
                  {userType === "recruiter" ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="eg: John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="eg:Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder="eg:Unilever"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="eg:Sara"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="e.g., Akram"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={isLogin ? "eg:johndeo.gmail.com" : userType === "recruiter" ? "johndoe@unilever.com" : "eg:saraakram@gmail.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {/* CV Upload for Candidate Signup */}
              {!isLogin && userType === "candidate" && (
                <div>
                  <Label htmlFor="cv" className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Cv</span>
                    {cvFile && <span className="text-primary text-sm">({cvFile.name})</span>}
                  </Label>
                  <Input
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvChange}
                    className="hidden"
                  />
                </div>
              )}

              <div className="text-sm">
                {isLogin ? (
                  <span className="text-muted-foreground">
                    Doesn't have an account{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-primary hover:underline"
                    >
                      SignUp
                    </button>
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Already have an account{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-primary hover:underline"
                    >
                      login
                    </button>
                  </span>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-full px-8"
                >
                  {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <span className="text-muted-foreground">OR</span>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                onClick={() => {
                  toast({
                    title: "Google Sign-in",
                    description: "Google authentication can be enabled in settings.",
                  });
                }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;