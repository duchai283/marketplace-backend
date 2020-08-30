import React from 'react';
import { Table, Space } from 'antd';
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
    render: text => <Link to={`/home/benhnhan/2`}>{text}</Link>
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
    title: 'SỐ ĐIỆN THOẠI',
    dataIndex: 'phone',
    key: 'phone'
  }
];

const TableTimUser = ({ Text }) => {
  const [BenhNhan, setBenhNhan] = React.useState([]);

  React.useEffect(() => {
    const fetchUser = async () => {
      const request = `http://localhost:8088/benh_nhan/getOne?id=${Text + ''}`;
      const res = await fetch(request, {
        method: 'GET'
      });
      const data = await res.json();
      if (data.id) {
        await setBenhNhan([data]);
      } else {
        await setBenhNhan([]);
      }
    };
    if (Text) {
      fetchUser();
    }
  }, [Text]);

  return <Table columns={columns} dataSource={BenhNhan} pagination={false} />;
};

export default TableTimUser;
