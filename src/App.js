import logo from './logo.svg';
import './App.css';
import {
  Col, Row, Button
} from 'antd'
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function App() {

  const [fileList, setFileList] = useState([])



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList(files);
  };

  const uploadFiles=()=>{
    if(fileList.length == 0) {
      alert("No files choosen to upload !!!!")
      return
    }
  }
  
  const clearFiles=()=>{
    alert("Files are cleared !!")
  }


  return (

    <>
      <Row style={{ margin: 15 }}>
        <Col md={24} sm={24} xs={24} lg={24}>
          <div className={'d-flex flex-row'}>
            <input type="file" multiple onChange={handleFileChange} />
            <Button type="primary" onClick={() => uploadFiles()}>Upload</Button>
            <Button type="primary" danger onClick={() => clearFiles()} style={{ marginLeft:10 }}>Clear Data</Button>
          </div>
        </Col>
      </Row>
      <Row gutter={0}>
        {fileList.map((item, index) => {

          return (

            <Col md={3} lg={3} sm={24} xs={24} style={{ margin: 15 }}>
              <img
                alt="example"
                style={{ borderRadius: 5, objectFit: 'cover', height: 200, width: '100%' }}
                src={URL.createObjectURL(item)} alt={`file-${index}`}
              />
              <p>Upload Status</p>
            </Col>

          )
        })}
      </Row>


    </>
  );
}

export default App;