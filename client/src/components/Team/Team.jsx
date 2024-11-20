import React, { useState } from 'react'
import './Team.css'
import teamData from './teamData'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const Team = () => {
    const [team, setTeam] = useState(teamData)
    return (
        <div className='utlimate-team-container'>
            <div className='team-container' id='team'>
                <h1>Teams and People</h1>
                <p>
                    Even the best techonology needs the right spirit behind it. Right across the world<br />
                    We have a team of dreamers and does just like you, ready to bring your ideas to life.<br />
                    Hear are the folks leading the organization.
                </p>
            </div>

            <Carousel responsive={responsive} className='custom-carousel'>


                {team.map(t => (<div className='team-description-container' key={t.id} >
                    <img src={t.image} />
                    <p>{t.description}</p>
                    <h4>{t.name}</h4>
                    <h3>{t.position}</h3>
                </div>))}
            </Carousel>

        </div>
    )
}

export default Team
