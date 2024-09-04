import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', function(req, res) {
    res.json("test ok");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const cors=require('cors')
const admin = require('firebase-admin')

const serviceAccount = require('./agrisolve-7-firebase-adminsdk-n2sgb-7015da331e.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore();

app.use(cors({
    credentials: true,
    origin:"http://localhost:5173"
}))
app.use(express.json())
app.get('/test', function(req, res){
    res.json("test ok")
})

app.get('/contracts', async (req, res) => {
    try {
        const contractsSnapshot = await db.collection('contracts').get();
        const contracts = contractsSnapshot.docs.map(doc => doc.data());
        res.json(contracts);
    } catch (error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ error: "Failed to fetch contracts" });
    }
});

app.get('/getUserData', async (req, res) => {
    const uid = req.query.uid;

    if (!uid) {
        return res.status(400).json({ error: 'UID is required' });
    }

    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = userDoc.data();
        const { name, email, type } = userData;

        res.json({ name, email, type });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

app.post('/createContract', async(req,res) => {
    const {
        product,
        quality,
        required_quancreateContracttity,
        price,
        location,
        date,
        buyerID
    } = req.body;

    try {
        const newContractRef = db.collection('contracts').doc();

        const contractData = {
            approved_application: [],
            approved_quantity: 0,
            buyerID: buyerID,
            date: date,
            location: location,
            price: Number(price),
            product: product,
            quality: quality,
            required_quantity: Number(required_quantity),
            status: "open",
        };

        await newContractRef.set(contractData);

        res.status(200).json({message: 'Contract created successfully', contractId: newContractRef.id})
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).json({ error: 'Failed to create contract' });
    }
})



