using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.ComponentModel.DataAnnotations;

namespace SportHire.Identity.API.Filters
{
    public class ValidationFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var messages = context.ModelState
                    .SelectMany(ms => ms.Value.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var fluentValidationErrors = context.ActionArguments
                    .Where(arg => arg.Value is IValidatableObject)
                    .SelectMany(arg => ((IValidatableObject)arg.Value).Validate(new ValidationContext(arg.Value)))
                    .Select(v => v.ErrorMessage)
                    .ToList();

                messages.AddRange(fluentValidationErrors);

                context.Result = new BadRequestObjectResult(messages);
            }
        }
    }
}
