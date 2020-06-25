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

const DEFAULT_TEMPO = 110;

const handleSetPref = (pref: string, setting: any) => {};

function Divider() {
    return <div style={{ fontSize: '18px', margin: '7px 20px' }}>|</div>;
}

const menuTextStyle = {
    marginTop: '10px',
    fontSize: '14px',
    color: 'rgba(232, 230, 227, 0.87)',
    fontWeight: 500,
    margin: '10px 20px',
};

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

const TempoSlider = withStyles({
    root: {
        color: purple[300],
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: purple[300],
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

    const [tempo, setTempo] = useState(DEFAULT_TEMPO);

    const handleTempoChange = (event: any, newValue: number) => {
        setTempo(newValue);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <span style={menuTextStyle}>DRUMS</span>
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
            <span style={menuTextStyle}>TEMPO</span>
            <TempoSlider
                style={{ maxWidth: '300px' }}
                valueLabelDisplay="auto"
                aria-label="tempo slider"
                defaultValue={DEFAULT_TEMPO}
                onChange={handleTempoChange}
                min={20}
                max={200}
            />
            <span style={menuTextStyle}>{tempo}</span>
        </div>
    );
}

function getPrefsFromLocalStorage() {
    return localStorage.get('synthoraPrefs');
}
