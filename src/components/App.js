import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, HashRouter } from 'react-router-dom'

// modules
import ChatPopup from '../modules/popup/Chat'
import CreatePopup from '../modules/popup/Create'
import NotifPopup from '../modules/popup/Notif'
import SearchPopup from '../modules/popup/Search'
import ProfilePopup from '../modules/popup/Profile'
import TabNavigator from '../modules/popup/TabNavigator'
import SiswaEdit from '../modules/forms/SiswaEdit'
import SiswaAdd from '../modules/forms/SiswaAdd'
import KelasEdit from '../modules/forms/KelasEdit'

// auth
import Login from './auth/Login'

// home
import Dashboard from './dashboard/Index'

// pages
import SweetAlert from './pages/SweetAlert'
import Table from './pages/Table'
import FormBuilder from './pages/FormBuilder'
import ProgressImage from './pages/ProgressImage'
import Thumbnail from './pages/Thumbnail'



class App extends Component {

  constructor () {

    super()
    this.state = {
    	appClass: 'app app-side-min',
      appButtonClass: 'fa fa-lg fa-bars',
    }

  }

	opSlide = () => {
    if (this.state.appClass === 'app') { 
      this.setState({appClass: 'app app-side-min'})
      this.setState({appButtonClass: 'fa fa-lg fa-bars'})
    } else {
      this.setState({appClass: 'app'})
      this.setState({appButtonClass: 'fa fa-lg fa-times'})
    }
  }

  createList = () => {
    let dt = []

    for (let i = 0; i < 10; i++) {
      dt.push(
        <NavLink to={'/components/'+i}>
          <li className="content">
              <div className="list">
                <div className="icn">
                  <i className="fa fa-lg fa-th"></i>
                </div>
                <div className="ttl">
                  Components { i }
                </div>
              </div>
          </li>
        </NavLink>
      )
    }

    return dt
  }

  createSubMenu = (val, link, icon) => {
    return <NavLink to={ link }>
      <li className="content" title={val}>
        <div className="list">
          <div className="icn">
            <i className={icon}></i>
          </div>
          <div className="ttl">
            { val }
          </div>
          <div className="icn icn-right txt-site txt-right txt-12"></div>
        </div>
      </li>
    </NavLink>
  }

	render() {

    return (
    	<HashRouter history={ Router.browserHistory }>
      	<div>

      		{/* Multiple Page */}
      		<div className={this.state.appClass}>

      			<div className="app-slide">
      				<div className="slide-content background-blue">
      					
      					<div className="app-title">
	                <div className="col-1">
	                  <h1 className="txt-site txt-white txt-upp txt-18 txt-bold post-center margin-left-10px">
	                    RAKA UHUY
	                  </h1>
	                </div>
	                <div className="col-2">
	                  <button 
	                    className="btn btn-blue btn-circle" 
	                    onClick={ this.opSlide }>
	                    <i className={ this.state.appButtonClass } />
	                  </button>
	                </div>
	              </div>
                <div className="slide-list change-scrollbar">

	              <div className="app-space">
                  DASHBOARD
                </div>

	              <div className="app-menu">
                  { this.createSubMenu('Student', '/table', 'fa fa-lg fa-home') }
                  { this.createSubMenu('Class', '/home', 'fa fa-lg fa-home') }
	              </div>

      				</div>
              </div>
      			</div>

      			<div className="app-main">

      				<div className="app-panel">
              	<div className="panel-content">

              		<div className="col-1">
	                  <div className="app-mobile">
	                    <button className="btn btn-circle btn-primary">
	                      <i className="fa fa-lg fa-search" />
	                    </button>
	                  </div>
	                  <div className="app-desktop">
	                    <SearchPopup />
	                  </div>
	                </div>

	                <div className="col-2 content-right">
	                  <div className="panel-button app-desktop">
	                    <CreatePopup />
	                  </div>
	                  <div className="panel-button app-desktop" style={{marginLeft: "10px"}}>
	                    <ChatPopup />
	                  </div>
	                  <div className="panel-button app-desktop" style={{marginLeft: "10px"}}>
	                    <NotifPopup />
	                  </div>
	                  <div className="panel-button">
	                    <ProfilePopup />
	                  </div>
	                </div>

              	</div>
              </div>

      				<div className="app-place">
      					
      					<Route exact path="/home" component={ Dashboard } />
                <Route exact path="/sweet-alert" component={ SweetAlert } />
                <Route exact path="/table" component={ Table } />
                <Route exact path="/form-builder" component={ FormBuilder } />
                <Route exact path="/progress-image" component={ ProgressImage } />
                <Route exact path="/thumbnail" component={ Thumbnail } />
                <Route exact path="/siswas/:id" component={ SiswaEdit } />
                <Route exact path="/siswas/new" component={ SiswaAdd } />
                <Route exact path="/kelass/:id" component={ KelasEdit } />
                

                {/* tab navigator */}
                <Route exact path="/tab-navigator" component={TabNavigator} />
      				</div>
      			</div>
      			
      		</div>
      		
      		{/* Single Page */}
      		<div className="app">
      			<Route exact path="/" component={ Login } />
      		</div>

      	</div>
      </HashRouter>
    )

  }

}

export default App