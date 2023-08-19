export function Page({ children, active }) {
  return (
    <div
      className={`w-[calc(100%-32px)] ${
        active ? 'translate-x-0' : 'translate-x-[calc(100%+16px)]'
      } transition-all fixed top-4 left-4`}
    >
      {children}
    </div>
  );
}
