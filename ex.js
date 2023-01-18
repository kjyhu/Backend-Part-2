const express = require("express");
const app = express();
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Hello there")
});
const courses = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "IT" },
    { id: 3, name: "Digital Electronics" }
]
app.get("/api/courses", (req, res) => {
    res.send(courses)
})
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send("The course with the given ID was not found")
        return
    }
    res.send(course);
})
app.post("/api/courses", (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    if (req.body.name.length > 3) {
        courses.push(course)
    }
    else {
        res.status(400).send("Name is required and it should be a minimum of 3 characters")
    }
    res.send(course)
})
app.put("/api/courses/:id", (req,res)=> {
    const course = {
        id: req.body.id,
        name: req.body.name
    }
    if (req.body.id > courses.length) {
        res.status(404).send("No course found")
    }
    else {
        courses.splice(req.body.id-1,1, course);
    }
    res.send(course);

})
app.delete("/api/courses/:id", (req, res) => {
    const course = courses[req.body.id - 1]
    if (req.body.id > courses.length) {
        res.status(404).send("The course does not exist")
    }
    else {
        courses.splice(courses.indexOf(course), 1)
    }
    res.send(course)
})
app.listen(3000, () => {
    console.log("Listening on port 3000 ...")
})