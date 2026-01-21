import React from 'react';
import { Course } from '@/contexts/CourseContext';
import { Clock, IndianRupee, BookOpen, Trash2, UserPlus, UserMinus } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
  isEnrolled?: boolean;
  onEnroll?: (id: string) => void;
  onUnenroll?: (id: string) => void;
  showEnrollment?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showDelete, onDelete, isEnrolled, onEnroll, onUnenroll, showEnrollment }) => {
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

      {showEnrollment && (
        <div className="mb-4">
          {isEnrolled ? (
            <button
              onClick={() => onUnenroll?.(course.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
            >
              <UserMinus className="w-4 h-4" />
              Unenroll
            </button>
          ) : (
            <button
              onClick={() => onEnroll?.(course.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Enroll
            </button>
          )}
        </div>
      )}

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
