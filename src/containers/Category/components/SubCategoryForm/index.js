import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Radio, message } from 'antd';
import { config } from 'src/global-config';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 3 }
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

const SubCategoryForm = ({
  setAddSubCat,
  categories,
  editSubCat,
  setEditSubCat,
  subCat,
  setSubCat
}) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    if (editSubCat) {
      putSubCategory(values);
    } else {
      postSubCat(values);
    }
  };
  const putSubCategory = async values => {
    const obj = {
      _id: editSubCat._id,
      subcategory_name: values.subcategory_name
    };

    const res = await fetch(`${config.apiUrl}/products/sub-category`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    const data = await res.json();
    if (data.data && data.data.subcategory_name) {
      setAddSubCat(false);
      setEditSubCat(null);
      const newData = subCat.map(sub => {
        if (sub._id === data.data._id) {
          sub.subcategory_name = values.subcategory_name;
        }
        return sub;
      });
      console.log('newData', newData);
      setSubCat(newData);
      message.success('Bạn Đã Sửa Thành Công Danh Mục Con');
    } else {
      message.error('Không Sửa Được Danh Mục Con Vui Lòng Thử Lại Sau');
    }
  };

  const postSubCat = async values => {
    const obj = {
      category_id: values.cat_id,
      subcategory_name: values.subcategory_name
    };

    const res = await fetch(`${config.apiUrl}/products/create-sub-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    const data = await res.json();
    if (data.message) {
      setAddSubCat(false);
      message.success(
        'Bạn Đã Tạo Thành Công Danh Mục Con Mới Tên Là: ' +
          values.subcategory_name
      );
    } else {
      message.error('Không Tạo Được Danh Mục Vui Lòng Thử Lại Sau');
    }
    form.resetFields();
  };

  useEffect(() => {
    if (editSubCat) {
      const cat = categories.find(item => item._id === editSubCat.category_id);
      if (cat) {
        form.setFieldsValue({
          subcategory_name: editSubCat.subcategory_name,
          cat_id: cat.category_name
        });
      }
    }
  }, [editSubCat]);
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
      <h2>{editSubCat ? 'Sửa Danh Mục Con' : 'Tạo Danh Mục Con'}</h2>
      <Form.Item
        label="Chọn Danh Mục"
        name="cat_id"
        rules={[
          {
            required: true,
            message: 'Cần chọn danh mục'
          }
        ]}
      >
        <Select disabled={editSubCat ? true : false}>
          {categories.map(cat => (
            <Option value={cat._id}>{cat.category_name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="subcategory_name"
        label="Tên Danh Mục Con"
        rules={[
          {
            required: true,
            message: 'Cần nhập tên danh mục con'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {editSubCat ? 'Sửa Danh Mục Con' : 'Tạo Danh Mục Con'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubCategoryForm;
