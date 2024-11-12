using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.ViewModels.Events
{
    public class EventDashViewModel
    {
        public EventDashViewModel(
            string id, 
            EventSportEnum sport, 
            string city, 
            string district,
            string address,
            DateTime startDate, 
            int duration,
            int cost, 
            string namePlayer,
            string nameOwner)
        {
            Id = id;
            Sport = sport;
            City = city;
            District = district;
            Address = address;
            StartDate = startDate;
            Duration = duration;
            Cost = cost;
            NamePlayer = namePlayer;
            NameOwner = nameOwner;
        }

        public string Id { get; private set; }
        public EventSportEnum Sport { get; private set; }
        public string City { get; private set; }
        public string District { get; private set; }
        public string Address { get; private set; }
        public DateTime StartDate { get; private set; }
        public int Duration { get; private set; }
        public int Cost { get; private set; }
        public string NamePlayer { get; private set; }
        public string NameOwner { get; private set; }
    }
}
