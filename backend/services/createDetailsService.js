import PersonalDetail from "../model/personalDetails.model.js";

const createDetailsService = async (data) => {
    try {
        const {name, value} =  data;
        const createdPersonalDetail = new PersonalDetail({name, value}) 
        const savedPersonalDetail = await createdPersonalDetail.save()
        return savedPersonalDetail
    } catch (error) {
        console.error("Error creating personal detail:", error);
        throw new Error("Failed to create personal detail. Please try again.");
    }
}

export default createDetailsService