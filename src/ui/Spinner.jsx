function Spinner() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:-.5s]"></div>
          <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:-.8s]"></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
