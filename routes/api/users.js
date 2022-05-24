import express from 'express';
import con from '../../SQL_Connect.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [data] = await con.query("SELECT*FROM atsiskaitymas.user");
        res.send(data);
    } catch (err) {
        console.log("Klaida /api/users");
        res.send({ err: `Klaida: ${err}`});
    }
});

export default router;