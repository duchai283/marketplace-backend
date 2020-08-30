import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import { config } from 'src/global-config';
import ProductTable from './components/ProductTable';
import { Input } from 'antd';
import ProductForm from './components/ProductForm';

const { Search } = Input;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [addProd, setAddProd] = useState(false);
  const [search, searchProduct] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/products/products`);
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    const getSubCategory = async () => {
      try {
        const res = await fetch(
          `${config.apiUrl}/products/sub-by-category?id=${selectedCat}`
        );
        const data = await res.json();
        setSubCat(data.data);
        console.log('subcat', data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getSubCategory();
  }, [selectedCat]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/products/category`);
        const data = await res.json();
        setCategories(data.data);
        console.log('cat', data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/products/category`);
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getCategory();
  }, []);

  const handleSearch = value => {
    const getProductBySearch = async () => {
      try {
        const res = await fetch(
          `${config.apiUrl}/products/search?title=${value}`
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getProductBySearch();
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 40
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Search
            placeholder="nhập tên sản phẩm cần tìm"
            onSearch={value => handleSearch(value)}
            style={{ width: 600, marginRight: '40px' }}
          />
          <Button
            type="primary"
            block
            onClick={() => {
              setAddProd(!addProd);
            }}
            style={{ marginRight: '15px', display: 'block' }}
          >
            {addProd ? 'Tìm kiếm sản phẩm' : 'Tạo Sản Phẩm'}
          </Button>
        </div>
      </div>
      {addProd ? (
        <ProductForm
          categories={categories}
          addProd={addProd}
          setAddProd={setAddProd}
          subCat={subCat}
          setSelectedCat={setSelectedCat}
          selectedCat={selectedCat}
          setProducts={setProducts}
        />
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default Product;
