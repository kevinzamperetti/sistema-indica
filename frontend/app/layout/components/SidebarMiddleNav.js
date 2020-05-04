import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início">
            <SidebarMenu.Item title="Gráficos" to='/home/graphics' exact />
        </SidebarMenu.Item>
        <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Cadastros">
            <SidebarMenu.Item title="Campanhas de Indicação" to='/pages/campaign' exact />
            <SidebarMenu.Item title="Níveis de Bonificação" to='/pages/opportunity-bonus-level' exact />
            <SidebarMenu.Item title="Oportunidades" to='/pages/opportunity' exact />
            <SidebarMenu.Item title="Palavras Chave" to='/pages/key-word' exact />
            <SidebarMenu.Item title="Realizar Indicação" to='/pages/indication' exact />
            <SidebarMenu.Item title="Realizar Candidatura" to='/pages/candidature' exact />
        </SidebarMenu.Item>
    </SidebarMenu >
);
