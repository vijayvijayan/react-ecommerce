import { countryModel } from "./countryModel"

export interface stateModel
{
    stateId?:number
    stateName?:string
      countryId: number
  country: countryModel
}