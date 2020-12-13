import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import TableChartIcon from '@material-ui/icons/TableChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import styles from './ChartTypes.styles';

const useStyles = makeStyles(styles);

function ChartButton(props){
    const {IconComponent,iconName,classname,index,clickFunction,selected}=props;
    return(
        <Grid item xs={6} sm={4} md={3}>
            <Button
                variant="outlined"
                color="primary"
                onClick={(event)=>clickFunction(event,index,iconName)}
                classes={selected[index]?{label:classname.label,root:classname.selectedButtonColor}:{label:classname.label,root:classname.root}}
            >
                <IconComponent fontSize='large' color="primary" className={classname.icon} />
                {iconName}
            </Button>
        </Grid>
    )
}

function ChartTypes(props){
    const classes = useStyles();
    return(
        <Grid container spacing={1} className={classes.container} >
            <ChartButton index={0} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={BarChartIcon} iconName='Bar Chart' classname={classes} />
            <ChartButton index={1} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={MultilineChartIcon} iconName='Lines' classname={classes} />
            <ChartButton index={2} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={PieChartIcon} iconName='Pie Chart' classname={classes} />
            <ChartButton index={3} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={EqualizerIcon} iconName='Column Chart' classname={classes} />
            <ChartButton index={4} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TableChartIcon} iconName='Table' classname={classes} />
            <ChartButton index={5} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={DonutLargeIcon} iconName='Donut Chart' classname={classes} />
            <ChartButton index={6} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={BubbleChartIcon} iconName='Scatter Plot' classname={classes} />
            <ChartButton index={7} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            {/* <ChartButton index={8} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={9} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={10} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={11} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={12} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={13} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={14} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={15} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={16} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={17} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={18} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} />
            <ChartButton index={19} selected={props.selectedButton} clickFunction={props.chartChange} IconComponent={TimelineIcon} iconName='Dot Plot' classname={classes} /> */}
        </Grid>
    )
}

export default ChartTypes;