import { X } from 'lucide-react';
import { useState } from 'react';
import type { Restaurant } from '../types/types';

interface ModalProps {
  modalClose: () => void;
  onAddRestaurant: (restaurant: Omit<Restaurant, '_id'>) => Promise<void>;
  onUpdateRestaurant: (restaurant: Omit<Restaurant, '_id'>) => Promise<void>;
  editingRestaurant?: Restaurant | null;
}

type FormErrors = Partial<Record<string, string>>;

const RestaurantModal: React.FC<ModalProps> = ({ 
  modalClose, 
  onAddRestaurant, 
  onUpdateRestaurant, 
  editingRestaurant 
}) => {
  const isEditing = !!editingRestaurant;
  
  const [formData, setFormData] = useState<Omit<Restaurant, '_id'>>({
    name: editingRestaurant?.name || '',
    address: { 
      street: editingRestaurant?.address.street || '', 
      city: editingRestaurant?.address.city || '', 
      country: editingRestaurant?.address.country || '', 
      postalCode: editingRestaurant?.address.postalCode || '' 
    },
    contact: { 
      phone: editingRestaurant?.contact.phone || '', 
      email: editingRestaurant?.contact.email || '' 
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section?: 'address' | 'contact'
  ) => {
    const { name, value } = e.target;
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Restaurant name is required';
    if (!formData.address.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.address.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.country.trim()) newErrors.country = 'Country is required';
    if (!formData.contact.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.contact.phone.replace(/\s|-/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (formData.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isEditing) {
        await onUpdateRestaurant(formData);
      } else {
        await onAddRestaurant(formData);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-busy={isLoading}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}
          </h2>
          <button
            onClick={modalClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Restaurant Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter restaurant name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Address</h3>

            {/* Street */}
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={formData.address.street}
                onChange={(e) => handleChange(e, 'address')}
                disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter street address"
              />
              {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={(e) => handleChange(e, 'address')}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={formData.address.country}
                  onChange={(e) => handleChange(e, 'address')}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>

            {/* Postal Code */}
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={formData.address.postalCode || ''}
                onChange={(e) => handleChange(e, 'address')}
                disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h3>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.contact.phone}
                onChange={(e) => handleChange(e, 'contact')}
                disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+1234567890"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.contact.email || ''}
                onChange={(e) => handleChange(e, 'contact')}
                disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="restaurant@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={modalClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;