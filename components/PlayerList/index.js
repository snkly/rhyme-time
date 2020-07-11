import PropTypes from "prop-types";
import {
  AvatarGroup, 
  Avatar
} from "@chakra-ui/core";

const PlayerList = ({ playerList }) => (
  <AvatarGroup>
    {playerList.map((player, i) => {
      if (!player) {
         return <Avatar key={i} src="https://bit.ly/broken-link" /> 
      } else {
        return <Avatar key={i} name={player.username + " " + i + 1} />
      }
          })
    }
    </AvatarGroup>
);

PlayerList.propTypes = {
  playerList: PropTypes.array.isRequired,
};

export default PlayerList;