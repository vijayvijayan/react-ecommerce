import { shopProductModel } from "./shopProductModel";

export interface dealProductModel{
    id?:number;
    dealId?:number;
    deal?: dealProductModel;
    shopProductId?:number;
    shopProduct?:shopProductModel
}