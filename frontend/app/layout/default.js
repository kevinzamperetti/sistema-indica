import React from 'react';
import PropTypes from 'prop-types';

import {
    Layout,
    ThemeSelector,
    ThemeProvider,
    PageConfigConsumer,
} from './../components';

import './../styles/bootstrap.scss';
import './../styles/main.scss';
import './../styles/plugins/plugins.scss';
import './../styles/plugins/plugins.css';

import {
    RoutedNavbars,
    RoutedSidebars,
} from './../routes';

const favIcons = [
    { rel: 'icon', type: 'image/x-icon', href: require('./../images/favicons/logo-32x32.png') },
    { rel: 'apple-touch-icon', sizes: '180x180', href: require('./../images/favicons/logo-128x128.png') },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: require('./../images/favicons/logo-32x32.png') },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: require('./../images/favicons/logo-16x16.png') }

];

class AppLayout extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    render() {
        const { children } = this.props;
        
        return (
            <ThemeProvider initialStyle="light" initialColor="primary">
                <Layout sidebarSlim favIcons={ favIcons }>
                    { /* --------- Navbar ----------- */ }
                    <Layout.Navbar>
                        <RoutedNavbars />
                    </Layout.Navbar>
                    { /* -------- Sidebar ------------*/ }
                    <Layout.Sidebar>
                        <RoutedSidebars />
                    </Layout.Sidebar>

                    { /* -------- Content ------------*/ }
                    <Layout.Content>
                        { children }
                    </Layout.Content>

                    { /* -- Theme Selector (DEMO) ----*/ }
                    <PageConfigConsumer>
                    {
                        ({ sidebarHidden, navbarHidden }) => (
                            <ThemeSelector styleDisabled={ sidebarHidden && navbarHidden } />
                        )
                    }
                    </PageConfigConsumer>
                </Layout>
            </ThemeProvider>
        );
    }
}

export default AppLayout;
