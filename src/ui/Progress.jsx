function Progress({ maxSteps, step }) {
  return (
    <header className="progress grid grid-cols-[auto_auto] justify-between gap-4.8 text-18 text-color-medium">
      <progress
        className="col-span-2 h-3 w-full appearance-none"
        max={maxSteps}
        value={step}
      />
    </header>
  );
}

export default Progress;
