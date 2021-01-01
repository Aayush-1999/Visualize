import React,{Component} from 'react';
import {connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import NewChart from '../NewChart';
import BarChart from '../../../Components/Charts/BarChart/BarChart';
import ChartTypes from '../../../Components/ChartVisualize/ChartTypes/ChartTypes';
import Refine from './Refine/Refine';
// import Annotate from '../../../Components/ChartVisualize/Annotate/Annotate';
// import Design from '../../../Components/ChartVisualize/Design/Design';
import axios from '../../../axiosInstance';
import * as actions from '../../../store/actions/index';
import styles from './Visualize.style';

class Visualize extends Component{
    constructor(props){
        super(props)
        this.state={
            tabValue:"types",
            chartButtonSelected:[true],
            chartType:"bar",
            chartTitle:"",
            chartConf:{},
            data:this.props.location.state.updatedTableData,
            columns:this.props.location.state.selectedColumns,
            barsColumns:[],
            labelsColumns:[]
        }
    }

    componentDidMount(){
        let initialChartConfig = this.props.chartConfig[this.state.chartType]
        initialChartConfig.series=[]
        let tableData=this.state.data
        let selectedColumns=this.state.columns
        let updatedSelectedColumns=[],updatedBarsColumn=[],updatedLabelsColumn=[]
        tableData.data.columns.map((column,index)=>{
            if( selectedColumns.includes(column.header) && column.dataType===2){
                // initialChartConfig.series[i++].data=column.values.slice(1,column.values.length)
                initialChartConfig.series.push({
                    name: column.header,
                    type: 'bar',
                    data: column.values
                })
                updatedSelectedColumns[0]=column.header
            }
            else if(selectedColumns.includes(column.header) && (column.dataType===1 || column.dataType===4)){
                initialChartConfig.yAxis.data=column.values
                updatedSelectedColumns[1]=column.header
            }
            if(column.dataType===2){
                updatedBarsColumn.push(column.header)
            }
            else if(column.dataType===1 || column.dataType===4){
                updatedLabelsColumn.push(column.header)
            }
        })
        this.setState({
            chartConf:initialChartConfig,
            columns:updatedSelectedColumns,
            barsColumns:updatedBarsColumn,
            labelsColumns:updatedLabelsColumn
        })
        this.props.saveChartConfigAndColumns(initialChartConfig,'bar',updatedSelectedColumns)
    }

    tabChangeHandler=(event,newValue)=>{
        this.setState({tabValue:newValue})
    }

    chartChangeHandler=(event,i,iconName)=>{
        console.log(event.target.value)
        let chartButton=[];
        chartButton[i]=true;
        let type=iconName.replace(/\s/g, "").toLowerCase()
        this.setState({chartButtonSelected:chartButton,chartType:type})
    }

    formSubmitHandler=(event)=>{
        event.preventDefault();
        const formData = {};
        formData.chartId = this.state.data.chartId;
        formData.chartConfig = this.state.chartConf;
        axios({
            url: '/chart/saveChartConfig',
            method:'POST',
            data:formData
        })
        .then(response=>{
            if(response.status===200){
                this.props.incrementStepper()
                this.props.history.push({
                    pathname: "/chart/publish",
                    state:{
                        config: this.state.chartConf,
                        resObj: response.data
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })   
    }

    render(){
        console.log(this.state.chartConf)
        const {classes,t} = this.props;
        let tabContent;
        if(this.state.tabValue==="types")
         tabContent= <ChartTypes chartChange={this.chartChangeHandler} selectedButton={this.state.chartButtonSelected} />
        else if(this.state.tabValue==="refine")
            tabContent= <Refine type={this.state.chartType} barsColumns={this.state.barsColumns} labelsColumns={this.state.labelsColumns} />
        // else if(this.state.value==="annotate")
        //     tabContent= <Annotate />
        // else 
        //     tabContent= <Design />

        return(
            <NewChart>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={5} md={4}>
                        <ToggleButtonGroup
                            variant="outlined"
                            color="primary"
                            value={this.state.tabValue}
                            exclusive
                            size='small'
                            onChange={this.tabChangeHandler}
                            aria-label="Chart tabs"
                        >
                            <ToggleButton classes={{root:classes.root,selected:classes.selected}} 
                                value="types">
                                Chart type
                            </ToggleButton>
                            <ToggleButton classes={{root:classes.root,selected:classes.selected}}
                                value="refine" >
                                Refine
                            </ToggleButton>
                            {/* <ToggleButton classes={{root:classes.root,selected:classes.selected}}
                                value="annotate" >
                                Annotate
                            </ToggleButton>
                            <ToggleButton classes={{root:classes.root,selected:classes.selected}}
                                value="design">
                                Design
                            </ToggleButton> */}
                        </ToggleButtonGroup>
                        {tabContent}
                        <Button 
                            variant="contained" 
                            size="small"
                            onClick={(event)=>{
                                this.props.decrementStepper()
                                this.props.history.goBack()
                            }}
                            className={classes.contained}
                        >{t('backButton')}</Button>
                        <Button 
                            variant="contained" 
                            color="primary"
                            size="small"
                            onClick={this.formSubmitHandler}
                            endIcon={<Icon>send</Icon>}
                            className={classes.contained}
                        >{t('submitButton')}</Button>
                    </Grid>
                    <Grid item xs={12} sm={7} md={8} position="fixed" >
                        <div className={classes.chartContainer}  >
                            <BarChart option={this.state.chartConf} />
                        </div>
                    </Grid>
                </Grid>
            </NewChart>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        chartConfig:state.chartData.chartConfig,
        tableData:state.chartData.tableData,
        selectedColumns:state.chartData.selectedColumns
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        incrementStepper:()=>dispatch(actions.incStepper(3)),
        decrementStepper:()=>dispatch(actions.decStepper(1)),
        saveChartConfigAndColumns:(config,type,columns)=>dispatch(actions.saveChartConfigAndSelectedColumns(config,type,columns))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withTranslation()(withStyles(styles)(Visualize)));