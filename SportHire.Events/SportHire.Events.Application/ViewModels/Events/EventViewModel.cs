﻿using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.ViewModels.Events
{
    public class EventViewModel
    {
        public EventViewModel(
            string id, 
            EventSportEnum sport,
            EventStatusEnum status,
            string nameOwner,
            string emailOwner,
            string namePlayer,
            string emailPlayer,
            string city, 
            string district,
            string address, 
            DateTime startDate,
            int duration, 
            int cost,
            string observation,
            bool confirmPlayer,
            bool confirmOwner,
            int playerChangeAttempts)
        {
            Id = id;
            Sport = sport;
            Status = status;
            NameOwner = nameOwner;
            EmailOwner = emailOwner;
            NamePlayer = namePlayer;
            EmailPlayer = emailPlayer;
            City = city;
            District = district;
            Address = address;
            StartDate = startDate;
            Duration = duration;
            Cost = cost;
            Observation = observation;
            ConfirmPlayer = confirmPlayer;
            ConfirmOwner = confirmOwner;
            PlayerChangeAttempts = playerChangeAttempts;
        }

        public string Id { get; private set; }
        public EventSportEnum Sport { get; private set; }
        public EventStatusEnum Status { get; private set; }
        public string NameOwner { get; private set; }
        public string EmailOwner { get; private set; }
        public string? NamePlayer { get; private set; }
        public string? EmailPlayer { get; private set; }
        public string City { get; private set; }
        public string District { get; private set; }
        public string Address { get; private set; }
        public DateTime StartDate { get; private set; }
        public int Duration { get; private set; }
        public int Cost { get; private set; }
        public string? Observation { get; private set; }
        public bool ConfirmPlayer { get; private set; }
        public bool ConfirmOwner { get; private set; }
        public int PlayerChangeAttempts { get; private set; }
    }
}
