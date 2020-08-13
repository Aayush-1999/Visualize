import * as actionTypes from './actionTypes';

export const saveRawData=(data)=>{
    localStorage.setItem('rawData',data)
    return{
        type:actionTypes.SAVE_RAW_DATA,
        rawData:data
    }
}

export const saveTableData=(data,columns)=>{
    localStorage.setItem('tableData',JSON.stringify(data))
    localStorage.setItem('selectedColumns',JSON.stringify(columns))
    return{
        type:actionTypes.SAVE_TABLE_DATA,
        tData:data,
        columnArray:columns
    }
}

export const saveChartConfig=(config,chartType)=>{
    return{
        type:actionTypes.SAVE_CHART_CONFIG,
        config:config,
        chartType:chartType
    }
}

export const saveChartConfigAndSelectedColumns=(config,chartType,columns)=>{
    return{
        type:actionTypes.SAVE_CHART_CONFIG_COLUMNS,
        config:config,
        chartType:chartType,
        columns:columns
    }
}

export const checkRawData=()=>{
    return dispatch=>{
        const rawData=localStorage.getItem('rawData')
        if(rawData){
            dispatch(saveRawData(rawData))
        }
    }
}

export const checkTableData=()=>{
    return dispatch=>{
        const tableData=localStorage.getItem('tableData')
        const selectedColumns=localStorage.getItem('selectedColumns')
        if(tableData || selectedColumns){
            dispatch(saveTableData(tableData,selectedColumns))
        }
    }
}