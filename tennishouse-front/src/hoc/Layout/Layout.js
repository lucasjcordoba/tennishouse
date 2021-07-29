import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../../components/Navigation/Backdrop/Backdrop'
import Footer from '../../components/Footer/Footer';


class Layout extends Component {
    state = {
        sideDrawerOpen: false
    }
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen }
        });
    }

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    }

    render() {
        let backdrop = null;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div>
                
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer show={this.state.sideDrawerOpen}/>
                {backdrop}
                <main>
                    {this.props.children}
                </main>
                <Footer />
                
            </div>
        );
    }
}

export default Layout;