import React from 'react';
import { Link } from 'react-router-dom';
import faker from 'faker/locale/en_US';
import { randomAvatar } from './../../../utilities';
import { Sidebar, UncontrolledButtonDropdown, Avatar, AvatarAddOn, DropdownToggle,
         DropdownMenu, DropdownItem } from './../../../components';

import Util from '../../../components/Util/Util';
// const avatarImg = randomAvatar();
const avatarImg = '';

export class SidebarTopA extends React.Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
    }


    render() {
        if ( localStorage.getItem('Profile') == 'ADMINISTRATOR' ) {
            return (
                <React.Fragment>
                    <Sidebar.HideSlim>
                        <Sidebar.Section className="pt-0">
                            <Link to="/" className="d-block">
                            </Link>
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
                                    { localStorage.getItem('Name')}
                                    <i className="fa fa-angle-down ml-2"></i>
                                </DropdownToggle>
                                <DropdownMenu persist>
                                    <DropdownItem tag={ Link } to="/administrator/profile-details">
                                        <i className="fa fa-fw fa-user mr-2"></i>
                                        Minha conta
                                    </DropdownItem>
                                    <DropdownItem tag={ Link } onClick={ this.util.logout.bind( this ) }>
                                        <i className="fa fa-fw fa-sign-out mr-2"></i>
                                        Sair
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                            <div className="small sidebar__link--muted">
                                { localStorage.getItem('SectorCompany') }
                            </div>
                        </Sidebar.Section>
                    </Sidebar.HideSlim>
                </React.Fragment>
            )
        } else if ( localStorage.getItem('Profile') == 'EXTERNAL' ) {
            return (
                <React.Fragment>
                    <Sidebar.HideSlim>
                        <Sidebar.Section className="pt-0">
                            <Link to="/" className="d-block">
                            </Link>
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
                                    { localStorage.getItem('Name')}
                                    <i className="fa fa-angle-down ml-2"></i>
                                </DropdownToggle>
                                <DropdownMenu persist>
                                    <DropdownItem tag={ Link } to="/external/profile-details">
                                        <i className="fa fa-fw fa-user mr-2"></i>
                                        Minha conta
                                    </DropdownItem>
                                    <DropdownItem tag={ Link } onClick={ this.util.logout.bind( this ) }>
                                        <i className="fa fa-fw fa-sign-out mr-2"></i>
                                        Sair
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </Sidebar.Section>
                    </Sidebar.HideSlim>
                </React.Fragment>
            )
        } else if ( localStorage.getItem('Profile') == 'COLLABORATOR' ) {
            return (
                <React.Fragment>
                    <Sidebar.HideSlim>
                        <Sidebar.Section className="pt-0">
                            <Link to="/" className="d-block">
                            </Link>
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
                                    { localStorage.getItem('Name')}
                                    <i className="fa fa-angle-down ml-2"></i>
                                </DropdownToggle>
                                <DropdownMenu persist>
                                    <DropdownItem tag={ Link } to="/collaborator/profile-details">
                                        <i className="fa fa-fw fa-user mr-2"></i>
                                        Minha conta
                                    </DropdownItem>
                                    <DropdownItem tag={ Link } onClick={ this.util.logout.bind( this ) }>
                                        <i className="fa fa-fw fa-sign-out mr-2"></i>
                                        Sair
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                            <div className="small sidebar__link--muted">
                                { localStorage.getItem('SectorCompany') }
                            </div>
                        </Sidebar.Section>
                    </Sidebar.HideSlim>
                </React.Fragment>
            )
        } else {
            return(
                <React.Fragment>
                    <Sidebar.HideSlim>
                        <Sidebar.Section className="pt-0">
                            <Link to="/" className="d-block">
                            </Link>
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
                                    { localStorage.getItem('Name')}
                                    <i className="fa fa-angle-down ml-2"></i>
                                </DropdownToggle>
                                <DropdownMenu persist>
                                    <DropdownItem tag={ Link } onClick={ this.util.logout.bind( this ) }>
                                        <i className="fa fa-fw fa-sign-out mr-2"></i>
                                        Sair
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                            <div className="small sidebar__link--muted">
                                { localStorage.getItem('SectorCompany') }
                            </div>
                        </Sidebar.Section>
                    </Sidebar.HideSlim>
                </React.Fragment>
            )
        }
    }

    // render() {
    //     return (
    //         <React.Fragment>
    //         { /* START: Sidebar Default */ }
    //             <Sidebar.HideSlim>
    //                 <Sidebar.Section className="pt-0">
    //                     <Link to="/" className="d-block">
    //                         {/* <Sidebar.HideSlim>
    //                             <Avatar.Image
    //                                 size="lg"
    //                                 src={ avatarImg }
    //                                 addOns={[
    //                                     <AvatarAddOn.Icon 
    //                                         className="fa fa-circle"
    //                                         color="white"
    //                                         key="avatar-icon-bg"
    //                                     />,
    //                                     <AvatarAddOn.Icon 
    //                                         className="fa fa-circle"
    //                                         color="success"
    //                                         key="avatar-icon-fg"
    //                                     />
    //                                 ]}
    //                             />
    //                         </Sidebar.HideSlim> */}
    //                     </Link>
                        
    //                     <UncontrolledButtonDropdown>
    //                         <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
    //                             { localStorage.getItem('Name')}
    //                             <i className="fa fa-angle-down ml-2"></i>
    //                         </DropdownToggle>
    //                         <DropdownMenu persist>
    //                             <DropdownItem tag={ Link } to="/administrator/profile-details">
    //                                 Minha conta
    //                             </DropdownItem>
    //                             <DropdownItem tag={ Link } onClick={ this.util.logout.bind( this ) }>
    //                                 <i className="fa fa-fw fa-sign-out mr-2"></i>
    //                                 Sair
    //                             </DropdownItem>
    //                         </DropdownMenu>
    //                     </UncontrolledButtonDropdown>
    //                     <div className="small sidebar__link--muted">
    //                         {/* { faker.name.jobTitle() } */}
    //                         { localStorage.getItem('SectorCompany   ') }
    //                     </div>
    //                 </Sidebar.Section>
    //             </Sidebar.HideSlim>
    //             { /* END: Sidebar Default */ }

    //             { /* START: Sidebar Slim */ }
    //             {/* aqui foto do usuário menu contraído */}
    //             {/* <Sidebar.ShowSlim>
    //                 <Sidebar.Section>
    //                     <Avatar.Image
    //                         size="sm"
    //                         src={ avatarImg }
    //                         addOns={[
    //                             <AvatarAddOn.Icon 
    //                                 className="fa fa-circle"
    //                                 color="white"
    //                                 key="avatar-icon-bg"
    //                             />,
    //                             <AvatarAddOn.Icon 
    //                                 className="fa fa-circle"
    //                                 color="success"
    //                                 key="avatar-icon-fg"
    //                             />
    //                         ]}
    //                     />
    //                 </Sidebar.Section>
    //             </Sidebar.ShowSlim> */}
    //             { /* END: Sidebar Slim */ }
    //         </React.Fragment>
    //     )
    // }
}