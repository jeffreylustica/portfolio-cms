import mongoose from "mongoose";

const fetchDocuments = async (req, res, next) => {
    const {collection} = req.params

    if (!collection) {
        return res.status(400).json({ error: "Collection name is required" });
    }

    try {
        const db = mongoose.connection.db;
        const documents = await db.collection(collection).find().toArray()
        res.status(200).json({documents})
    } catch (error) {
        console.error(`Error fetching documents from ${collection}:`, err);
        res.status(500).json({error: `Failed to fetch documents from ${collection}`})
    }
}


export default fetchDocuments