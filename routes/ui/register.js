import express from 'express';
import con from '../../SQL_Connect.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import isAuthed from '../../auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const auth = await isAuthed(req);
        res.render('register', { css: 'index.css', isAuthed: auth});
    } catch (err) {
        res.json({ err: err});
    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password, repeatPassword } = req.body;
        if (password !== repeatPassword) return res.json({ err: 'Nesutampa slaptažodis' });
        const [nameCheck] = await con.query(`SELECT name FROM user WHERE name = ?`, [name]);
        if (nameCheck.length > 0) return res.json({ err: 'Jau yra toks vartotojo vardas' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const registeredUser = await con.query(`
        INSERT INTO user (name, email, password, register_time)
        VALUES(?, ?, ?, ?)
        `, [name, email, hashedPassword, new Date().toLocaleString('LT')]);
        const token = jwt.sign({ name: name, id: registeredUser[0].insertId }, 
            process.env.SECRET_JWT_TOKEN, { expiresIn: '4h' })
        res.cookie('token', token, { maxAge: 70000, httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.json({ err: err });
    }
});

export default router;