const sec = 1000;
const minute = sec * 60;
const hour = minute * 60;
const day = hour * 24;

export default function timeDiference(now, initTime) {
  const dif = initTime - Number(now);
  const hours = Math.floor((dif % day) / hour);
  const minutes = Math.floor((dif % hour) / minute);
  const seconds = Math.floor((dif % minute) / sec);

  return {
    hours: hours < 10 && hours >= 0 ? "0" + hours : hours,
    minutes: minutes < 10 && minutes >= 0 ? "0" + minutes : minutes,
    seconds: seconds < 10 && seconds >= 0 ? "0" + seconds : seconds,
  };
}
