import React from 'react';
import { Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { config } from 'src/global-config';
import { formatMoney } from 'src/utils/helper';

const ProductTable = ({
  products,
  setSelectedCat,
  setEditCat,
  setCategories
}) => {
  const confirm = async record => {
    // try {
    //   const res2 = await fetch(
    //     `${config.apiUrl}/products/sub-by-category?id=${record._id}`,
    //     {
    //       method: 'GET'
    //     }
    //   );
    //   const data2 = await res2.json();
    //   if (data2.data && data2.data.length !== 0) {
    //     message.error('Danh Mục Này Hiện Tại Có Danh Mục Con');
    //   } else {
    //     const res = await fetch(
    //       `${config.apiUrl}/products/category?id=${record._id}`,
    //       {
    //         method: 'DELETE'
    //       }
    //     );
    //     const data = await res.json();
    //     if (data.result && data.result.category_name) {
    //       message.success(
    //         'Xoá thành công danh mục con ' + data.result.category_name
    //       );
    //       const newData = categories.filter(cat => cat._id !== record._id);
    //       setCategories(newData);
    //     } else {
    //       message.error('Không Xoá Được Danh Mục Vui Lòng Thử Lại Sau');
    //     }
    //   }
    // } catch (error) {
    //   console.log('err', error);
    // }
  };

  const columns = [
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <img src={text} width="100" />
    },
    {
      title: 'Tên Sản phẩm',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => {}}>
          {text}
        </div>
      )
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => <div>{formatMoney(text)}</div>
    },
    {
      title: 'Giá Khuyến Mãi',
      dataIndex: 'final_price',
      key: 'final_price',
      render: (text, record) => (
        <div>
          {text === 0 ? (
            <span style={{ textDecoration: 'line-through' }}>0 giảm</span>
          ) : (
            formatMoney(text)
          )}
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
          title={`Bạn có muốn xoá sản phẩm này không?`}
          onConfirm={() => confirm(record)}
          okText="Có"
          cancelText="Không"
        >
          <DeleteOutlined />
        </Popconfirm>
      )
    }
  ];

  return <Table columns={columns} dataSource={products} />;
};

export default ProductTable;
