import express from 'express';
import con from '../../SQL_Connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isAuthed from '../../auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const auth = await isAuthed(req);
        res.render('login', { css: 'index.css', isAuthed: auth });

    } catch (err) {
        res.json({ err: err });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const { name, password } = req.body;
        const [user] = await con.query(`SELECT * FROM user WHERE name = ?`, [name]);
        if (user.length === 0) return res.json({ err: 'Tokio vartotojo nera' });
        const compare = await bcrypt.compare(password, user[0].password);
        if(!compare) return res.json({ err: 'Neteisingas slaptažodis' });
        const token = jwt.sign({ name: user[0].name, id: user[0].id }, 
            process.env.SECRET_JWT_TOKEN, { expiresIn: '4h' });
        res.cookie('token', token, { maxAge: 70000, httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.json({ err: err });
    }
});

export default router;