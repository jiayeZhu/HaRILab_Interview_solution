define({ "api": [
  {
    "type": "POST",
    "url": "/api/clinician",
    "title": "Create new clinician account",
    "name": "CreatClinician",
    "group": "Clinician",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Body Parameter": [
          {
            "group": "Body Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>clinician's username.</p>"
          },
          {
            "group": "Body Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>clinician's password. should already be hashed using MD5. should in lowercase.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    username : \"JohnDoe123\",\n    password : \"d8a3d82529a5fcaad87c0b592cc46fbf\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "Object",
            "optional": false,
            "field": "msg",
            "description": "<p>message to client.</p>"
          },
          {
            "group": "Succeeded",
            "type": "String",
            "optional": false,
            "field": "msg.clinicianId",
            "description": "<p>clinician's unique clinicianId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : {\n      clinicianId : \"5e522919db3dda5dd0224a6d\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should not be 0.</p>"
          },
          {
            "group": "Failed",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "{\n  errorCode : 104,\n  msg : \"clinician username exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/clinician.js",
    "groupTitle": "Clinician"
  },
  {
    "type": "POST",
    "url": "/api/clinician/:username/session",
    "title": "Create new clinician session",
    "name": "CreatSession",
    "group": "Clinician",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Path Parameter": [
          {
            "group": "Path Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>clinician's username.</p>"
          }
        ],
        "Body Parameter": [
          {
            "group": "Body Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>clinician's password. should be md5 hashed string (lowercase).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    password : \"d8a3d82529a5fcaad87c0b592cc46fbf\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "Object",
            "optional": false,
            "field": "msg",
            "description": "<p>message to client.</p>"
          },
          {
            "group": "Succeeded",
            "type": "String",
            "optional": false,
            "field": "msg.clinicianId",
            "description": "<p>clinician's unique clinicianId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : {\n      clinicianId : \"5e522919db3dda5dd0224a6d\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should not be 0.</p>"
          },
          {
            "group": "Failed",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "{\n  errorCode : 105,\n  msg : \"clinician username password missmatch\"\n}",
          "type": "HTTP-StatusCode"
        }
      ]
    },
    "filename": "routes/clinician.js",
    "groupTitle": "Clinician"
  },
  {
    "type": "POST",
    "url": "/api/user/:userId/session",
    "title": "Create new session",
    "name": "CreatSession",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Path Parameter": [
          {
            "group": "Path Parameter",
            "type": "MongoId",
            "optional": false,
            "field": "userId",
            "description": "<p>user's unique userId</p>"
          }
        ],
        "Body Parameter": [
          {
            "group": "Body Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>user's username.</p>"
          },
          {
            "group": "Body Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>uuid of user's device.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    username : \"JohnDoe123\",\n    uuid : \"84AE7AA1-7000-4696-8A74-4FD588A4A5C7\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>message to client, should be ''.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : ''\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "HTTP-StatusCode",
            "optional": false,
            "field": "statusCode",
            "description": "<p>http status code.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "401 Unauthorized",
          "type": "HTTP-StatusCode"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/user",
    "title": "Create new user record with device uuid",
    "name": "CreatUser",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Body Parameter": [
          {
            "group": "Body Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>user's username.</p>"
          },
          {
            "group": "Body Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>uuid of user's device.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    username : \"JohnDoe123\",\n    uuid : \"84AE7AA1-7000-4696-8A74-4FD588A4A5C7\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "Object",
            "optional": false,
            "field": "msg",
            "description": "<p>message to client.</p>"
          },
          {
            "group": "Succeeded",
            "type": "String",
            "optional": false,
            "field": "msg.userId",
            "description": "<p>user's unique userId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : {\n      userId : \"5e50569d9c01c65ba494ee1d\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should not be 0.</p>"
          },
          {
            "group": "Failed",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "{\n  errorCode : 102,\n  msg : \"Username or UUID exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "DELETE",
    "url": "/api/user/:userId/attack/:attackId",
    "title": "Delete an attack of a user",
    "name": "DeleteAttack",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Path Parameter": [
          {
            "group": "Path Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>unique userId.</p>"
          },
          {
            "group": "Path Parameter",
            "type": "String",
            "optional": false,
            "field": "attackId",
            "description": "<p>unique attackId.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>message to client, should be ''.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : ''\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should not be 0.</p>"
          },
          {
            "group": "Failed",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "{\n  errorCode : 201,\n  msg : \"userId/attackId does not exist or not match\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/api/user/",
    "title": "get userlist with their last attak datetime",
    "name": "GetUserList",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Query Parameter": [
          {
            "group": "Query Parameter",
            "type": "Int",
            "optional": true,
            "field": "page",
            "description": "<p>witch page</p>"
          }
        ],
        "Query parameter": [
          {
            "group": "Query parameter",
            "type": "Int",
            "optional": true,
            "field": "pageSize",
            "description": "<p>page size</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "Array",
            "optional": false,
            "field": "msg",
            "description": "<p>array of result attacks.</p>"
          },
          {
            "group": "Succeeded",
            "type": "MongoId",
            "optional": false,
            "field": "msg.userList._id",
            "description": "<p>userid</p>"
          },
          {
            "group": "Succeeded",
            "type": "String",
            "optional": false,
            "field": "msg.userList.username",
            "description": "<p>username</p>"
          },
          {
            "group": "Succeeded",
            "type": "Date",
            "optional": false,
            "field": "msg.userList.lastAttack",
            "description": "<p>the ISO datetime of the last attack</p>"
          },
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "msg.userCount",
            "description": "<p>number of user, for pagination</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : {\n      userList: [\n        {\"_id\": \"5e5d309adbff884a68c66562\",\n         \"username\": \" qwe\",\n         \"lastAttack\": \"2020-02-26T22:19:28.264Z\"}\n      ],\n      userCount: 37\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should not be 0.</p>"
          },
          {
            "group": "Failed",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "{\n  errorCode : 301,\n  msg : \"invalid search source\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/user/:userId/attack",
    "title": "Report new attack",
    "name": "ReportAttack",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Path Parameter": [
          {
            "group": "Path Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>unique userId.</p>"
          }
        ],
        "Body Parameter": [
          {
            "group": "Body Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>the ISO8601 format of JS Date Object representing the date and time of the attack.</p>"
          },
          {
            "group": "Body Parameter",
            "type": "Number",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": false,
            "field": "location",
            "description": "<p>answer to the location question. 0 means outside, 1 means inside</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    date : \"2020-02-21T23:52:28.264Z\",\n    location : 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>message to client, should be ''.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : {\n        attackId: \"5e50569d9c01c65ba494ee1d\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should not be 0.</p>"
          },
          {
            "group": "Failed",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "{\n  errorCode : 103,\n  msg : \"userId does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/api/user/:userId/attack",
    "title": "Search one's attack records",
    "name": "SearchUserAttack",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Path Parameter": [
          {
            "group": "Path Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>unique userId.</p>"
          }
        ],
        "Query Parameter": [
          {
            "group": "Query Parameter",
            "type": "String",
            "optional": true,
            "field": "from",
            "description": "<p>search attacks since this date (included).</p>"
          },
          {
            "group": "Query Parameter",
            "type": "String",
            "optional": true,
            "field": "to",
            "description": "<p>search attacks until this date (included).</p>"
          },
          {
            "group": "Query Parameter",
            "type": "String",
            "allowedValues": [
              "\"lite\"",
              "\"full\""
            ],
            "optional": true,
            "field": "type",
            "description": "<p>search type,default is lite. lite means only dates are returned, full means return _id, date, location</p>"
          },
          {
            "group": "Query Parameter",
            "type": "String",
            "allowedValues": [
              "\"users\"",
              "\"attacks\""
            ],
            "optional": true,
            "field": "source",
            "description": "<p>search source.</p>"
          },
          {
            "group": "Query Parameter",
            "type": "Int",
            "allowedValues": [
              "1",
              "0"
            ],
            "optional": true,
            "field": "count",
            "description": "<p>return count or not.</p>"
          },
          {
            "group": "Query Parameter",
            "type": "Int",
            "optional": true,
            "field": "page",
            "description": "<p>witch page</p>"
          }
        ],
        "Query parameter": [
          {
            "group": "Query parameter",
            "type": "Int",
            "optional": true,
            "field": "pageSize",
            "description": "<p>page size, if &lt;=0, return all records, default 0</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "Array",
            "optional": false,
            "field": "msg",
            "description": "<p>array of result attacks.</p>"
          },
          {
            "group": "Succeeded",
            "type": "MongoId",
            "optional": false,
            "field": "msg._id",
            "description": "<p>objectId of the attack record.</p>"
          },
          {
            "group": "Succeeded",
            "type": "Date",
            "optional": false,
            "field": "msg.date",
            "description": "<p>the date that attack happened in ISO8601 format.</p>"
          },
          {
            "group": "Succeeded",
            "type": "Number",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": false,
            "field": "msg.location",
            "description": "<p>the location when the attack happened. 0 means outside, 1 means inside</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : [\n       {\n         _id: \"5e50b83b51c16451e0f56322\",\n         date: \"2020-02-21T23:55:28.264Z\",\n         location: 1\n       }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should not be 0.</p>"
          },
          {
            "group": "Failed",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "{\n  errorCode : 301,\n  msg : \"invalid search source\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "PUT",
    "url": "/api/user/:userId/attack/:attackId",
    "title": "Update an attack of a user",
    "name": "UpdateAttack",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Path Parameter": [
          {
            "group": "Path Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>unique userId.</p>"
          },
          {
            "group": "Path Parameter",
            "type": "String",
            "optional": false,
            "field": "attackId",
            "description": "<p>unique attackId.</p>"
          }
        ],
        "Body Parameter": [
          {
            "group": "Body Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>the ISO8601 format of JS Date Object representing the date and time of the attack.</p>"
          },
          {
            "group": "Body Parameter",
            "type": "Number",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": false,
            "field": "location",
            "description": "<p>answer to the location question. 0 means outside, 1 means inside</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    date : \"2020-02-21T23:55:28.264Z\",\n    location : 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Succeeded": [
          {
            "group": "Succeeded",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should be 0.</p>"
          },
          {
            "group": "Succeeded",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>message to client, should be ''.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "{\n    errorCode : 0,\n    msg : ''\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Failed": [
          {
            "group": "Failed",
            "type": "Number",
            "optional": false,
            "field": "errorCode",
            "description": "<p>response error code, should not be 0.</p>"
          },
          {
            "group": "Failed",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Example:",
          "content": "{\n  errorCode : 201,\n  msg : \"userId/attackId does not exist or not match\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
