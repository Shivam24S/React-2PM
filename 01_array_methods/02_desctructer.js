const person = {
  name: "alice",
  city: "bvn",
};

console.log(person.name);

console.log(person["city"]);

// destructor

const { name, city } = person;

console.log(name);

console.log(city);



const personList = ["alice","dexter"];


console.log("person 1",personList[0])


const [alice,dexter] = personList


console.log("person 1",alice)

console.log("person 2",dexter)