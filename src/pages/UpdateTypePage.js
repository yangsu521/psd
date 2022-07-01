import Page from '../components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, CardTitle, CardText,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  CardFooter,
} from 'reactstrap';

import * as Api from '../services/api'




class UpdateTypePage extends React.Component {

  constructor() {
    super();
    this.state = {
      tab1Active: "active",
      tab2Active: "",
      activeTab: "1",
      modal: false,
      modal_modify: false
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

  toggle_modify = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal_modify,
      });
    }

  };

  closeModal() {
    return this.setState({
      modal: !this.state.modal,
    });
  }

  closeModal_modify() {
    return this.setState({
      modal_modify: !this.state.modal_modify,
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

  updateType = modalType => () => {

    this.setState({
      nameValue: '',
      typeValue: 1,
      sizeValue: 32,
      repeatValue: false
    })

    return this.setState({
      modal: !this.state.modal,
    });
  }

  updateTest() {
    this.props.history.push('/updateType/123')
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

  modifyAttrBut = (index) => {
    let dmTypeRList = this.state.dmTypeRList;
    console.log('dmTypeRList>>>>>>>>>>>>>', dmTypeRList)
    console.log('dmTypeRList>>>>>>>>>>>>>dmTypeRList[index]', index.index)

    this.setState({
      modifyIndex: index.index,
      modifyName: dmTypeRList[index.index].attrName,
      modifyType: dmTypeRList[index.index].attrType,
      modifySizeValue: dmTypeRList[index.index].attrLength,
      modifyRepeat: dmTypeRList[index.index].attrRepeating
    })

    this.setState({
      modal_modify: !this.state.modal_modify,
    });
  }

  getAttrType = (type) => {
    console.log('type---', typeof (type))
    let t = type + '';
    switch (t) {
      case '0':
        return 'Boolean';
      case '1':
        return 'String';
      case '2':
        return 'Integer';
      case '3':
        return 'ID';
      case '4':
        return 'Time';
      case '5':
        return 'Double';
      default:
        return '';

    }
  }
  modifyAttr() {
    let dmTypeRList = this.state.dmTypeRList;
    let index = this.state.modifyIndex;
    console.log('dmTypeRList>>>>>>>>>>>>>', dmTypeRList)
    console.log('dmTypeRList>>>>>>>>>>>>>dmTypeRList', dmTypeRList[0])
    dmTypeRList[index].attrLength = this.state.modifySizeValue;
    this.setState(
      {
        dmTypeRList,
        modal_modify: !this.state.modal_modify
      })
  }

  delAttr = index => () => {
    let dmTypeRList = this.state.dmTypeRList;
    console.log('delAttr>>>>>>>>>>>>>', dmTypeRList[index]);
    dmTypeRList.splice(index);
    this.setState(
      {
        dmTypeRList
      })
  }



  saveType() {
    let dmTypeRList = this.state.dmTypeRList;
    let dmTypeS = this.state.dmTypeS;
    let requestData = { dmTypeS: dmTypeS, dmTypeRList: dmTypeRList }
    Api.updateType(requestData).then(res => {
      // data[0].deptName
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>res======", res);
      this.props.history.push('/testreact');
    }).catch(e => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>error", e.message);
    });


    // let res = this.state.res;
    // console.log('saveType---------------', res)
    // res.push({ deptId: 208, deptName: '长沙分公司test' });
    // res.find(i => { return i.deptId == '101' }).deptName = "深圳总公司1"
    // console.log('res.find---------------', res.find(i => { return i.deptId == '101' }))
    // this.setState(
    //   { res }
    // )

    // return this.setState({
    //   modal: !this.state.modal,
    // });
  }

  toTypeList() {
    this.props.history.push('/testreact');
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
  onChangeModifySize = (e) => {
    this.setState({
      modifySizeValue: e.target.value
    })
  }




  componentWillMount() {
    console.log('this.props.location.search=====', this.props.location.search)
    let requestData = { id: this.props.match.params.deptId };

    Api.getTypeDtoByObjectId(requestData).then(typeDto => {
      // data[0].deptName
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>typeDto.dmTypeS", typeDto.dmTypeS);
      this.setState({ dmTypeS: typeDto.dmTypeS });
      this.setState({ dmTypeRList: typeDto.dmTypeRList });
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>state", this.state.dmTypeS.name);
    }).catch(e => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>error", e.message);
    });
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    let { dmTypeRList = [] } = this.state;
    let { dmTypeS = {} } = this.state;
    console.log('this.state.dmTypeS=====', this.state.dmTypeS);
    console.log('this.state.dmTypeS=====', dmTypeS);
    console.log('this.props.match.params.id=====', this.props.match.params.deptId);

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
                onClick={this.noRefCheck('2')}
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
                    <CardHeader>Type	 :	{dmTypeS.name}</CardHeader>
                    <CardBody>
                      <Form>
                        <FormGroup row>
                          <Label for="exampleEmail" sm={2}>
                            Type Name:
                          </Label>
                          <Col sm={10}>
                            <Input
                              plaintext
                              value={dmTypeS.name}
                              readOnly
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="examplePassword" sm={2}>
                            Super Type Name:
                          </Label>
                          <Col sm={10}>
                            <Input
                              plaintext
                              value={dmTypeS.superName}
                              readOnly
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label for="typeCategory" sm={2}>Default Storage：</Label>
                          <Col sm={10}>
                            <Input type="select" name="select">
                              <option>NULL</option>
                              <option value={1}>1</option>
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
                      <CardFooter>
                        <Row>
                          <Col sm={10}></Col>
                          <Col sm={2}>
                            <Button color="primary" onClick={() => this.saveType()}>
                              OK
                            </Button>{' '}
                            <Button color="secondary" onClick={() => this.toTypeList()}>
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                      </CardFooter>
                    </CardBody>
                  </Card>


                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
                  <Card className="mb-3">
                    <CardHeader>Type	 :	{dmTypeS.name}</CardHeader>
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
                      <Modal
                        size="lg"
                        isOpen={this.state.modal_modify}
                        toggle={this.toggle('modify')}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle('modify')}>Attribute Info : </ModalHeader>
                        <ModalBody>
                          <Form>
                            <FormGroup row>
                              <Label for="exampleEmail" sm={5}>
                                *Attribute Name :
                              </Label>
                              <Col sm={7}>
                                <Input
                                  plaintext
                                  value={this.state.modifyName}
                                  readOnly
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="typeCategory" sm={5}>Type :	</Label>
                              <Col sm={7}>
                                <Input type="select" name="select" disabled>
                                  <option value={0} selected={this.state.modifyType == 0}>Boolean</option>
                                  <option value={1} selected={this.state.modifyType == 1}>String</option>
                                  <option value={2} selected={this.state.modifyType == 2}>Integer</option>
                                  <option value={3} selected={this.state.modifyType == 3}>ID</option>
                                  <option value={4} selected={this.state.modifyType == 4}>Time</option>
                                  <option value={5} selected={this.state.modifyType == 5}>Double</option>
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
                                  value={this.state.modifySizeValue}
                                  onChange={this.onChangeModifySize}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="checkbox2" sm={5}>

                              </Label>
                              <Col sm={7}>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" disabled checked={this.state.modifyRepeat == 1 ? true : false} />Repeating
                                  </Label>
                                </FormGroup>
                              </Col>
                            </FormGroup>
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={() => this.modifyAttr()}>
                            OK
                          </Button>{' '}
                          <Button color="secondary" onClick={() => this.closeModal_modify()}>
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
                          {dmTypeRList.map((item, index) => {
                            return (<tr key={index}>
                              <td>{item.attrName}</td>
                              <td>{this.getAttrType(item.attrType)}</td>
                              <td>{item.attrLength}</td>
                              <td>No</td>
                              <td>{item.attrRepeating == 1 ? 'YES' : 'NO'}</td>
                              <td><Button color="primary" onClick={() => this.modifyAttrBut({ index })}>Edit</Button>
                                <Button color="secondary" onClick={this.delAttr(index)}>Remove</Button></td>
                            </tr>)
                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                    <CardFooter>
                      <Row>
                        <Col sm={10}></Col>
                        <Col sm={2}>
                          <Button color="primary" onClick={() => this.saveType()}>
                            OK
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
export default UpdateTypePage;
