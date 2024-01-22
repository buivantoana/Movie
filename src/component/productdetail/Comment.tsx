/* eslint-disable */
import styled from '@emotion/styled'
import { Grid, TextField } from '@mui/material'
import moment from 'moment'
import 'moment-timezone'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import './comment.css'
import { reselectDataUser } from '../../redux/reselect/reselectAuth'
import { IUser } from '@/interface/User'
import { IComment } from '@/interface/Comment'

const CustomTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgb(28, 199, 73)',
    },
    '&:hover fieldset': {
      borderColor: 'rgb(28, 199, 73)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(28, 199, 73)',
    },
  },
  '& label': {
    color: 'rgb(28, 199, 73)', // Màu của label mặc định
  },
  '& input': {
    color: 'white',
  },
})

export function Comment({ id }: any) {
  const [comments, setComments] = useState<IComment[]>([])
  const [newComment, setNewComment] = useState<string>('')
  const [newCommentChild, setNewCommentChild] = useState<string>('')
  const [feedBack, setFeedBack] = useState<string>('')
  const socket = io('http://localhost:4000')
  let user: IUser = useSelector(reselectDataUser)
  
  useEffect(() => {
    // Kết nối đến server

    // Gửi sự kiện "joinProductRoom" để tham gia vào phòng của sản phẩm
    socket.emit('getCommentsForProduct', Number(id))

    // Xử lý sự kiện "allComments" khi nhận được danh sách bình luận từ server
    socket.on('allComments', (receivedComments) => {
      setComments(receivedComments)
    })

    // Xử lý sự kiện "newComment" khi có một bình luận mới
    socket.on('newComment', (newComment) => {
      setComments((prevComments: any) => [...prevComments, newComment])
    })

    socket.on('deletedComment', ({ commentId }) => {
      setComments((prevComments: any) =>
        prevComments.filter((comment: any) => comment._id !== commentId),
      )
    })
    socket.on('updatedComment', (updateComment: any) => {
      setComments(updateComment)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleCommentSubmit = () => {
    socket.emit('comment', {
      text: newComment,
      user_Id: user.id,
      name: user.name,
      Movie_Id: Number(id),
    })

    setNewComment('')
  }

  function handleDelete(id: string) {
    socket.emit('deleteComment', id)
  }

  function handleDeleteChild(idParent: string, idChild: string) {
    socket.emit('deleteCommentChild', { idParent, idChild })
  }
  function handleFeedback(id: string) {
    setFeedBack(id)
  }
  function handleFeedBackSubmit(id: string) {
    socket.emit('updateComment', {
      id,
      updatedContent: {
        user_Id: user.id,
        content: newCommentChild,
        name: user.name,
      },
    })
    setFeedBack('')
    setNewCommentChild('')
  }
  console.log(comments)
  return (
    <div
      style={{
        background: 'rgba(255,255,255,.2)',
        padding: '10px 20px',
        marginTop: '20px',
        borderRadius: '5px',
      }}
    >
      <h2 style={{ margin: '15px 0', color: 'yellow' }}>Bình luận</h2>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <CustomTextField
            id='outlined-basic'
            size='small'
            label='Nội dung'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant='outlined'
          />
        </Grid>

        <Grid item xs={2} textAlign={'center'}>
          <button
            onClick={handleCommentSubmit}
            style={{
              background: 'rgb(28, 199, 73)',
              color: 'white',
              fontWeight: '600',
              borderRadius: '5px',
              padding: '10px',
              border: 'none',
            }}
          >
            Bình luận
          </button>
        </Grid>
      </Grid>
      {comments[0] ? (
        <div className='comments-container'>
          <h3 style={{ margin: '15px 0', color: 'yellow' }}>
            Tất cả bình luận
          </h3>
          <ul id='comments-list' className='comments-list'>
            {comments &&
              comments.length &&
              comments.map((itemParent: IComment) => {
                const vietnamTime = moment
                  .utc(itemParent.createdAt)
                  .tz('Asia/Ho_Chi_Minh')
                  .format('YYYY-MM-DD HH:mm:ss')

                return (
                  <li key={itemParent.name}>
                    <div className='comment-main-level'>
                      {/* Avatar */}
                      <div className='comment-avatar'>
                        <img
                          src='http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg'
                          alt=''
                        />
                      </div>
                      {/* Contenedor del Comentario */}
                      <div className='comment-box'>
                        <div className='comment-head'>
                          <h6
                            className='comment-name by-author'
                            style={{ margin: '0 10px' }}
                          >
                            <a href='http://creaticode.com/blog'>
                              {itemParent.name}
                            </a>
                          </h6>
                          <span>{vietnamTime}</span>
                          <p
                            onClick={() => handleFeedback(itemParent._id)}
                            style={{ color: 'black', margin: '0 5px' }}
                          >
                            Phản hồi{' '}
                          </p>
                          <i className='fa fa-heart' />
                          {user && user.id === itemParent.user_Id && (
                            <p
                              onClick={() => handleDelete(itemParent._id)}
                              style={{ color: 'black', margin: '0 5px' }}
                            >
                              Xóa{' '}
                            </p>
                          )}
                        </div>
                        <div className='comment-content'>
                          {itemParent.content}
                        </div>
                      </div>
                    </div>

                    {feedBack !== itemParent._id ? (
                      <div>
                        {itemParent.comment_child[0] ? (
                          <ul className='comments-list reply-list'>
                            {itemParent.comment_child.length &&
                              itemParent.comment_child.map((item: any) => {
                                const vietnamTime = moment
                                  .utc(item.createdAt)
                                  .tz('Asia/Ho_Chi_Minh')
                                  .format('YYYY-MM-DD HH:mm:ss')

                                return (
                                  <li key={item.user_Id}>
                                    <div className='comment-avatar'>
                                      <img
                                        src='http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg'
                                        alt=''
                                      />
                                    </div>

                                    <div className='comment-box'>
                                      <div className='comment-head'>
                                        <h6
                                          className='comment-name'
                                          style={{ margin: '0 10px' }}
                                        >
                                          <a href='http://creaticode.com/blog'>
                                            {item.name}
                                          </a>
                                        </h6>
                                        <span>{vietnamTime}</span>
                                        <i className='fa fa-heart' />
                                        {user && user.id === item.user_Id && (
                                          <p
                                            onClick={() =>
                                              handleDeleteChild(
                                                itemParent._id,
                                                item._id,
                                              )
                                            }
                                            style={{
                                              color: 'black',
                                              margin: '0 5px',
                                            }}
                                          >
                                            Xóa{' '}
                                          </p>
                                        )}
                                      </div>
                                      <div className='comment-content'>
                                        {item.content}
                                      </div>
                                    </div>
                                  </li>
                                )
                              })}
                          </ul>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      <ul className='comments-list reply-list'>
                        <li>
                          <div className='comment-avatar'>
                            <img
                              src='http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg'
                              alt=''
                            />
                          </div>

                          <div className='comment-box'>
                            <div className='comment-head'>
                              <Grid container spacing={2}>
                                <Grid item xs={5}>
                                  <CustomTextField
                                    id='outlined-basic'
                                    size='small'
                                    label='Nội dung'
                                    value={newCommentChild}
                                    onChange={(e) =>
                                      setNewCommentChild(e.target.value)
                                    }
                                    variant='outlined'
                                  />
                                </Grid>

                                <Grid item xs={2} textAlign={'center'}>
                                  <button
                                    onClick={() =>
                                      handleFeedBackSubmit(itemParent._id)
                                    }
                                    style={{
                                      background: 'rgb(28, 199, 73)',
                                      color: 'white',
                                      fontWeight: '600',
                                      borderRadius: '5px',
                                      padding: '10px 8px',
                                      border: 'none',
                                    }}
                                  >
                                    Phản hồi
                                  </button>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </li>
                      </ul>
                    )}
                  </li>
                )
              })}
          </ul>
        </div>
      ) : (
        <div>
          <h3
            style={{ textAlign: 'center', margin: '20px 0', color: 'yellow' }}
          >
            Không có bình luận nào
          </h3>
        </div>
      )}
    </div>
  )
}
