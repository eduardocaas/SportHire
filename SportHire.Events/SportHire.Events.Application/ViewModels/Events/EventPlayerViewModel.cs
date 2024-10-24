using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.ViewModels.Events
{
    public class EventPlayerViewModel
    {
        public string Id { get; private set; }
        public EventSportEnum Sport { get; private set; }
        public string City { get; private set; }
        public string Address { get; private set; }
        public DateTime StartDate { get; private set; }
        public int Duration { get; private set; }
        public int Cost { get; private set; }
    }
}
