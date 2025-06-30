
export interface Restaurant {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode?: string;
  };
  contact: {
    phone: string;
    email?: string;
  };
}

export interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (id: string) => void;
}


export interface ModalProps {
  modalClose: () => void;
  onAddRestaurant: (restaurant: Omit<Restaurant, '_id'>) => Promise<void>;
  onUpdateRestaurant: (restaurant: Omit<Restaurant, '_id'>) => Promise<void>;
  editingRestaurant?: Restaurant | null;
}