import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Theme,
    createStyles,
    withStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { purple } from '@material-ui/core/colors';

// import handleDrumsSelect from '../somewhere' TODO

const handleSetPref = (pref: string, setting: any) => {};

function Divider() {
    return <div style={{ fontSize: '18px', marginTop: '7px' }}>|</div>;
}

const DrumSwitch = withStyles({
    switchBase: {
        color: purple[300],
        '&$checked': {
            color: purple[500],
        },
        '&$checked + $track': {
            backgroundColor: purple[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

const PrettoSlider = withStyles({
    root: {
        color: purple[300],
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

export default function PrefSelector() {
    const [drumsOn, setDrums] = useState(true);

    const handleToggleDrums = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDrums(event.target.checked);
    };

    const [activePref, setActivePref] = useState();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Button
                aria-controls="drums-toggle"
                aria-haspopup="false"
                onClick={() => {
                    return;
                }}
            >
                Drums
            </Button>
            <DrumSwitch
                checked={drumsOn}
                onChange={handleToggleDrums}
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
            <Divider />
            <Button
                aria-controls="scales-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Scale
            </Button>
            <Menu
                id="scale-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        handleSetPref('scale', 'major');
                    }}
                >
                    major
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleSetPref('scale', 'minor');
                    }}
                >
                    minor
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleSetPref('scale', 'lydianDominant');
                    }}
                >
                    lydian dominant
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleSetPref('scale', 'chromatic');
                    }}
                >
                    chromatic
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleSetPref('scale', 'pelog');
                    }}
                >
                    pelog
                </MenuItem>
            </Menu>
            <Divider />
            <Button
                aria-controls="tempo-slider"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Tempo
            </Button>
            <PrettoSlider
                style={{ maxWidth: '300px' }}
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={80}
            />
        </div>
    );
}

function getPrefsFromLocalStorage() {
    return localStorage.get('synthoraPrefs');
}
