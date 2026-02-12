import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
// import { titleH1 } from './slice/title.tsx';

export const MainContent: React.FC = () => {
  // const title = useSelector(state => state['main-content'].title);
  return (
    <div className="RussianFon">
      <div className="RussianText"> {/*title*/}
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