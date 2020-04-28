import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router';

// ----------- PrivateRoute Imports ---------------
import {PrivateRoute} from './components/PrivateRoute/PrivateRoute'


// ----------- Pages Imports ---------------
import Analytics from './Dashboards/Analytics';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Campaign from './Pages/Campaign';
import OpportunityBonusLevel from './Pages/OpportunityBonusLevel'
import Opportunity from './Pages/Opportunity'
import KeyWord from './Pages/KeyWord/KeyWord';
import Indication from './Pages/Indication';

import NavbarOnly from './Layouts/NavbarOnly';
import SidebarDefault from './Layouts/SidebarDefault';
import SidebarA from './Layouts/SidebarA';
import DragAndDropLayout from './Layouts/DragAndDropLayout';
import SidebarWithNavbar from './Layouts/SidebarWithNavbar';
import Icons from './Icons';

// ----------- Layout Imports ---------------
import { DefaultNavbar } from './../layout/components/DefaultNavbar';
import { DefaultSidebar } from './../layout/components/DefaultSidebar';

import { SidebarANavbar } from './../layout/components/SidebarANavbar';
import { SidebarASidebar } from './../layout/components/SidebarASidebar';

//------ Route Definitions --------
// eslint-disable-next-line no-unused-vars
export const RoutedContent = () => {
    return (
        <Switch>
            <Redirect from="/" to="/pages/login" exact />
            <Route component={ Login } path="/pages/login" />
            <Route component={ Register } path="/pages/register" />
            
            <Route path="/dashboards/analytics" exact component={Analytics} />
            <Route path="/pages/campaign" exact component={Campaign} />
            <Route path="/pages/opportunity-bonus-level" exact component={OpportunityBonusLevel} />
            <Route path="/pages/opportunity" exact component={Opportunity} />
            <Route path="/pages/key-word" exact component={KeyWord} />
            <Route path="/pages/indication" exact component={Indication} />
            
            { /*    Layouts     */ }
            <Route path='/layouts/navbar' component={NavbarOnly} />
            <Route path='/layouts/sidebar' component={SidebarDefault} />
            <Route path='/layouts/sidebar-a' component={SidebarA} />
            <Route path="/layouts/sidebar-with-navbar" component={SidebarWithNavbar} />
            <Route path='/layouts/dnd-layout' component={DragAndDropLayout} />
            <Route path='/icons' exact component={Icons} />

            { /*    404    */ }
            <Redirect to="/pages/error-404" />
        </Switch>
    );
};

//------ Custom Layout Parts --------
export const RoutedNavbars  = () => (
    <Switch>
        { /* Other Navbars: */}
        <Route
            component={ SidebarANavbar }
            path="/layouts/sidebar-a"
        />
        <Route
            component={ NavbarOnly.Navbar }
            path="/layouts/navbar"
        />
        <Route
            component={ SidebarWithNavbar.Navbar }
            path="/layouts/sidebar-with-navbar"
        />
        { /* Default Navbar: */}
        <Route
            component={ DefaultNavbar }
        />
    </Switch>  
);

export const RoutedSidebars = () => (
    <Switch>
        { /* Other Sidebars: */}
        <Route
            component={ SidebarASidebar }
            path="/layouts/sidebar-a"
        />
        <Route
            component={ SidebarWithNavbar.Sidebar }
            path="/layouts/sidebar-with-navbar"
        />
        { /* Default Sidebar: */}
        <Route
            component={ DefaultSidebar }
        />
    </Switch>
);
