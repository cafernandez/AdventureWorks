using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AdventureWorks.DBContext;
using System.Data.Entity;

namespace AdventureWorks.Controllers
{
    public class EmployeeAPIController : BaseApiController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(AdventureWorkDB.Employee.AsEnumerable().Where(p => p.CurrentFlag == true));
        }

        public HttpResponseMessage Post([FromBody]Employee value)
        {
            value.BusinessEntityID = AdventureWorkDB.Employee.OrderByDescending(o => o.BusinessEntityID).FirstOrDefault().BusinessEntityID + 1;
            value.rowguid = Guid.NewGuid();
            AdventureWorkDB.Employee.Add(value);
            return ToJson(AdventureWorkDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]Employee value)
        {
            AdventureWorkDB.Entry(value).State = EntityState.Modified;
            return ToJson(AdventureWorkDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            Employee employee = AdventureWorkDB.Employee.FirstOrDefault(x => x.BusinessEntityID == id);
            employee.CurrentFlag = false;
            return ToJson(AdventureWorkDB.SaveChanges());
        }

    }
}
