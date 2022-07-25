import { CardContent, Typography, CardMedia, Avatar, CardHeader, Card, Button, ButtonGroup } from '@mui/material'
import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import PinchIcon from '@mui/icons-material/Pinch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { updateBlog, viewUserBlog, viewSingleBlog } from '../store/Actions/blogActions';
import {p} from '../styles/styles'

const MyBlog = () => {

	const userId = useSelector(state => state.userTokener._id)
	const blog = useSelector((state) => state.blog.blog)
	console.log("blog :",blog);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(viewUserBlog(userId))
	}, [])

	const viewSingleBlogHandler = (id) => {
		dispatch(viewSingleBlog(id))
		navigate('/this-blog')
	}


	if(blog == undefined || blog.length === 0){
		const addBlogHandler = () => {
			navigate('/blogs/add')
		}

		return(
			<>
			<h4 style={p}>Oops!!! You have not created any Blog .Please create your blog</h4>
			<Button onClick={() => addBlogHandler()} variant='contained' color='warning' style={{ marginTop: 10,marginLeft: 500 }}  >Create Blog
			</Button>
			</>
		)
	}
	else{
	return (
		<>
			{blog && blog.map((blog, index) => {
				console.log("CARD INSIDE", blog, index);
				return (
					<div key={index}>
						<Card style={{ width: "40%", margin: "auto", mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc" }}>
							<CardHeader
								title={blog.title}
							/>

							<CardMedia
								component="img"
								height="194"
								image={blog.image}
							/>
							<CardContent>
								<Typography variant="body2" color="text.secondary">
									{blog.content}
								</Typography>
								{blog.tag && blog.tag.map((tag) => {
									return (<><Typography display="inline-block" variant="body2" color="text.secondary">
										#{tag}
									</Typography></>)
								})}
							</CardContent>
							<ButtonGroup>
								<Button onClick={() => viewSingleBlogHandler(blog._id)}>
									<VisibilityIcon color="primary" sx={{ "&:hover": { color: "green" } }} ></VisibilityIcon>
								</Button>
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
}

export default MyBlog;






