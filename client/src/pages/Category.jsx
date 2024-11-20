import React, { useContext, useEffect } from 'react'
import './Category.css'
import { Link } from 'react-router-dom'
import { DoctorContext } from '../components/DoctorContext'
import axios from 'axios'


const Category = () => {



  const { list, fetchDoctors, url,setList } = useContext(DoctorContext);
  console.log(list)

  const fetchDoctor = async (specialty) => {
    try {
      const response = await axios.get(`${url}/api/v1/doctors/${specialty}`);
      console.log(response.data.data.doctors);
      if (response) {
        setList(response.data.data.doctors);
      }
    } catch (error) {
      console.error(`Error fetching ${specialty} doctors:`, error);
    }
  };
  
  // Usage
  const fetchCardio = () => fetchDoctor('cardio');
  const fetchRadio = () => fetchDoctor('radio');
  const fetchPedia = () => fetchDoctor('pedia');
  const fetchgeneral = () => fetchDoctor('general');
  const fetchNeuro = () => fetchDoctor('neuro');
  const fetchGyne = () => fetchDoctor('gynecolo');
  const fetchOnco = () => fetchDoctor('oncologist');


  
  useEffect(() => {
    fetchDoctors()
  }, [])
  return (
    <div className='category-container'>
      <div className='cat-list'>
        <Link onClick={fetchCardio}>Cardiologist</Link>
        <Link onClick={fetchRadio}>Radiologist</Link>
        <Link onClick={fetchPedia}>Pediatrician</Link>
        <Link onClick={fetchgeneral}>General Surgeon</Link>
        <Link onClick={fetchNeuro}>Neurologist</Link>
        <Link onClick={fetchOnco}>oncologist</Link>
        <Link onClick={fetchGyne}>gynecologist</Link>

      </div>
      <div className='doc-sper-con'>
     
        {list.map(li => (<div key={li._id} className='doc-Con'>
          <Link to={`/detail/${li._id}`}>
          <img src={li.image} />
          <p>{li.name}</p>
          <p>{li.category}</p>
          </Link>
        </div>))}
   
      </div>
    </div>
  )
}

export default Category
