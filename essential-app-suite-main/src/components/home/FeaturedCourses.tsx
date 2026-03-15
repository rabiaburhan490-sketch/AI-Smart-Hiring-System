import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CourseCard from "@/components/courses/CourseCard";

const featuredCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript from scratch with practical projects.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    category: "Development",
    duration: "8 weeks",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    description: "Learn design principles and create stunning user interfaces.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    category: "Design",
    duration: "6 weeks",
  },
  {
    id: 3,
    title: "Digital Marketing Essentials",
    description: "Grow your online presence with proven marketing strategies.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "Marketing",
    duration: "4 weeks",
  },
];

const FeaturedCourses = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked courses to help you start your learning journey and
            achieve your goals.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/courses">
            <Button variant="outline" size="lg" className="border-2">
              View All Courses
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
