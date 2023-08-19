function App() {
  // tg.initDataUnsafe.user.first_name
  const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;

  return (
    <div className="bg-white flex flex-col items-center h-full max-w-[420px] w-[calc(100%-32px)] mx-auto">
      <h1 className="text-xl font-bold mt-2">Профиль</h1>
      <div>
        {telegramUser.photo_url && (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={telegramUser.photo_url}
          />
        )}
        <p className="font-medium mt-2">
          {telegramUser.first_name} {telegramUser.last_name}
        </p>
      </div>

      <div className="w-full mt-4 gap-2 flex items-center justify-between">
        <div className="grow rounded-xl h-[150px] bg-indigo-500"></div>
        <div className="grow rounded-xl h-[150px] bg-indigo-500"></div>
      </div>
    </div>
  );
}

export default App;
