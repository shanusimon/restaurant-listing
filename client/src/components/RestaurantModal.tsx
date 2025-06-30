import { X } from 'lucide-react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { ModalProps } from '../types/types';
import { validateWithZod } from '../validation/restaurantValidation';

const RestaurantModal: React.FC<ModalProps> = ({
  modalClose,
  onAddRestaurant,
  onUpdateRestaurant,
  editingRestaurant
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!editingRestaurant;

  const initialValues = {
    name: editingRestaurant?.name || '',
    address: {
      street: editingRestaurant?.address.street || '',
      city: editingRestaurant?.address.city || '',
      country: editingRestaurant?.address.country || '',
      postalCode: editingRestaurant?.address.postalCode || '',
    },
    contact: {
      phone: editingRestaurant?.contact.phone || '',
      email: editingRestaurant?.contact.email || '',
    },
  };

  const handleSubmitForm = async (values: typeof initialValues) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await onUpdateRestaurant(values);
      } else {
        await onAddRestaurant(values);
      }
    } catch (error) {
      console.error('Submission error:', error);
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

        <Formik
          initialValues={initialValues}
          validate={validateWithZod}
          onSubmit={handleSubmitForm}
        >
          {({ isSubmitting }) => (
            <Form className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Name *
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter restaurant name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Address</h3>

                <div>
                  <label htmlFor="address.street" className="block text-sm font-medium mb-2">
                    Street Address *
                  </label>
                  <Field
                    id="address.street"
                    name="address.street"
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="address.street" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address.city" className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <Field
                      id="address.city"
                      name="address.city"
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <ErrorMessage name="address.city" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="address.country" className="block text-sm font-medium mb-2">
                      Country *
                    </label>
                    <Field
                      id="address.country"
                      name="address.country"
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <ErrorMessage name="address.country" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label htmlFor="address.postalCode" className="block text-sm font-medium mb-2">
                    Postal Code
                  </label>
                  <Field
                    id="address.postalCode"
                    name="address.postalCode"
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h3>

                <div>
                  <label htmlFor="contact.phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <Field
                    id="contact.phone"
                    name="contact.phone"
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="+1234567890"
                  />
                  <ErrorMessage name="contact.phone" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="contact.email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Field
                    id="contact.email"
                    name="contact.email"
                    type="email"
                    placeholder="restaurant@example.com"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="contact.email" component="p" className="text-red-500 text-sm mt-1" />
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
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting && (
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RestaurantModal;
