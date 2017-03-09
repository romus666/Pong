using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Website.DAL.Factories
{
    public class GameFactory
    {
        public DTO.Game CreateGame(Entities.Game game)
        {
            return new DTO.Game() { PlayerOne = game.PlayerOne, PlayerOneScore = game.PlayerOneScore, PlayerTwo = game.PlayerTwo, PlayerTwoScore = game.PlayerTwoScore, GameEnd = game.GameEnd, GameId = game.GameID };
        }


        public Entities.Game CreateGame(DTO.Game game)
        {
            return new Entities.Game() { PlayerOne = game.PlayerOne, PlayerOneScore = game.PlayerOneScore, PlayerTwo = game.PlayerTwo, PlayerTwoScore = game.PlayerTwoScore, GameEnd = game.GameEnd, GameID = game.GameId };
        }

    }
}