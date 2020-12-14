export default theme=>({
    chartContainer:{
        marginTop:theme.spacing(5),
        marginRight:theme.spacing(2),
        marginLeft:theme.spacing(2),
        border:'1px solid  rgba(0,0,0,0.2)'
    },
    container:{
        marginTop:theme.spacing(1)
    },
    contained:{
        marginTop:theme.spacing(3),
        margin:theme.spacing(1)
    },
    dividerSpacing: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    heading: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    root:{
        color:theme.palette.primary.main,
        '&$selected':{
            backgroundColor: '#e8eaf6',
            color:theme.palette.primary.main,
            borderLeft:'1px solid rgba(0,0,0,0.12)'
        }
    },
    selected:{},
})
