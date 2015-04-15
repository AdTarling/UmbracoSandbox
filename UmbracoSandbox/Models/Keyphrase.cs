using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace UmbracoSandbox.Models
{
    [TableName("Keyphrase")]
    public class Keyphrase
    {
        [PrimaryKeyColumn(AutoIncrement = true)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phrase { get; set; }
        public string Link { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}