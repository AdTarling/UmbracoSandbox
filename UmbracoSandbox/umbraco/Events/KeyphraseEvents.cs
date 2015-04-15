using PWC.MyTaxPartner.Src.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Events;
using Umbraco.Core.Models;
using Umbraco.Core.Persistence;
using Umbraco.Core.Services;
using UmbracoSandbox.Controllers.ApiControllers;
using UmbracoSandbox.Models;

namespace UmbracoSandbox.umbraco.Events
{
    public class KeyphraseEvents : ApplicationEventHandler
    {
        private KeyphraseApiController _keyphraseApiController;

        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            _keyphraseApiController = new KeyphraseApiController();
            ContentService.Saving += ContentServiceOnSaving;
            var db = applicationContext.DatabaseContext.Database;

            if (!db.TableExist("keyphrase"))
            {
                db.CreateTable<Keyphrase>(false);
            }
        }

        private void ContentServiceOnSaving(IContentService sender, SaveEventArgs<IContent> saveEventArgs)
        {
            var keyphrases = _keyphraseApiController.GetAll();
            var keyphraseContentParser = new KeyphraseContentParser();

            foreach (IContent content in saveEventArgs.SavedEntities)
            {
                if (content.ContentType.Alias.Equals("NewsArticle"))
                {
                    var blogContent = content.GetValue<string>("bodyContent");
                    var parsedBodyText = keyphraseContentParser.ReplaceKeyphrasesWithLinks(blogContent, keyphrases);
                    content.SetValue("bodyContent", parsedBodyText);
                }
            }
        }
    }
}