const express = require("express");
const fs = require("fs")
const PORT = process.env || 3000;
const app = express();

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ urlencoded: true}));

require("./routes/route")(app);

app.listen(PORT, function() {
    console.log("app is live on PORT:" + PORT);
})