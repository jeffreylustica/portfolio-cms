import createDetailsService from "../services/createDetailsService.js"

const createPersonalDetails = async(req, res, next) => {
    try {
        const personalDetailsData = req.body
        const persoanlDetail = createDetailsService(personalDetailsData)
        res.status(201).json({detail: persoanlDetail, message: "Personal detail created successfully!"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message})
    }
}

export {createPersonalDetails}