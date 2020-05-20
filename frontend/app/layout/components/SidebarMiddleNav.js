import React from 'react';

import { SidebarMenu } from './../../components';

// export const SidebarMiddleNav = () => (
//     <SidebarMenu>
//         <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início">
//             <SidebarMenu.Item title="Gráficos" to='/home/graphics' exact />
//         </SidebarMenu.Item>
//         <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Cadastros">
//             <SidebarMenu.Item title="Campanhas de Indicação" to='/pages/campaign' exact />
//             <SidebarMenu.Item title="Níveis de Bonificação" to='/pages/opportunity-bonus-level' exact />
//             <SidebarMenu.Item title="Oportunidades" to='/pages/opportunity' exact />
//             <SidebarMenu.Item title="Palavras Chave" to='/pages/key-word' exact />
//             <SidebarMenu.Item title="Realizar Indicação" to='/pages/indication' exact />
//             <SidebarMenu.Item title="Realizar Candidatura" to='/pages/candidature' exact />
//         </SidebarMenu.Item>
//     </SidebarMenu >
// );

export class SidebarMiddleNav extends React.Component {
    render() {
        if ( localStorage.getItem('Profile') === 'ADMINISTRATOR' ) {
            return (
                // - Administrador acessa telas de gráficos, cadastros e listagem de acompanhamento de indicações/candidaturas...
                <SidebarMenu>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início" to='/administrator/home' exact />
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Cadastros">
                        <SidebarMenu.Item title="Campanhas de Indicação" to='/administrator/campaign' exact />
                        <SidebarMenu.Item title="Níveis de Bonificação" to='/administrator/opportunity-bonus-level' exact />
                        <SidebarMenu.Item title="Oportunidade" to='/administrator/opportunity' exact />
                        <SidebarMenu.Item title="Palavras Chave" to='/administrator/key-word' exact />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-group"></i>} title="Indicações" to='/administrator/indication-list' exact />
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-file-text"></i>} title="Candidaturas" to='/administrator/candidature-list' exact/>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-file-text"></i>} title="Oportunidades" to='/administrator/opportunity-list' exact/>
                </SidebarMenu >
            )
        } else if ( localStorage.getItem('Profile') === 'EXTERNAL' ) {
            return (
                // - Externo pode indicar e candidatar, ver listagem de acompanhamento de indicações e gráficos de indicações e candidaturas...
                <SidebarMenu>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início" to='/external/home' exact />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-group"></i>} title="Indicações">
                        <SidebarMenu.Item title="Realizar" to='/external/indication' exact />
                        <SidebarMenu.Item title="Acompanhar" to='/external/indication-list' exact />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-file-text"></i>} title="Candidaturas">
                        <SidebarMenu.Item title="Realizar" to='/external/candidature' exact />
                        <SidebarMenu.Item title="Acompanhar" to='/external/candidature-list' exact />
                    </SidebarMenu.Item>
                </SidebarMenu >
            )
        } else if ( localStorage.getItem('Profile') === 'COLLABORATOR' ) {
            return (
                // - Colaborador só pode indicar, ver listagem de acompanhamento de indicações e gráficos de indicações...
                <SidebarMenu>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início" to='/collaborator/home' exact />
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-group"></i>} title="Indicações">
                        <SidebarMenu.Item title="Realizar" to='/collaborator/indication' exact />
                        <SidebarMenu.Item title="Acompanhar" to='/collaborator/indication-list' exact />
                    </SidebarMenu.Item>
                </SidebarMenu >
            )
        } else {
            return (
                <SidebarMenu>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início" to='/pages/login' exact/>
                </SidebarMenu >
                )
        }
    }
}
