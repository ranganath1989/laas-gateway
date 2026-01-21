import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Course {
  id: string;
  title: string;
  duration: string;
  fee: number;
  description: string;
  createdAt: Date;
}

interface CourseContextType {
  courses: Course[];
  enrolledCourses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => void;
  deleteCourse: (id: string) => void;
  enrollCourse: (id: string) => void;
  unenrollCourse: (id: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Sample courses for demonstration
const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    duration: '6 months',
    fee: 15000,
    description: 'Master modern web technologies including React, Node.js, and databases. Build real-world applications from scratch.',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Data Science & Machine Learning',
    duration: '4 months',
    fee: 12000,
    description: 'Learn Python, data analysis, visualization, and machine learning algorithms to become a data scientist.',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Cloud Computing with AWS',
    duration: '3 months',
    fee: 10000,
    description: 'Comprehensive AWS training covering EC2, S3, Lambda, and cloud architecture best practices.',
    createdAt: new Date(),
  },
];

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
    setEnrolledCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const enrollCourse = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (course && !enrolledCourses.find((c) => c.id === id)) {
      setEnrolledCourses((prev) => [...prev, course]);
    }
  };

  const unenrollCourse = (id: string) => {
    setEnrolledCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, enrolledCourses, addCourse, deleteCourse, enrollCourse, unenrollCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
