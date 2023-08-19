import { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';

function App() {
  // tg.initDataUnsafe.user.first_name
  const telegramUser = window.Telegram.WebApp.initDataUnsafe.user || {
    first_name: 'test',
    last_name: 'test',
  };

  const [model, setModel] = useState(false);

  const onToggleModel = () => {
    setModel(prev => !prev);
    window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
  };

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const onClickBack = () => setSettingsOpen(false);
    if (settingsOpen) {
      window.Telegram?.WebApp?.BackButton?.show();
      window.Telegram?.WebApp?.BackButton?.onClick(onClickBack);
    } else {
      window.Telegram?.WebApp?.BackButton?.hide();
      window.Telegram?.WebApp?.BackButton?.offClick(onClickBack);
    }
  }, [settingsOpen]);

  const onClickSettings = () => {
    setSettingsOpen(true);
  };

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
      <div className="w-full mt-2 shadow-lg rounded-md text-white bg-indigo-500 p-4 gap-2 flex flex-col">
        <div className="font-semibold text-lg">PREMIUM</div>
        <div>до 17 сент. 2023 г.</div>
      </div>
      <button
        onClick={onToggleModel}
        className="mt-4 relative bg-gray-400 px-4 py-2 rounded-md text-white w-full flex items-center gap-2"
      >
        <div
          className={`bg-gray-600 absolute top-1 w-1/2 ${
            model ? 'left-1' : 'left-[calc(50%-4px)]'
          } transition-all rounded-md h-[calc(100%-8px)]`}
        />
        <div className="w-1/2 text-center z-10">GTP 3.5</div>
        <div className="w-1/2 text-center z-10">GTP 3.5 Turbo</div>
      </button>
      <div className="w-full mt-4">
        <div className="font-medium">Лимиты на сегодня:</div>
        <div>
          Сообщения:{' '}
          <span className="bg-indigo-500 text-white px-2 py-0.5 rounded-md">
            {model ? '0 / 100' : '10/50'}
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
        onClick={onClickSettings}
        className="mt-4 bg-gray-400 px-4 py-2 rounded-md text-white w-full flex items-center gap-2"
      >
        <FiSettings /> Настройки
      </button>
      {settingsOpen && (
        <div className="absolute w-full h-full bg-white p-4">
          <button className="mt-4 bg-gray-400 px-4 py-2 rounded-md text-white w-full flex items-center gap-2">
            Очистить контекст
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
