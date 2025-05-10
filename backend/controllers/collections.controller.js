import mongoose from "mongoose";

const fetchCollections = async (req, res, next) => {
    try {
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);
        res.status(200).json({ collections: collectionNames });
    } catch (err) {
        console.error("Error fetching collections:", err);
        res.status(500).json({error: "Failed to fetch the collections"})
    }
}

export default fetchCollections