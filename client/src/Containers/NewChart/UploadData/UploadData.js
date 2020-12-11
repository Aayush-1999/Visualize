import React, { Component } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import NewChart from '../NewChart';
import axios from '../../../axiosInstance';
import styles from './UploadData.style';
import * as actions from '../../../store/actions/index';

class UploadData extends Component{
    constructor(props){
        super(props);
        const {t} = this.props;
        this.state={ 
            subHeadingText:t('NewChart.uploadData.subHeading1'),
            buttonSelected:true,
            input:{
                selectInputValue:'Select a sample dataset',
                tableData:""
            },
            file:null
        }
        this.props.checkRawData()
    }

    handleInputChange=(event,key)=>{
        let newInput=this.state.input
        newInput[key]=event.target.value
        this.setState({input:newInput})
        this.props.saveData(event.target.value)
    }

    handleSubHeadingTextChange=value=>{
        this.setState({subHeadingText:value,buttonSelected:false})
    }

    handleFileUpload=event=>{
        this.props.saveData(event.target.files[0])
        this.setState({file:event.target.files[0]},()=>this.formSubmitHandler(event,"fileUpload"))
    }

    formSubmitHandler=(event,type)=>{
        if(type!=null){
            const formData = new FormData();    
            formData.append('file',this.state.file)
            this.axiosfunction('/chart/uploadFile',formData,true)
        }
        else{
            event.preventDefault()
            if(this.state.input.tableData.length===0){
                let newInput=this.state.input
                newInput.tableData=this.props.rawData
                this.setState({input:newInput})
            }
            this.props.saveData(this.state.input.tableData)
            let tableData=String(this.state.input.tableData)
            let valuesArray = tableData.split(/[\n\r]/g).map(function(d){
                return d.split(/\s+/)
            })
            let data={
                "data":valuesArray
            }
            console.log(data)
            this.axiosfunction('/chart/uploadData',data,false)
        }
    }

    axiosfunction=(urlType,formData,isHeader)=>{
        let header;
        if(isHeader){
            header={
                'content-type': 'multipart/form-data'
            }
        }        
        axios({
            url:urlType,
            method:'POST',
            headers:header,
            data:formData
        })
        .then(response=>{
            if(response.status===200){
                this.props.incrementStepper()
                this.props.history.push({
                    pathname:"/chart/describe",
                    state:{tableData:response.data}
                });
            }
        })
        .catch(err=>{
            console.log(err);  
        })
    }

    render(){
        const {classes,t}=this.props;
        return(
            <NewChart>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={5}>
                        <Typography variant="h6" gutterBottom>
                            {t('NewChart.uploadData.heading')}
                        </Typography>
                        <Grid container spacing={3} className={classes.container} >
                            <Grid item xs={6}>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    className={this.state.buttonSelected?
                                        clsx(classes.label,classes.text,classes.iconSizeMedium)
                                        :clsx(classes.text,classes.iconSizeMedium,classes.focusVisible)}
                                    startIcon={<FileCopyIcon  />}
                                    onClick={()=>this.handleSubHeadingTextChange(t('NewChart.uploadData.subHeading1'))}
                                >
                                    {t('NewChart.uploadData.button1')}
                                </Button>
                            </Grid>
                            <Grid item xs={6} >
                                <input
                                    accept=".csv, .xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    className={classes.input}
                                    id="button-file"
                                    type="file"
                                    onChange={(event)=>this.handleFileUpload(event)}
                                />
                                <label htmlFor="button-file">
                                    <Button  
                                        type="submit"           
                                        component="span"
                                        color="primary" 
                                        variant="outlined"
                                        className={clsx(classes.text,classes.iconSizeMedium,classes.focusVisible)}
                                        startIcon={<InsertDriveFileIcon />}
                                        onClick={()=>this.handleSubHeadingTextChange(t('NewChart.uploadData.subHeading2'))}
                                    >
                                        {t('NewChart.uploadData.button2')}
                                    </Button>
                                </label>
                            </Grid>
                        </Grid>    
                        <Typography variant="subtitle1" gutterBottom className={classes.subtitle1} >
                            {this.state.subHeadingText}
                        </Typography>
                        <Typography variant="body2" gutterBottom > 
                            {t('NewChart.uploadData.bodyPara1')}
                        </Typography>
                        <Typography variant="body2" gutterBottom ><br />
                            {t('NewChart.uploadData.bodyPara2')}
                        </Typography>
                        <Select
                            id="select"
                            margin="dense"
                            displayEmpty
                            className={clsx(classes.fullWidth,classes.marginDense)}
                            value={this.state.input.selectInputValue}
                            onChange={(event)=>this.handleInputChange(event,"selectInputValue")}
                            variant='filled'
                            MenuProps={{ anchorOrigin:{ vertical: 'top', horizontal: 'center' },
                            transformOrigin:{ vertical: 'bottom', horizontal: 'center' },
                        }}
                            >
                            <MenuItem value={this.state.input.selectInputValue}>{t('NewChart.uploadData.selectInput.default')}</MenuItem>
                            <MenuItem value={10}>{t('NewChart.uploadData.selectInput.first')}</MenuItem>
                            <MenuItem value={20}>{t('NewChart.uploadData.selectInput.second')}</MenuItem>
                            <MenuItem value={30}>{t('NewChart.uploadData.selectInput.third')}</MenuItem>
                        </Select>
                    </Grid>
                    
                    <Grid item xs={12} sm={7}>
                        <form onSubmit={(event)=>this.formSubmitHandler(event,null)} >
                            <TextField id="upload-data" required variant="outlined" multiline={true} rows={13}
                                className={classes.root}
                                label={t('NewChart.uploadData.textFieldLabel')}
                                onChange={(event)=>this.handleInputChange(event,"tableData")}
                                defaultValue={this.props.rawData}
                            />
                            <Button variant="contained" 
                                    color="primary"
                                    type="submit"
                                    endIcon={<Icon>send</Icon>}
                                    className={classes.contained}
                            >
                                {t('submitButton')}
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </NewChart>
        )
    }
}

const mapStateToProps=state=>{
    return{
        rawData:state.chartData.rawData
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        incrementStepper:()=>dispatch(actions.incStepper(1)),
        saveData:(data)=>dispatch(actions.saveRawData(data)),
        checkRawData:()=>dispatch(actions.checkRawData())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withTranslation()(withStyles(styles)(UploadData)));