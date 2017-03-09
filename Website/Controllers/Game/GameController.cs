using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Website.DAL;
using Website.DAL.Entities;
using Website.Models.Game;

namespace Website.Controllers.Game
{
    public class GameController : Controller
    {
        // GET: Init
        public ActionResult Index(GameModel model)
        {
            return View();
        }
        public ActionResult Board(GameModel model)
        {

            var pongRepo = new PongRepo();
            PlayerValidationModel playerOneValidationModel = pongRepo.CheckPassword(model.PlayerOneName, model.PlayerOnePassword);
            PlayerValidationModel playerTwoValidationModel = pongRepo.CheckPassword(model.PlayerTwoName, model.PlayerTwoPassword);
            if (!playerOneValidationModel.PasswordCorrect || !playerTwoValidationModel.PasswordCorrect)
            {
                if (!playerOneValidationModel.PasswordCorrect)
                    ModelState.AddModelError("PlayerOneValidation", "Not correct");
                if (!playerTwoValidationModel.PasswordCorrect)
                    ModelState.AddModelError("PlayerTwoValidation", "Not correct");
                return View("~/Views/Game/Index.cshtml", model);

            }
            else
            {
                model.Game = pongRepo.CreateGame(model);
                return View(model);
            }
        }
        public ActionResult EndGame(EndGameModel model) {
            //UPDATE DB
            var pongRepo = new PongRepo();
            var resultGameModel = new ResultGameModel();
            if (model.GameId != -1)
            {
                pongRepo.UpdateDB(model);
                var finishedModel = pongRepo.GetLastGame();
                resultGameModel.FinishedGame = finishedModel;
            }
            var statisticsModel = pongRepo.GetStatistics();
            resultGameModel.StatisticsGame = statisticsModel;
            return PartialView("EndGame", resultGameModel);
        }


        public ActionResult Settings(GameModel model)
        {
            return View("~/Views/Game/Board", model);
        }
    }
}