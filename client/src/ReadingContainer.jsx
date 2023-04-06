import Reading from "./Reading"
const ReadingContainer = () => {
  return (
    <div className="bg-violet-50 h-screen">
      <div className="grid grid-cols-8 p-2 text-teal-950 text-center border-b-gray-400 border-solid border font-bold">
        <h4 className="">Datums</h4>
        <h4 className="">Rādījums</h4>
        <h4 className="">Patēriņš</h4>
        <h4 className="">Klients</h4>
        <h4 className="">Tips</h4>
        <h4 className="">Objekts</h4>
        <h4 className="">Lokācija</h4>
        <h4 className="">Skaitītāja Nr.</h4>
      </div>
      <Reading skaititajs={"tipoe"} />
      <Reading skaititajs={"tipog"} />
      <Reading skaititajs={"tipow"} />
      <Reading skaititajs={"TipoE48865026"} />
      <Reading skaititajs={"TipoE32878714"} />
      <Reading skaititajs={"TipoE0281935"} />
      <Reading skaititajs={"TipoE0282274"} />
      <Reading skaititajs={"TipoE0281679"} />
      <Reading skaititajs={"TipoE0282269_33067590"} />
      <Reading skaititajs={"TipoE0281803"} />
      <Reading skaititajs={"TipoE0281748"} />
      <Reading skaititajs={"TipoE0281934"} />
      <Reading skaititajs={"TipoE042268"} />
      <Reading skaititajs={"TipoE0882410"} />
      <Reading skaititajs={"TipoE327544"} />
      <Reading skaititajs={"TipoE0282299"} />
      <Reading skaititajs={"TipoE004165"} />
      <Reading skaititajs={"TipoESanitex"} />
      <Reading skaititajs={"majaElectricity"} />
      <Reading skaititajs={"majaGas"} />
      <Reading skaititajs={"majaWater"} />
      <Reading skaititajs={"majaKontroles"} />
      <Reading skaititajs={"mazgatavaElectricity"} />
      <Reading skaititajs={"mazgatavaWater"} />
      <Reading skaititajs={"mazgatavaKontroles"} />
    </div>
  )
}
export default ReadingContainer