import { inventors, people, data } from "./data";
import { load } from "cheerio";

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
let filteredInventors = inventors.filter(
  (inventor) => inventor.year >= 1500 && inventor.year < 1600
);
console.log({ filteredInventors });

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
let mappedInventors = inventors.map(({ first, last }) => first + " " + last);
console.log({ mappedInventors });

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
let sortedInventors = inventors.sort((a, b) => a.year - b.year);
console.log({ sortedInventors });

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
let yearsTotal = inventors.reduce((acc, { passed, year }) => {
  let delta = passed - year;
  return acc + delta;
}, 0);
console.log({ yearsTotal });

// 5. Sort the inventors by years lived
let sortedByYearsLived = inventors.sort((a, b) => {
  let deltaA = a.passed - a.year;
  let deltaB = b.passed - b.year;
  return deltaA - deltaB;
});
console.log({ sortedByYearsLived });

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

async function fetchBoulevards() {
  let result = [];

  let response = await fetch(
    "https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris"
  );
  let html = await response.text();

  let $ = load(html);
  let items = $(".mw-category-group > ul > li > a");

  items.each((_, el) => {
    result.push($(el).text());
  });

  return result;
}

let boulevards = await fetchBoulevards();
let filteredBoulevards = boulevards.filter((b) => b.includes("de"));
console.log({ filteredBoulevards });

// 7. sort Exercise
// Sort the people alphabetically by last name
function getLastName(name) {
  return name.split(", ").pop();
}

let sortedPeople = people.sort((a, b) => {
  let lastA = getLastName(a).toUpperCase();
  let lastB = getLastName(b).toUpperCase();
  return lastA > lastB ? 1 : -1;
});
console.log({ sortedPeople });

// 8. Reduce Exercise
// Sum up the instances of each of these
let transportationReport = data.reduce((obj, transport) => {
  if (!obj[transport]) {
    obj[transport] = 0;
  }
  obj[transport]++;
  return obj;
}, {});
console.log(transportationReport);
