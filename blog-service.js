const fs = require('fs');
const path = require('path');

var students = [];
var programs = [];

const initialize = () => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(
        path.join(__dirname, '/data/students.json'),
        'utf-8',
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }

          students = JSON.parse(data);
        }
      );

      fs.readFile(
        path.join(__dirname, '/data/programs.json'),
        'utf-8',
        (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }

          programs = JSON.parse(data);
        }
      );
    } catch (ex) {
      console.log('Error encountered in file reading.');
      reject('Error encountered in file reading.');
    }
    resolve();
  });
};

const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    if (students.length === 0) {
      reject('No students found!');
    } else {
      resolve(
        students.filter(() => {
          return true;
        })
      );
    }
  });
};

const getInternationalStudents = () => {
  return new Promise((resolve, reject) => {
    const all_students = students.filter((student) => {
      return student.isInternationalStudent === true;
    });
    if (all_students.length > 0) {
      resolve(all_students);
    } else {
      reject('No results found!');
    }
  });
};

const getPrograms = () => {
  return new Promise((resolve, reject) => {
    if (programs.length === 0) {
      reject('No results found');
    } else {
      resolve(
        programs.filter(() => {
          return true;
        })
      );
    }
  });
};

module.exports = {
  initialize,
  getAllStudents,
  getInternationalStudents,
  getPrograms,
};
