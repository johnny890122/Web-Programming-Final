import { useState, useEffect } from 'react';
import { VoteData } from './ListData';
import { Box, TextField, Checkbox, Button } from '@mui/material';


function EditVote() {
    
    const [vote, setVote] = useState(VoteData[0]);
    
    return(
        <>
        <h2>Edit Voting</h2>
        <Box component="form"
             noValidate
             autoComplete="off">

          <div>
            <Button variant="contained" size="large" color="error">
                Delete
            </Button>
          </div>
          <div>
            <TextField id="create-vote-title"
                       required
                       label="Question"
                       defaultValue="Eg.消夜吃啥" />
          </div>
          <div>
            <TextField id="create-vote-description"
                       label="Description"
                       defaultValue="Eg.一定要吃的吧" />
          </div>
          <div>
              <div>
                <TextField id="create-vote-option1"
                        label="Option1"
                        required
                        defaultValue="選項1"/>
              </div>
              <div>
                <TextField id="create-vote-option2"
                        label="Option2"
                        required
                        defaultValue="選項2"/>
              </div>
              <div>
                <Button variant="outlined" size="medium">
                    New Option
                </Button>
              </div>
          </div>
          <div>
              <div>
                <TextField id="create-vote-end"
                        label="End Time"
                        required
                        defaultValue="結束時間"/>
              </div>
              <div>
                <Checkbox
                    checked={false}
                    //onChange={}
                    inputProps={{ 'aria-label': 'controlled' }}/>
                <TextField id="create-vote-limit"
                        label="Limit"
                        defaultValue="每人票數限制"/>
              </div>
          </div>    
          <div>
            <Button variant="outlined" size="large">
                Back
            </Button>
            <Button variant="contained" size="large" color="success">
                Save
            </Button>
           </div>
        </Box>
        </>
    )
}

export default EditVote;