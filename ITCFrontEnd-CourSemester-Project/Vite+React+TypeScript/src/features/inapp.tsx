import { Link } from 'react-router-dom'

export const Inapp: React.FC = () => {
  return (
    <div className="RussianFon">
      <div className="RussianText">
        <h1>
          Россия —
            <br />
              страна героев
        </h1>
        <h2>
          Интерактивная карта исторических
            <br />
              событий
        </h2>
        <h3>
          Исследуйте историю. Сохраняйте память. Добавляйте события на общую карту подвигов.
        </h3>
      </div>
      <Link to="/map">
        <button>
          Перейти к карте →
        </button>
      </Link>
    </div>
  );
};