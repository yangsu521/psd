
import React from 'react';


import {
  Button,
  CardHeader,
  CardContent, 
  Card,
  Table ,
  TableBody,
  TableCell,
  TableContainer ,
  TableHead ,
  TableRow, 
  Paper   
} from '@material-ui/core';

import * as Api from '../services/api'




class TypesPage extends React.Component {

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

  updateType = objectId => () => {
    console.log('/updateType/' + objectId.rObjectId)
    let path = '/updateType/' + objectId.rObjectId;
    this.props.history.push(path);
  }

  deleteType = objectId => () => {
    console.log('deleteType----------------' + objectId.rObjectId)
    let requestData = { id: objectId.rObjectId };
    Api.deleteType(requestData).then(res => {
      // data[0].deptName
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>res", res);
      Api.getAllDmTypeS().then(dmTypeSList => {
        // data[0].deptName
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>res", dmTypeSList);
        this.setState({ dmTypeSList })
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>state", this.state.depts);
      }).catch(e => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>error", e.message);
      });

    }).catch(e => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>error", e.message);
    });

  }

  toAddTypePage() {
    this.props.history.push('/addType')
  }

  saveType() {
    let res = this.state.res;
    console.log('saveType---------------', res)
    res.push({ deptId: 208, deptName: '长沙分公司test' });
    res.find(i => { return i.deptId == '101' }).deptName = "深圳总公司1"
    console.log('res.find---------------', res.find(i => { return i.deptId == '101' }))
    this.setState(
      { res }
    )

    return this.setState({
      modal: !this.state.modal,
    });
  }





  componentWillMount() {
    console.log('this.props.location.search=====', this.props.location.search)
    Api.getAllDmTypeS().then(dmTypeSList => {
      // data[0].deptName
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>res", dmTypeSList);
      this.setState({ dmTypeSList })
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>state", this.state.depts);
    }).catch(e => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>error", e.message);
    });
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    // this.setState({
    //   count: this.state.count + 1
    // })
  }



  render() {
    let { dmTypeSList = [] } = this.state;
    let { res1 = [] } = this.state;
    console.log('this.props.match.params.id=====', this.props.match.params.deptId);

    return (

        <div>

       


            <Card className="mb-3">
              <CardHeader>
                <Button variant="contained" color="primary" onClick={() => this.toAddTypePage()}>新增</Button>

              </CardHeader>
              <CardContent>
                <TableContainer >
                  <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Super Type</TableCell>
                      <TableCell align="left">操作</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dmTypeSList.map(({ rObjectId, name, superName }) => (
                      <TableRow key={rObjectId}>
                        <TableCell component="th" scope="row">
                          
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{superName}</TableCell>
                        <TableCell align="left"><Button variant="contained" color="primary" onClick={this.updateType({ rObjectId })}>修改</Button>
                          <Button variant="contained" color="secondary" onClick={this.deleteType({ rObjectId })}>删除</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </TableContainer>
                {/* <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Super Type</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dmTypeSList.map(({ rObjectId, name, superName }) => {
                      return (<tr key={rObjectId}>
                        <td>#</td>
                        <td>{name}</td>
                        <td>{superName}</td>
                        <td><Button color="primary" onClick={this.updateType({ rObjectId })}>修改</Button>
                          <Button color="secondary" onClick={this.deleteType({ rObjectId })}>删除</Button></td>
                      </tr>)
                    })}
                  </tbody>
                </Table> */}
              </CardContent>
            </Card>
            </div>
      
    );
  };
}
export default TypesPage;
