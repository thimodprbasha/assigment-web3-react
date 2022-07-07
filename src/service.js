export const getTrips = (page) => {
  var tripsData = [];
  const perPage = 10;

  return new Promise((resolve, reject) => {
    const response = fetch(
      `https://web422-app-assignment-1.herokuapp.com/api/trips?page=${page}&perPage=${perPage}`
    );
    response
      .then((res) => {
        tripsData = res.json;
        resolve(tripsData);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
