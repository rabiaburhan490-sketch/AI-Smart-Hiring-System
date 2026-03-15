import Navbar from "@/components/layout/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      line1: "Xenon@gmail.com",
      line2: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Phone",
      line1: "+92 (555) 123-4567",
      line2: "Mon-Fri from 9am to 5pm",
    },
    {
      icon: MapPin,
      title: "Location",
      line1: "123 Business Street",
      line2: "Karachi, CA 94102",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section with Gradient */}
      <section className="gradient-header py-16 text-center text-primary-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in touch</h1>
        <p className="text-lg max-w-2xl mx-auto px-6 opacity-90">
          Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="border-2 border-primary/30 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{info.title}</h3>
              <p className="text-foreground font-medium">{info.line1}</p>
              <p className="text-muted-foreground text-sm">{info.line2}</p>
            </div>
          ))}
        </div>

        {/* Static Contact Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Message */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-primary mb-4">
                we would like to hear from you
              </h2>
              <p className="text-muted-foreground mb-8">
                if you have any inquiries, or just want to say hi, please you the contact form!
              </p>
              
              {/* Decorative illustration */}
              <div className="flex justify-center md:justify-start items-end gap-2">
                <svg className="w-16 h-16" viewBox="0 0 64 64">
                  <path
                    d="M8 56 Q16 40, 32 48 Q48 56, 48 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M44 28 L48 32 L52 28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <div className="w-12 h-10 border-2 border-foreground rounded flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Right side - Static form display (no submission) */}
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <div className="w-full px-4 py-3 border rounded-lg bg-muted text-muted-foreground">
                    eg: George
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Surname</label>
                  <div className="w-full px-4 py-3 border rounded-lg bg-muted text-muted-foreground">
                    eg: Russell
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="w-full px-4 py-3 border rounded-lg bg-muted text-muted-foreground">
                    george@gmail.com
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <div className="w-full px-4 py-3 border rounded-lg bg-muted text-muted-foreground h-24">
                    Tell us how we can help you......
                  </div>
                </div>
                <div className="gradient-primary text-primary-foreground text-center py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send Message
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;