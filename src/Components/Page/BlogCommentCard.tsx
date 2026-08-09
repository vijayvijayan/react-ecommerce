import React, { useState } from 'react'
import { useGetBlogCommentsUsingParentIdQuery, useLazyGetBlogCommentsUsingParentIdQuery } from '../../Apis/blogApi';
import { BlogCommentRequestDTO } from '../../Interface';
type CommentProps = {
  blogCommentItem:BlogCommentRequestDTO;
  onReplyClicked: (senderName: string,commentId: number) => void;
};
export const BlogCommentCard = ({blogCommentItem,onReplyClicked}:CommentProps) => {
  
const [comment, setComment] = useState<BlogCommentRequestDTO>({
  blogId: blogCommentItem.blogId,
  senderName: blogCommentItem.senderName,
  emailId: blogCommentItem.emailId,
  subject: blogCommentItem.subject,
  message: blogCommentItem.message,
  parentId: blogCommentItem.parentId,
  createdDate: blogCommentItem.createdDate,
  replyCount: blogCommentItem.replyCount,
  blogCommentId: blogCommentItem.blogCommentId,
  replies: null,
  showReplies: false,   // ✅ default here
  replyLevel: blogCommentItem.replyLevel??0
});

const [fetchReplies, { data:comment_data, isLoading:comment_loading, error:comment_error }] = useLazyGetBlogCommentsUsingParentIdQuery();
 
const handleReplies=async (cmt:BlogCommentRequestDTO)=>{

  const replies:BlogCommentRequestDTO[] = await fetchReplies({
    parentId: cmt.blogCommentId!,
    blogId: cmt.blogId
  }).unwrap();

  const replyLevelLatest=comment.replyLevel==null? 0 : comment.replyLevel+1;

  const updatedReplies = replies.map(r => ({
  ...r,
  replyLevel: replyLevelLatest
}));

  setComment({
    ...cmt,
    replies: updatedReplies,
    showReplies:true
  });
  console.log(updatedReplies);
}

  return (
     <>
     <div className={`comment-list padding-left-new-${blogCommentItem.replyLevel}`}>
            <div className="single-comment justify-content-between d-flex">
              <div className="user justify-content-between d-flex">
                <div className="thumb">
                  <img src="/img/blog/user.png" alt="" />
                </div>
                <div className="desc">
                  <h5><a href="#">{comment.senderName}</a></h5>
                  <p className="date">{comment.createdDate}</p>
                  <p className="comment">{comment.message} {comment.showReplies}</p>
                  {
                    (comment.replyCount>0) 
                    ?(
                      (comment.showReplies==false)
                      ? (<a href="javascript:void(0)"  onClick={()=>handleReplies(comment)}
                        className="btn-reply text-uppercase">{comment.showReplies ? "" : "View Replies (" + comment.replyCount + ")"}</a>)
                    :
                    ""
                    )
                    :
                    ""
                  }
                   
                </div>
              </div>
              <div className="reply-btn">
                <a href="javascript:void(0)" onClick={()=>onReplyClicked(comment.senderName,comment.blogCommentId??0)} className="btn-reply text-uppercase">reply</a>
              </div>
            </div>
          </div>
          {comment?.replies!=null && comment.replies.length>0 && comment.replies.map((item:BlogCommentRequestDTO)=>(
            <BlogCommentCard blogCommentItem={item} onReplyClicked={onReplyClicked}/>
          )

          )

          }
     </>
  )
}
