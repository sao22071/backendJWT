//Importar mongoose
const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const url =
      "mongodb://user-iud:1035433900@ac-jqzx7uo-shard-00-00.ppw0gjk.mongodb.net:27017,ac-jqzx7uo-shard-00-01.ppw0gjk.mongodb.net:27017,ac-jqzx7uo-shard-00-02.ppw0gjk.mongodb.net:27017/invetarios-g?ssl=true&replicaSet=atlas-52ish8-shard-0&authSource=admin&retryWrites=true&w=majority";
    await mongoose.connect(url);
    console.log("conexion exitosa");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getConnection,
};
