import Country from "./components/Country";
import data from "./data/countries.json";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [filter, setFilterOption] = useState("all");
  const [sortOrder, setSortOption] = useState(">");

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  const selected = select(data.countries, filter);

  function select(countries, selection) {
    if (selection === "all" || selection === "1") {
      return countries;
    } else if (selection === ">1") {
      return countries.filter((country) => country.population <= 100000000);
    } else if (selection === "100m") {
      return countries.filter((country) => country.population >= 100000000);
    } else if (selection === "200m") {
      return countries.filter((country) => country.population >= 200000000);
    } else if (selection === "500m") {
      return countries.filter((country) => country.population >= 500000000);
    } else if (selection === "1b") {
      return countries.filter((country) => country.population >= 1000000000);
    } else {
      return countries.filter(
        (country) => country.continent.toLowerCase() === selection,
      );
    }
  }

  const sorted = sort(selected, sortOrder);

  function sort(countries, order) {
    if (order === "alpha") {
      return countries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "shuffle") {
      return countries.sort(() => Math.random() - 0.5);
    } else if (order === ">") {
      return countries.sort((a, b) => b.population - a.population);
    } else if (order === "<") {
      return countries.sort((a, b) => a.population - b.population);
    } else {
      return countries;
    }
  }

  return (
    <div className="App">
      <h1>World's Largest Countries By Population</h1>
      <div className="filters">
        <label>
          Sort By:
          <select name="sort" value={sortOrder} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>

        <label>
          Filters:
          <select name="filter" value={filter} onChange={handleFilter}>
            <optgroup label="By continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>

            <optgroup label="by population">
              <option value=">1">less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>

      <div className="countries">
        {sorted.map((country) => (
          <Country key={country.id} details={country} />
        ))}
      </div>
    </div>
  );
}
