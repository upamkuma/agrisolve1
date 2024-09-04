import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express=require('express')
const cors=require('cors')
const admin = require('firebase-admin')

const serviceAccount = require('./agrisolve-7-firebase-adminsdk-n2sgb-da9e5cd090.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore();

const app= express();

app.use(cors({
    credentials: true,
    origin:"http://localhost:5173"
}))
app.use(express.json())
app.get('/contracts', async(req, res) => {
    try{
        const contractsSnapshot = await db.collection('contracts').get();
        const contracts = contractsSnapshot.docs.map(doc => doc.data());
        res.json(contracts); 
    } catch (error){
        console.error("Error fetching contracts:", error);
        res.status(500).json({error: "Failed to fetch contracts"});
    }
})

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



app.get('/test', function()=>{
    
})

app.listen(4000)
