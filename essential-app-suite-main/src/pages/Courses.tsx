import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";

const allCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript from scratch with practical projects and real-world examples.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    category: "Development",
    duration: "8 weeks",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    description: "Learn design principles and create stunning user interfaces that delight users.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    category: "Design",
    duration: "6 weeks",
  },
  {
    id: 3,
    title: "Digital Marketing Essentials",
    description: "Grow your online presence with proven marketing strategies and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "Marketing",
    duration: "4 weeks",
  },
  {
    id: 4,
    title: "React.js Complete Guide",
    description: "Build modern web applications with React, hooks, and state management.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    category: "Development",
    duration: "10 weeks",
  },
  {
    id: 5,
    title: "Figma for Beginners",
    description: "Learn Figma from scratch and create professional designs and prototypes.",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop",
    category: "Design",
    duration: "4 weeks",
  },
  {
    id: 6,
    title: "SEO & Content Strategy",
    description: "Master search engine optimization and content marketing for organic growth.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
    category: "Marketing",
    duration: "5 weeks",
  },
  {
    id: 7,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and databases.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    category: "Development",
    duration: "8 weeks",
  },
  {
    id: 8,
    title: "Brand Identity Design",
    description: "Create memorable brand identities including logos, colors, and typography.",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=250&fit=crop",
    category: "Design",
    duration: "6 weeks",
  },
];

const categories = ["All", "Development", "Design", "Marketing"];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = activeCategory === "All"
    ? allCourses
    : allCourses.filter((course) => course.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-gradient">Courses</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of carefully crafted courses designed to
              help you achieve your learning goals.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up" style={{ animationDelay: "100ms" }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="animate-fade-up"
                style={{ animationDelay: `${(index + 2) * 50}ms` }}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No courses found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
