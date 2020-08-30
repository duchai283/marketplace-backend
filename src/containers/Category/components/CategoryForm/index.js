import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Radio, message } from 'antd';
import { config } from 'src/global-config';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 0 }
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 8 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 0,
      offset: 0
    },
    sm: {
      span: 0,
      offset: 0
    }
  }
};

const CategoryForm = ({ setAddCat, setCategories, editCat, setEditCat }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    if (editCat) {
      putCategory(values);
    } else {
      postCategory(values);
    }
  };

  useEffect(() => {
    if (editCat) {
      form.setFieldsValue({
        cat_name: editCat.category_name
      });
    }
  }, [editCat]);

  const putCategory = async values => {
    const obj = {
      _id: editCat._id,
      category_name: values.cat_name
    };

    const res = await fetch(`${config.apiUrl}/products/category`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    const data = await res.json();
    if (data.data && data.data.category_name) {
      setEditCat(null);
      setAddCat(false);
      message.success('Bạn Đã Sửa Thành Công Danh Mục');
      try {
        const resCat = await fetch(`${config.apiUrl}/products/category`);
        const dataCat = await resCat.json();
        setCategories(dataCat.data);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      message.error('Không Sửa Được Danh Mục Vui Lòng Thử Lại Sau');
    }
  };
  const postCategory = async values => {
    const obj = {
      category_name: values.cat_name
    };

    const res = await fetch(`${config.apiUrl}/products/create-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    const data = await res.json();
    if (data.message) {
      setAddCat(false);
      message.success(
        'Bạn Đã Tạo Thành Công Danh Mục Mới Tên Là: ' + values.category_name
      );
      try {
        const resCat = await fetch(`${config.apiUrl}/products/category`);
        const dataCat = await resCat.json();
        setCategories(dataCat.data);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      message.error('Không Tạo Danh Mục Vui Lòng Thử Lại Sau');
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '84'
      }}
      scrollToFirstError
    >
      <h2>{editCat ? 'Sửa Danh Mục' : 'Tạo Danh Mục'}</h2>
      <Form.Item
        name="cat_name"
        label="Tên Danh Mục"
        rules={[
          {
            required: true,
            message: 'Cần nhập tên danh mục'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {editCat ? 'Sửa Danh Mục' : 'Tạo Danh Mục'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
