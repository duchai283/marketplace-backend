import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import { config } from 'src/global-config';
import CategoryTable from './components/CategoryTable';
import CategoryForm from './components/CategoryForm';
import SubCategoryTable from './components/SubCategoryTable';
import SubCategoryForm from './components/SubCategoryForm';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [addCat, setAddCat] = useState(true);
  const [addSubCat, setAddSubCat] = useState(false);
  const [editCat, setEditCat] = useState(null);
  const [editSubCat, setEditSubCat] = useState(null);

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

  useEffect(() => {
    const getSubCategory = async () => {
      try {
        const res = await fetch(
          `${config.apiUrl}/products/sub-by-category?id=${selectedCat}`
        );
        const data = await res.json();
        setSubCat(data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getSubCategory();
  }, [selectedCat]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 40
        }}
      >
        <div style={{ display: 'flex' }}>
          <Button
            type="primary"
            block
            onClick={() => {
              setAddCat(true);
              setAddSubCat(false);
              setEditCat(null);
            }}
            style={{ marginRight: '15px' }}
          >
            Tạo danh mục
          </Button>

          <Button
            type="primary"
            block
            onClick={() => {
              setAddCat(false);
              setAddSubCat(true);
            }}
          >
            Tạo danh mục con
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CategoryTable
          setEditCat={setEditCat}
          setCategories={setCategories}
          categories={categories}
          setSelectedCat={setSelectedCat}
          setAddCat={setAddCat}
        />
        <SubCategoryTable
          subCat={subCat}
          setSubCat={setSubCat}
          setAddCat={setAddCat}
          setAddSubCat={setAddSubCat}
          editSubCat={editSubCat}
          setEditSubCat={setEditSubCat}
        />
      </div>

      {addCat ? (
        <CategoryForm
          editCat={editCat}
          setEditCat={setEditCat}
          categories={categories}
          setCategories={setCategories}
          setAddCat={setAddCat}
        />
      ) : null}
      {addSubCat ? (
        <SubCategoryForm
          subCat={subCat}
          setSubCat={setSubCat}
          categories={categories}
          setAddSubCat={setAddSubCat}
          editSubCat={editSubCat}
          setEditSubCat={setEditSubCat}
        />
      ) : null}
    </div>
  );
};

export default Category;
