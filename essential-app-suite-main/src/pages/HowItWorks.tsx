import Navbar from "@/components/layout/Navbar";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile.",
      description: "Sign up and build a professional profile that highlights your skills and experience to connect with top companies.",
    },
    {
      number: 2,
      title: "Find Your Match.",
      description: "Use advanced filters to browse opportunities that align with your career goals and purpose.",
    },
    {
      number: 3,
      title: "Seamless Application",
      description: "Apply to roles with a single click and manage all your submissions through a personalized dashboard.",
    },
    {
      number: 4,
      title: "AI-Powered Interviewing",
      description: "Participate in automated interviews where our AI analyzes your skills against job requirements in real-time.",
    },
    {
      number: 5,
      title: "Get Hired.",
      description: "Receive instant feedback and track your progress from \"Applied\" to \"Shortlisted\" until you land your dream role.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          How its Works?
        </h1>

        {/* Steps Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Row 1: Steps 1, 3, 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[steps[0], steps[2], steps[4]].map((step, index) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Number circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{step.number}</span>
                  </div>
                  {/* Connector arrows */}
                  {index < 2 && (
                    <div className="hidden md:block absolute -right-16 top-1/2 transform -translate-y-1/2">
                      <svg className="w-12 h-12 text-muted-foreground" viewBox="0 0 48 48">
                        <path
                          d="M10 24 Q24 10, 38 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="4 2"
                        />
                        <path
                          d="M34 20 L38 24 L34 28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Connector from row 1 to row 2 */}
          <div className="hidden md:flex justify-around mb-8 px-24">
            <svg className="w-8 h-16 text-muted-foreground" viewBox="0 0 32 64">
              <path
                d="M16 0 Q0 32, 16 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
            </svg>
            <div></div>
            <svg className="w-8 h-16 text-muted-foreground" viewBox="0 0 32 64">
              <path
                d="M16 64 Q32 32, 16 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
            </svg>
          </div>

          {/* Row 2: Steps 2, 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-16">
            {[steps[1], steps[3]].map((step, index) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Number circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{step.number}</span>
                  </div>
                  {/* Connector arrow */}
                  {index === 0 && (
                    <div className="hidden md:block absolute -right-24 top-1/2 transform -translate-y-1/2">
                      <svg className="w-16 h-12 text-muted-foreground" viewBox="0 0 64 48">
                        <path
                          d="M0 24 Q32 40, 64 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="4 2"
                        />
                        <path
                          d="M58 20 L64 24 L58 28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;