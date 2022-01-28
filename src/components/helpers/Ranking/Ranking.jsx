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
  const rankingMap = rankingSort.map((keg, i) => <li key={i}>{keg.name}</li>);

  return (
    <div className="topBeer">
      <h3>Top Sellers</h3>
      <ul>{rankingMap}</ul>
    </div>
  );
}
