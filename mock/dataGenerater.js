const axios = require('axios');
const fs = require('fs')

const BASEURL = 'http://127.0.0.1:3000/api'

let userList = []

async function main() {
  //generate 30 users with random username
  for(let i = 0; i < 30; i++){
    const username = 'Test Username '+i
    const uuid = 'Test UUID '+i
    let {data} = await axios.post(`${BASEURL}/user`,{username,uuid})
    console.log(data)
    let {userId} = data.msg
    userList.push({userId,username,uuid})
  }
  fs.writeFileSync('userlist.json',JSON.stringify(userList))
}

main()


