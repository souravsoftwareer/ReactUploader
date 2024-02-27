import logo from './logo.svg';
import './App.css';
import {
  Col, Row, Upload
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const beforeUpload = (file, fileList) => {
    if (fileList.includes(file.name)) {
      console.log(`${file.name} is disabled.`);
      return false; // Disable the file
    }
    return true; // Enable other files
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  console.log("file list", fileList)
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );


  return (

    <>
      <Row style={{ margin: 15 }}>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          // fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple
          // beforeUpload={beforeUpload}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </Row>
      <Row gutter={0}>
        {fileList.map((item) => {
          
          return (

            <Col md={3} lg={3} sm={24} xs={24} style={{ margin: 15 }}>
              <img
                alt="example"
                style={{ borderRadius: 5, objectFit: 'contain', width: '100%' }}
                src={item.thumbUrl}
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
