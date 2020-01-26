using Microsoft.AspNetCore.Mvc;

namespace TestProject.pages.employee
{
    public class employeeController : ControllerBase
    {
        private employee_service service;
        public employeeController(employee_service employeeService)
        {
            this.service = employeeService;
        }

        public JsonResult get_employee(int id)
        {
            var employee = service.get_by_id(id);
            return new JsonResult(employee);
        }
        public JsonResult get_all_employees()
        {
            return new JsonResult(service.get_employees());
        }

        [HttpPost]  
        public RResult add_or_update_employee(dto_employee employee)
        {
            if (employee == null || ModelState.IsValid == false)
                return RResult.Fail("",null);

            return this.service.insert_or_update(employee.Id, employee.Name, employee.Address, employee.Phone);
        }

        [HttpPost]
        public RResult delete_employee(int id)
        {
             return this.service.delete(id);
        }
    }
}



