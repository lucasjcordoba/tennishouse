import React from 'react';
import classes from './DrawerToggleButton.module.css'

const drawerToggleButton = props => (
    <button className={classes.ToggleButton} onClick={props.click}>
        <div className={classes.ToggleButtonLine}></div>
        <div className={classes.ToggleButtonLine}></div>
        <div className={classes.ToggleButtonLine}></div>
    </button>
)

export default drawerToggleButton;