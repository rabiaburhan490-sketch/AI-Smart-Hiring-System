import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
}

const CourseCard = ({ title, description, image, category, duration }: CourseCardProps) => {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover-lift">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary group/btn">
            Learn More
            <ArrowRight size={16} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
