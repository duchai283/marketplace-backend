import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

import { config } from 'src/global-config';
import OrderTable from './components/OrderTable';

const { Search } = Input;

const Order = () => {
  const [order, setOrder] = useState([]);
  const [addProd, setAddProd] = useState(true);
  console.log('order', order);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/products/all-orders`);
        const data = await res.json();
        setOrder(data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getCategory();
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 40
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Search
            placeholder="nhập id đơn hàng cần tìm"
            onSearch={value => console.log(value)}
            style={{ width: 600, marginRight: '40px' }}
          />
        </div>
      </div>
      <OrderTable order={order} />
    </div>
  );
};

export default Order;
