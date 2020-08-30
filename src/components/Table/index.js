import React from 'react';
import { Table, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'HỌ',
    dataIndex: 'first_name',
    key: 'firstname',
    render: (text, record) => (
      <Link to={`/home/benhnhan/${record.id}`}>{text}</Link>
    )
  },
  {
    title: 'TÊN',
    dataIndex: 'last_name',
    key: 'lastname'
  },
  {
    title: 'GIỚI TÍNH',
    dataIndex: 'sex',
    key: 'sex',
    render: (text, record) => {
      if (text === 1) {
        return <Space size="middle">Nam</Space>;
      } else {
        return <Space size="middle">Nữ</Space>;
      }
    }
  },
  {
    title: 'ĐỊA CHỈ',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'SỐ ĐIỆN THOẠI',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'LỊCH HẸN',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Link to={`/home/lichhen/${text.id}`}>
          TẠO LỊCH HẸN <CalendarOutlined />
        </Link>
      </Space>
    )
  }
];

const TableAntd = ({ BenhNhan }) => {
  return <Table columns={columns} dataSource={BenhNhan} />;
};

export default TableAntd;
