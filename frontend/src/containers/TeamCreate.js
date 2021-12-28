import React from "react";
import CreateTeam from "../components/CreateTeam"
import Template from "../components/Template";
import {useState} from 'react';
import styled from "styled-components";

const TeamCreate = () => {
    return (
        <div className="Wrapper">
      			<Template content={ <CreateTeam /> } />
    	</div>
    );
}

export default TeamCreate;