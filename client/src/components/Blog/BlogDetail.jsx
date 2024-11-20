import React from 'react'
import { useParams } from 'react-router-dom';
import blogs from './BlogData';
import './BlogDetail.css'
const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogs.filter(bg => bg.id === Number(id));



    return (
        <div className='blogDetailContainer'>
            <h2>{blog[0].title}</h2>
       
            <img src={blog[0].image} />
            <p>{blog[0].content}</p>
        </div>
    )
}

export default BlogDetail
