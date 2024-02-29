import logo from './logo.svg';
import './App.css';
import {
  Col, Row, Button
} from 'antd'
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { getApi } from './utils/AxiosApi';
import { BASE_URL, IMAGE_URL } from './utils/urls';
import NoImage from './assets/nopicture.png'

function App() {

  const [fileList, setFileList] = useState([])
  const [dbFiles, setDbFiles] = useState([])



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList(files);
    files.forEach((ite) => {
      dbFiles.push({ status: "Not Started", file: ite })
    })
    setDbFiles([...dbFiles])
  };

  const uploadFiles = async () => {
    if (fileList.length == 0) {
      alert("No files choosen to upload !!!!")
      return
    }

    try {
      const formData = new FormData();

      // Append each file to the FormData object
      fileList.forEach((filePath, index) => {

        formData.append(`uploader`, filePath);
      });
      let config = {
        method: "post",
        data: formData,
        url: BASE_URL + "users/uploadFiles"
      }
      let response = await getApi(config)
      let responseData = response.data
      console.log("response data ", responseData)
      for (let i = 0; i < dbFiles.length; i++) {
        let dbFile = dbFiles[i]
        if (dbFile.file) {
          dbFile.status = 'uploading'
        }
      }
      setDbFiles([...dbFiles])


    } catch (err) {
      console.log("err ", err)

    }

  }

  const clearFiles = async () => {
    // alert("Files are cleared !!")
    try {
      let config = {
        method: "delete",
        url: BASE_URL + "users/uploadFiles"
      }
      await getApi(config)

      setDbFiles([])

    } catch (err) {
      console.log("err ", err)
      setDbFiles([])
    }
  }

  useEffect(() => {
    getAllFiles()
  }, [])

  const getAllFiles = async () => {
    try {
      let config = {
        method: "get",
        url: BASE_URL + "users/uploadFiles"
      }
      let response = await getApi(config)
      let responseData = response.data
      let files = responseData?.data ?? []
      setDbFiles([...files])
      console.log("app response ", responseData)
    } catch (err) {
      console.log("err ", err)
    }
  }

  const renderImage = (item,index) => {
    if (item.file) {
      return (
        <img
          alt="example"
          style={{ borderRadius: 5, objectFit: 'cover', height: 200, width: '100%' }}
          src={URL.createObjectURL(item.file)}
          // src={URL.createObjectURL(item)}

          alt={`file-${index}`}
        />
      )
    }
    else if (item.media != "") {
      return (
        <img
          alt="example"
          style={{ borderRadius: 5, objectFit: 'cover', height: 200, width: '100%' }}
          src={IMAGE_URL + item.media}
          // src={URL.createObjectURL(item)}

          alt={`file-${index}`}
        />
      )
    } else{
      return (
        <img
          alt="example"
          style={{ borderRadius: 5, objectFit: 'cover', height: 200, width: '100%' }}
          src={NoImage}
          // src={URL.createObjectURL(item)}

          alt={`file-${index}`}
        />
      )
    }
  }

  return (

    <>
      <Row style={{ margin: 15 }}>
        <Col md={24} sm={24} xs={24} lg={24}>
          <div className={'d-flex flex-row'}>
            <input type="file" multiple onChange={handleFileChange} />
            <Button type="primary" onClick={() => uploadFiles()}>Upload</Button>
            <Button type="primary" onClick={() => getAllFiles()} style={{ marginLeft: 10 }}>Refresh</Button>
            <Button type="primary" danger onClick={() => clearFiles()} style={{ marginLeft: 10 }}>Clear Data</Button>
          </div>
        </Col>
      </Row>
      <Row gutter={0}>
        {dbFiles.map((item, index) => {

          return (

            <Col md={3} lg={3} sm={24} xs={24} style={{ margin: 15 }}>

              {renderImage(item,index)}
              <p>Upload Status : {item.status}</p>
            </Col>

          )
        })}
      </Row>


    </>
  );
}

export default App;