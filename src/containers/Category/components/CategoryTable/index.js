import React from 'react';
import { Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { config } from 'src/global-config';

const CategoryTable = ({
  categories,
  setSelectedCat,
  setEditCat,
  setCategories,
  setAddCat
}) => {
  const confirm = async record => {
    try {
      const res2 = await fetch(
        `${config.apiUrl}/products/sub-by-category?id=${record._id}`,
        {
          method: 'GET'
        }
      );
      const data2 = await res2.json();
      if (data2.data && data2.data.length !== 0) {
        message.error('Danh Mục Này Hiện Tại Có Danh Mục Con');
      } else {
        const res = await fetch(
          `${config.apiUrl}/products/category?id=${record._id}`,
          {
            method: 'DELETE'
          }
        );

        const data = await res.json();
        if (data.result && data.result.category_name) {
          message.success(
            'Xoá thành công danh mục con ' + data.result.category_name
          );
          const newData = categories.filter(cat => cat._id !== record._id);
          setCategories(newData);
        } else {
          message.error('Không Xoá Được Danh Mục Vui Lòng Thử Lại Sau');
        }
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const columns = [
    {
      title: 'Các danh mục',
      dataIndex: 'category_name',
      key: 'name',
      render: (text, record) => (
        <div
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => setSelectedCat(record._id)}
        >
          {text}
        </div>
      )
    },
    {
      title: 'Sửa',
      dataIndex: '_id',
      key: 'name',
      render: (text, record) => (
        <span style={{ cursor: 'pointer' }} onClick={() => setEditCat(record)}>
          <EditOutlined />
        </span>
      )
    },
    {
      title: 'Xoá',
      dataIndex: '_id',
      key: 'name',
      render: (text, record) => (
        <Popconfirm
          placement="top"
          title={`Bạn có muốn xoá danh mục ${record.category_name.toUpperCase()} này không?`}
          onConfirm={() => confirm(record)}
          okText="Có"
          cancelText="Không"
        >
          <DeleteOutlined />
        </Popconfirm>
      )
    }
  ];

  return (
    <div style={{ width: '40%' }}>
      <Table
        columns={columns}
        dataSource={categories}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CategoryTable;
