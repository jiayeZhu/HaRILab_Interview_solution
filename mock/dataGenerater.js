const axios = require('axios');
const fs = require('fs')
const {DateTime} = require('luxon')

const BASEURL = 'http://127.0.0.1:3000/api'
const USERNUMBER = 30
let userList = []

async function userRegist() {
  //generate 30 users with random username
  for(let i = 0; i < USERNUMBER; i++){
    const username = 'Test Username '+i
    const uuid = 'Test UUID '+i
    let {data} = await axios.post(`${BASEURL}/user`,{username,uuid})
    console.log(data)
    let {userId} = data.msg
    userList.push({userId,username,uuid})
  }
  fs.writeFileSync('userlist.json',JSON.stringify(userList))
}

// userRegist()

// after user regist
function loadUser(){
  return JSON.parse(fs.readFileSync('userlist.json'))
}
function randomInt(max){return Math.floor(Math.random()*max)}
const users = loadUser()

async function randomPost() {
  //for every user, randomly generate 0~5 report every day
  for(let i = 0; i < USERNUMBER; i++){
    let {userId} = users[i]
    for(let j = 0; j < 30; j++){ //30 days
      const reportTimes = randomInt(6) //random 0~5
      for(let k = 0; k < reportTimes; k++){
        const date = DateTime.local().minus({days:j}).startOf('day').plus({minutes:randomInt(60*24)})
        const location = randomInt(2)
        let result = await axios.post(`${BASEURL}/user/${userId}/attack`,{date,location})
        console.log(result)
      }
    }
  }
}

randomPost()

