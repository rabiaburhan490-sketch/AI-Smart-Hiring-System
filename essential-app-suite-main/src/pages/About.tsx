import Navbar from "@/components/layout/Navbar";
import { Star, Shield, Clock, TrendingUp, Eye, Target } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Star,
      title: "AI-powered resume screening and matching",
    },
    {
      icon: Shield,
      title: "Fair and unbiased candidate evaluation",
    },
    {
      icon: Clock,
      title: "Time-efficient recruitment process",
    },
    {
      icon: TrendingUp,
      title: "Data-driven insights for better hiring decisions",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section with Gradient */}
      <section className="gradient-header py-16 text-center text-primary-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto px-6 opacity-90">
          We design innovative recruitment solutions that streamline hiring and enhance candidate evaluation
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <div className="border-2 border-primary/30 rounded-2xl p-8 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To build an intelligent recruitment system that ensures fair, efficient, and data-driven hiring through AI technology. By reducing manual intervention and human bias, our system aspires to promote fair hiring practices and equal opportunities for all candidates..
            </p>
          </div>

          {/* Mission Card */}
          <div className="border-2 border-primary/30 rounded-2xl p-8 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To automate candidate screening and evaluation using AI-based resume matching and interviews, enabling recruiters to make faster and smarter hiring decisions. we aim to demonstrate the practical application of AI, data engineering, and web technologies to solve real-world recruitment challenges
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-primary mb-2">Why Choose Us</h2>
          <p className="text-muted-foreground">• What makes our AI recruitment system stand out</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-2 border-primary/30 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium">{feature.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;