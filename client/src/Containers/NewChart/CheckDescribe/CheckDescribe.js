import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Alert from '@material-ui/lab/Alert';
import NewChart from '../NewChart';
import Table from '../../../Components/Table/Table';
import CheckboxTable from '../../../Components/Table/TableWithCheckbox';
import axios from '../../../axiosInstance';
import * as actions from '../../../store/actions/index';
import styles from './CheckDescribe.style';

class CheckDescribe extends Component{
    constructor(props){
        super(props)
        this.state={
            checked:true,
            selected:[],
            newHeaders:[],
            tabledata:this.props.location.state.tableData 
        }
        
    }

    static getDerivedStateFromProps(props,state){
        if(localStorage.getItem('tableData')!==null || localStorage.getItem('selectedColumns')!==null){
            return{
                tabledata:JSON.parse(localStorage.getItem('tableData')),
                selected:JSON.parse(localStorage.getItem('selectedColumns'))
            }
        }
        return null;
    }

    handleChecked=()=>{
        this.setState({checked:!this.state.checked, selected: []});
        this.props.saveData(this.state.tabledata,[]);
    }

    handleCheckboxClick = (event, name) => {
        const selectedIndex = this.state.selected.indexOf(name)
        let newSelected = []
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(this.state.selected, name)
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(this.state.selected.slice(1))
        } else if (selectedIndex === this.state.selected.length - 1) {
          newSelected = newSelected.concat(this.state.selected.slice(0, -1))
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            this.state.selected.slice(0, selectedIndex),
            this.state.selected.slice(selectedIndex + 1),
          )
        }
        this.setState({selected:newSelected});
        this.props.saveData(this.state.tabledata,newSelected);
    }

    isSelected = name => this.state.selected.indexOf(name) !== -1

    handleDatatypeUpdate=(value,index)=>{
        let newData=this.state.tabledata
        newData.data.columns[index].dataType= value
        this.props.saveData(newData,this.state.selected)
        this.setState({tableData:newData})
    }

    handleTableHeaderUpdate=(event,index)=>{
        let newData = this.state.tabledata;
        newData.data.columns[index].header=event.target.value;
        this.setState({tabledata:newData})
        this.props.saveData(newData,this.state.selected)
    }

    handleNewHeaderUpdate=(event,index)=>{
        let header=this.state.newHeaders;
        header.splice(index,1,event.target.value);
        this.setState({newHeaders:header})
    }

    handleTableCellsUpdate=(event,rowIndex,colIndex)=>{
        let newData = this.state.tabledata;
        newData.data.columns[rowIndex].values[colIndex]=event.target.value
        this.setState({tabledata:newData})
        this.props.saveData(newData,this.state.selected)
    }

    formSubmitHandler=(event)=>{
        event.preventDefault()
        if(this.state.selected.length>=2){
            if(this.state.checked){
                let dataWithoutHeader={"data":{},"chartId":''}
                dataWithoutHeader.data.columns=this.state.tabledata.data.columns;
                dataWithoutHeader.data.numRows=this.state.tabledata.data.numRows;
                dataWithoutHeader.chartId=this.state.tabledata.chartId;
                this.props.saveData(dataWithoutHeader,this.state.selected)
                this.axiosfunction('/chart/uploadVerifiedData',dataWithoutHeader)
            }
            else{
                let dataWithHeader={"data":{},"chartId":''}
                dataWithHeader.data.columns=this.state.tabledata.data.columns;
                dataWithHeader.data.numRows=this.state.tabledata.data.numRows + 1;
                dataWithHeader.chartId=this.state.tabledata.chartId;
                for(let i=0;i<this.state.tabledata.data.numRows;i++){
                    let val=dataWithHeader.data.columns[i].header;
                    dataWithHeader.data.columns[i].values.unshift(val);
                    dataWithHeader.data.columns[i].header=this.state.newHeaders[i];
                }
                this.props.saveData(dataWithHeader,this.state.selected);
                this.axiosfunction('/chart/uploadVerifiedData',dataWithHeader);
            }
        }
    }

    axiosfunction=(urlType,formData)=>{
        formData.token = this.props.userToken;
        axios({
            url:urlType,
            method:'POST',
            data:formData
        })
        .then(response=>{
            if(response.status===200){
                this.props.incrementStepper()
                this.props.history.push({
                    pathname:"/chart/visualize",
                    state:{
                        updatedTableData:formData,
                        selectedColumns:this.state.selected
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render(){
        const {classes,t}=this.props;
        if(this.state.newHeaders.length===0){
            for(let i=0;i<this.state.tabledata.data.columns.length;i++){
                this.state.newHeaders.push("h"+(i+1));
            }
        }

        return(
            <NewChart>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            {t('NewChart.checkDescribe.heading')}
                        </Typography>
                        <Typography variant="body2"  gutterBottom className={classes.body2} > 
                            {t('NewChart.checkDescribe.body.part1')}
                            <span className={classes.chipNumber}>{t('NewChart.checkDescribe.body.number')}</span>
                            {t('NewChart.checkDescribe.body.part2')}
                            <span className={classes.chipDate}>{t('NewChart.checkDescribe.body.date')}</span>
                            {t('NewChart.checkDescribe.body.part3')} 
                            <span className={classes.chipText}>{t('NewChart.checkDescribe.body.text')}</span>
                            {t('NewChart.checkDescribe.body.part4')} 
                            <span className={classes.chipProblem}>{t('NewChart.checkDescribe.body.red')}</span>
                            {t('NewChart.checkDescribe.body.part5')}
                        </Typography>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleChecked}
                                value="checked"
                                color="primary"
                            />
                            }
                            label={t('NewChart.checkDescribe.checkbox')}
                        />
                        <div className={classes.tableTopMargin}>
                            <CheckboxTable
                                tabledata={this.state.tabledata}
                                dataTypeUpdate={this.handleDatatypeUpdate}
                                checkboxClick={this.handleCheckboxClick}
                                selected={this.isSelected}
                                headerUpdate={this.handleTableHeaderUpdate}
                                isChecked={this.state.checked}
                                newHeaderValues={this.state.newHeaders}
                                newHeaderUpdate={this.handleNewHeaderUpdate}
                            />
                        </div>
                        {this.state.selected.length<2?
                        <Alert severity="error" className={classes.alertMessage} >{t('NewChart.checkDescribe.headerTableMessage')}</Alert>
                        :null}
                        <Button 
                            variant="contained" 
                            size="small"
                            onClick={(event)=>{
                                this.props.decrementStepper() 
                                this.props.history.goBack()}
                            }
                            className={classes.contained}
                        >{t('backButton')}</Button>
                        <Button 
                            variant="contained" 
                            color="primary"
                            size="small"
                            disabled = {this.state.selected.length >=2 ? false: true}
                            onClick={this.formSubmitHandler}
                            endIcon={<Icon>send</Icon>}
                            className={classes.contained}
                        >{t('submitButton')}</Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className={classes.dataTable}>
                        <Typography variant="caption" display="block" align="right" 
                            gutterBottom color="textSecondary" >
                            {t('NewChart.checkDescribe.doubleClickMessage')}
                        </Typography>
                            <Table 
                                selected={this.isSelected}
                                isChecked={this.state.checked} 
                                tabledata={this.state.tabledata}
                                headerUpdate={this.handleTableHeaderUpdate}
                                tableCellsUpdate={this.handleTableCellsUpdate}
                                newHeaderUpdate={this.handleNewHeaderUpdate}
                                newHeaderValues={this.state.newHeaders}
                            />
                        </div>     
                    </Grid>
                </Grid>
            </NewChart>
        )
    }
}

const mapStateToProps=state=>{
    return{
        updatedTableData:state.chartData.tableData,
        updatedSelectedColumns:state.chartData.selectedColumns,
        userToken: state.auth.token,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        incrementStepper:()=>dispatch(actions.incStepper(2)),
        decrementStepper:()=>dispatch(actions.decStepper(0)),
        saveData:(data, selectedColumns)=>dispatch(actions.saveTableData(data, selectedColumns))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withTranslation()(withStyles(styles)(CheckDescribe)));