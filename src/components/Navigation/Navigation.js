import React from 'react';
import classes from './Navigation.module.css';
import Playlists from './Playlists/Playlists';
import NavigationItems from './NavigationItems/NavigationItems';

const Navigation = () => {
    return (
        <div className={classes.Navigation}>
            <NavigationItems/>
            <Playlists/>
        </div>
    )
}

export default Navigation;
