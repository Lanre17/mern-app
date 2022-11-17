
const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        // required: [true, "Please add a text value"]
    },
    content: {
        type: String,
        // required: [true, "Please add a text"]
    }
},

{
    timestamps: true,
}

)

module.exports = mongoose.model("Note", noteSchema)