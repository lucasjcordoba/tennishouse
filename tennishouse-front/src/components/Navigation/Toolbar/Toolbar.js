import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = props => (
    <header className={classes.Toolbar}>
        <nav className={classes.Navigation}>
            

            <div className={classes.ToolbarToggleButton}>
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className={classes.Logo}><a href="/"><img src="/logo.png" alt="" /></a></div>
            <div className={classes.Spacer}></div>
            <div className={classes.NavItems}>
                <NavigationItems />
            </div>
            

        </nav>
    </header>
);

export default toolbar;
