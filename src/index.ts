import { DbConnect } from "./data-source";
import server from "./server";


const PORT = process.env.PORT || 3500;

DbConnect();
server.get('/', (req, res) => {
  return res.send("Hello World!!!");
})

server.listen(PORT, () => {
  console.log(`Server Listening to PORT: ${PORT}`);
});


