const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello Im An API");
});

app.get("/api", (req, res) => {
	res.send("this is the API");
});

app.use("/api/users", require("./router/users"));
app.use("/api/admin", require("./router/admin"));
app.use("/api/products", require("./router/products"));

app.listen(port, () => console.log(`http://localhost:${port}`));
