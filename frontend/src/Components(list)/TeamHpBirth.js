export default function HpBirth({birth}) {
    return (
        <li className = "Hp-birth-item">
            <div className = "Hp-birth-name">{birth.name}</div>
            <div className = "Hp-birth-date">{birth.date}</div>
        </li>
    );
  };
