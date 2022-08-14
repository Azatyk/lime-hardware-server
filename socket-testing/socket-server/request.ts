const app = require("express")();

app.get("/test", (req: any, res: any) => {
  res.send("OK");
  res.status(200);
});

app.listen(3000, () => {
  console.log("Server working on 3000 port");
});
