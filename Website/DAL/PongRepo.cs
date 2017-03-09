using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Website.DAL.Entities;
using Website.DAL.Factories;
using Website.Models.Game;

namespace Website.DAL
{
    public class PongRepo
    {
        PongContext _context = new PongContext();
        //PlayerFactory _factory = new PlayerFactory();

        public int CreateGame(GameModel model)
        {
            var game = new Game();
            game.GameEnd = DateTime.Now;

            if (!model.PlayerOneAi && !model.PlayerTwoAi && string.IsNullOrEmpty(model.PlayerOneName) && string.IsNullOrEmpty(model.PlayerTwoName))
            {
                return -1;
            }

            
            if (model.PlayerOneAi)
            {
                model.PlayerOneName = "AI-1";
            }
            if (model.PlayerTwoAi)
            {
                model.PlayerTwoName = "AI-2";
            }
            if (!string.IsNullOrEmpty(model.PlayerOneName))
            {
                game.PlayerOne = GetPlayer(model.PlayerOneName, model.PlayerOnePassword, model.PlayerOneAi);
            }
            if (!string.IsNullOrEmpty(model.PlayerTwoName))
            {
                game.PlayerTwo = GetPlayer(model.PlayerTwoName, model.PlayerTwoPassword, model.PlayerTwoAi);
            }
            _context.Games.Add(game);
            _context.SaveChanges();

            return game.GameID;
            
          
        }


        public Player GetPlayer(string name , string password, bool isAI)
        {
            var existingPlayer = _context.Players.Where(x => x.Name == name).FirstOrDefault();
            if(existingPlayer == null )
            {
                var newPlayer = new Player()
                {
                    Name = name,
                    Password = password,
                    IsAI = isAI 
                };
                _context.Players.Add(newPlayer);
                _context.SaveChanges();
                return newPlayer;
            }
            return existingPlayer;
        }

        public StatisticsGameModel GetStatistics()
        {
            StatisticsGameModel model = new StatisticsGameModel();
            model.Players = new List<Player>();
            model.Players = _context.Players.OrderByDescending(x => x.Win).Take(5).ToList();
            return model;
        }
        public FinishedGameModel GetLastGame()
        {
            FinishedGameModel model = new FinishedGameModel();
            var lastGame = _context.Games.OrderByDescending(x => x.GameID).FirstOrDefault();
            if(lastGame != null && lastGame.PlayerOne != null && lastGame.PlayerTwo != null)
            {
                var playerOne = _context.Players.FirstOrDefault(x => x.PlayerId == lastGame.PlayerOne.PlayerId);
                var playerTwo = _context.Players.FirstOrDefault(x => x.PlayerId == lastGame.PlayerTwo.PlayerId);

                if(playerOne != null && playerTwo != null)
                {
                    model.PlayerOneName = playerOne.Name;
                    model.PlayerOneScore = lastGame.PlayerOneScore;
                    model.PlayerTwoName = playerTwo.Name;
                    model.PlayerTwoScore = lastGame.PlayerTwoScore;
                }
            }

            return model;
        }

        public PlayerValidationModel CheckPassword(string name, string password)
        {
            PlayerValidationModel playerValidationModel = new PlayerValidationModel();
            var p = _context.Players.Where(x => x.Name == name).FirstOrDefault();
            if(p != null)
            {
                playerValidationModel.PlayerExist = true;
                playerValidationModel.PasswordCorrect = p.Password == password ? true : false;
            }
            else
            {
                playerValidationModel.PlayerExist = false;
                playerValidationModel.PasswordCorrect = true;
            }
            return playerValidationModel;
        }

        public void UpdateDB(EndGameModel model)
        {
            var game = _context.Games.Where(x => x.GameID == model.GameId).FirstOrDefault();
            Player playerOne = null;
            Player playerTwo = null;
            if (game != null)
            {
                game.PlayerOneScore = model.PlayerOneScore;
                game.PlayerTwoScore = model.PlayerTwoScore;
                if(game.PlayerOne != null)
                    playerOne = _context.Players.FirstOrDefault(x => x.PlayerId == game.PlayerOne.PlayerId);
                if (game.PlayerTwo != null)
                    playerTwo = _context.Players.FirstOrDefault(x => x.PlayerId == game.PlayerTwo.PlayerId);
                if(playerOne != null && playerTwo != null)
                {
                    if (model.PlayerOneScore > model.PlayerTwoScore)
                    {
                        playerOne.Win++;
                        playerTwo.Lose++;
                    }
                    else
                    {
                        playerTwo.Win++;
                        playerOne.Lose++;
                    }
                }
                _context.SaveChanges();

            }
        }
    }
}