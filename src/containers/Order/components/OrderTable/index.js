import React, { useState } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { config } from 'src/global-config';
import { formatMoney } from 'src/utils/helper';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { Select } from 'antd';
import { mapStateToLabel } from 'src/utils/helper';
const { Option } = Select;

const OrderTable = ({ order }) => {
  const confirm = async record => {};
  const [editStatus, setEditStatus] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('order_fulfilled');
  const [status, setStatus] = useState('');

  const handleChange = value => {
    setStatus(value);
  };
  console.log('selectedOrder', selectedOrder);
  const handleChangeStatus = async record => {
    try {
      const res = await fetch(
        `${config.apiUrl}/products/track-order?id=${selectedOrder._id}&status=${status}`,
        {
          method: 'PUT'
        }
      );

      const data = await res.json();
      console.log('data', data);
      message.info(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log('error', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      render: record => (
        <Link to={`/home/order/${get(record, '_id', '')}`}>
          {get(record, '_id', '')}
        </Link>
      )
    },
    {
      title: 'Họ Tên',
      key: 'fullname',
      render: record => <span>{get(record, 'shipping.fullname', '')}</span>
    },
    {
      title: 'Địa Chỉ',
      key: 'address',
      render: record => <span>{get(record, 'shipping.address', '')}</span>
    },
    {
      title: 'Mã Vùng',
      key: 'MaVung',
      render: record => (
        <span>
          {get(record, 'shipping.city', '')} -{' '}
          {get(record, 'shipping.ward', '')} -{' '}
          {get(record, 'shipping.district', '')}
        </span>
      )
    },
    {
      title: 'Số Điện Thoại',
      key: 'phone',
      render: record => <span>{get(record, 'shipping.phone', '')}</span>
    },
    {
      title: 'Trạng Thái',
      key: 'status',
      render: record => (
        <>
          {editStatus && selectedOrder._id === record._id ? (
            <Select style={{ width: 120 }} onChange={handleChange}>
              <Option value="order_fulfilled">Being Fulfilled</Option>
              <Option value="order_delivery">Delivery</Option>
              <Option value="order_completed">Completed</Option>
              <Option value="order_cancelled">Cancelled</Option>
            </Select>
          ) : (
            <div className={`order-status ${get(record, 'state', '')}`}>
              {mapStateToLabel(get(record, 'state', ''))}
            </div>
          )}
        </>
      )
    },
    {
      title: 'Sửa',
      key: 'name',
      render: record => (
        <>
          {editStatus && selectedOrder._id === record._id ? (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => handleChangeStatus(record)}
            >
              save
            </div>
          ) : (
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setEditStatus(true);
                console.log('record', record);
                setSelectedOrder(record);
              }}
            >
              <EditOutlined />
            </span>
          )}
        </>
      )
    }
  ];

  return (
    <>
      {order && (
        <Table
          columns={columns}
          dataSource={order}
          pagination={{ pageSize: 10 }}
        />
      )}
    </>
  );
};

export default OrderTable;
