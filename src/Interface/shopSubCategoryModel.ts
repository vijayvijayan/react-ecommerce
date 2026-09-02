import { shopCategoryModel } from "./shopCategoryModel"

export interface shopSubCategoryModel{
    shopSubCategoryId?: number 
    shopSubCategoryName?: string
    shopCategoryId?: number
    shopProductCount?:number
}