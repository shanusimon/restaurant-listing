
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