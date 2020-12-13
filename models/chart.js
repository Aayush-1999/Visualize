const mongoose = require("mongoose");

const ChartSchema = new mongoose.Schema({
    chartId: {type : String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    data: {
        columns: { type: Array, default: []},
        numRows: { type: Number, default: null }
    },
})

module.exports = mongoose.model("Chart", ChartSchema);