using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Website.Models.Game
{
    public class ResultGameModel
    {
        public FinishedGameModel FinishedGame { get; set; }
        public StatisticsGameModel StatisticsGame { get; set; }
    }
}