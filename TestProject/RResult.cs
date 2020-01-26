namespace TestProject
{
    public class RResult
    {

        public string Message { get; set; }
        public RResultStatuses Status { get; set; }
        public object Value { get; set; }
        public string Token { get; set; }
        public bool IsOK { get { return this.Status == RResultStatuses.OK; } }
        public bool IsFail { get { return this.Status == RResultStatuses.Error; } }

        public enum RResultStatuses
        {
            OK = 1,
            Error = 2,
        }

        public RResult(string message, RResultStatuses status, object value)
        {
            this.Message = message;
            this.Status = status;
            this.Value = value;
        }

        private RResult()
        {
        }

        public static RResult NotFound()
        {
            return RResult.Error("داده درخواست شده یافت نگردید");

        }

        public static RResult Error(string message, object value = null)
        {
            return new RResult(message, RResultStatuses.Error, value);
        }
        public static RResult Success()
        {
            return RResult.Success("عملیات با موفقیت انجام شد");
        }
        public static RResult Success(string message, object value = null)
        {
            return new RResult(message, RResultStatuses.OK, value);
        }
        public static RResult Success(int id)
        {
            return RResult.Success(string.Format("عملیات با موفقیت انجام شد. کد رهگیری {0}", id), id);
        }

        public static RResult Success(object value)
        {
            return RResult.Success("OK", value);
        }
        public static RResult Fail(object value)
        {
            return RResult.Fail("Error", value);
        }
        public static RResult Fail(string message, object value = null)
        {
            return new RResult(message, RResultStatuses.Error, value);
        }

        public static RResult Result(RResultStatuses status, string message, object returnValue)
        {
            return new RResult { Value = returnValue, Message = message, Status = status };
        }
    }
}
