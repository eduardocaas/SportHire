using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Core.Entities
{
    public class Event
    {
        public Event(
            string emailOwner, 
            string nameOwner, 
            EventSportEnum sport,
            UF uf,
            string city,
            string district, 
            string address,
            DateTime startDate, 
            int duration,
            string observation)
        {
            NameOwner = nameOwner;
            EmailOwner = emailOwner;
            Sport = sport;
            Uf = uf;
            City = city;
            District = district;
            Address = address;
            StartDate = startDate;
            EndDate = startDate.AddMinutes(duration);
            Duration = duration;
            Cost = (int) (duration * 0.5);
            Observation = observation;
        }

        public Event(
            string? id,
            string district, 
            string address, 
            DateTime startDate, 
            int duration, 
            string? observation)
        {
            Id = id;
            District = district;
            Address = address;
            StartDate = startDate;
            Duration = duration;
            Observation = observation;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string EmailOwner { get; set; }
        public string? EmailPlayer { get; set; } = null;
        public string NameOwner { get; set; }
        public string? NamePlayer { get; set; } = null;
        public EventSportEnum Sport { get; set; }
        public UF Uf { get; set; }
        public string City { get; set; }
        public string District  { get; set; }
        public string Address { get; set; }
        public bool ConfirmPlayer { get; set; } = false;
        public bool ConfirmOwner { get; set; } = false;
        public bool Confirm { get; set; } = false;
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public DateTime EndDate { get; set; }
        public EventStatusEnum Status { get; set; } = EventStatusEnum.ABERTO;
        public int Cost { get; set; }
        public string? Observation { get; set; } = null;
    }
}
