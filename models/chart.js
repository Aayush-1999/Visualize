const mongoose = require("mongoose");

const ChartSchema = new mongoose.Schema({
    chartId: {type : String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    data: {
        columns: { type: Array, default: []},
        numRows: { type: Number, default: null }
    },
    config: { type: Object },
})

module.exports = mongoose.model("Chart", ChartSchema);