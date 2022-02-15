
//express inicial
const express = require('express')
const app = express()

// Routes
app.use('/equipamentos', require('./routes/equipamentos'))

app.use('/loja', require('./routes/loja'))

app.listen(5000, () => console.log(`Server running on port 5000`))