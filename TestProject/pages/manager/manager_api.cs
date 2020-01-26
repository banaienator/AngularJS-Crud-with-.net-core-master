using Microsoft.AspNetCore.Mvc;

namespace TestProject.pages.manager
{
    public class managerController : ControllerBase
    {
        private manager_service service;
        public managerController(manager_service managerService)
        {
            this.service = managerService;
        }

        public JsonResult get_manager(int id)
        {
            var manager = service.get_by_id(id);
            return new JsonResult(manager);
        }
        public JsonResult get_all_managers()
        {
            return new JsonResult(service.get_managers());
        }

        [HttpPost]  
        public RResult add_or_update_manager(dto_manager manager)
        {
            if (manager == null || ModelState.IsValid == false)
                return RResult.Fail("",null);

            return this.service.insert_or_update(manager.Id, manager.Name, manager.Address, manager.Phone);
        }

        [HttpPost]
        public RResult delete_manager(int id)
        {
             return this.service.delete(id);
        }
    }
}



