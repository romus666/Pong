using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Website.DAL.Entities
{
    public class Game
    {
        public int GameID { get; set; }
        public DateTime GameEnd { get; set; }
        public int PlayerOneScore { get; set; }
        public int PlayerTwoScore { get; set; }
        public virtual Player PlayerOne { get; set; }
        public virtual Player PlayerTwo { get; set; }
    }
}