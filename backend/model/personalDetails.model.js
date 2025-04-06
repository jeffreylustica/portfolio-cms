import mongoose from "mongoose";

const PersonalDetailsSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }

})

const PersonalDetail = mongoose.model("PersonalDetail", PersonalDetailsSchema);

export default PersonalDetail
