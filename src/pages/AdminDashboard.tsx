import React, { useState } from 'react';
import { useCourses } from '@/contexts/CourseContext';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import AddCourseForm from '@/components/AddCourseForm';
import { Plus, BookOpen, Users, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { courses, deleteCourse } = useCourses();
  const [showAddForm, setShowAddForm] = useState(false);

  const stats = [
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: courses.length,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      icon: Users,
      label: 'Active Students',
      value: 248,
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: TrendingUp,
      label: 'Total Revenue',
      value: '₹3.2L',
      color: 'bg-accent/10 text-accent',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your courses and track institute performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="card-elevated p-6 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Course Management
            </h2>
            <p className="text-muted-foreground text-sm">
              {courses.length} courses available
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-gradient-accent flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Course
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16 card-elevated">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first course to the institute
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-gradient-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Course
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={course.id} style={{ animationDelay: `${index * 50}ms` }}>
                <CourseCard
                  course={course}
                  showDelete
                  onDelete={deleteCourse}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {showAddForm && <AddCourseForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default AdminDashboard;
