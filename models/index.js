// Require models
const User = require("./User");
const Thought = require("./Thought");

module.exports = { User, Thought };
//first test is going to be create a user with username and email only
//create several users 3 or 4**

//second test the get 1 and get all users **
//update the user friends list by pushing into the friends array the id of another user **
//test to get 1 user again and now you should see the friend in the friends field **

//third test 
// create a thought pass a username simulating that a user created it **
//use that username to find the user **
//update the user thoughts field by pushing the thought id to the array **
//test to get our user again and now the thought array should be populated 
    //test to get one user
//fourth test

// we are going to make an object with the reaction schema fields
//we are going to get a thought, any thought is ok by id (id manually)
//update the thought by pushing into the reactions field the reaction object we created
//get the thought by id and check if the reaction field was populated




