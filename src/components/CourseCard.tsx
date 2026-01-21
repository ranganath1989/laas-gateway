import React from 'react';
import { Course } from '@/contexts/CourseContext';
import { Clock, IndianRupee, BookOpen, Trash2 } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showDelete, onDelete }) => {
  return (
    <div className="card-elevated p-6 flex flex-col h-full animate-scale-in">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-secondary" />
        </div>
        {showDelete && onDelete && (
          <button
            onClick={() => onDelete(course.id)}
            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            title="Delete course"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <h3 className="font-display text-xl font-semibold text-foreground mb-2 line-clamp-2">
        {course.title}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
        {course.description}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5 text-sm">
          <Clock className="w-4 h-4 text-secondary" />
          <span className="text-foreground font-medium">{course.duration}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <IndianRupee className="w-4 h-4 text-secondary" />
          <span className="text-foreground font-medium">{course.fee.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
