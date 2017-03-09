using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Website.Models.Game
{
    public class FinishedGameModel
    {
        public string PlayerOneName { get; set; }
        public int PlayerOneScore { get; set; }

        public string PlayerTwoName { get; set; }
        public int PlayerTwoScore { get; set; }
    }
}