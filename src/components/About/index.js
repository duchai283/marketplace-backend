import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const About = () => {
  return (
    <div>
      <h3>Đây là Backend dùng để tương tác với CSDL của MarketPlace</h3>
      <h4>Bao gồm các chức năng:</h4>
      <h5>Danh mục</h5>
      <ul>
        <li>Hiển thị danh mục</li>
        <li>Thêm một danh mục</li>
        <li>Sửa một danh mục</li>
        <li>Xoá một danh mục</li>
        <li>Tìm kiếm một danh mục con</li>
      </ul>
      <h5>Danh mục con</h5>
      <ul>
        <li>Hiển thị danh mục con theo danh mục</li>
        <li>Thêm một danh mục con theo danh mục</li>
        <li>Sửa một danh mục con theo danh mục</li>
        <li>Xoá một danh mục con theo danh mục</li>
        <li>Tìm kiếm danh mục con</li>
      </ul>
      <h5>Sản phẩm</h5>
      <ul>
        <li>Hiển thị sản phẩm theo danh mục & danh mục con</li>
        <li>Thêm một sản phẩm theo danh mục & danh mục con</li>
        <li>Sửa một sản phẩm </li>
        <li>Xoá một sản phẩm </li>
        <li>Tìm kiếm sản phẩm </li>
      </ul>
      <h5>Đơn đặt hàng</h5>
      <ul>
        <li>Hiển thị các đơn đặt hàng</li>
        <li>Sửa một đơn đặt hàng (trạng thái) </li>
        <li>Tìm kiếm đơn đặt hàng</li>
      </ul>
    </div>
  );
};

export default About;
