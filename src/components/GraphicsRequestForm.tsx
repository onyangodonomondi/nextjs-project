'use client';

import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const graphicsTypes = [
  { value: 'branding', label: 'Branding Materials' },
  { value: 'packaging', label: 'Packaging Design' },
  { value: 'business-cards', label: 'Business Cards' },
  { value: 'fliers', label: 'Marketing Fliers' },
  { value: 'letterheads', label: 'Corporate Letterheads' },
  { value: 'merchandise', label: 'Merchandise Design' },
  { value: 'other', label: 'Other' }
];

export default function GraphicsRequestForm({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    graphicsType: '',
    description: '',
    preferredColors: '',
    references: '',
    timeline: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const message = `*New Graphics Design Request*
    
*Type:* ${formData.graphicsType}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Company:* ${formData.companyName}

*Project Description:*
${formData.description}

*Timeline:* ${formData.timeline}
*Preferred Colors:* ${formData.preferredColors}

*Reference Examples:*
${formData.references || 'None provided'}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (remove + from the number)
    const whatsappNumber = "254741590670";
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Close the form
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Request Graphics Design</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graphics Type
            </label>
            <select
              required
              value={formData.graphicsType}
              onChange={e => setFormData({ ...formData, graphicsType: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select a graphics type</option>
              {graphicsTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="e.g., 0712 345 678"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Tell us about your project requirements..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select timeline</option>
                <option value="urgent">Urgent (1-2 days)</option>
                <option value="week">Within a week</option>
                <option value="2weeks">1-2 weeks</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Colors
              </label>
              <input
                type="text"
                value={formData.preferredColors}
                onChange={e => setFormData({ ...formData, preferredColors: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="e.g., Blue and Gold, Modern colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference Examples (Optional)
            </label>
            <textarea
              value={formData.references}
              onChange={e => setFormData({ ...formData, references: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Links or descriptions of designs you like"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
} 