const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
      await mongoose.connect(process.env.DB_URL, {
          useNewUrlParse: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex:true,
          dbName:"node_send",
        
      })
      console.info("Db conectada")
  } catch (error) {
      console.error(error)
      process.exit(1);
  }

};

module.exports = conectarDB;
