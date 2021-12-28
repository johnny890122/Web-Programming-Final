import mongoose from "mongoose";

import "dotenv-defaults/config.js";

async function connect () {
  mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then((res) => console.log("mongo db connection created"))
  .catch((res) => console.log("mongo db connection has not created")); // 定義 Mongo DB 的連線
}


export default { connect };