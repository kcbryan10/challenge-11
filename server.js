const express = require("express");
const fs = require("fs")
const PORT = process.env.PORT || 3000;
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}))

app.get("/api/notes", (req,res) => {
    res.json(allNotes.slice(1));
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

function createNote (body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray= [];

    if(notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArray, null, 2)
    );
}

app.post("/api/notes", (req, res) => {
    const newNote = createNote(req.body, allNotes);
    res.json(newNote);
})

function deletNote(id, notesArray) {
    for(let i=0; i< notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, "./db/db.json"),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

app.post("/api/notes/:id", (req, res) => {
    deletNote(req.params.id, allNotes);
    res.json(true);
})

app.listen(PORT, function() {
    console.log("app is live on PORT:" + PORT);
})
