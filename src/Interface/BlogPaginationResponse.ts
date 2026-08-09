import { blogModel } from "./blogModel"

export interface BlogPaginationResponse {
  blogs: blogModel[]
  totalCount: number
  page: number
  pageSize: number
}