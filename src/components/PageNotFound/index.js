import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
const PageNotFound = () => {
  const history = useHistory();

  const handleBackHome = () => {
    history.push('/');
  };
  return (
    <Result
      status="404"
      title="404 Page Not Found"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default PageNotFound;
