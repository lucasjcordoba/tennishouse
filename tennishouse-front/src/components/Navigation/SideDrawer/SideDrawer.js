import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = props => {
    let drawerClasses = classes.SideDrawer;
    if(props.show){
        drawerClasses = classes.SideDrawer + ' ' + classes.Open;
    }
    return (
        <nav className={drawerClasses}>
            <NavigationItems />
        </nav>
    )
}
export default sideDrawer;