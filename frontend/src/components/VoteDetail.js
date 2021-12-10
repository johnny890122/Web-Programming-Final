import { useState, useEffect } from 'react';
import { VoteData } from './ListData';
import { List, ListItem, ListItemText, ListItemIcon, ListItemButton, Checkbox, Button } from '@mui/material';


function VoteDetail() {
    
    const [vote, setVote] = useState(VoteData[0]);
    
    return(
        <>
            <h2>{vote.title}</h2>
            <span>票數限制 : {vote.limit ? `一人${vote.limit} 票` : '可一人多票'}</span>
            <h3>結束時間  : {vote.end}</h3>
            <List>
                {vote.options.map(option => 
                    <ListItem key={option.id} disablePadding>
                        <ListItemButton role={undefined}  dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={option.select}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': option.id }}
                                />
                            </ListItemIcon>
                            <ListItemText id={option.id} primary= {option.name}
                                                         secondary = {`${option.count} 票`}/>
                        </ListItemButton>
                    </ListItem>)}
            </List>
            <div>
                <Button variant="outlined" size="large">
                    Back
                </Button>
                <Button variant="contained" size="large">
                    Enter
                </Button>
            </div>
            {}
        </>
    )
}

export default VoteDetail;