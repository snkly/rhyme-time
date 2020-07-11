import PropTypes from "prop-types";
import Room from "@components/Room";

const RoomPage = ({ nickname }) => <Room nickname={nickname} />;

RoomPage.getInitialProps = ({ req, res, query }) => {
  const { u } = query;
  console.log(u);
  if (!u) {
    return { nickname: "player" };
  } else {
    return { nickname: u };
  }
};

RoomPage.propTypes = {
  nickname: PropTypes.string.isRequired
};

export default RoomPage;