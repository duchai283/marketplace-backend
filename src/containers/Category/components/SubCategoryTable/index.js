import React from 'react';
import { Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { config } from 'src/global-config';

const SubCategoryTable = ({
  subCat,
  setSubCat,
  editSubCat,
  setEditSubCat,
  setAddSubCat,
  setAddCat
}) => {
  const confirm = async record => {
    try {
      const res = await fetch(
        `${config.apiUrl}/products/sub-category?id=${record._id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await res.json();
      if (data.result && data.result.subcategory_name) {
        message.success(
          'Xoá thành công danh mục con ' + data.result.subcategory_name
        );
        const newData = subCat.filter(sub => sub._id !== record._id);
        setSubCat(newData);
      } else {
        message.error('Không Xoá Được Danh Mục Vui Lòng Thử Lại Sau');
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const columns = [
    {
      title: 'Các danh mục con',
      dataIndex: 'subcategory_name',
      key: 'name',
      render: (text, record) => <Link>{text}</Link>
    },
    {
      title: 'Sửa',
      dataIndex: '_id',
      key: 'name',
      render: (text, record) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setEditSubCat(record);
            setAddCat(false);
            setAddSubCat(true);
          }}
        >
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
          placement="topLeft"
          title={`Bạn có muốn xoá danh mục con ${record.subcategory_name.toUpperCase()} này không?`}
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
        dataSource={subCat}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default SubCategoryTable;
