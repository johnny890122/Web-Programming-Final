import React from "react";
import Score from "../components/Score";
import Template from "../components/Template";

const TeamScore = () => {
  let teamScore = <Score />;

  return (
    <div className="Wrapper">
      <Template content={teamScore} />
    </div>
  );
};

export default TeamScore;
