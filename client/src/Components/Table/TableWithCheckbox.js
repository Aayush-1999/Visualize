import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#eceff1',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function CheckboxTable(props) {
  const [clickedRows,setClickedRow] = React.useState([]);

  const findDataType=(type)=>{
    if(type===1) return "Date";
    else if(type===2) return "Number";
    else if(type===3) return "Boolean";
    else if(type===4) return "Text";
    else if(type==null) return "Null";
  }

  const findIndexFromDataType=(type)=>{
    if(type==="Date") return 1;
    else if(type==="Number") return 2;
    else if(type==="Boolean") return 3;
    else if(type==="Text") return 4;
    else if(type==="Blank") return 5;
  }

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

  const selectDataType=(label,index)=>{
    return(
      <Select
        id="datatype-select"
        margin="dense"
        value={label}
        onChange={(event)=>props.dataTypeUpdate(findIndexFromDataType(event.target.value),index)}
        MenuProps={{ anchorOrigin:{ vertical: 'bottom', horizontal: 'center' },
        getContentAnchorEl:null,
        transformOrigin:{ vertical: 'top', horizontal: 'center' }}}
      >
        <MenuItem value="Text">Text</MenuItem>
        <MenuItem value="Number">Number</MenuItem>
        <MenuItem value="Date">Date</MenuItem>
        <MenuItem value="Boolean">Boolean</MenuItem>
      </Select>
    )
  }  

  const tableRowsWithCheckboxes = props.tabledata.data.columns.map((column,index)=>{
    const isItemSelected = props.selected(column.header);
    let datatype= findDataType(column.dataType);
    return (    
      <TableRow 
        key={['header', index].join('_')}
        hover
        onMouseLeave={()=>handleCellSingleClick(index)}
        onDoubleClick={()=>handleCellDoubleClick(index)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox" onClick={event => props.checkboxClick(event,column.header)}>
            <Checkbox checked={isItemSelected}/>
        </TableCell>
        {props.isChecked?  
        <TableCell>{clickedRows[index]?
          <TextField value={column.header} onChange={(event)=>props.headerUpdate(event,index)} />
          :column.header}
        </TableCell>
        :
        <TableCell>{clickedRows[index]?
          <TextField value={props.newHeaderValues[index]} onChange={(event)=>props.newHeaderUpdate(event,index)} />
          :props.newHeaderValues[index]}
        </TableCell>}
        <TableCell>{clickedRows[index]?selectDataType(datatype,index):datatype}</TableCell>
      </TableRow> 
    )        
  })
  
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
            <TableRow>
                <StyledTableCell key="vis">Visualize</StyledTableCell>
                <StyledTableCell key="head">Heading</StyledTableCell>
                <StyledTableCell key="Datatype">Datatype</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {tableRowsWithCheckboxes}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CheckboxTable;