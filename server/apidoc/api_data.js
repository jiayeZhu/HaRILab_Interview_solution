define({ "api": [
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
          "content": "{\n  errorCode : 103,\n  msg : \"userId does not exist\"\n}",
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
