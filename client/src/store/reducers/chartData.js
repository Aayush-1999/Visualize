import * as actionTypes from '../actions/actionTypes';

const initialStore={
    chartConfig:{
        bar:{
            color: ['#3f51b5'],
            backgroundColor:['#fff'],
            title: {
                text:'',
                subtext: '',
        
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: []
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: [],
                axisTick: {
                    alignWithLabel: true
                }
            },
            series: [
                // {
                //     name: '',
                //     type: 'bar',
                //     data: []
                // }
            ]
        }
    },
    rawData: "",
    tableData: null,
    selectedColumns: null,
}

const reducer=(state=initialStore,action)=>{
    switch(action.type){
        case actionTypes.SAVE_RAW_DATA : 
            return{
                ...state,
                rawData:action.rawData
            }
        case actionTypes.SAVE_TABLE_DATA:
            return{
                ...state,
                tableData:action.tData,
                selectedColumns:action.columnArray
            }
        case actionTypes.SAVE_CHART_CONFIG:
            return{
                ...state,
                chartConfig:{
                    ...state.chartConfig,
                    [action.chartType]:action.config
                }
            }
        case actionTypes.SAVE_CHART_CONFIG_COLUMNS:
            return{
                ...state,
                chartConfig:{
                    ...state.chartConfig,
                    [action.chartType]:action.config
                },
                selectedColumns:action.columns
            }
        default: return state
    }
}

export default reducer;