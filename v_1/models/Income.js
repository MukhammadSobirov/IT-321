let mongoose = require("mongoose")


let incomeSchema = new mongoose.Schema({
    date: String,
    income_amount: Number,
    expense_amount: Number,
})

module.exports = mongoose.model("Income", incomeSchema);