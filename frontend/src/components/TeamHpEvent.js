export default function HpEvent({event}) {
    return (
        <li className = "teamHp-event-item">
            <div className = "teamHp-event-title">{event.title}</div>
            <div className = "teamHp-event-start">{event.start}</div>
            <div className = "teamHp-event-location">{event.location}</div>
        </li>
    );
  };
