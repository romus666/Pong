using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Website.DAL.Entities;

namespace Website.DTO
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string Name { get; set; }
    }

    public class Game
    {
        public  DateTime GameEnd;
        public int GameId;

        public DAL.Entities.Player PlayerOne { get; set; }
        public int PlayerOneScore { get; set; }
        public DAL.Entities.Player PlayerTwo { get; set; }
        public int PlayerTwoScore { get; set; }
    }
}