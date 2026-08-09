import { brandModel } from "./brandModel"
import { shopCategoryModel } from "./shopCategoryModel"
import { shopSubCategoryModel } from "./shopSubCategoryModel"

export interface shopProductModel {
     shopProductId?: number
      brand?:brandModel
      shopSubCategoryId?:number
      shopSubCategory?:shopSubCategoryModel
      productName: string;
    productPrice?: number;
    productSellingPrice?: number;
    productImage?: string;
    propertyDescription?: string; // HTML string
    propertyShortDescription?: string;
    productWidth?: number;
    productHeight?: number;
    productDepth?: number;
    productWeight?: number;
    productQualityChecking?: boolean;
    productFreshnessDuration?: string;
    productWhenPacketing?: string;
    productEachBoxContains?: string;
    productQuantity?: number;
    displayInHome?: boolean;
    tempProductRequestedQuantity?:number;
  }