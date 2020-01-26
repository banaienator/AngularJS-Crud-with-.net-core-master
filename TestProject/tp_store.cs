using Microsoft.EntityFrameworkCore;
using TestProject.pages.employee;
using TestProject.pages.manager;

namespace TestProject
{
    public class tp_store : DbContext
    {
        public tp_store(DbContextOptions<tp_store> options) : base(options)
        {
        }

        public void Commit()
        {
            this.SaveChanges();
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Manager> Managers { get; set; }
    }
}

/*
Add-Migration initial2 -Context tp_store
Update-Database -Context tp_store
*/
