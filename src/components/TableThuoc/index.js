import React from 'react';
import { Table, Button, Input, message } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

class TableThuoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false
    };
  }

  columns = [
    {
      title: 'ID',
      dataIndex: 'id_thuoc'
    },
    {
      title: 'Tên Thuốc',
      dataIndex: 'ten_thuoc'
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'gia_tien',
      render: (text, record) =>
        text &&
        text.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND'
        })
    },
    {
      title: 'Đơn Vị',
      dataIndex: 'don_vi_tinh'
    },
    {
      width: '10%',
      title: 'Số lượng',
      dataIndex: 'price',
      render: (text, record) => (
        <Input
          type="text"
          onChange={value => {
            this.handleSoLuong(record, value);
          }}
        />
      )
    },

    {
      title: 'Cách Dùng',
      dataIndex: 'howtouse',
      render: (text, record) => (
        <TextArea
          style={{ width: '100%' }}
          type="text"
          placeholder=""
          onChange={value => this.handleCachDung(record, value)}
        />
      )
    }
  ];
  handleCachDung = (record, { currentTarget }) => {
    const value = currentTarget.value;
    const Thuoc = this.props.Thuoc;
    const updateThuoc = Thuoc.filter(item => {
      if (item.id_thuoc === record.id_thuoc) {
        item.cach_dung = value;
      }
      return item;
    });

    this.props.setThuoc(updateThuoc);
  };
  handleSoLuong = (record, { currentTarget }) => {
    const value = currentTarget.value;
    const Thuoc = this.props.Thuoc;
    const updateThuoc = Thuoc.filter(item => {
      if (item.id_thuoc === record.id_thuoc) {
        item.so_luong_thuoc = value;
      }
      return item;
    });

    this.props.setThuoc(updateThuoc);
  };

  start = async () => {
    this.setState({ loading: true });

    const Thuoc = this.props.Thuoc;
    const arrayIndex = this.state.selectedRowKeys;

    const data = [];
    Thuoc.forEach(item => {
      arrayIndex.forEach(index => {
        if (item.id_thuoc == index) {
          const obj = {};
          obj.id_chi_tiet = '';
          obj.id_toa_thuoc = this.props.idtoathuoc;
          obj.id_thuoc = item.id_thuoc;
          obj.so_luong_thuoc = item.so_luong_thuoc;
          obj.cach_dung = item.cach_dung;
          data.push(obj);
        }
      });
    });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
    let error = '';
    for (let i = 0; i < data.length; i++) {
      if (!data[i].cach_dung || !data[i].so_luong_thuoc) {
        error += 'VUI LÒNG NHẬP SỐ LƯỢNG VÀ CÁCH DÙNG!';
      }
    }
    if (error) {
      message.error(error);
      return;
    }

    const res = await fetch('http://localhost:8088/chi_tiet_toa_thuoc/addOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const listThuoc = await res.json();
    if (listThuoc) {
      message.success('BẠN ĐÃ THÊM THUỐC THÀNH CÔNG!');
      this.props.history.goBack();
    }
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            THÊM THUỐC
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={this.props.Thuoc}
          rowKey="id_thuoc"
        />
      </div>
    );
  }
}

export default TableThuoc;
