import logo from './logo.svg';
import './App.css';
import {
  Col, Row,Card,Meta,Layout
} from 'antd'
function App() {
  return (
    // <Layout  className={'mt-4'}>
      <Row >
        <Col md={6}  lg={6} sm={24} xs={24}>
         <img alt="example" style={{ width:100,height:100 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
         <p>Status</p>
        </Col>
        <Col md={6}  lg={6} sm={24} xs={24}>
        <img alt="example" style={{ width:100,height:100 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
         <p>Status</p>
        </Col>


      </Row>
    // </Layout>
  );
}

export default App;
