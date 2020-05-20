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
import Administrator from './Dashboards/Administrator';
import External from './Dashboards/External';
import Collaborator from './Dashboards/Collaborator';

import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import Campaign from './Pages/Campaign';
import OpportunityBonusLevel from './Pages/OpportunityBonusLevel'
import Opportunity from './Pages/Opportunity'
import KeyWord from './Pages/KeyWord/KeyWord';
import Indication from './Pages/Indication';
import Candidature from './Pages/Candidature';

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
import IndicationList from './Pages/Indication/List/IndicationList';
import CandidatureList from './Pages/Candidature/List/CandidatureList';
import IndicationEdit from './Pages/Indication/Edit/IndicationEdit';
import CandidatureEdit from './Pages/Candidature/Edit/CandidatureEdit';
import OpportunityList from './Pages/Opportunity/List/OpportunityList';
import OpportunityEdit from './Pages/Opportunity/Edit/OpportunityEdit';
import IndicationExternalList from './Pages/Indication/List/IndicationExternalList';
import IndicationCollaboratorList from './Pages/Indication/List/IndicationCollaboratorList';
import IndicationExternalEdit from './Pages/Indication/Edit/IndicationExternalEdit';
import IndicationCollaboratorEdit from './Pages/Indication/Edit/IndicationCollaboratorEdit';
import CandidatureExternalList from './Pages/Candidature/List/CandidatureExternalList';
import CandidatureExternalEdit from './Pages/Candidature/Edit/CandidatureExternalEdit';
import ProfileAdministratorEdit from './Pages/Profile/ProfileAdministratorEdit';
import ProfileExternalEdit from './Pages/Profile/ProfileExternalEdit';
import ProfileCollaboratorEdit from './Pages/Profile/ProfileCollaboratorEdit';
import AccountEdit from './Pages/Profile/AccountEdit/AccountEdit';

//------ Route Definitions --------
// eslint-disable-next-line no-unused-vars
export class RoutedContent extends React.Component {
    render() {
        if ( localStorage.getItem('Profile') === 'ADMINISTRATOR' ) {
            return (
                <Switch>
                    <Redirect from="/" to="/pages/login" exact />
                    <Route component={ Login } path="/pages/login" />
                    <Route component={ Register } path="/pages/register" />
                    <Route component={ ForgotPassword } path="/pages/forgot-password" />

                    {/* Administrator */}
                    <PrivateRoute path="/administrator/profile-details" exact component={ProfileAdministratorEdit} />
                    <PrivateRoute path="/administrator/home" exact component={Administrator} />
                    <PrivateRoute path="/administrator/campaign" exact component={Campaign} />
                    <PrivateRoute path="/administrator/opportunity-bonus-level" exact component={OpportunityBonusLevel} />
                    <PrivateRoute path="/administrator/opportunity" exact component={Opportunity} />
                    <PrivateRoute path="/administrator/key-word" exact component={KeyWord} />
                    <PrivateRoute path="/administrator/indication-list" exact component={IndicationList} />
                    <PrivateRoute path="/administrator/indication/:id" exact component={IndicationEdit} />
                    <PrivateRoute path="/administrator/candidature-list" exact component={CandidatureList} />
                    <PrivateRoute path="/administrator/candidature/:id" exact component={CandidatureEdit} />
                    <PrivateRoute path="/administrator/opportunity-list" exact component={OpportunityList} />
                    <PrivateRoute path="/administrator/opportunity/:id" exact component={OpportunityEdit} />

                    { /*    404    */ }
                    <Redirect to="/pages/error-404" />
                </Switch>
            )
        } else if ( localStorage.getItem('Profile') === 'EXTERNAL' ) {
            return (
                <Switch>
                    <Redirect from="/" to="/pages/login" exact />
                    <Route component={ Login } path="/pages/login" />
                    <Route component={ Register } path="/pages/register" />
                    <Route component={ ForgotPassword } path="/pages/forgot-password" />

                    {/* External */}
                    <PrivateRoute path="/external/profile-details" exact component={ProfileExternalEdit} />
                    <PrivateRoute path="/external/account-edit" exact component={AccountEdit} />
                    <PrivateRoute path="/external/home" exact component={External} />
                    <PrivateRoute path="/external/candidature" exact component={Candidature} />
                    <PrivateRoute path="/external/indication" exact component={Indication} />
                    <PrivateRoute path="/external/indication-list" exact component={IndicationExternalList} />
                    <PrivateRoute path="/external/indication/:id" exact component={IndicationExternalEdit} />
                    <PrivateRoute path="/external/candidature-list" exact component={CandidatureExternalList} />
                    <PrivateRoute path="/external/candidature/:id" exact component={CandidatureExternalEdit} />

                    { /*    404    */ }
                    <Redirect to="/pages/error-404" />
                </Switch>
            )
        } else if ( localStorage.getItem('Profile') === 'COLLABORATOR' ) {
            return (
                <Switch>
                    <Redirect from="/" to="/pages/login" exact />
                    <Route component={ Login } path="/pages/login" />
                    <Route component={ Register } path="/pages/register" />
                    <Route component={ ForgotPassword } path="/pages/forgot-password" />

                    {/* Collaborator */}
                    <PrivateRoute path="/collaborator/profile-details" exact component={ProfileCollaboratorEdit} />
                    <PrivateRoute path="/collaborator/account-edit" exact component={AccountEdit} />
                    <PrivateRoute path="/collaborator/home" exact component={Collaborator} />
                    <PrivateRoute path="/collaborator/indication" exact component={Indication} />
                    <PrivateRoute path="/collaborator/indication-list" exact component={IndicationCollaboratorList} />
                    <PrivateRoute path="/collaborator/indication/:id" exact component={IndicationCollaboratorEdit} />


                    { /*    404    */ }
                    <Redirect to="/pages/error-404" />
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Redirect from="/" to="/pages/login" exact />
                    <Route component={ Login } path="/pages/login" />
                    <Route component={ Register } path="/pages/register" />
                    <Route component={ ForgotPassword } path="/pages/forgot-password" />

                   { /*    404    */ }
                    <Redirect to="/pages/error-404" />
                </Switch>
            )
        }
    }
}   
    
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
