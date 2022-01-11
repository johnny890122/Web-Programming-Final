import React from "react";
import Score from "../components/Score";
import Template from "../components/Template";
import { TEAM_SCORE_INIT } from "../graphql";
import { useQuery } from "@apollo/client";

const TeamScore = () => {
  let teamScore = <Score />;

  return (
    <div className="Wrapper">
      <Template content={teamScore} />
    </div>
  );
};

export default TeamScore;
