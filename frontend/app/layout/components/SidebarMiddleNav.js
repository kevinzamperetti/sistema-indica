import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Dashboards">
            <SidebarMenu.Item title="Gráficos" to='/dashboards/analytics' exact />
        </SidebarMenu.Item>
        <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Cadastros">
            <SidebarMenu.Item title="Campanha" to='/pages/campaign' exact />
        </SidebarMenu.Item>
    </SidebarMenu >
);
