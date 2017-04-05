class Person { 
  constructor(personId, name, surname, birthDate) {
    if(personId !== undefined)
      this.personId = personId;
    this.name = name;
    this.surname = surname;
    this.birthDate = birthDate;
  }
}

module.exports = Person;