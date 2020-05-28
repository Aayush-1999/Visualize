import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#eceff1',
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

const useStyles = makeStyles({
   body:{
    backgroundColor:'#eceff1'
  }
});

function ChartDataTable(props) {
  const classes = useStyles();
  const [clickedRows,setClickedRow] = React.useState([]);

  const handleCellDoubleClick=(index)=>{
    let clickedRow=[];
    clickedRow[index]=true;
    setClickedRow(clickedRow)
  }

  const handleCellSingleClick=(index)=>{
    let clickedRow=[];
    clickedRow[index]=false;
    setClickedRow(clickedRow)
  }

  let primaryTableRows=[<StyledTableCell key="blankcell">&nbsp;</StyledTableCell>];
    for(let i=0;i<props.tabledata.data.columns.length;i++){
      let asciiIndex=String.fromCharCode(i+65);
      primaryTableRows.push(<StyledTableCell key={asciiIndex}>{asciiIndex}</StyledTableCell>)
    }
  
  const blankHeader=[<StyledTableCell key="startingRowIndex" className={classes.body}>0</StyledTableCell>];
  for(let i=0;i<props.tabledata.data.columns.length;i++){
    blankHeader.push(<StyledTableCell key={"h"+(i+1)}>
      {clickedRows[0]?
        <TextField value={props.newHeaderValues[i]} 
        onChange={(event)=>props.newHeaderUpdate(event,i)}/>
        :props.newHeaderValues[i]}
      </StyledTableCell>)
  }

  let tableRows=[];
    for(let i=0;i<props.tabledata.data.numRows;i++){
      if(i===0){
        tableRows.push(        
          <TableRow key={i+1} hover 
            onMouseLeave={()=>handleCellSingleClick(i+1)}
            onDoubleClick={()=>handleCellDoubleClick(i+1)} 
          >
            <TableCell className={classes.body} style={{'width':'5px'}}>{i+1}</TableCell>
            {props.tabledata.data.columns.map((column,index) => {
              return(
                <TableCell key={['header', index].join('_')} 
                  style={column.header?(
                    column.dataType===2?{color : 'blue'}:column.dataType===1?{color:'green'}:{color:'black'})
                    :{background:'#ffebee'}
                  }
                > 
                  {clickedRows[i+1]?
                  <TextField value={column.header}
                    onChange={(event)=>props.headerUpdate(event,index)} />
                  :column.header}
                </TableCell>
              )
            })}
          </TableRow>
        )
      }
      else{
        tableRows.push(
          <TableRow key={i+1} hover 
            onMouseLeave={()=>handleCellSingleClick(i+1)}
            onDoubleClick={()=>handleCellDoubleClick(i+1)} 
          >
            <TableCell className={classes.body} style={{'width':'5px'}}>{i+1}</TableCell>
            {props.tabledata.data.columns.map((column,index) => (
                <TableCell key={['value', index,i].join('_')}
                  style={column.values[i-1]?(
                    column.dataType===2?{color : 'blue'}:column.dataType===1?{color:'green'}:{color:'black'})
                  :{background:'#ffebee'}
                  }
                >
                  {clickedRows[i+1]?
                  <TextField value={column.values[i-1]} 
                    onChange={(event)=>props.tableCellsUpdate(event,index,i-1)} />
                  :column.values[i-1]}</TableCell>
            ))}    
          </TableRow>
        )
      }
    }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            {primaryTableRows}  
          </TableRow>
        </TableHead>
        <TableBody>
          {!props.isChecked?
            <TableRow key="blankHeaderRow" 
              hover 
              onMouseLeave={()=>handleCellSingleClick(0)}
              onDoubleClick={()=>handleCellDoubleClick(0)}  >
              {blankHeader}
            </TableRow>
          :null}
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ChartDataTable;