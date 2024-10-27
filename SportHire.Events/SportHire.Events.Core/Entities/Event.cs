using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Core.Entities
{
    public class Event
    {
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
        private DateTime _endDate;
        public DateTime EndDate 
        { 
            get { return _endDate; }
            set { _endDate = StartDate.AddMinutes(Duration); } 
        }
        public EventStatusEnum Status { get; set; } = EventStatusEnum.ABERTO;
        private int _cost;
        public int Cost {
            get { return _cost; }
            set { _cost = (int) (Duration * 0.5); }
        }
    }
}
