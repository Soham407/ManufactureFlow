import React from 'react';
import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, User, Ruler, Building2, Tag, Layers } from 'lucide-react';
import { useMaterials } from '@/hooks/useMaterials';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  const { materials } = useMaterials();
  const selectedMaterial = materials.find(m => m.id === order.materialId);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_production: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      dispatched: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
          </div>

          {order.companyName && (
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium">{order.companyName}</p>
              </div>
            </div>
          )}

          {order.brandName && (
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-medium">{order.brandName}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          {order.variant && (
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Variant</p>
                <p className="font-medium">{order.variant}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <p className="text-sm text-gray-500 mb-2">Status</p>
        <Badge className={getStatusColor(order.status)}>
          {order.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
      
      <div>
        <p className="text-sm text-gray-500 mb-2">Description</p>
        <p className="bg-gray-50 p-3 rounded-lg">{order.description}</p>
      </div>

      {/* Material Information */}
      {selectedMaterial && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center space-x-2">
            <Ruler className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Material</p>
              <p className="font-medium">{selectedMaterial.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Estimated Material Needed</p>
              <p className="font-medium">{order.estimatedMaterialNeeded}m</p>
            </div>
            {order.materialUsed !== undefined && (
              <div>
                <p className="text-sm text-gray-500">Material Used</p>
                <p className="font-medium">{order.materialUsed}m</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="text-sm text-gray-500">Quantity</p>
          <p className="font-medium">{order.quantity}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Price per Unit</p>
          <p className="font-medium">₹{order.pricePerUnit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="pt-4">
        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
