import logo from './logo.svg';
import './App.css';
import {
  Col, Row,Card,Meta,Layout
} from 'antd'
function App() {
  return (
    <Layout  className={'m-2 mt-4'}>
      <Row gutter={[16, 16]}>
        <Col md={6}  lg={6} sm={24} xs={24}>
          <Card
            hoverable
            
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col md={6}  lg={6} sm={24} xs={24}>
          <Card
            hoverable
           
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>


      </Row>
    </Layout>
  );
}

export default App;
