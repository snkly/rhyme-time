let PlayerManager = class {
  constructor() {
    this.players = Array(8).fill(null);
  }

  addPlayer(player) {
    console.log('%c', 'red', player);
    const availableSlot = this.players.indexOf(null);
    console.log('%c', 'orange', availableSlot);
    if (availableSlot === -1) {
      throw new Error("room_is_full");
    } else {
      this.players.splice(availableSlot, 1, player);
    }
    console.log('%c', 'red', player);
    return player;
  }
  removePlayerBySocketId(socketId) {
    const playerIndex = this.players.findIndex(
      u => u && u.socketId === socketId
    );
    if (playerIndex >= 0) {
      this.players.push(null);
      return this.players.splice(playerIndex, 1)[0];
    }
    return null;
  }
}

module.exports = PlayerManager; 