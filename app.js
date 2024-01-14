const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3300;

app.use(cors());
app.use(bodyParser.json());

//add configuration to the sql database by uncommenting the below code and add valid connection details
/*
const connection = mysql.createConnection({
    host: 'your_mysql_host',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_database_name',
});
connection.connect();
*/

// I have created a userDatabase object to store the data in case sql connection is not made
var userDatabase = {}

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, userName, password, confirmPassword } = req.body;
    if (userDatabase[userName]) {
        res.json({ success: false, message: 'UserName Already Exists. Try Login using with the username or choose a new username' });
    } else {

        // uncomment the below code to insert user data into the sql database only if the connection is made
       /* 
       const sql = 'INSERT INTO users (firstName, lastName, email, userName, password, confirmPassword ) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [firstName, lastName, email, userName, password, confirmPassword], (err, result) => {
            if (err) {
                console.error('Error:', err);
                res.json({ success: false });
            } else {
                console.log('User registered successfully');
                res.json({ success: true });
            }
        });
        */


        userDatabase[userName] = { firstName, lastName, email, password, confirmPassword }
        res.json({ success: true, message: 'Signup Successful', userDatabase });
    }
});

app.post('/login', (req, res) => {
    const {loginUserName, loginPassword } = req.body;
    if (userDatabase[loginUserName] && userDatabase[loginUserName].password == loginPassword) {
        res.json({ success: true, message: 'Login Successfull' });
    } else {
        res.json({ success: false, message: 'Invalid Username/Password. Try Again.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});