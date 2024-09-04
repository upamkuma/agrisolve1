import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express=require('express')
const cors=require('cors')

const app= express();

app.use(cors({
    credentials: true,
    origin:"http://localhost:5173"
}))
app.use(express.json()
app.get('/test', function(req, res){
    res.json("test ok")
})
app.listen(4000)
