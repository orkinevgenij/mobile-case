import { getOrders } from '@/actions/order/orders';
import FilterSelect from '@/components/FilterSelect';
import OrderCard from '@/components/OrderCard';
import OrdersEmpty from '@/components/OrdersEmpty';
import Container from '@/components/layout/Container';

export default async function OrdersUser({
  searchParams,
}: {
  searchParams: Promise<{
    filter: 'asc' | 'desc';
  }>;
}) {
  const { filter } = await searchParams;
  const orders = await getOrders(filter);
  return (
    <Container>
      <div className='flex justify-end my-2'>
        <FilterSelect />
      </div>
      <div className='flex flex-col gap-4'>
        {orders.length === 0 ? (
          <OrdersEmpty />
        ) : (
          orders.map((order) => <OrderCard key={order.id} orders={order} />)
        )}
      </div>
    </Container>
  );
}
