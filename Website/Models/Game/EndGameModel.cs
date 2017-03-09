using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Website.Models.Game
{
    public class EndGameModel
    {
        public int GameId { get; set; }


        public int PlayerOneScore { get; set; }
        public int PlayerTwoScore { get; set; }
    }
}