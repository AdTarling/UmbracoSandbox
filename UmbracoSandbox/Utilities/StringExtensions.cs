using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PWC.MyTaxPartner.Src.Utilities
{
    public static class StringExtensions
    {
        public static bool CaseContains(this string baseString, string textToSearch, StringComparison comparisonMode)
        {
            return (baseString.IndexOf(textToSearch, comparisonMode) != -1);
        }
    }
}