import React from 'react';
import { Table, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'ID Thuoc',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Tên Thuốc',
    dataIndex: 'ten_thuoc',
    key: 'ten_thuoc'
  },
  {
    title: 'Số Lượng',
    dataIndex: 'so_luong',
    key: 'so_luong'
  },
  {
    title: 'Hàm Lượng',
    dataIndex: 'ham_luong',
    key: 'ham_luong'
  },
  {
    title: 'Cách Dùng',
    dataIndex: 'cach_dung',
    key: 'cach_dung'
  },
  {
    title: 'Giá Tiền',
    dataIndex: 'gia_tien',
    key: 'gia_tien'
  }
];

const TableToaThuoc = ({ ToaThuoc, ChiTietThuoc: { lists, thuoc } }) => {
  console.log('Toa Thuoc', ToaThuoc);
  console.log('lists', lists);
  console.log('thuoc', thuoc);
  const mapListToThuoc = () => {
    const array = [];
    for (let i = 0; i < lists.length; i++) {
      const obj = {};
      obj.id = thuoc[i].id_thuoc;
      obj.ten_thuoc = thuoc[i].ten_thuoc;
      obj.so_luong = lists[i].so_luong_thuoc + ' ' + thuoc[i].don_vi_tinh;
      obj.ham_luong = thuoc[i].ham_luong;
      obj.cach_dung = lists[i].cach_dung;
      obj.gia_tien = thuoc[i].gia_tien * lists[i].so_luong_thuoc;
      array.push(obj);
    }
    return array;
  };

  const mapData = mapListToThuoc();
  return <Table columns={columns} dataSource={mapData} />;
};

export default TableToaThuoc;
