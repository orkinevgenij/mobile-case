import { getOrders } from '@/actions/order/orders';
import FilterSelect from '@/components/common/FilterSelect';
import OrderCard from '@/components/common/OrderCard';
import OrdersEmpty from '@/components/common/OrdersEmpty';
import Container from '@/components/layout/Container';

const Orders = async ({
  searchParams,
}: {
  searchParams: {
    filter: 'asc' | 'desc';
  };
}) => {
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
};
export default Orders;
