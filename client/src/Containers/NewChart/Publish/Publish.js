import React,{Component} from 'react';
import {connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import NewChart from '../NewChart';
import BarChart from '../../../Components/Charts/BarChart/BarChart';
import axios from '../../../axiosInstance';
import * as actions from '../../../store/actions/index';
import styles from './Publish.style';


let iframeCode = "<iframe title='[ Insert title here ]' aria-label='Bar Chart' id='datawrapper-chart-OF0SQ' src='chartLink' scrolling='no' frameborder='0' style='width: 0; min-width: 100% !important; border: none;' height='184'></iframe><script type='text/javascript'>!function(){'use strict';window.addEventListener('message',(function(a){if(void 0!==a.data['datawrapper-height'])for(var e in a.data['datawrapper-height']){var t=document.getElementById('datawrapper-chart-'+e)||document.querySelector('iframe[src*=''+e+'']');t&&(t.style.height=a.data['datawrapper-height'][e]+'px')}}))}();</script>"

class Visualize extends Component{
    constructor(props){
        super(props)
        this.state={
            chartType: "bar",
            chartConf: this.props.location.state.config,
            shareLink: this.props.location.state.resObj
        }
    }

    // componentDidMount(){
    //     // console.log(initialChartConfig)
    // }

    addToolboxConfig(){
        let initialChartConfig = this.state.chartConf;
        const toolBoxConfig = {
            show: true,
            showTitle: true,
            feature: {
                magicType: {
                    title: {
                        line: 'Line chart',
                        bar: 'Bar chart'
                    }, 
                    show: true,
                    type: ['line', 'bar']},
                restore: {title: 'Restore', show: true},
                saveAsImage: {title: 'Save As Image', show: true, type: 'png'}
            }
        }
        initialChartConfig.toolbox = {...toolBoxConfig}
        return initialChartConfig;
    }

    formSubmitHandler=(event)=>{
        event.preventDefault();
        const formData = {};
        formData.chartId = this.state.data.data.chartId;
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
                    pathname:"/chart/publish",
                    state:{
                        config: this.state.chartConf
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })   
    }

    copyToClipboard = () => {
        const context = this.textArea;
        console.log(context)
        context.select();
        document.execCommand("copy");
    }

    render(){
        const {classes,t} = this.props;
        const embedCode = iframeCode.replace('chartLink', this.state.shareLink.embeddedLink)

        return(
            <NewChart>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={5} md={4}>
                        <Typography variant="body2" gutterBottom > 
                            {t('NewChart.publishAndEmbed.note')}
                        </Typography>
                        <Typography variant="h5" gutterBottom className={classes.heading}> 
                            {t('NewChart.publishAndEmbed.heading')}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom className={classes.container}> 
                            {t('NewChart.publishAndEmbed.subHeading1')}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom > 
                           <a href={"///"+this.state.shareLink.embeddedLink} target="_blank">{ this.state.shareLink.embeddedLink}</a>
                        </Typography>
                        <Divider className={classes.dividerSpacing}/>
                        <Typography variant="subtitle2" gutterBottom className={classes.container}> 
                            {t('NewChart.publishAndEmbed.subHeading2')}
                        </Typography>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                                <TextareaAutosize aria-label="iframe embed code" input rowsMax={2} placeholder={embedCode} ref={(textarea) => this.textArea = textarea} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    size="small"
                                    onClick={this.copyToClipboard}
                                    startIcon={<FileCopyIcon />}
                                >
                                    Copy
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={7} md={8} position="fixed" >
                        <div className={classes.chartContainer}  >
                            <BarChart option={this.addToolboxConfig()} />
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
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        saveChartConfigAndColumns:(config,type,columns)=>dispatch(actions.saveChartConfigAndSelectedColumns(config,type,columns))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withTranslation()(withStyles(styles)(Visualize)));