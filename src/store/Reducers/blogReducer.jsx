const reducer = (blogs = [], action) => {
    switch (action.type) {
        case "VIEW_BLOGS":
            return action.blogs
        case "VIEW_USER_BLOGS":
            return action.payload
        case "ADD_BLOG":
            return [action.blogs.data, ...blogs]
        default:
            return blogs
    }
}
const SingleBlogreducer = (blog = [], action) => {
    switch (action.type) {
        case "VIEW_SINGLE_BLOG":
            return [action.blog]
        case "UPDATE_BLOGS":
            return [action.blog]
        case "DELETE_BLOG":
            return blog.filter((blog) =>
                blog._id !== action.id)
        default:
            return blog
    }
}

export {
    SingleBlogreducer,
    reducer
}

