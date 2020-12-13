const express      = require("express"),
      router       = express.Router(),
      path         = require("path"),
      utils        = require("../utils/functions"),
      multer       = require("multer"),
      XLSX         = require('xlsx');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/aayush_a/Downloads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
   
const upload = multer({ storage: storage });

router.post("/uploadFile", upload.single('file'), async(req,res)=>{
    try{  
        //CHECK FILE TYPE
        const file = req.file;
        let x = file.originalname.split('.').pop();

        const workbook = XLSX.readFile(file.path, {cellDates: true});
        const sheet_name_list = workbook.SheetNames;
        const tableData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { raw: false, defval: ""});
        const result = utils.generateJSONOutput(tableData)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Some server error occured"});
    }
})

module.exports=router;