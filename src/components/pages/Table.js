import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIDataTable from "mui-datatables"
import InlineEditing from '../../modules/forms/InlineEditing'




var ct = require("../../modules/custom/customTable")

const reporturl = "http://localhost:8089/api/report/siswa";

const date = new Date();
const month = String(date.getMonth());
const year = date.getFullYear();

class Pages extends Component {

  constructor(props) {
    super(props)


    let bulan = '';
    if (month.length < 2) bulan = '0' + (Number(month) + 1);
    let first = function (y, m) {
      return new Date(y, m, 1).getDate();
    }
    let last = function (y, m) {
      return new Date(y, m + 1, 0).getDate();
    }
    let firstDay = '0' + String(first(Number(year), Number(month)));
    let lastDay = last(Number(year), Number(month));
    let tanggalAwal = firstDay + bulan + year;
    let tanggalAkhir = lastDay + bulan + year;

    this.state = {
      clEditAble: '',
      editAble: false,
      createClass: 'app-popup',
      // deleteClass: 'app-popup',
      tanggalAkhir,
      tanggalAwal,
      siswas: []
    }
    this.remove = this.remove.bind(this);

  }
  componentDidMount() {

    fetch('api/v1/siswas')
      .then(response => response.json())
      .then(data => this.setState({ siswas: data }));

  }
  async remove(id) {
    await fetch(`/api/v1/siswas/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedSiswa = [...this.state.siswas].filter(i => i.id !== id);
      this.setState({siswas: updatedSiswa});
    });
      // .then((response) => response.json())
      // .then((responseJson) => {
      //   console.log('User :', responseJson);
      //   this.setState({ deleteClass: 'app-popup' })
      //   .then(() => {
      //     let updatedSiswa = [...this.state.siswa].filter(i => i.id !== id);
      //     this.setState({siswa: updatedSiswa});})
      // });

  }

  opEditAble = () => {
    if (this.state.editAble === false) {
      this.setState({
        clEditAble: 'edit-able',
        editAble: true,
      })
    } else {
      this.setState({
        clEditAble: '',
        editAble: false,
      })
    }
  }

  openCreateForm = () => {
    if (this.state.createClass === 'app-popup app-popup-show') {
      this.setState({ createClass: 'app-popup' })
    } else {
      this.setState({ createClass: 'app-popup app-popup-show' })
    }
  }

  opDeleteAble = () => {
    alert('delete');
  }



  // getMuiTheme = () => createMuiTheme(ct.customTable());

  options = ct.customOptions()

  // columns = [
  //   "Id Siswa",
  //   "Nama Siswa",
  //   {
  //     name: "Action",
  //     options: {
  //       customBodyRender: () => {
  //         return (
  //           <div>
  //             <button
  //               className="btn btn-red btn-small-circle"
  //               onClick={this.opDeleteAble}>
  //               <i className="fa fa-lw fa-trash-alt" />
  //             </button>
  //           </div>
  //         )
  //       }
  //     }
  //   }
  // ]

  render() {
    // const data = this.state.siswas.map(
    //   siswa => [
    //     [
    //       siswa.id
    //     ],
    //     [
    //       <InlineEditing
    //         text={siswa.namaSiswa}
    //         api={'https://localhost:8080/api/v1/siswas'} />
    //     ]
    //  ])

    return (
      <div className="main-content">

        <div className="padding-15px grid grid-2x">
          <div className="col-1">
            <div className="txt-site txt-18 txt-bold txt-main padding-top-5px">
              Table Siswa
            </div>
          </div>
          <div className="col-2 content-right">
            {/* <button className="btn btn-blue" onClick={this.openCreateForm}>
              <i className='fa fa-1x fa-plus'></i>
            </button> */}
            <Button className="btn btn-blue margin-left-10px" tag={Link} to="/siswas/new"><i className='fa fa-1x fa-plus'></i></Button>
            <a rel="noopener noreferrer" target="_blank" href={reporturl}>
              <button className="btn btn-blue margin-left-10px">
                Get Report
              </button>
            </a>
          </div>
        </div>

        {/* <div className="padding-5px">

          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"List Siswa"}
              data={data}
              columns={this.columns}
              options={this.options}
            />
          </MuiThemeProvider>

        </div> */}

        <div className="padding-5px">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nama Siswa</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.siswas.map(
                  siswa =>
                    <tr key={siswa.id}>
                      <td>{siswa.id}</td>
                      <td>{siswa.namaSiswa}</td>
                      <td>
                        <ButtonGroup>
                          <Button size="sm" color="primary" tag={Link} to={"/siswas/" + siswa.id}>Edit</Button>
                          <Button size="sm" color="danger" onClick={() => this.remove(siswa.id)}>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </div>

        {/* <div className={this.state.deleteClass}>
          <div className="padding-top-20px"></div>
          <div className="popup-content background-white border-radius">
            <div className="padding-15px background-blue grid grid-2x">
              <div className="col-1">
                <div className="txt-site txt-12 txt-bold post-center">
                  <h2>Delted</h2>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className={this.state.createClass}>
          <div className="padding-top-20px"></div>
          <div className="popup-content background-white border-radius">
            <div className="padding-15px background-blue grid grid-2x">
              <div className="col-1">
                <div className="txt-site txt-12 txt-bold post-center">
                  Form
                        </div>
              </div>
              <div className="col-2 content-right">
                <button className="btn btn-circle background-blue" onClick={this.openCreateForm}>
                  <i className="fa fa-lg fa-times"></i>
                </button>
              </div>
            </div>
            <form action="#">
              <div className="border-bottom padding-15px grid grid-2x grid-mobile-none gap-20px">
                <div className="column-1">
                  <div className="margin-bottom-15px">
                    <div className="margin-5px">
                      <span className="txt-site txt-11 txt-main txt-bold">
                        Field
                              </span>
                    </div>
                    <input
                      type="text"
                      className="txt txt-sekunder-color"
                      placeholder=""
                      required></input>
                  </div>

                  <div className="margin-bottom-15px">
                    <div className="margin-5px">
                      <span className="txt-site txt-11 txt-main txt-bold">
                        Number
                              </span>
                    </div>
                    <input
                      type="number"
                      className="txt txt-sekunder-color"
                      placeholder=""
                      required></input>
                  </div>

                  <div className="margin-bottom-15px">
                    <div className="margin-5px">
                      <span className="txt-site txt-11 txt-main txt-bold">
                        Document Date
                              </span>
                    </div>
                    <input
                      type="date"
                      className="txt txt-sekunder-color"
                      placeholder=""
                      required></input>
                  </div>
                </div>
                <div className="column-2">
                  <div className="margin-bottom-15px">
                    <div className="margin-5px">
                      <span className="txt-site txt-11 txt-main txt-bold">
                        Name
                              </span>
                    </div>
                    <input
                      type="text"
                      className="txt txt-sekunder-color"
                      placeholder=""
                      required></input>
                  </div>
                  <div className="margin-bottom-15px">
                    <div className="margin-5px">
                      <span className="txt-site txt-11 txt-main txt-bold">
                        Quantity
                              </span>
                    </div>
                    <input
                      type="number"
                      className="txt txt-sekunder-color"
                      placeholder=""
                      required></input>
                  </div>
                </div>
              </div>
              <div className="padding-15px">
                <div className="grid grid-2x">
                  <div className="col-1"></div>
                  <div className="col-2 content-right">
                    <button
                      style={{ marginLeft: "15px" }}
                      className="btn btn-primary"
                      type="button"
                      onClick={this.openCreateForm}>
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

          </div>

          <div className="padding-bottom-20px"></div>

        </div> */}

      </div>
    )
  }

}

export default Pages