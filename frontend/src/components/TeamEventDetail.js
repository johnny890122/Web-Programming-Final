import { useState, useEffect } from 'react';
import { EventData } from './ListData';
import { InputLabel, Select, FormControl, MenuItem, Button } from '@mui/material';


function TeamEventDetail(id) {

    const event = EventData.find(e => e.id === "4")
    const [attend, setAttend] = useState(null)

    return(
        <div className='team-event-detail'>
            <div>
                <h2>{event.title}</h2>
                <p>{event.author.name} create at {event.posttime}</p>
            </div>
            <div>   
                <span>{event.description}</span>
            </div> 
            <div>
                <h4>{event.start}</h4>
                <h4>at {event.location}</h4>
            </div>

            <FormControl sx={{ m: 1 }} variant="standard" className='team-event-detail-reply'>
                <InputLabel id="team-event-detail-reply-label">Attend</InputLabel>
                <Select
                 labelId="team-event-detail-reply-label"
                 id="team-event-detail-reply-select"
                 value={attend}
                 //onChange={handleChange}
                 //input={<BootstrapInput />}
                 >
                    <MenuItem value={null}>
                        <em>Unknown</em>
                    </MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
                <Button variant="outlined" color="success">
                    Submit
                </Button>
            </FormControl>

            {/* 公布回應人數與回應情形 */}


        </div>
    )
}

export default TeamEventDetail;