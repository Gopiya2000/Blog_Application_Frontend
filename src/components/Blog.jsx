import { CardContent, Typography, CardMedia, Avatar, CardHeader, Card, Button, ButtonGroup } from '@mui/material'
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { deleteBlog } from '../store/Actions/blogActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Blog = () => {

	const blogs = useSelector((state) => state.singleBlog)

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const updateBlogHandler = () => {
		navigate('/blogs/edit')
	}

	const deleteBlogHandler = (id) => {
		dispatch(deleteBlog(id))
		navigate('/blogs')
	}

	return (
		<>
			{blogs && blogs.map((blogs, index) => {
				console.log("CARD INSIDE", blogs, index);
				return (
					<div key={index}>
						<Card style={{ width: "40%", margin: "auto", mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc" }}>
							<CardHeader
								title={blogs.blog.title}
							/>

							<CardMedia
								component="img"
								height="194"
								image={blogs.blog.image}
							/>
							<CardContent>
								<Typography variant="body2" color="text.secondary">
									{blogs.blog.content}
								</Typography>
								{blogs.blog.tag && blogs.blog.tag.map((tag) => {
									return (<><Typography display="inline-block" variant="body2" color="text.secondary">
										#{tag}
									</Typography></>)
								})}
							</CardContent>
							<ButtonGroup>
								<div key={blogs.blog._id}>
									{console.log("blog._id", blogs.blog._id)}
									<Button onClick={() => updateBlogHandler(blogs.blog._id)}>
										<EditIcon color="primary" sx={{ "&:hover": { color: "green" } }} ></EditIcon>
									</Button>
									<Button>
										<DeleteIcon onClick={() => deleteBlogHandler(blogs.blog._id)} color="warning" sx={{ "&:hover": { color: "green" } }} />
									</Button>
								</div>
							</ButtonGroup>

						</Card>

					</div>
				)
			}
			)
			}
		</>
	)
}

export default Blog;






