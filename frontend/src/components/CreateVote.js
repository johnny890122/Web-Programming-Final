import { useState, useEffect } from 'react';
import { Box, TextField, Button, Checkbox } from '@mui/material';
import { VoteData } from './ListData';

function CreateVote() {

    const [vote, setVote] = useState({id: "2", 
                                      title: null,
                                      description: null,
                                      end: null,
                                      act: true,
                                      limit: false,
                                      options: [],
                                      result: null})

    return(
    <>
        <h2>Create New Voting</h2>
        <Box component="form"
             noValidate
             autoComplete="off">

          <div>
            <TextField id="create-vote-title"
                       required
                       label="Question"
                       placeholder="Eg.消夜吃啥" />
          </div>
          <div>
            <TextField id="create-vote-description"
                       label="Description"
                       placeholder="Eg.一定要吃的吧" />
          </div>
          <div>
              <div>
                <TextField id="create-vote-option1"
                        label="Option1"
                        required
                        placeholder="選項1"/>
              </div>
              <div>
                <TextField id="create-vote-option2"
                        label="Option2"
                        required
                        placeholder="選項2"/>
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
                        placeholder="結束時間"/>
              </div>
              <div>
                <Checkbox
                    checked={vote.limit}
                    //onChange={}
                    inputProps={{ 'aria-label': 'controlled' }}/>
                <TextField id="create-vote-limit"
                        label="Limit"
                        placeholder="每人票數限制"/>
              </div>
          </div>    
          <div>
             <Button variant="contained" size="large">
                Create!
             </Button>
           </div>
        </Box>
    </>
    )
}

export default CreateVote;