import React, { useState } from 'react';
import { useCourses } from '@/contexts/CourseContext';
import { Plus, X } from 'lucide-react';

interface AddCourseFormProps {
  onClose: () => void;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ onClose }) => {
  const { addCourse } = useCourses();
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    fee: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.fee || parseFloat(formData.fee) <= 0) newErrors.fee = 'Valid fee is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      addCourse({
        title: formData.title.trim(),
        duration: formData.duration.trim(),
        fee: parseFloat(formData.fee),
        description: formData.description.trim(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-2xl font-semibold text-foreground">Add New Course</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-styled"
              placeholder="e.g., Full Stack Web Development"
            />
            {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="input-styled"
                placeholder="e.g., 3 months"
              />
              {errors.duration && <p className="text-destructive text-sm mt-1">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fee (₹)
              </label>
              <input
                type="number"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                className="input-styled"
                placeholder="e.g., 15000"
                min="0"
              />
              {errors.fee && <p className="text-destructive text-sm mt-1">{errors.fee}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-styled min-h-[100px] resize-none"
              placeholder="Describe what students will learn..."
              rows={4}
            />
            {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-gradient-accent flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
