export default function fetchUser(user, setUser) {
  fetch(`https://reicpe-9cc2.restdb.io/rest/foobarusers?q={"username": "${user}"}`, {
    method: "GET",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setUser(data[0]);
    })
    .catch((err) => {
      console.error(err);
    });
}
