export default theme=>({
    contained:{
        marginTop:theme.spacing(3),
        marginRight:'3%' ,
        float:'right'
    },
    container:{
        padding:theme.spacing(1)
    },
    focusVisible:{
        '&:focus':{
            backgroundColor: '#e8eaf6'
        }
    },
    fullWidth:{
        width:'75%'
    },
    input:{
        display:'none'
    },
    iconSizeMedium:{
       '& > * :first-child': {
        fontSize:'30px'
    }},
    label:{
        backgroundColor: '#e8eaf6'
    },
    marginDense:{
        marginTop:theme.spacing(2)
    },
    root:{
        marginTop:theme.spacing(1),
        width:'97%',
        backgroundColor:'#fff'
    },
    subtitle1:{
        fontWeight:'500',
        marginTop:theme.spacing(2)
    },
    text:{
        textTransform:'none',
        fontWeight:'inherit',
    }
})