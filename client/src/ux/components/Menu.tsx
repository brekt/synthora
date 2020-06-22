import React, { useState, useEffect } from 'react';
import Breadcrumbs, { BreadcrumbsTypeMap } from '@material-ui/core/Breadcrumbs';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            backgroundColor: '#333',
            width: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            justifyContent: 'center',
        },
    })
);

function Menu() {
    return <PrefSelector />;
}

function handleClick(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    pref: string,
    cb: Function
) {
    event.preventDefault();
    cb(pref);
}

export default function PrefSelector() {
    const [activePref, setActivePref] = useState();

    const classes = useStyles();

    return (
        <nav className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    style={{ cursor: 'pointer' }}
                    color="inherit"
                    onClick={(
                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                        handleClick(e, 'scale', setActivePref);
                    }}
                >
                    Scale
                </Link>
                <Link
                    style={{ cursor: 'pointer' }}
                    color="inherit"
                    onClick={(
                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                        handleClick(e, 'tempo', setActivePref);
                    }}
                >
                    Tempo
                </Link>
                <Link
                    style={{ cursor: 'pointer' }}
                    color="inherit"
                    onClick={(
                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                        handleClick(e, 'drums', setActivePref);
                    }}
                >
                    Drums
                </Link>
            </Breadcrumbs>
        </nav>
    );
}

function getPrefsFromLocalStorage() {
    return localStorage.get('synthoraPrefs');
}
