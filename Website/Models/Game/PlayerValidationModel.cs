using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Website.Models.Game
{
    public class PlayerValidationModel
    {
        public bool PlayerExist { get; set; }
        public bool PasswordCorrect { get; set; }
    }
}