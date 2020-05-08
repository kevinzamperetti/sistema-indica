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
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início">
                        <SidebarMenu.Item title="Gráficos" to='/home/graphics' exact />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Cadastros">
                        <SidebarMenu.Item title="Campanhas de Indicação" to='/pages/campaign' exact />
                        <SidebarMenu.Item title="Níveis de Bonificação" to='/pages/opportunity-bonus-level' exact />
                        <SidebarMenu.Item title="Oportunidades" to='/pages/opportunity' exact />
                        <SidebarMenu.Item title="Palavras Chave" to='/pages/key-word' exact />
                        {/* <SidebarMenu.Item title="Realizar Indicação" to='/pages/indication' exact />
                        <SidebarMenu.Item title="Realizar Candidatura" to='/pages/candidature' exact /> */}
                    </SidebarMenu.Item>
                </SidebarMenu >
            )
        } else if ( localStorage.getItem('Profile') === 'EXTERNAL' ) {
            return (
                // - Externo pode indicar e candidatar, ver listagem de acompanhamento de indicações e gráficos de indicações e candidaturas...
                <SidebarMenu>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início">
                        <SidebarMenu.Item title="Gráficos" to='/home/graphics' exact />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Indicar alguém">
                        <SidebarMenu.Item title="Realizar Indicação" to='/pages/indication' exact />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Candidatar-se">
                        <SidebarMenu.Item title="Realizar Candidatura" to='/pages/candidature' exact />
                    </SidebarMenu.Item>
                </SidebarMenu >
            )
        } else if ( localStorage.getItem('Profile') === 'COLLABORATOR' ) {
            return (
                // - Colaborador só pode indicar, ver listagem de acompanhamento de indicações e gráficos de indicações...
                <SidebarMenu>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início">
                        <SidebarMenu.Item title="Gráficos" to='/home/graphics' exact />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-archive"></i>} title="Indicar alguém">
                        <SidebarMenu.Item title="Realizar Indicação" to='/pages/indication' exact />
                    </SidebarMenu.Item>
                </SidebarMenu >
            )
        } else {
            return (
                <SidebarMenu>
                    <SidebarMenu.Item icon={<i className="fa fa-fw fa-home"></i>} title="Início">
                        <SidebarMenu.Item title="Usuário com perfil inválido" to='/pages/login' exact />
                    </SidebarMenu.Item>
                </SidebarMenu >
                )
        }
    }
}
