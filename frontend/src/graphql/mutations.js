import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $userAccount: String!
    $userPassword: String!
    $userEmail: String!
  ) {
    createUser(
      userAccount: $userAccount
      userPassword: $userPassword
      userEmail: $userEmail
    ) {
      userID
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userID: String, $userName: String) {
    updateUser(userID: $userID, userName: $userName) {
      userID
    }
  }
`;

export const CREATE_USER_EVENT = gql`
  mutation createUserEvent(
    $eventCreator: String
    $eventTitle: String
    $eventDescription: String
    $eventStart: Float
    $eventEnd: Float
    $eventLocation: String
  ) {
    createUserEvent(
      eventCreator: $eventCreator
      eventTitle: $eventTitle
      eventDescription: $eventDescription
      eventStart: $eventStart
      eventEnd: $eventEnd
      eventLocation: $eventLocation
    )
  }
`;

export const UPDATE_USER_EVENT = gql`
  mutation updateUserEvent(
    $eventID: String
    $eventTitle: String
    $eventDescription: String
    $eventStart: Float
    $eventEnd: Float
    $eventLocation: String
  ) {
    updateUserEvent(
      eventID: $eventID
      eventTitle: $eventTitle
      eventDescription: $eventDescription
      eventStart: $eventStart
      eventEnd: $eventEnd
      eventLocation: $eventLocation
    )
  }
`;

export const USER_ACHEIEVEMENT_UPDATE = gql`
  mutation updateUserAchievement(
    $userID: String
    $title: String
    $content: String
  ) {
    updateUserAchievement(userID: $userID, title: $title, content: $content)
  }
`;

export const UPDATE_TEAM_EVENT = gql`
  mutation updateTeamEvent(
    $eventTitle: String
    $eventDescription: String
    $eventStart: Float
    $eventEnd: Float
    $eventLocation: String
    $eventID: String
  ) {
    updateTeamEvent(
      eventTitle: $eventTitle
      eventDescription: $eventDescription
      eventStart: $eventStart
      eventEnd: $eventEnd
      eventLocation: $eventLocation
      eventID: $eventID
    )
  }
`;

export const DELETE_USER_EVENT = gql`
  mutation deleteUserEvent($eventID: String) {
    deleteUserEvent(eventID: $eventID)
  }
`;

export const CREATE_TEAM_EVENT = gql`
  mutation createTeamEvent(
    $teamID: String
    $eventTitle: String
    $eventDescription: String
    $eventStart: Float
    $eventEnd: Float
    $eventLocation: String
    $creatorID: String
  ) {
    createTeamEvent(
      teamID: $teamID
      eventTitle: $eventTitle
      eventDescription: $eventDescription
      eventStart: $eventStart
      eventEnd: $eventEnd
      eventLocation: $eventLocation
      creatorID: $creatorID
    )
  }
`;

export const DELETE_TEAM_EVENT = gql`
  mutation deleteTeamEvent($eventID: String) {
    deleteTeamEvent(eventID: $eventID)
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam(
    $teamName: String!
    $teamDescription: String!
    $teamType: String!
    $creatorID: String!
    $memberAccount: [String]
  ) {
    createTeam(
      teamName: $teamName
      teamDescription: $teamDescription
      teamType: $teamType
      creatorID: $creatorID
      memberAccount: $memberAccount
    ) {
      teamID
    }
  }
`;

export const CREATE_TEAM_POST = gql`
  mutation createPost(
    $teamID: String
    $postTitle: String
    $postContent: String
    $creatorID: String
  ) {
    createPost(
      teamID: $teamID
      postTitle: $postTitle
      postContent: $postContent
      creatorID: $creatorID
    ) {
      postID
    }
  }
`;

export const UPDATE_TEAM_POST = gql`
  mutation updatePost(
    $postID: String
    $postTitle: String
    $postContent: String
  ) {
    updatePost(
      postID: $postID
      postTitle: $postTitle
      postContent: $postContent
    ) {
      postID
    }
  }
`;

export const DELETE_TEAM_POST = gql`
  mutation deletePost($teamID: String, $postID: String) {
    deletePost(teamID: $teamID, postID: $postID) {
      teamID
    }
  }
`;

export const CREATE_TEAM_SCORE = gql`
  mutation createContest(
    $teamID: String
    $contestDate: String
    $contestOpponent: String
    $contestIsWin: String
    $contestTitle: String
    $contestMySet: Int
    $contestOppoSet: Int
  ) {
    createContest(
      teamID: $teamID
      contestDate: $contestDate
      contestIsWin: $contestIsWin
      contestTitle: $contestTitle
      contestOpponent: $contestOpponent
      contestMySet: $contestMySet
      contestOppoSet: $contestOppoSet
    ) {
      contestID
    }
  }
`;
export const CREATE_SET_DETAIL = gql`
  mutation createSetDetail(
    $contestID: String
    $setNumber: Int
    $setScore: String
    $setMyPoint: Int
    $setOppoPoint: Int
    $setOppoErrServe: Int
    $setOppoErrAttack: Int
    $setOppoErrOther: Int
    $setNote: String
  ) {
    createSetDetail(
      contestID: $contestID
      setNumber: $setNumber
      setScore: $setScore
      setMyPoint: $setMyPoint
      setOppoPoint: $setOppoPoint
      setOppoErrServe: $setOppoErrServe
      setOppoErrAttack: $setOppoErrAttack
      setOppoErrOther: $setOppoErrOther
      setNote: $setNote
    ) {
      setID
    }
  }
`;
export const CREATE_DETAIL_PLAYER = gql`
  mutation createDetailPlayer(
    $setID: String
    $playerID: String
    $detailPointServe: Int
    $detailPointAttack: Int
    $detailPointTip: Int
    $detailTimeAttack: Int
    $detailTimePass: Int
    $detailTimeNoPass: Int
    $detailErrPassS: Int
    $detailErrPassA: Int
    $detailErrPass1: Int
    $detailErrSet: Int
    $detailErrOther: Int
    $detailErrAttack: Int
    $detailErrServe: Int
    $detailComboServe: String
  ) {
    createDetailPlayer(
      setID: $setID
      playerID: $playerID
      detailPointServe: $detailPointServe
      detailPointAttack: $detailPointAttack
      detailPointTip: $detailPointTip
      detailTimeAttack: $detailTimeAttack
      detailTimePass: $detailTimePass
      detailTimeNoPass: $detailTimeNoPass
      detailErrPassS: $detailErrPassS
      detailErrPassA: $detailErrPassA
      detailErrPass1: $detailErrPass1
      detailErrSet: $detailErrSet
      detailErrOther: $detailErrOther
      detailErrAttack: $detailErrAttack
      detailErrServe: $detailErrServe
      detailComboServe: $detailComboServe
    ) {
      detailID
    }
  }
`;

export const UPDATE_CONTEST = gql`
  mutation updateContest(
    $contestID: String
    $contestDate: String
    $contestOpponent: String
    $contestIsWin: String
    $contestTitle: String
    $contestMySet: Int
    $contestOppoSet: Int
  ) {
    updateContest(
      contestID: $contestID
      contestDate: $contestDate
      contestOpponent: $contestOpponent
      contestIsWin: $contestIsWin
      contestTitle: $contestTitle
      contestMySet: $contestMySet
      contestOppoSet: $contestOppoSet
    ) {
      contestID
    }
  }
`;
export const UPDATE_SET_DETAIL = gql`
  mutation updateSetDetail(
    $setID: String
    $setNumber: Int
    $setScore: String
    $setMyPoint: Int
    $setOppoPoint: Int
    $setOppoErrServe: Int
    $setOppoErrAttack: Int
    $setOppoErrOther: Int
    $setNote: String
  ) {
    updateSetDetail(
      setID: $setID
      setNumber: $setNumber
      setScore: $setScore
      setMyPoint: $setMyPoint
      setOppoPoint: $setOppoPoint
      setOppoErrServe: $setOppoErrServe
      setOppoErrAttack: $setOppoErrAttack
      setOppoErrOther: $setOppoErrOther
      setNote: $setNote
    ) {
      setID
    }
  }
`;

export const DELETE_CONTEST = gql`
  mutation deleteContest(
    $contestID: String 
    $teamID: String
  ) {
    deleteContest(
      teamID: $teamID, 
      contestID: $contestID
    ) {
      teamID
    }
  }
`;
export const DELETE_SET_DETAIL = gql`
  mutation deleteSetDetail(
    $setID: String
    $contestID: String
  ) {
    deleteSetDetail(
      setID: $setID, 
      contestID: $contestID
    ) {
      contestID
    }
  }
`;


export const DELETE_TEAM_MEMBER = gql`
  mutation deleteMember($teamID: String, $memberID: String) {
    deleteMember(teamID: $teamID, memberID: $memberID) {
      userID
    }
  }
`;

export const ADD_TEAM_MEMBER = gql`
  mutation addMember($teamID: String, $memberAccount: String) {
    addMember(teamID: $teamID, memberAccount: $memberAccount) {
      userID
    }
  }
`;

export const CREATE_TEAM_VOTE = gql`
  mutation createVote(
    $voteTitle: String!
    $voteDescription: String!
    $voteEnd: String!
    $voteLimit: Int
    $teamID: String!
    $creatorID: String!
  ) {
    createVote(
      voteTitle: $voteTitle
      voteDescription: $voteDescription
      voteEnd: $voteEnd
      voteLimit: $voteLimit
      teamID: $teamID
      creatorID: $creatorID
    ) {
      voteID
    }
  }
`;

export const CREATE_TEAM_VOTE_OPTION = gql`
  mutation createVoteOption($voteID: String!, $voteOptionName: String!) {
    createVoteOption(voteID: $voteID, voteOptionName: $voteOptionName) {
      voteOptionID
    }
  }
`;

export const REPLY_TEAM_VOTE = gql`
  mutation replyVote($voterID: String, $voteOptionID: String) {
    replyVote(voterID: $voterID, voteOptionID: $voteOptionID) {
      votedUser {
        userAccount
      }
      voteOptionID
      voteOptionName
    }
  }
`;

export const CREATE_GALLERY = gql`
  mutation createGallery($teamID: String, $galleryTitle: String) {
    createGallery(teamID: $teamID, galleryTitle: $galleryTitle) {
      teamID
      galleryID
      galleryTitle
    }
  }
`;

export const CREATE_GANTT = gql`
  mutation createGantt($teamID: String, $ganttTitle: String) {
    createGantt(teamID: $teamID, ganttTitle: $ganttTitle) {
      teamID
      ganttID
      ganttTitle
    }
  }
`;
