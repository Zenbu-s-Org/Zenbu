import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import type { Order } from "@/features/dashboard/Types";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "@/features/cart/hooks/useCart";

type OrderItemProps = {
  order: Order;
};

function OrderItem({ order }: OrderItemProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOrderAgain = async () => {
    try {
      setIsAdding(true);

      // Hämta full order från backend för att få alla items
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/order/${order.orderNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }

      const fullOrder = await response.json();

      // Lägg till alla items från ordern i cart
      fullOrder.items.forEach((item: any) => {
        // Lägg till varje item så många gånger som qty
        for (let i = 0; i < item.qty; i++) {
          addItem({
            id: item.id,
            name: item.name,
            price: item.price
          });
        }
      });

      // Visa success till användaren
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/menu'); // Vi kan navigera användaren till meny eller en annan endpoint här. 
      }, 1500);

    } catch (error) {
      console.error('Error adding order to cart:', error);
      alert('Failed to add items to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="border-3 border-stone-900 rounded-xl p-4 bg-stone-50 relative">
      {showSuccess && (
        <div className="absolute inset-0 bg-lime-300 bg-opacity-90 rounded-xl flex items-center justify-center z-10">
          <p className="text-2xl font-bold text-stone-900">✓ Added to Cart!</p>
        </div>
      )}

      <div className="flex items-start gap-3 mb-3">
        <div className="text-2xl"></div>
        
        <div className="flex-1">
          <p className="font-bold text-sm mb-1">{order.orderNumber}</p>
          <p className="text-sm text-stone-600">{order.items}</p>
        </div>

        <div className="text-right">
          <p className="font-bold text-sm">{order.price} SEK</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button 
          variant="link" 
          className="text-sm px-4 py-1 flex-1"
          onClick={handleOrderAgain}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : 'Order Again?'}
        </Button>
        
        <Label 
          variant={order.status === 'pending' ? 'orange' : 'green'}
          className="text-xs px-3"
        >
          {order.status === 'pending' ? 'Pending' : 'Done'}
        </Label>
      </div>
    </div>
  );
}

export default OrderItem;