import axios from "axios"
import { useState } from "react"

const CreateReading = () => {
  useState()
  return (
    <form className="flex flex-col gap-2 w-64 mx-auto">
      <input type="text" placeholder="property" />
      <input type="text" placeholder="type" />
      <input type="text" placeholder="pavilion" />
      <input type="text" placeholder="meter" />
      <input type="text" placeholder="reading" />
      <input type="text" placeholder="client" />
      <button>Submit</button>
    </form>
  )
}
export default CreateReading