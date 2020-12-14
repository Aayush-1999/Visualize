module.exports = {

    generateRandomString: function(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    generateJSONOutput: function(data){
        let parsedData = {
            columns: [],
            chartId: this.generateRandomString(5),
            dataTypeInfo: {
                1: "Date",
                2: "Number",
                3: "Boolean",
                4: "String",
                5: "Blank"
            }
        };

        for(const property in data[0]) {
            parsedData.columns.push({
                dataType: 0,
                header: property,
                values: []
            });
        }

        data.forEach(el => {
            parsedData.columns.forEach(parsedDataObj => {
                let value = el[parsedDataObj.header];
                parsedDataObj.values.push(value);
                
                //SETTING DATATYPE FIELD
                if(parsedDataObj.dataType === 0 || parsedDataObj.dataType === 5) {
                    if(/\d/.test(value) === false) {
                        if(value === "") {
                            parsedDataObj.dataType = 5;
                        }
                        else if((value === "true") || (value === "false")) {
                            parsedDataObj.dataType = 3;
                        }
                        else {
                            parsedDataObj.dataType = 4;
                        }
                    }
                    else {
                        if((value.search("-") === -1) && (value.search("/") === -1)) {
                            parsedDataObj.dataType = 2;
                        }
                        else {
                            parsedDataObj.dataType = 1;
                        }
                    }
                }
            })
        });

        parsedData.data = {};
        parsedData.data.columns = parsedData.columns;
        parsedData.data.numRows = parsedData.columns.length;
        delete parsedData.columns;
        return parsedData;
    }


}