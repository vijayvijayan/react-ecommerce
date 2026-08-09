export interface BlogCommentRequestDTO {
    blogId: number;
    senderName: string;
    emailId: string;
    subject: string;
    message: string;
    parentId: number;
    createdDate: string | null;
    replyCount: number;
    blogCommentId: number | null;
    replies: BlogCommentRequestDTO[] | null;
    showReplies: boolean;
    replyLevel: number | null;
}