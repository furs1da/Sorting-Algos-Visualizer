import React, { useState, useContext, useEffect, useReducer } from 'react'
import { useGlobalContext } from '../context'
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon} from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBRange} from 'mdb-react-ui-kit';

import { FormControl, InputLabel, Select, MenuItem, Button, ThemeProvider, Grid, Item } from '@mui/material';
import sortingTypes from '../data/sorting-types';
import Lottie from "lottie-react";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import themeButtons from '../data/themes';


const SortingContainer = () => {

   const {arraySize, sortingSpeed, changeSortingSpeed} = useGlobalContext(); 

  return (
    <main>
        <Grid container>
            <Grid container  direction="row" justifyContent="space-around"
  alignItems="center">
                <Grid item md={4} xs={8}>
                    <MDBRange
                        defaultValue={1}
                        id='customRange'
                        label='Sorting Speed'
                        min='1'
                        max='5'
                        onChange={(selectControl) => {
                            console.log(selectControl.target.value);
                            changeSortingSpeed(selectControl.target.value);
                        }}
                    />
                    
                </Grid>
                <Grid item md={4} xs={8}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Sort Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select" 
                            label="Sort Type">
                                 {sortingTypes.map((item) => {
                                    return <MenuItem value={item.sortingType} key={item.id}>{item.icon}   {item.name}</MenuItem>
                                })}
                        </Select>
                </FormControl>
                </Grid>
            </Grid>
            <Grid container  direction="row" justifyContent="space-around">
                <Grid item md={4} xs={8}>
                    <MDBRange
                        defaultValue={10}
                        id='customRange'
                        label='Array Size'
                        min='3'
                        max='35'
                    />
                </Grid>
                <Grid container md={4} >
                <ThemeProvider theme={themeButtons}>
                    <Grid container direction="row" justifyContent="space-around" className='mt-1' spacing={1}>
                        <Grid item>
                            <Button variant="outlined" color="newArray" startIcon={<AutorenewIcon />}>Generate New Array</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="initial" startIcon={<SettingsBackupRestoreIcon />}>Initial State</Button>
                        </Grid>    
                    </Grid>
                    <Grid container  direction="row" justifyContent="center" className='mt-1' spacing={1}>                   
                        <Grid item>
                            <Button variant="outlined" color="start" startIcon={<PlayArrowIcon />}>Start</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="stop" endIcon={<StopIcon />}>Stop</Button>
                        </Grid>
                    </Grid>
                    
                </ThemeProvider>
                </Grid>
            </Grid>
        </Grid>
    </main>
  )
}

export default SortingContainer
