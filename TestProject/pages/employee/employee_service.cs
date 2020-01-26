using System.Collections.Generic;
using System.Linq;

namespace TestProject.pages.employee
{
    public class employee_service
    {
        private tp_store store;
        public employee_service(tp_store data_store)
        {
            this.store = data_store;
        }

        public Employee get_by_id(int employee_id)
        {
            return store.Employees.Find(employee_id);
        }


        public IEnumerable<Employee> get_employees()
        {
            return (from x in store.Employees select x);
        }


        public RResult insert_or_update(int? id, string name, string address, string phone)
        {
            string message = "";
            Employee employee = null;

            if (id.HasValue)
            {
                employee = get_by_id(id.Value);
                message = "عملیات ویرایش با موفقیت انجام شد. کد پیگیری:";
            }
            else
            {
                employee = new Employee();
                this.store.Employees.Add(employee);
                message = "عملیات ثبت با موفقیت انجام شد. کد پیگیری:";
            }
            employee.Name = name;
            employee.Address = address;
            employee.Phone = phone;
            this.store.Commit();
            return RResult.Result(RResult.RResultStatuses.OK, message + employee.Id, employee);
        }

        public RResult delete(int employee_id)
        {
            store.Employees.Remove(get_by_id(employee_id));
            this.store.Commit();
            return RResult.Result(RResult.RResultStatuses.OK, "عملیات حذف با موفقیت انجام شد. کد پیگیری: " + employee_id, store.Employees);
        }
    }
}
