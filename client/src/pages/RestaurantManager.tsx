import { Plus, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantModal from '../components/RestaurantModal';
import type { Restaurant } from '../types/types';
import {
  fetchRestaurants as fetchRestaurantsApi,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from  "../services/apiServices"


const RestaurantManager: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const data = await fetchRestaurantsApi();
      setRestaurants(data);
    } catch (error) {
      toast.error('Failed to load restaurants');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const modalClose = () => {
    setModalOpen(false);
    setEditingRestaurant(null);
  };

  const handleAddRestaurant = async (restaurantData: Omit<Restaurant, '_id'>) => {
    try {
      await addRestaurant(restaurantData);
      toast.success('Restaurant added successfully!');
      await fetchRestaurants();
      modalClose();
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while adding the restaurant');
    }
  };

  const handleUpdateRestaurant = async (restaurantData: Omit<Restaurant, '_id'>) => {
    if (!editingRestaurant) return;
    try {
      await updateRestaurant(editingRestaurant._id, restaurantData);
      toast.success('Restaurant updated successfully!');
      await fetchRestaurants();
      modalClose();
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while updating the restaurant');
    }
  };

  const handleEditRestaurant = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setModalOpen(true);
  };

  const handleDeleteRestaurant = async (id: string) => {
    try {
      await deleteRestaurant(id);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
      toast.success('Restaurant deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete restaurant');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Restaurant Manager</h1>
              <p className="text-lg text-gray-600">
                Manage your restaurants ({restaurants.length} total)
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md"
              aria-label="Add new restaurant"
            >
              <Plus size={20} />
              Add Restaurant
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-600">Loading restaurants...</div>
        ) : restaurants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <MapPin size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants yet</h3>
            <p className="text-gray-500 mb-6">Add your first restaurant to get started</p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors shadow-md"
            >
              <Plus size={20} />
              Add Your First Restaurant
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
                onEdit={handleEditRestaurant}
                onDelete={handleDeleteRestaurant}
              />
            ))}
          </div>
        )}

        {modalOpen && (
          <RestaurantModal
            modalClose={modalClose}
            onAddRestaurant={handleAddRestaurant}
            onUpdateRestaurant={handleUpdateRestaurant}
            editingRestaurant={editingRestaurant}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantManager;