import Template from "../components/Template";
import { TeamData } from '../components/ListData';
import { Typography, Box, Card, Button, CardContent } from '@mui/material';
import { CardActionArea, CardMedia } from '@mui/material';
import styled from "styled-components";

function UserTeam() {

  /*
    連結創建隊伍頁面、隊伍頁面 (下面改 href)
  */

  const teamlist = (
      <div className = "user-team-list">
          <Card sx={{ m: 2,
                      width: 450,
                      height: 100 }}
                      key = "0">
              <CardActionArea sx={{ width: 450,
                                    height: 100,
                                    display: 'inline' }}

                              href={`#create-team`}>  
                              {/* 連結創建隊伍頁面 */}

                <CardContent sx={{ p: 4 }}>
                  <Typography gutterBottom variant="h4" component="div">
                    Create New Team
                  </Typography>
                </CardContent>
              </CardActionArea>
          </Card>

          {TeamData.map(team => (
            <Card sx={{ m: 2,
                        width: 450,
                        height: 200 }}
                        key = {team.id}>
              <CardActionArea sx={{ width: 450,
                                    height: 200,
                                    display: 'inline' }}
                                    
                              href={`#${team.id}`}> 
                              {/* 連結隊伍頁面 */}

                <CardContent sx={{ p: 4 }}>
                  <Typography gutterBottom variant="h4" component="div">
                    {team.teamname}
                  </Typography>
                  <Typography variant="p" color="text.secondary">
                    身份 : {team.status}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    -- {team.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>))}              
      </div>
    )                                 
   

    return (
      <div className="Wrapper">
        <Template content={teamlist} />
      </div>
    );
};

export default UserTeam;