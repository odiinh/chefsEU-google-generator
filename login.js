const $ = require('jquery');
const ipc = require('electron').ipcRenderer;
const os = require('os');
const fetch = require('node-fetch');
const fs = require('fs')

var licensedata

$(async function() {
  try {
    fs.readFile('./savedSettings.json', 'utf8', async function(err, data) {
      if (err) {
          console.log(`Error reading file, probably doesnt exist yet.`);
      }
      else {
          const savedSettings = JSON.parse(data);
          if (savedSettings.key) {
            $("input.key-input").val(savedSettings.key)
            login(savedSettings.key)
          }
      }
    })
  }
  catch (error) {console.log(error)}
})

$("button.continue").on("click", async function( event ) {
    var userKey = $(".key-input").val();
    console.log(userKey)
    //$(".keyinfo").css({"show": "block"})
    login(userKey)
});

$("div.transition").one('animationend', function () {
  ipc.send("login-complete")
});

$(function() {
  $("body").css({"background-image": "url('./resources/blurredbg.png')", "background-size": "100vw 100vh", "background-repeat": "no-repeat"})
})

async function roleCheck(userid) {
  try {
  var license = await fetch(`https://discord.com/api/v6/guilds/805056304057942026/members/${userid}`, {
    headers: {
      'Authorization': 'Bot ' // token revoked and removed for security reasons
    }
  }).then(response => response.json());
  console.log(license)
  if (license.roles.includes('869580752134733864')) {
      return(true)
  }
}
catch (error) {
  console.log(error)
  console.log('invaliduser')
  return(false)
}
}



async function login(userKey) {
  await retrieveLicense(userKey)
    console.log(licensedata)
    $(".keydata").html(JSON.stringify(licensedata))
    if (licensedata !== "invalid") {
        if (!licensedata.metadata.hwid || licensedata.metadata.hwid == os.hostname()) {
          const compname = os.hostname()
          await updateLicense(userKey, compname)
          fs.readFile('./savedSettings.json', 'utf8', async function(err, data) {
            if (err) {
              console.log(`Error reading file, probably doesnt exist yet.`);
              const savedSettings = {}
              savedSettings.key = userKey
              fs.writeFile('./savedSettings.json', JSON.stringify(savedSettings, null, 4), function(err)  {
                console.log("wrote")
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
              });
            }
            else {
              var file
              if (data) {
              var file = JSON.parse(data)            
              }
    
              if (file !== undefined) {
                if (!file.key) {
                  file.key = userKey
                  fs.writeFile('./savedSettings.json', JSON.stringify(file, null, 4), function(err)  {
                    console.log("wrote")
                    if (err) {
                        console.log(`Error writing file: ${err}`);
                    }
                });
              }
              }
            }
          })
          $(".login-photo").attr("src",`${licensedata.user.photo_url}`);
          $(".success-msg").html(`Welcome, ${licensedata.user.discord.tag}`)
          $(".success-box").css({"display": "flex"})
          $(".error-box").css({"display": "none"})
          ipc.send("userdata", licensedata)
          console.log("SENT userdata to main proccess")
          $(".transition").css({"display": "block"})
          $( ".transition").toggleClass( "anim-trans" );
        }
        else {
          $(".error-msg").html(`<b>This lisence is already bound to a different machine, do -reset in bot commands to reset your device binding</b>`)
          $(".error-box").css({"display": "block"})
        }
    }
    else {
      $(".error-msg").html(`<b>'${userKey}' is not a valid key.</b>`)
      $(".error-box").css({"display": "block"})
    }
}


async function retrieveLicense(key) {
  try {
    const license = await fetch(`https://api.hyper.co/v4/licenses/${key}`, {
      headers: {
        'Authorization': 'Bearer ' // token revoked and removed for security reasons
      }
    }).then(res => res.json())
      .then(function(json){licensedata = json})
  }
  catch {
    console.log('License not found')
    licensedata = "invalid"
  }
}
async function updateLicense(key, hwid) {
  await fetch(`https://api.hyper.co/v4/licenses/${key}`, {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ', // token revoked and removed for security reasons
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      metadata: { hwid }
    })
  })
}
ipc.on('update-available', function() {
  ipc.removeAllListeners('update-available');
  $("p#message").html('A new update is available. Downloading now...')
  $("div#notification").removeClass('hidden');
});
ipc.on('update-downloaded', function() {
  ipc.removeAllListeners('update-downloaded');
  $("p#message").html('Update Downloaded. It will be installed on restart. Restart now?')
  $("button#restart-button").removeClass('hidden');
  $("div#notification").removeClass('hidden');
});
$("button#close-button").on("click", async function( event ) {
  $("div#notification").addClass('hidden');
})
$("button#restart-button").on("click", async function( event ) {
  ipc.send('restart-app');
})
