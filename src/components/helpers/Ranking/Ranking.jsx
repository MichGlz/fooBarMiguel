import "./Ranking.scss";

export default function TopBeer(props) {
  const ranking = props.ranking;

  let realRanking = [];
  for (const [key, value] of Object.entries(ranking)) {
    // console.log(`${key}: ${value}`);
    const beer = { name: key, amount: value };
    realRanking = [...realRanking, beer];
  }
  let rankingSort = realRanking.sort((a, b) => b.amount - a.amount);
  let totalBeers = 0;
  rankingSort.forEach((beer) => {
    totalBeers = totalBeers + beer.amount;
  });
  const rankingMap = rankingSort.map((keg, i) => {
    if (keg.amount > 0) {
      return (
        <li key={i}>
          <p>{keg.name + " " + keg.amount}</p>
          {props.isAChart && (
            <div className="chart_bar_wrapper">
              <div className="chartBar" style={{ width: `${(keg.amount / totalBeers) * 100}%` }}></div>
              {Math.floor((keg.amount / totalBeers) * 100) + "%"}
            </div>
          )}
        </li>
      );
    } else {
      return;
    }
  });

  return (
    <div className={props.isAChart ? "topBeer chart" : "topBeer"}>
      <h3>Day Top Sellers</h3>
      <ul>{rankingMap}</ul>
    </div>
  );
}
