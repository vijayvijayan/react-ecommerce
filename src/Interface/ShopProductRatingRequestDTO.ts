export interface ShopProductRatingRequestDTO
{
    shopProductId:number;
    senderName:string;
    emailId:string;
    phoneNumber:string;
    rating:number;
    message:string;
    createDate?:string | null;
}