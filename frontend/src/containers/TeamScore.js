import React from "react";
import Score from "../components/Score";
import Template from "../components/Template";
import { TEAM_SCORE_INIT } from "../graphql";
import { useQuery } from "@apollo/client";

const TeamScore = () => {
  let teamScore = <Score />;
  // let breadItem = window.location.href
  //   .replace("http://localhost:3000", "")
  //   .split("/");
  // breadItem.shift();

  // const { data, error, loading, subscribeToMore } = useQuery(TEAM_SCORE_INIT, {
  //   variables: { teamID: breadItem[1] },
  // });

  return (
    <div className="Wrapper">
      <Template content={teamScore} />
    </div>
  );
};

export default TeamScore;
