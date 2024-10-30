using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Core.Entities
{
    public class Event
    {
        public Event(string emailOwner, EventSportEnum sport, UF uf, string city, string address, DateTime startDate, int duration)
        {
            EmailOwner = emailOwner;
            Sport = sport;
            Uf = uf;
            City = city;
            Address = address;
            StartDate = startDate;
            EndDate = startDate.AddMinutes(duration);
            Duration = duration;
            Cost = (int) (duration * 0.5);
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string EmailOwner { get; set; }
        public string? EmailPlayer { get; set; } = null;
        public EventSportEnum Sport { get; set; }
        public UF Uf { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public DateTime EndDate { get; set; }
        public EventStatusEnum Status { get; set; } = EventStatusEnum.ABERTO;
        public int Cost { get; set; }
    }
}
