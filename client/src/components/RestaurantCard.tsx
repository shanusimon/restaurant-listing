import { Mail, Edit, MapPin, Trash, Phone } from 'lucide-react';
import type { RestaurantCardProps } from '../types/types';

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onEdit, onDelete }) => {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='text-xl font-semibold text-gray-800'>{restaurant.name}</h3>
        </div>
        <div className='flex gap-1'>
          <button 
            onClick={() => onEdit(restaurant)}
            className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
            title='Edit'>
            <Edit size={16}/>
          </button>
          <button 
            onClick={() => onDelete(restaurant._id)} 
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title='Delete'>
            <Trash size={16}/>
          </button>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='flex items-start gap-3'>
          <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
          <div className='text-gray-700 text-sm leading-relaxed'>
            <p>{restaurant.address.street}</p>
            <p>{restaurant.address.city}, {restaurant.address.country}</p>
            {restaurant.address.postalCode && <p>{restaurant.address.postalCode}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-gray-500 flex-shrink-0" />
          <p className="text-gray-700 text-sm">{restaurant.contact.phone}</p>
        </div>
        
        {restaurant.contact.email && (
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-gray-500 flex-shrink-0" />
            <p className="text-gray-700 text-sm">{restaurant.contact.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
