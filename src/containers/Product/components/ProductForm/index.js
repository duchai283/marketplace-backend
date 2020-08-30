import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import { config } from 'src/global-config';

const { Option } = Select;

const ProductForm = ({
  setAddCat,
  setCategories,
  editCat,
  categories,
  setSelectedCat,
  subCat,
  setAddProd,
  setProducts
}) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  const onFinish = values => {
    console.log('values', values);
    postProduct(values);
  };

  useEffect(() => {
    if (editCat) {
      form.setFieldsValue({
        cat_name: editCat.category_name
      });
    }
  }, [editCat]);

  const postProduct = async values => {
    if (!image) {
      return message.error('Vui chọn hình ảnh');
    }
    if (values.final_price >= values.price) {
      return message.error('Giá Khuyến mãi không được lớn hơn giá ban đầu');
    }
    const obj = {
      ...values,
      image: image
    };
    const res = await fetch(`${config.apiUrl}/products/create-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    const data = await res.json();
    if (data.message) {
      message.success(
        'Bạn Đã Tạo Thành Công Sản Phẩm Mới Tên Là: ' + values.title
      );
      setAddProd(false);
      try {
        const resCat = await fetch(`${config.apiUrl}/products/products`);
        const dataCat = await resCat.json();
        setProducts(dataCat.data);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      message.error('Không Tạo Được Sản Phẩm mới vui lòng thử lại sau');
    }
  };

  const handleUploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'marketplace');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dsarzposu/image/upload',
      { method: 'POST', body: data }
    );

    const file = await res.json();
    console.log('file', file);
    setImage(file.secure_url);
  };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '84'
      }}
      scrollToFirstError
    >
      <h2>{editCat ? 'Sửa Sản phẩm' : 'Tạo Sản phẩm'}</h2>
      <Form.Item
        name="title"
        label="Tên sản phẩm"
        rules={[
          {
            required: true,
            message: 'Cần nhập tên sản phẩm'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="desc"
        label="Nội dung sản phẩm"
        rules={[
          {
            required: true,
            message: 'Cần nhập nội dung tên sản phẩm'
          }
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Chọn Danh Mục"
        name="category_id"
        rules={[
          {
            required: true,
            message: 'Cần chọn danh mục'
          }
        ]}
      >
        <Select onChange={value => setSelectedCat(value)}>
          {categories.map(cat => (
            <Option value={cat._id}>{cat.category_name}</Option>
          ))}
        </Select>
      </Form.Item>
      {subCat && subCat.length !== 0 && (
        <Form.Item
          label="Chọn Danh Mục Con"
          name="subcategory_id"
          rules={[
            {
              required: true,
              message: 'Cần chọn danh mục con'
            }
          ]}
        >
          <Select>
            {subCat.map(sub => (
              <Option value={sub._id}>{sub.subcategory_name}</Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        name="price"
        label="Giá sản phẩm"
        rules={[
          {
            required: true,
            message: 'Cần nhập giá sản phẩm'
          },
          {
            validator: (_rule, value) => {
              if (value || value >= 0) {
                const pasred = Number(value);
                if (pasred >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject('Hãy nhập giá trên 0!');
              }
              return Promise.reject('');
            }
          }
        ]}
      >
        <InputNumber defaultValue={0} min={0} value={0} />
      </Form.Item>
      <Form.Item
        name="final_price"
        label="Giá khuyến mãi"
        rules={[
          {
            required: true,
            message: 'Cần nhập giá khuyến mãi sản phẩm'
          },
          {
            validator: (_rule, value) => {
              if (value || value >= 0) {
                const pasred = Number(value);
                if (pasred >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject('Hãy nhập giá trên 0!');
              }
              return Promise.reject('');
            }
          }
        ]}
      >
        <InputNumber defaultValue={0} min={0} value={0} />
      </Form.Item>
      <Form.Item
        name="stock"
        label="Số lượng"
        rules={[
          {
            required: true,
            message: 'Cần nhập số lượng sản phẩm'
          },
          {
            validator: (_rule, value) => {
              if (value || value >= 0) {
                const pasred = Number(value);
                if (pasred >= 0) {
                  return Promise.resolve();
                }
                return Promise.reject('Hãy nhập số lượng trên 0!');
              }
              return Promise.reject('');
            }
          }
        ]}
      >
        <InputNumber defaultValue={0} min={0} value={0} />
      </Form.Item>
      <div style={{ marginLeft: 120, marginBottom: 50 }}>
        <input
          type="file"
          placeholder="Chon file anh"
          onChange={handleUploadFile}
        />
        {image && <img src={image} alt="" width="400" />}
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editCat ? 'Sửa Danh Mục' : 'Tạo Sản Phẩm'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
