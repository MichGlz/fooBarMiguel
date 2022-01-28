export default function settingTime(hour, min) {
  const minute = min ? min : 0;
  let setedHour = new Date();

  setedHour.setHours(hour, minute, 0, 0);

  return setedHour.getTime();
}
