using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.ViewModels.Events
{
    public class EventPlayerViewModel
    {
        public EventPlayerViewModel(string id, EventSportEnum sport, string city, string district, string address, DateTime startDate, int duration, int cost)
        {
            Id = id;
            Sport = sport;
            City = city;
            District = district;
            Address = address;
            StartDate = startDate;
            Duration = duration;
            Cost = cost;
        }

        public string Id { get; private set; }
        public EventSportEnum Sport { get; private set; }
        public string City { get; private set; }
        public string District { get; private set; }
        public string Address { get; private set; }
        public DateTime StartDate { get; private set; }
        public int Duration { get; private set; }
        public int Cost { get; private set; }
    }
}
