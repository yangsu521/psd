import Page from '../components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink, 
  TabContent, TabPane, 
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import * as Api from '../services/api'




class AddTypePage extends React.Component {

  constructor() {
    super();
    this.state = {
      tab1Active: "active",
      tab2Active: "",
      activeTab: "1",
      modal: false
    }
  }

  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  updateType = modalType => () => {

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>deptID", this.state.deptId);

    Api.getDept().then(res1 => {
      this.setState({ res1 })
    }).catch(e => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>error", e.message);
    });
    return this.setState({
      modal: !this.state.modal,
    });
  }

  updateTest() {
    // this.props.history.push('/updateType/123')
  }

  saveNewType() {
    let dmTypeRList = this.state.dmTypeRList;
    let dmTypeS = this.state.dmTypeS;
    let requestData = { dmTypeS: dmTypeS, dmTypeRList: dmTypeRList }
    Api.addNewType(requestData).then(res => {
      // data[0].deptName
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>res======", res);
      this.props.history.push('/testreact');
    }).catch(e => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>error", e.message);
    });

  }

  noRefCheck = tabId => () => {
    console.log('noRefCheck')
    if (tabId === '1') {
      return this.setState({
        tab1Active: "active",
        tab2Active: "",
        activeTab: "1",
      });
    } else {
      return this.setState({
        tab1Active: "",
        tab2Active: "active",
        activeTab: "2",
      });
    }

  }

  toTypeList() {
    this.props.history.push('/testreact');
  }



  closeModal() {
    return this.setState({
      modal: !this.state.modal,
    });
  }

  addAttrBut() {

    this.setState({
      nameValue: 'attribute1',
      typeValue: 1,
      sizeValue: 32,
      repeatValue: false
    })

    return this.setState({
      modal: !this.state.modal,
    });
  }

  addDmTypeS() {
    let dmTypeS = {
      attrCount: null,
      iType: null,
      iVstamp: null,
      info: null,
      name: this.state.typeNameValue,
      nextAttrIdentifier: null,
      owner: null,
      rCreationDate: null,
      rIndexAttr: null,
      rModifyDate: null,
      rObjectId: null,
      sIndexAttr: null,
      sharedParentName: null,
      startPos: null,
      superName: null,
      typeCategory: null,
      uniqueTag: null,
      viewsValid: null
    };
    this.setState(
      { dmTypeS }
    )
    return this.setState({
      tab1Active: "",
      tab2Active: "active",
      activeTab: "2",
    });
  }

  addAttr() {
    let dmTypeRList = this.state.dmTypeRList;
    console.log('dmTypeRList>>>>>>>>>>>>>', dmTypeRList)
    let attribute = {
      id: null,
      rObjectId: null,
      attrName: this.state.nameValue,
      attrType: this.state.typeValue,
      attrLength: this.state.sizeValue,
      iPosition: null,
      attrRestriction: null,
      attrRepeating: this.state.repeatValue ? 1 : 0
    };
    console.log('dmTypeRList>>>>>>>>>>>>>attribute', attribute)
    console.log('dmTypeRList>>>>>>>>>>>>>dmTypeRList', dmTypeRList[0])


    dmTypeRList.push(attribute);
    this.setState(
      { dmTypeRList }
    )
    return this.setState({
      modal: !this.state.modal,
    });
  }

  onChangeTypeName = (e) => {
    this.setState({
      typeNameValue: e.target.value
    })
    console.log("typeValue-----", this.state.typeValue)
  }
  onChangeSelect = (e) => {
    this.setState({
      typeValue: e.target.value
    })
    console.log("typeValue-----", this.state.typeValue)
  }
  onChangeName = (e) => {
    this.setState({
      nameValue: e.target.value
    })
    console.log("nameValue-----", this.state.nameValue)
  }
  onChangeSize = (e) => {
    this.setState({
      sizeValue: e.target.value
    })
    console.log("sizeValue-----", this.state.sizeValue)
  }
  onChangeRep = (e) => {
    this.setState({
      repeatValue: e.target.checked
    })
    console.log("repeatValue-----", this.state.repeatValue)
  }



  componentWillMount() {

    let dmTypeS = {};
    let dmTypeRList = [];
    this.setState({ dmTypeS: dmTypeS });
    this.setState({ dmTypeRList: dmTypeRList });
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    let { dmTypeRList = [] } = this.state;
    let { dmTypeS = {} } = this.state;

    return (
      <Page
        title="Type Properties"
        breadcrumbs={[{ name: 'types', active: true }]}
        className="TypesPage"
      >
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={this.state.tab1Active}
                active={false}
                onClick={this.noRefCheck('1')}
              >
                Info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.tab2Active}
                active={false}
                onClick={() => this.addDmTypeS()}
              >
                Attribute
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Card>
                    <CardHeader>New Type	 :</CardHeader>
                    <CardBody>
                      <Form>
                        <FormGroup row>
                          <Label for="exampleEmail" sm={2}>
                            Type Name:
                          </Label>
                          <Col sm={10}>
                            <Input
                              type="text"
                              name="name"
                              onChange={this.onChangeTypeName}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="examplePassword" sm={2}>
                            Super Type Name:
                          </Label>
                          <Col sm={10}>
                            <Input
                              type="text"
                              name="superName"
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label for="typeCategory" sm={2}>Default Storage：</Label>
                          <Col sm={10}>
                            <Input type="select" name="select">
                              <option>NULL</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label for="typeCategory" sm={2}>Default Group：</Label>
                          <Col sm={10}>
                            <Input type="select" name="select">
                              <option>NULL</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label for="typeCategory" sm={2}>Default Permission Set：</Label>
                          <Col sm={10}>
                            <Input type="select" name="select">
                              <option>NULL</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </Col>
                        </FormGroup>

                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Row>
                        <Col sm={10}></Col>
                        <Col sm={2}>
                          <Button color="primary" onClick={() => this.addDmTypeS()}>
                            Next
                          </Button>{' '}
                          <Button color="secondary" onClick={() => this.toTypeList()}>
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </CardFooter>
                  </Card>


                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
                  <Card className="mb-3">
                    <CardHeader>New Type	 :</CardHeader>
                    <CardHeader>
                      <Button color="primary" onClick={() => this.addAttrBut()}>Add</Button>
                      <Modal
                        size="lg"
                        isOpen={this.state.modal}
                        toggle={this.toggle()}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle()}>Attribute Info : New Attribute</ModalHeader>
                        <ModalBody>
                          <Form>
                            <FormGroup row>
                              <Label for="exampleEmail" sm={5}>
                                *Attribute Name :
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="text"
                                  name="attribute"
                                  placeholder="attribute"
                                  onChange={this.onChangeName}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="typeCategory" sm={5}>Type :	</Label>
                              <Col sm={7}>
                                <Input type="select" name="select" onChange={this.onChangeSelect}>
                                  <option value={0}>Boolean</option>
                                  <option value={1} selected>String</option>
                                  <option value={2}>Integer</option>
                                  <option value={3}>ID</option>
                                  <option value={4}>Time</option>
                                  <option value={5}>Double</option>
                                </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="exampleEmail" sm={5}>
                                Size :
                              </Label>
                              <Col sm={7}>
                                <Input
                                  type="number"
                                  name="size"
                                  placeholder="32"
                                  onChange={this.onChangeSize}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="checkbox2" sm={5}>

                              </Label>
                              <Col sm={7}>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" onChange={this.onChangeRep} />Repeating
                                  </Label>
                                </FormGroup>
                              </Col>
                            </FormGroup>
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={() => this.addAttr()}>
                            OK
                          </Button>{' '}
                          <Button color="secondary" onClick={() => this.closeModal()}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Inherited</th>
                            <th>Repeat</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dmTypeRList.map(({ id, attrName, attrType, attrLength, attrRepeating }) => {
                            return (<tr key={id}>
                              <td>{attrName}</td>
                              <td>{attrType}</td>
                              <td>{attrLength}</td>
                              <td>No</td>
                              <td>{attrRepeating == 1 ? 'YES' : 'NO'}</td>
                              <td><Button color="primary" onClick={() => this.updateTest()}>Edit</Button>
                                <Button color="secondary" onClick={() => this.delDept({ id })}>Remove</Button></td>
                            </tr>)
                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                    <CardFooter>
                      <Row>
                        <Col sm={9}></Col>
                        <Col sm={3}>
                          <Button color="primary" onClick={this.noRefCheck('1')}>
                            Previous
                          </Button>{' '}
                          <Button color="primary" onClick={() => this.saveNewType()}>
                            Finish
                          </Button>{' '}
                          <Button color="secondary" onClick={() => this.toTypeList()}>
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>



      </Page>
    );
  };
}
export default AddTypePage;
