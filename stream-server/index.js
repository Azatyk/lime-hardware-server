const app = require("express")();
const fs = require("fs");
const path = require("path");
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Server up and running");
});

app.post("/", (req, res) => {
  const filePath = path.join(__dirname, "/video.mp4");
  const stream = fs.createWriteStream(filePath);

  stream.on("open", () => {
    req.pipe(stream);
  });

  stream.on("drain", () => {
    const written = parseInt(stream.bytesWritten);
    const total = parseInt(req.headers["content-length"]);
    const pWritten = ((written / total) * 100).toFixed(2);

    console.log(`Processing ... ${pWritten}%`);
  });

  stream.on("error", (err) => {
    console.log(err);
    res.status(500).send({ status: "error", err });
  });

  stream.on("close", () => {
    console.log("Done");
    res.status(200).send("Done");
  });
});

app.listen(port, () => {
  console.log("Server working in port 3000...");
});
