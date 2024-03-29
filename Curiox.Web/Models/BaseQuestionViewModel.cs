﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Curiox.Web.Models
{
    public abstract class BaseQuestionViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public string UserName { get; set; }
        public string Category { get; set; }
        public int UpvoteCount { get; set; }
        public int Liked { get; set; }
    }
}
