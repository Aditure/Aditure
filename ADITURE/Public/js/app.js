var apiKey = "46781694";
var sessionId = "2_MX40Njc4MTY5NH5-MTU5MTUxMTQyNDg3OH5KcTI5dkQ4bC9pN3Z3cUtFUjlYb0kzdHN-fg";
var token = "T1==cGFydG5lcl9pZD00Njc4MTY5NCZzaWc9N2RkMjlkNDk0OWMwYjRmZTQ4YjZhNTQyNmVlYTYyYjA3ZWZkNmU3MzpzZXNzaW9uX2lkPTJfTVg0ME5qYzRNVFk1Tkg1LU1UVTVNVFV4TVRReU5EZzNPSDVLY1RJNWRrUTRiQzlwTjNaM2NVdEZVamxZYjBremRITi1mZyZjcmVhdGVfdGltZT0xNTkxNTExNDQwJm5vbmNlPTAuOTY0MjkzMjkwNDYxMjY5MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTkxNTE1MDM5JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9N";

// (optional) add server code here
initializeSession();
 var SERVER_BASE_URL = 'https://aditure.herokuapp.com';
    fetch(SERVER_BASE_URL + '/session').then(function(res) {
      return res.json()
    }).then(function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
      initializeSession();
    }).catch(handleError);
  
// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
session.on('streamCreated', function(event) {
  session.subscribe(event.stream, 'subscriber', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
});

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}