import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIDataTable from "mui-datatables"
import InlineEditing from '../../modules/forms/InlineEditing'




var ct = require("../../modules/custom/customTable")

const reporturl = "http://localhost:8089/api/report/kelas";

const date = new Date();
const month = String(date.getMonth());
const year = date.getFullYear();

class Home extends Component {

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
      tanggalAkhir,
      tanggalAwal,
      kelass: []
    }
    this.remove = this.remove.bind(this);

  }
  componentDidMount() {

    fetch('api/v1/kelass')
      .then(response => response.json())
      .then(data => this.setState({ kelass: data }));

  }

  async remove(id) {
    fetch('/api/v1/kelass/'+{id}, {
      method: 'DELETE'
     
    })
    .then(() => {
      let updatedKelas = [...this.state.kelass].filter(i => i.id !== id);
      this.setState({ kelass: updatedKelas });
    });
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
  //   "Id Kelas",
  //   "Nama Kelas",
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
    // const data = this.state.kelass.map(
    //   kelas => [
    //     [
    //       kelas.id
    //     ],
    //     [
    //       <InlineEditing
    //         text={kelas.namaKelas}
    //         api={'https://localhost:8080/api/v1/kelass'} />
    //     ]
    //  ])

    return (
      <div className="main-content">

        <div className="padding-15px grid grid-2x">
          <div className="col-1">
            <div className="txt-site txt-18 txt-bold txt-main padding-top-5px">
              Table Kelas
            </div>
          </div>
          <div className="col-2 content-right">
            {/* <button className="btn btn-blue" onClick={this.openCreateForm}>
              <i className='fa fa-1x fa-plus'></i>
            </button> */}
            <Button className="btn btn-blue" tag={Link} to="/kelass/new"><i className='fa fa-1x fa-plus'></i></Button>
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
              title={"List Kelas"}
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
                <th>Nama Kelas</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.kelass.map(
                  kelas =>
                    <tr key={kelas.id}>
                      <td>{kelas.id}</td>
                      <td>{kelas.namaKelas}</td>
                      <td>
                        <ButtonGroup>
                          <Button size="sm" color="primary" tag={Link} to={"/kelass/" + kelas.id}>Edit</Button>
                          <Button size="sm" color="danger" onClick={() => this.remove(kelas.id)}>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </div>

        <div className={this.state.createClass}>
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

        </div>

      </div>
    )
  }

}

export default Home

// import React, { Component } from 'react'
// import CardPercentage from '../../cards/Percentage'
// import CardPiechart from '../../cards/Piechart'
// import CardLinechart from '../../cards/Linechart'
// import CardBarchart from '../../cards/Barchart'
// import CardStatistic from '../../cards/Statistic'


// class Home extends Component {

//   constructor() {
//     super()
//     this.state = {}
//   }

//   cardPercentage = (val) => {
//     let dt = []

//     for (let index = 0; index < val; index++) {
//       dt.push(
//         <CardPercentage key={index}></CardPercentage>
//       )
//     }

//     return dt
//   }

//   cardLinechart = (val) => {
//     let dt = []

//     for (let index = 0; index < val; index++) {
//       dt.push(
//         <CardLinechart key={index}></CardLinechart>
//       )
//     }

//     return dt
//   }

//   cardBarchart = (val) => {
//     let dt = []

//     for (let index = 0; index < val; index++) {
//       dt.push(
//         <CardBarchart key={index}></CardBarchart>
//       )
//     }

//     return dt
//   }

//   cardPie = (val) => {
//     let dt = []

//     for (let index = 0; index < val; index++) {
//       dt.push(
//         <CardPiechart key={index}></CardPiechart>
//       )
//     }

//     return dt
//   }

//   cardStatistic = (val) => {
//     let dt = []

//     for (let index = 0; index < val; index++) {
//       dt.push(
//         <CardStatistic key={index}></CardStatistic>
//       )
//     }

//     return dt
//   }

//   render() {
//   	return (
  		
//   		<div className="main-content">

//   			<div className="display-flex-mobile">
//           { this.cardPie(3) }
//         </div>

//         <div className="display-flex-mobile">
//           { this.cardStatistic(2) }
//           { this.cardPercentage(2) }
//         </div>

//         <div className="display-flex-mobile">
//           { this.cardBarchart(1) }
//           { this.cardLinechart(1) }
//         </div>

//   		</div>

//   	)
//   }

// }

// export default Home