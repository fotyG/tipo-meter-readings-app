const mongoose = require("mongoose")

const TipoESchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoGSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Gāze",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoWSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Ūdens",
    },
    pavilion: {
      type: String,
    },
    meter: {
      type: String,
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: {
      type: String,
    },
  },
  { timestamps: true }
)

const TipoE48865026Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "48865026",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)
const TipoE0281935Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0281935",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)
const TipoE32878714Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "32878714",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE0282274Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0282274",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE0281679Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0281679",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE0282269_33067590Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0282269_33067590",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE0281803Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0281803",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)
const TipoE0281748Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0281748",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE0281934Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0281934",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE042268Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "042268",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE0882410Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0882410",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE327544Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "327544",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE0282299Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "0282299",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoE004165Schema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: {
      type: String,
      default: "004165",
    },
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const TipoESanitexSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Tipo",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: {
      type: String,
      default: "Sanitex",
    },
  },
  { timestamps: true }
)

const MajaESchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Māja",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const MajaGSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Māja",
    },
    type: {
      type: String,
      default: "Gāze",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const MajaWSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Māja",
    },
    type: {
      type: String,
      default: "Ūdens",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const MajaKSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Māja",
    },
    type: {
      type: String,
      default: "Kontroles/Elektrība",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const MazgatavaESchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Automazgātava",
    },
    type: {
      type: String,
      default: "Elektrība",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const MazgatavaWSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Automazgātava",
    },
    type: {
      type: String,
      default: "Ūdens",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

const MazgatavaKSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      default: "Automazgātava",
    },
    type: {
      type: String,
      default: "Kontroles/Elektrība",
    },
    pavilion: String,
    meter: String,
    reading: {
      type: Number,
      required: [true, "Please provide reading"],
    },
    client: String,
  },
  { timestamps: true }
)

/* #1 */ const TipoElectricity = mongoose.model("TipoElectricity", TipoESchema)
/* #2 */ const TipoGas = mongoose.model("TipoGas", TipoGSchema)
/* #3 */ const TipoWater = mongoose.model("TipoWater", TipoWSchema)
/* #4 */ const TipoE48865026 = mongoose.model(
  "TipoE48865026",
  TipoE48865026Schema
)
/* #5 */ const TipoE0281935 = mongoose.model("TipoE0281935", TipoE0281935Schema)
/* #6 */ const TipoE32878714 = mongoose.model(
  "TipoE32878714",
  TipoE32878714Schema
)
/* #7 */ const TipoE0282274 = mongoose.model("TipoE0282274", TipoE0282274Schema)
/* #8 */ const TipoE0281679 = mongoose.model("TipoE0281679", TipoE0281679Schema)
/* #9 */ const TipoE0282269_33067590 = mongoose.model(
  "TipoE0282269_33067590",
  TipoE0282269_33067590Schema
)
/* #10 */ const TipoE0281803 = mongoose.model(
  "TipoE0281803",
  TipoE0281803Schema
)
/* #11 */ const TipoE0281748 = mongoose.model(
  "TipoE0281748",
  TipoE0281748Schema
)
/* #12 */ const TipoE0281934 = mongoose.model(
  "TipoE0281934",
  TipoE0281934Schema
)
/* #13 */ const TipoE042268 = mongoose.model("TipoE042268", TipoE042268Schema)
/* #14 */ const TipoE0882410 = mongoose.model(
  "TipoE0882410",
  TipoE0882410Schema
)
/* #15 */ const TipoE327544 = mongoose.model("TipoE327544", TipoE327544Schema)
/* #16 */ const TipoE0282299 = mongoose.model(
  "TipoE0282299",
  TipoE0282299Schema
)
/* #17 */ const TipoE004165 = mongoose.model("TipoE004165", TipoE004165Schema)
/* #18 */ const TipoESanitex = mongoose.model(
  "TipoESanitex",
  TipoESanitexSchema
)
/* #19 */ const MajaElectricity = mongoose.model("MajaElectricity", MajaESchema)
/* #20 */ const MajaGas = mongoose.model("MajaGas", MajaGSchema)
/* #21 */ const MajaWater = mongoose.model("MajaWater", MajaWSchema)
/* #22 */ const MajaKontroles = mongoose.model("MajaKontroles", MajaKSchema)
/* #23 */ const MazgatavaElectricity = mongoose.model(
  "MazgatavaElectricity",
  MazgatavaESchema
)
/* #24 */ const MazgatavaWater = mongoose.model(
  "MazgatavaWater",
  MazgatavaWSchema
)
/* #25 */ const MazgatavaKontroles = mongoose.model(
  "MazgatavaKontroles",
  MazgatavaKSchema
)

module.exports = {
  TipoElectricity,
  TipoGas,
  TipoWater,
  TipoE48865026,
  TipoE0281935,
  TipoE32878714,
  TipoE0282274,
  TipoE0281679,
  TipoE0282269_33067590,
  TipoE0281803,
  TipoE0281748,
  TipoE0281934,
  TipoE042268,
  TipoE0882410,
  TipoE327544,
  TipoE0282299,
  TipoE004165,
  TipoESanitex,
  MajaElectricity,
  MajaGas,
  MajaWater,
  MajaKontroles,
  MazgatavaElectricity,
  MazgatavaWater,
  MazgatavaKontroles,
}
