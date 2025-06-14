import Experience from "../model/experience.model.js"

const createExperienceService = async (data) => {
    try {
        console.log(data)
        const createdExperience = new Experience(data);
        const savedExperience = await createdExperience.save();
        return savedExperience; 
    } catch (error) {
        console.error("Error creating employment history:", error)
        throw new Error("Failed to create employment history. Please try again.")
    }
}

export {createExperienceService}