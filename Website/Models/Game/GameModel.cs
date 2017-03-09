using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Website.Models.Game
{
    public class GameModel
    {


        #region Player 1
        [DisplayName("Player 1")]
        public string PlayerOneName { get; set; }

        [DisplayName("Player 1")]
        public string PlayerOnePassword { get; set; }
        public bool PlayerOneCorrect { get; set; }

        [DisplayName("Player 1 AI")]
        public bool PlayerOneAi { get; set; }
        #endregion


        #region Player 1
        [DisplayName("Player 2")]
        public string PlayerTwoName { get; set; }


        [DisplayName("Player 2")]
        public string PlayerTwoPassword { get; set; }

        public bool PlayerTwoCorrect { get; set; }




        [DisplayName("Player 2 AI")]
        public bool PlayerTwoAi { get; set; }

        #endregion
        public int Difficulty { get; set; }

        public int WinScore { get; set; }


        public int Game { get; set; }
    }
}