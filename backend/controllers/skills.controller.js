import { createSkillService, updateSkillService, deleteSkillService } from "../services/skillService.js"

const createSkill = async (req, res, next) => {
    try {
        const skillsData = req.body
        const skill = await createSkillService(skillsData)
        res.status(201).json({details: skill, message: "Skill created successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

const updateSkill = async (req, res, next) => {
    try {
        const {id} = req.params;
        const skillData = req.body;
        const updatedSkill = await updateSkillService(id, skillData)
        res.status(200).json({details: updatedSkill, message: "Skill updated successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

const deleteSkill = async (req, res, next) => {
    try {
        const {id} = req.params
        const deletedSkill = await deleteSkillService(id);
        res.status(200).json({details: deletedSkill, message: "Skill deleted successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export {createSkill, updateSkill, deleteSkill}