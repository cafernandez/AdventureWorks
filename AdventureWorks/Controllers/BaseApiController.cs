using System;
using System.Collections.Generic;
using System.Linq;
using AdventureWorks.DBContext;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace AdventureWorks.Controllers
{
    public class BaseApiController : ApiController
    {
        protected readonly AdventureWorksEntities AdventureWorkDB = new AdventureWorksEntities();
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), System.Text.Encoding.UTF8, "application/json");
            return response;
        }
    }
}
