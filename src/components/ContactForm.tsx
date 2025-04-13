
import { useState, useRef } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const projectTypes = [
    { value: '', label: 'Select Project Type' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'landscape', label: 'Landscape' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'other', label: 'Other' },
  ];
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size if needed
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success toast
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: '',
      });
      setFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-destructive' : ''}`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.name}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-destructive' : ''}`}
            placeholder="Your email address"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.email}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium mb-1">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`input-field ${errors.projectType ? 'border-destructive' : ''}`}
          >
            {projectTypes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className="text-destructive text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.projectType}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`input-field resize-none ${errors.message ? 'border-destructive' : ''}`}
            placeholder="Tell us about your project..."
          />
          {errors.message && (
            <p className="text-destructive text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.message}
            </p>
          )}
        </div>
        
        <div>
          <p className="block text-sm font-medium mb-1">Optional Attachments</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={triggerFileInput}
              className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              Choose File
            </button>
            <span className="text-sm text-muted-foreground">
              {fileName || 'No file selected'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Accepted file types: PDF, DOC, DOCX, JPG, PNG (max 10MB)
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
