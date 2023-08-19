import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

function App() {
  // tg.initDataUnsafe.user.first_name
  const telegramUser = window.Telegram.WebApp.initDataUnsafe.user || {
    first_name: 'test',
    last_name: 'test',
  };

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="bg-white flex flex-col items-center h-full max-w-[420px] w-[calc(100%-32px)] mx-auto">
      <h1 className="text-xl font-bold mt-2">Профиль</h1>
      <div className="w-full flex justify-center items-center gap-2">
        {telegramUser.photo_url && (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={telegramUser.photo_url}
          />
        )}
        <p className="font-medium text-lg mt-2">
          {telegramUser.first_name} {telegramUser.last_name}
        </p>
      </div>
      <div className="w-full mt-2 rounded-md text-white bg-indigo-500 p-4 gap-2 flex flex-col">
        <div className="font-semibold">Подписка: Premium</div>
        <div>Активна: до 17 сент. 2023 г.</div>
      </div>
      <div className="w-full mt-4">
        <div className="font-medium">Лимиты на сегодня:</div>
        <div>
          Сообщения:{' '}
          <span className="bg-indigo-500 text-white px-2 py-0.5 rounded-md">
            0 / 100
          </span>
        </div>
        <div className="font-medium mt-2">Лимиты на месяц:</div>
        <div>
          Изображения:{' '}
          <span className="bg-red-500 text-white px-2 py-0.5 rounded-md">
            25 / 25
          </span>
        </div>
        <div className="font-medium mt-2">Дополнительные функции:</div>
        <div>
          Голосовые запросы:{' '}
          <span className="bg-green-500 text-white px-2 py-0.5 rounded-md">
            доступны
          </span>
        </div>
      </div>
      <button
        onClick={() => setSettingsOpen(true)}
        className="mt-4 bg-gray-400 px-4 py-2 rounded-md text-white w-full flex items-center gap-2"
      >
        <FiSettings /> Настройки
      </button>
      {settingsOpen && (
        <div className="absolute w-full h-full bg-white p-4">
          <button onClick={() => setSettingsOpen(false)}>Закрыть</button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="mt-4 bg-gray-400 px-4 py-2 rounded-md text-white w-full flex items-center gap-2"
          >
            Очистить контекст
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="mt-4 bg-gray-400 px-4 py-2 rounded-md text-white w-full flex items-center gap-2"
          >
            Сменить модель
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
