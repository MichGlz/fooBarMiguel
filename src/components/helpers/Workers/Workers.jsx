import "./Workers.scss";

export default function Workers(props){
    const employees = props.bartenders;
    //React can "forEach" on it's own with map
    const employeesMap = employees.map((person, i ) => <div className="emp" key={i}> <p>{person.name}</p> <img src={"/assets/" + person.name.toLowerCase() + ".png"} /></div> );

    return(
        <div className="workers">
            <h3>Employees on duty</h3>
            <ul>{employeesMap}</ul>
        </div>
    )
}
