{
  "rules": {
    ".read": "true",  // Universal read access
    "users": { // All users
    	"$user": { // $ === wildcard on user 
        ".write": "newData.exists() || data.child('uid').val() == auth.uid", // user can write or write to their child under their uid
        ".validate": "newData.hasChildren(['displayName', 'photoURL'])" 
      }
    },
    "messages": { // all messages
      "$message": { // $ === wildcard on message
       	".write": "newData.exists() || data.child('uid').val() == auth.uid || root.child('admins').child('auth.uid').val() == true", // if user or owner or admin
      	".validate": "newData.hasChildren(['content', 'timeStamp', 'uid'])"
      }
    }
  }
}