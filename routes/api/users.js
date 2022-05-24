import express from 'express';
import con from '../../SQL_Connect.js';

const router = express.Router();

// isvedame viska i ekrana
router.get('/', async (req, res) => {
    try {
        const [data] = await con.query("SELECT*FROM atsiskaitymas.user");
        res.send(data);
    } catch (err) {
        console.log("Klaida /api/users");
        res.send({ err: `Klaida: ${err}`});
    }
});

// isvedame user'i pagal id

router.get('/:id', async (req, res) => {
    try {
        const [data] = await con.query
        (`SELECT * FROM atsiskaitymas.user WHERE id=?`, [req.params.id]);
        if (data.length === 0) {
            res.send('Neteisingas ID, bandykite dar karta');
        } else {
            res.send(data);
        }
    } catch (err) {
        console.log('Klaida');
        res.send({ err: `Klaida: ${err}`});
    }
});

export default router;