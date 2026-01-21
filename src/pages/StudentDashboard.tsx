import React from 'react';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import { BookOpen, Search, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StudentDashboard: React.FC = () => {
  const { courses, enrolledCourses, enrollCourse, unenrollCourse } = useCourses();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableCourses = filteredCourses.filter(
    (course) => !enrolledCourses.find((enrolled) => enrolled.id === course.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome, Student!
          </h1>
          <p className="text-muted-foreground">
            Explore our courses and start your learning journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="input-styled pl-12 w-full"
            />
          </div>
        </div>

        {/* Courses Tabs */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Available Courses</TabsTrigger>
            <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Available Courses
              </h2>
              <p className="text-muted-foreground text-sm">
                {availableCourses.length} courses found
              </p>
            </div>

            {availableCourses.length === 0 ? (
              <div className="text-center py-16 card-elevated">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {searchTerm ? 'No courses match your search' : 'No courses available'}
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm
                    ? 'Try different search terms'
                    : 'Check back later for new courses'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course, index) => (
                  <div key={course.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <CourseCard
                      course={course}
                      showEnrollment={user?.role === 'student'}
                      isEnrolled={false}
                      onEnroll={enrollCourse}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="enrolled" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Enrolled Courses
              </h2>
              <p className="text-muted-foreground text-sm">
                {enrolledCourses.length} courses enrolled
              </p>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="text-center py-16 card-elevated">
                <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No courses enrolled
                </h3>
                <p className="text-muted-foreground">
                  Browse available courses and enroll to start learning
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course, index) => (
                  <div key={course.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <CourseCard
                      course={course}
                      showEnrollment={user?.role === 'student'}
                      isEnrolled={true}
                      onUnenroll={unenrollCourse}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;
