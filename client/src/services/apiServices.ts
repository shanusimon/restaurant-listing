import axios from 'axios';
import type { Restaurant } from '../types/types';

const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get(API_ROUTE);
  const restaurantData = response.data.data || response.data || [];

  return restaurantData.map((restaurant: any) => ({
    _id: restaurant._id || restaurant.id,
    name: restaurant.name || '',
    cuisine: restaurant.cuisine || '',
    address: {
      street: restaurant.address?.street || '',
      city: restaurant.address?.city || '',
      country: restaurant.address?.country || '',
      postalCode: restaurant.address?.postalCode
    },
    contact: {
      phone: restaurant.contact?.phone || '',
      email: restaurant.contact?.email
    }
  }));
};

export const addRestaurant = async (restaurantData: Omit<Restaurant, '_id'>) => {
  const cleanedData = {
    name: restaurantData.name.trim(),
    address: {
      street: restaurantData.address.street.trim(),
      city: restaurantData.address.city.trim(),
      country: restaurantData.address.country.trim(),
      ...(restaurantData.address.postalCode && {
        postalCode: restaurantData.address.postalCode.trim()
      })
    },
    contact: {
      phone: restaurantData.contact.phone.trim(),
      ...(restaurantData.contact.email && {
        email: restaurantData.contact.email.trim()
      })
    }
  };

  return axios.post(API_ROUTE, cleanedData);
};

export const updateRestaurant = async (
  id: string,
  restaurantData: Omit<Restaurant, '_id'>
) => {
  const cleanedData = {
    name: restaurantData.name.trim(),
    address: {
      street: restaurantData.address.street.trim(),
      city: restaurantData.address.city.trim(),
      country: restaurantData.address.country.trim(),
      ...(restaurantData.address.postalCode && {
        postalCode: restaurantData.address.postalCode.trim()
      })
    },
    contact: {
      phone: restaurantData.contact.phone.trim(),
      ...(restaurantData.contact.email && {
        email: restaurantData.contact.email.trim()
      })
    }
  };

  return axios.patch(`${API_ROUTE}${id}`, cleanedData);
};

export const deleteRestaurant = async (id: string) => {
  return axios.delete(`${API_ROUTE}${id}`);
};
