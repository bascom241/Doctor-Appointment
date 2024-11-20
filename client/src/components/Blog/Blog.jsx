import React, { useContext } from 'react'
import blogs from './BlogData'
import { DoctorContext } from '../DoctorContext'
import './Blog.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const responsive = {
  superLargeDesktop: {

    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

// const trunCate = (text,length) =>{
//   if (text.length> length){
//     return text.slice(0, length) + '...'
//   } else{
//     return text + '....'
//   }
// }

const fadeInVariant = {
  hidden: {
    opacity: 0,
    scale: 0.95, // Start slightly smaller
  },
  visible: {
    opacity: 1,
    scale: 1, // Scale up to full size
    transition: {
      duration: 0.6, // Duration for the animation
      delay: 0.5, // Delay before starting the animation
    }
  }
};



const Blog = () => {




  const [blogRef, blogInView] = useInView({ triggerOnce: true });
  const { blogList, setBlogList } = useContext(DoctorContext)
  return (
    <>







      <motion.div className='blog-card-container' id='blog'
        ref={blogRef} // Use blog reference
        variants={fadeInVariant}
        initial="hidden"
        animate={blogInView ? "visible" : "hidden"} // Trigger animation only when in view

      >

        <h1>Our Daily Tips </h1>


        <Carousel responsive={responsive} className='custom-carousel'>
          {blogList.map(blog => (

            <Link to={`/blogDetail/${blog.id}`}>
              <div className='sub-div' >
                <img src={blog.image} />
                <p>{blog.title}</p>
                <Link style={{ textAlign: 'center' }}>Read More ...</Link>
              </div>
            </Link>
          ))}
        </Carousel>
      </motion.div>

    </>
  )
}

export default Blog
