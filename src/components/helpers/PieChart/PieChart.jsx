import "./PieChart.scss";

function Slice(props) {
  return <circle className="pie_slice" r="5" cx="10" cy="10" fill="transparent" stroke={props.color} strokeWidth="10" strokeDasharray={`calc(${props.percentage} * 31.4 / 100) 31.4`} transform={`rotate(${props.rotate})`} />;
}

export default function PieChart(props) {
  let i = 0;
  let realRanking = [];

  for (const [key, value] of Object.entries({ ...props.ranking })) {
    // console.log(`${key}: ${value}`);
    let ii = i > 5 ? 30 : 0;
    const beer = { name: key, amount: value, color: `hsl(${i * 60 + ii}, ${100}%, ${68}%)` };
    realRanking = [...realRanking, beer];
    value > 0 && i++;
  }

  let rankingSort = realRanking.sort((a, b) => b.amount - a.amount);

  let totalBeers = 0;
  let rotate = 0;

  rankingSort.forEach((beer) => {
    totalBeers = totalBeers + beer.amount;
  });

  const mapSlices = rankingSort.map((beer, i) => {
    if (beer.amount > 0) {
      rotate = rotate + (beer.amount / totalBeers) * 360;
      return <Slice key={i + "slice"} percentage={(beer.amount / totalBeers) * 100} color={beer.color} rotate={360 - rotate} />;
    } else {
      return;
    }
  });

  const mapLi = rankingSort.map((beer, i) => {
    if (beer.amount > 0) {
      return (
        <li key={i + "li"}>
          <div className="dot" style={{ background: `${beer.color}` }}></div>
          <p>{beer.name + " " + beer.amount}</p>
        </li>
      );
    } else {
      return;
    }
  });

  return (
    <section className="Pie_chart">
      <svg height="20" width="20" viewBox="0 0 20 20">
        <g className="background">
          <circle r="10" cx="10" cy="10" fill="white" />
        </g>
        <g className="pie_slices">{mapSlices}</g>
      </svg>
      <ul className="pie_info">{mapLi}</ul>
    </section>
  );
}
