const tutorials = [
  { id: 1, title: 'Angular From Zero', description: 'Angular for beginner', published: true },
  { id: 2, title: 'NodeJs in 21 days', description: 'NodeJs for beginner', published: true },
  { id: 3, title: 'Master OpenSearch', description: 'OpenSearch from Zero to Hero', published: false }
];

// constructor
const Tutorial = function(tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
  const insertId = tutorials.length > 0 ? Math.max(...tutorials.map(o => o.id)) + 1 : 1;
  console.log("created tutorial: ", { id: insertId, ...newTutorial });
  newTutorial.id = insertId;
  tutorials.push(newTutorial);
  result(null, { newTutorial });
};

Tutorial.findById = (id, result) => {
  const res = tutorials.find(v => v.id == id);
  console.log("res: ", res);
  if (res) {
    console.log("found tutorial: ", res[0]);
    result(null, res);
    return;
  }

  // not found Tutorial with the id
  result({ kind: "not_found" }, null);
};

Tutorial.getAll = (result) => {
  result(null, tutorials);
};

Tutorial.getAllPublished = result => {
  const res = tutorials.filter(v => v.published)
  result(null, res);
};

Tutorial.updateById = (id, tutorial, result) => {
  var index = tutorials.findIndex(v => v.id == id)
  if (index !== -1) {
    console.log("Updating tutorial with id ", id);
    tutorials[index].title = tutorial.title;
    tutorials[index].description = tutorial.description;
    tutorials[index].published = tutorial.published;
    result(null,  tutorials[index]);
    return;
  }

  // not found Tutorial with the id
  result({ kind: "not_found" }, null);
};

Tutorial.remove = (id, result) => {
  var index = tutorials.findIndex(v => v.id == id)

  if (index === -1) {
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
    return;
  }

  tutorials.splice(index,  1);
  console.log("deleted tutorial with id: ", id);
  result(null, true);
};

Tutorial.removeAll = result => {
  tutorials.splice(0, tutorials.length);
  result(null, true);
};

module.exports = Tutorial;
