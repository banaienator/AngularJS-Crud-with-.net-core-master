using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TestProject.pages.manager
{
    public class Manager
    {
        public Manager() { }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(300)]
        public string Address { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }
        public string ErrorMessage { get; set; }
        public string SuccessMessage { get; set; }

    }

    public class dto_manager
    {
        public dto_manager() { }

        public int? Id { get; set; }

        [Display(Name = "نام")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        public string Name { get; set; }

        [Display(Name = "آدرس")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [StringLength(300)]
        public string Address { get; set; }

        [Display(Name = "تلفن")]
        [StringLength(20)]
        public string Phone { get; set; }

        public string ErrorMessage { get; set; }
        public string SuccessMessage { get; set; }
    }
}
