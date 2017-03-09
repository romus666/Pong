using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Website.DAL.Entities
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }

        public bool IsAI { get; set; }


        public int Win { get; set; }
        public int Lose { get; set; }
    }
}