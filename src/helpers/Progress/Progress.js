function updateProgress(data, setProgress) {
  let percent = data.filter((task) => task.done).length / data.length;
  if (isNaN(percent)) {
    percent = 0;
  }
  setProgress(percent);
}

export { updateProgress };
