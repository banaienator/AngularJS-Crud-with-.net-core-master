using System.Collections.Generic;
using System.Linq;

namespace TestProject.pages.manager
{
    public class manager_service
    {
        private tp_store store;
        public manager_service(tp_store data_store)
        {
            this.store = data_store;
        }

        public Manager get_by_id(int manager_id)
        {
            return store.Managers.Find(manager_id);
        }


        public IEnumerable<Manager> get_managers()
        {
            return (from x in store.Managers select x);
        }


        public RResult insert_or_update(int? id, string name, string address, string phone)
        {
            string message = "";
            Manager manager = null;

            if (id.HasValue)
            {
                manager = get_by_id(id.Value);
                message = "عملیات ویرایش با موفقیت انجام شد. کد پیگیری:";
            }
            else
            {
                manager = new Manager();
                this.store.Managers.Add(manager);
                message = "عملیات ثبت با موفقیت انجام شد. کد پیگیری:";
            }
            manager.Name = name;
            manager.Address = address;
            manager.Phone = phone;
            this.store.Commit();
            return RResult.Result(RResult.RResultStatuses.OK, message + manager.Id, manager);
        }

        public RResult delete(int manager_id)
        {
            store.Managers.Remove(get_by_id(manager_id));
            this.store.Commit();
            return RResult.Result(RResult.RResultStatuses.OK, "عملیات حذف با موفقیت انجام شد. کد پیگیری: " + manager_id, store.Managers);
        }
    }
}
