import express from 'express';
import con from '../../SQL_Connect.js';

const router = express.Router();

// Rikiavimas pagal didejancia tvarka
router.get('/', async (req, res) => {
    try {
        let rikiavimasPagal = req.query.rikiavimasPagal;
        let rikiavimasPagalTvarka = req.query.rikiavimasPagalTvarka;

        if (rikiavimasPagal === undefined || rikiavimasPagal === "null") {
            rikiavimasPagal = "id";
        } else {
            rikiavimasPagal = req.query.rikiavimasPagal;
        }
        if (rikiavimasPagalTvarka === "didejanti") {
            rikiavimasPagalTvarka = "ABC";
        } else {
           rikiavimasPagalTvarka = "ZYX";
        }

        const [data] = await con.query
        (`SELECT blog.id, blog.title, blog.content 
        FROM atsiskaitymas.blog ORDER BY ${rikiavimasPagal} ${rikiavimasPagalTvarka}`);
        res.render('home', { atsiskaitymas: data, title: "Visas turinys"});
    } catch (err) {
        console.log("Klaida");
        res.send({ err: `Klaida: ${err}`});
    }
});

export default router;