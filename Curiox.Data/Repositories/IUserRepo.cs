﻿using Curiox.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Curiox.Data.Repositories
{
    public interface IUserRepo
    {
        User Get(string email, string password);
    }
}
