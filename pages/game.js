import PropTypes from "prop-types";
import Game from "@components/Game";

const GamePage = ({ nickname }) => <Game nickname={nickname} />;

GamePage.getInitialProps = ({ req, res, query }) => {
  const { u } = query;
  console.log('%c', 'green', u + ' ' + !u ? 'player' : '');
  if (!u) {
    return { nickname: "player" };
  } else {
    return { nickname: u };
  }
};

GamePage.propTypes = {
  nickname: PropTypes.string.isRequired
};

export default GamePage;