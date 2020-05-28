import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Appearance from '../../../../Components/ChartVisualize/Refine/Appearance';
import SelectLayout from '../../../../Components/ChartVisualize/Refine/Components/SelectLayout/SelectLayout';
import RadioLayout from '../../../../Components/ChartVisualize/Refine/Components/RadioLayout/RadioLayout';
import styles from './Refine.style';
import * as actions from '../../../../store/actions/index';

class Refine extends Component{
  state={
    chartConfig:this.props.chartConfig[this.props.type],
    showValues:false,
    showGridLines:false,
    groupBars:false
  }

  showValueHandler=()=>{
    this.setState(prevState=>({showValues:!prevState.showValues}))
  }

  showGridLinesHandler=()=>{
    this.setState(prevState=>({showGridLines:!prevState.showGridLines}))
  }

  groupBarsHandler=()=>{
    this.setState(prevState=>({groupBars:!prevState.groupBars}))
  }

  updateBarHandler=(event)=>{
    console.log(event.target.value)
    let updatedColumns=this.props.columns
    updatedColumns[0]=event.target.value
    this.props.saveChartConfigAndColumns(this.props.chartConfig,'bar',updatedColumns)
  }

  updateLabelHandler=(event)=>{
    console.log(event.target.value)
    let updatedColumns=this.props.columns
    updatedColumns[1]=event.target.value
    this.props.saveChartConfigAndColumns(this.props.chartConfig,'bar',updatedColumns)
  }

  render(){
    const {classes} = this.props

    return(
      <div className={classes.root}>
        <div className={classes.refineSection}>
          <Typography variant="h6" classes={{root:classes.sectionHeading}} gutterBottom>Bars</Typography>
          <SelectLayout label="Select column" showTooltip={true} 
            tooltipTitle="Select the data column that contains the numeric values to be shown in the bar chart."
            data={this.props.barsColumns} defaultValue={this.props.columns[0]} 
            selectColumn={this.updateBarHandler} />
        </div>
        <div className={classes.refineSection}>
          <Typography variant="h6" classes={{root:classes.sectionHeading}} gutterBottom>Labels</Typography>     
          <SelectLayout label="Select column" showTooltip={true} 
            tooltipTitle="Select the data column that contains the category labels to be shown for each bar."
            data={this.props.labelsColumns} defaultValue={this.props.columns[1]} 
            selectColumn={this.updateLabelHandler}
          />
          <RadioLayout label="Label alignment" option1="left" option2="right"/>
          <FormGroup>
            <FormControlLabel control={
              <Switch
                // checked={state.checkedB} onChange={handleChange} 
                color="primary" size="small" />
              } label="Move labels to separate line" classes={{label:classes.switchLabel}}/>
          </FormGroup>
          <Divider className={classes.divider} />
          <FormGroup>
            <FormControlLabel control={
              <Switch
                checked={this.state.showValues} onChange={this.showValueHandler} 
                color="primary" size="small" />
              } label="Show values" classes={{label:classes.switchLabel}} />
          </FormGroup>
          {this.state.showValues?
            <div className={classes.subFieldSection} >
              <RadioLayout label="Label alignment" option1="left" option2="right"/>
              <SelectLayout label="Number format" showTooltip={false}/>
            </div>:null}
          <Divider className={classes.divider}/>
          <FormGroup>
            <FormControlLabel control={
              <Switch
                // checked={state.checkedB} onChange={handleChange} 
                color="primary" size="small" />
              } label="Swap labels and values" classes={{label:classes.switchLabel}} />
          </FormGroup>
        </div>
        <div className={classes.refineSection}>
          <Typography variant="h6" classes={{root:classes.sectionHeading}} gutterBottom>Horizontal Axis</Typography>
          <Typography variant="body2" display="inline" align="left" >Custom range</Typography>
          <TextField id="minRange" size="small" className={classes.rangeInput} InputProps={{ classes: { input: classes.input } }} label="min" variant="outlined" />
          <TextField id="maxRange" size="small" className={classes.rangeInput} InputProps={{ classes: { input: classes.input } }} label="max" variant="outlined" />
          <FormGroup>
            <FormControlLabel control={
              <Switch
                checked={this.state.showGridLines} onChange={this.showGridLinesHandler} 
                name="checkedB" color="primary" size="small" />
              } label="Grid lines" classes={{label:classes.switchLabel}} />
          </FormGroup>
          {this.state.showGridLines?
            <div className={classes.subFieldSection}>
              <TextField id="gridLines" size="small" className={classes.gridInput} InputProps={{ classes: { input: classes.input } }} variant="outlined"label="Custom grid lines" /> 
              <RadioLayout label="Tick position" option1="above" option2="below"/>
            </div>:null
          } 
        </div>
        <div className={classes.refineSection}>
          <Typography variant="h6" classes={{root:classes.sectionHeading}} gutterBottom>Appearance</Typography>
          <Appearance />
        </div>
        <div className={classes.refineSection}>
          <Typography variant="h6" classes={{root:classes.sectionHeading}} gutterBottom>Sorting & Grouping </Typography>
          <FormGroup>
            <FormControlLabel control={
              <Switch
                // checked={state.checkedB} onChange={handleChange} 
                color="primary" size="small" />
              } label="Sort bars" classes={{label:classes.switchLabel}}/>
          </FormGroup>
          <Divider className={classes.divider} />
          <FormGroup>
            <FormControlLabel control={
              <Switch
                // checked={state.checkedB} onChange={handleChange} 
                color="primary" size="small" />
              } label="Reverse order" classes={{label:classes.switchLabel}}/>
          </FormGroup>
          <Divider className={classes.divider} />
          <FormGroup>
            <FormControlLabel control={
              <Switch
                checked={this.state.groupBars} onChange={this.groupBarsHandler} 
                color="primary" size="small" />
              } label="Group bars by column" classes={{label:classes.switchLabel}}/>
          </FormGroup>
          {this.state.groupBars?
          <div className={classes.subFieldLastSection}>
            <SelectLayout label="Select column" showTooltip={false}/>
            <FormGroup>
            <FormControlLabel control={
              <Switch
                // checked={state.checkedB} onChange={handleChange} 
                color="primary" size="small" />
              } label="Show group labels" classes={{label:classes.switchLabel,root:classes.showgroupLabel}}/>
            </FormGroup><FormGroup>
            <Divider className={classes.divider} />
            <FormControlLabel control={
              <Switch
                // checked={state.checkedB} onChange={handleChange} 
                color="primary" size="small" />
              } label="Show bar labels" classes={{label:classes.switchLabel}}/>
            </FormGroup>
          </div>:null}
        </div>
      </div>
    )
  }    
}

const mapStateToProps=state=>{
  return{
    chartConfig:state.chartData.chartConfig,
    tableData:state.chartData.tableData,
    columns:state.chartData.selectedColumns
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    saveChartConfigAndColumns:(config,type,columns)=>dispatch(actions.saveChartConfigAndSelectedColumns(config,type,columns))
    // updateChartConfig:(config,type)=>{dispatch(actions.saveChartConfig(config,type))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Refine))