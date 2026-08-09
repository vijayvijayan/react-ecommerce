export interface blogModel {
  blogId: number
  blogTypeName: string
  fullName: string
  viewCount: number
  blogName: string
  shortDescription: string
  createdDate: string
  blogImage: string
  activeFlag?:boolean
}