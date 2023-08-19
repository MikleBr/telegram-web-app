import { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Page } from './Page';

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

  const [page, setPage] = useState(null);

  useEffect(() => {
    const closePage = () => setPage(null);
    if (page) {
      window.Telegram?.WebApp?.BackButton?.show();
      window.Telegram?.WebApp?.BackButton?.onClick(closePage);
    } else {
      window.Telegram?.WebApp?.BackButton?.hide();
      window.Telegram?.WebApp?.BackButton?.offClick(closePage);
    }
  }, [page]);

  const openTariffPage = () => {
    setPage('tariff');
    window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
  };

  const openSettingsPage = () => {
    setPage('settings');
    window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
  };

  return (
    <div className="bg-white flex flex-col items-center h-full w-[calc(100%-32px)] mx-auto">
      <div
        className={`w-full py-4 ${
          page === null ? 'translate-x-0' : '-translate-x-[calc(100%+16px)]'
        } transition-all`}
      >
        <h1 className="text-xl font-bold text-center">Профиль</h1>
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
        <button
          onClick={openTariffPage}
          className="w-full mt-2 shadow-lg rounded-md text-white bg-indigo-500 p-4 gap-2 flex flex-col"
        >
          <div className="font-semibold text-lg">ТАРИФ PREMIUM</div>
          <div className="font-light">Действует до 17 сент. 2023 г.</div>
          <div className="flex gap-2 items-center text-sm text-white ">
            Подробнее <AiOutlineArrowRight />
          </div>
        </button>
        <div className="flex mt-2 items-center gap-1 justify-between">
          <button className="grow shadow-lg rounded-md text-white bg-gray-500 p-4 gap-2 flex flex-col">
            <div className="font-semibold">Ваша статистика</div>
            <div className="flex gap-2 items-center text-sm text-white ">
              Подробнее <AiOutlineArrowRight />
            </div>
          </button>
          <button
            onClick={openSettingsPage}
            className="grow shadow-lg rounded-md text-white bg-gray-500 p-4 gap-2 flex flex-col"
          >
            <div className="font-semibold">Настройки</div>
            <div className="flex gap-2 items-center text-sm text-white ">
              Подробнее <AiOutlineArrowRight />
            </div>
          </button>
        </div>
      </div>
      <Page active={page === 'tariff'}>
        <h1 className="text-xl text-center font-bold">Тариф</h1>
        <div className="font-semibold mt-4">Тарифный план: PREMIUM</div>
        <div className="font-light">Действует до 17 сент. 2023 г.</div>
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
      </Page>
      <Page active={page === 'settings'}>
        <h1 className="text-xl font-bold text-center">Настройки</h1>
        <div className="mt-4 mb-2">Модель GPT:</div>
        <button
          onClick={onToggleModel}
          className=" relative bg-gray-400 px-4 py-2 rounded-md text-white w-full flex items-center gap-2"
        >
          <div
            className={`bg-gray-600 absolute top-1 w-1/2 ${
              model ? 'left-1' : 'left-[calc(50%-4px)]'
            } transition-all rounded-md h-[calc(100%-8px)]`}
          />
          <div className="w-1/2 text-center z-10">GTP 3.5</div>
          <div className="w-1/2 text-center z-10">GTP 3.5 Turbo</div>
        </button>
        <div className="mt-4 mb-2">Очистка контекста:</div>
        <button className="bg-gray-400 px-4 py-2 rounded-md text-white w-full">
          Очистить контекст
        </button>
      </Page>
    </div>
  );
}

export default App;
