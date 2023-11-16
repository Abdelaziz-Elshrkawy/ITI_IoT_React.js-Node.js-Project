# Routes

## - User =>

### - create user

- method = post
- path = /user
- inputs {name, email, password, user_image} through body

### - login

- method = post
- path = /user/login
- inputs {email, password} through body

  - -------------------------------------------

## - Post =>

### - create post

- method = post
- path = /post
- inputs {title, body, userId, post_image}  through body

### - get posts

- method = get
- path: /post => for all posts &  /post/:userid => for user posts
- inputs {userId} through params

### - delete post

- method = delete
- path = /post/:userid/:postid
- inputs {userid, postid} through params

### - update post

- method = put
- path = /post/:userid/:postid
- inputs {title, body} through body & {userid, postid} through params
