import { menuModel } from "./menuModel"

export interface articleNewModel {
    id?:number
    pageHeading?:string
    pageTitle?:string
    metaDescription?:string
    metaKeywords?:string
    pageContent?:string
    menu?:menuModel
    menuItemId?:number
    shortDescription?:string
    bannerImage?:string
  }