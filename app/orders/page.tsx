import { getOrders } from '@/actions/order/orders';
import OrderCard from '@/components/common/OrderCard';
import OrdersEmpty from '@/components/common/OrdersEmpty';
import Container from '@/components/layout/Container';

export default async function OrdersUser() {
  const orders = await getOrders();
  return (
    <Container>
      <div className='flex flex-col gap-4'>
        {orders.length === 0 ? (
          <OrdersEmpty />
        ) : (
          orders.map((order) => <OrderCard key={order.id} orders={order} />)
        )}
      </div>
    </Container>
  );
};
