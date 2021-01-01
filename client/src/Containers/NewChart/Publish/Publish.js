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
import NewChart from '../NewChart';
import BarChart from '../../../Components/Charts/BarChart/BarChart';
import axios from '../../../axiosInstance';
import * as actions from '../../../store/actions/index';
import styles from './Publish.style';

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

    render(){
        const {classes,t} = this.props;
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
                        <Typography variant="subtitle1" gutterBottom > 
                            https://datawrapper.dwcdn.net/FV92s/2/
                        </Typography>
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