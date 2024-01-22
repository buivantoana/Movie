export interface IComment {
  Movie_Id: number
  comment_child: [
    {
      content: string
      user_Id: string
      name: string
      _id: string
      createdAt: string
      updatedAt: string
    },
  ]
  content: string
  createdAt: string
  name: string
  updatedAt: string
  user_Id: string
  _id: string
}
