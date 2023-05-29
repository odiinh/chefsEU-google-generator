const $ = require('jquery');
const ipc = require('electron').ipcRenderer;
const webhook = require('webhook-discord');
const fs = require("fs");
const fetch = require('node-fetch');

var licensedata

var generatorpreferences = {};

$(async function() {
    //$("body").css({"background-color": "#121f3a"})
    await ipc.send("request-userdata")
    await ipc.send("app-version")
    await $("button.stop").css({"display": "none"})
    ipc.on("app-version", function(event, args) {
      $(".version").html(args.version)
    })
    fs.readFile('./savedSettings.json', 'utf8', async function(err, data) {
      if (err) {
          console.log(`Error reading file, probably doesnt exist yet.`);
      }
      else {
        const savedSettings = JSON.parse(data);
        if (savedSettings.settings.proxies) {
          var proxyString ="";
          for (const prox in savedSettings.settings.proxies) {
            if (prox == 0) {
              proxyString += savedSettings.settings.proxies[prox]
            }
            else {
              proxyString += "\n" + savedSettings.settings.proxies[prox]
            }
            
          }
          $("textarea.prox-entry").val(proxyString)
        }
        if (savedSettings.settings.webhook) {
          $("input.webhook-url").val(savedSettings.settings.webhook)
        }
        if (savedSettings.settings.getsmscodeEmail) {
          $("input.getsmsemail").val(savedSettings.settings.getsmscodeEmail)
        }
        if (savedSettings.settings.getsmscodeToken) {
          $("input.getsmstoken").val(savedSettings.settings.getsmscodeToken)
        }
        if (savedSettings.settings.smsactivatekey) {
          $("input.sms-activatekey").val(savedSettings.settings.smsactivatekey)
        }
        if (savedSettings.settings.activesmsProvider) {
          $("#provSelect").val(savedSettings.settings.activesmsProvider)
          if ($("#provSelect").val() == 'getsms') {
            $(".smsfield").css({"display":"none"})
              $(".getsmsDiv").css({"display":"block"})
          }
          if ($("#provSelect").val() == 'sms-activate') {
            $(".smsfield").css({"display":"none"})
              $(".sms-activateDiv").css({"display":"block"})
          }
        }
        if (savedSettings.settings.headless === true || savedSettings.settings.headless === false) {
          $(`input#${savedSettings.settings.headless}.account-type`).prop('checked', true);
        }
        if (savedSettings.settings.accquantity) {
          $("input.acc-quant").val(savedSettings.settings.accquantity)
        }
        if (savedSettings.settings.delay) {
          $('input.gen-delay').val(savedSettings.settings.delay)
        }
        if (savedSettings.settings.btchlimit) {
          $("input.btch-limit").val(savedSettings.settings.btchlimit)
        }
        if (savedSettings.settings.activatecountry) {
          $("input.activatecountry").val(savedSettings.settings.activatecountry)
        }
        if (savedSettings.settings.getcountry) {
          $("input.getcountry").val(savedSettings.settings.getcountry)
        }
        generatorpreferences = savedSettings.settings
      }
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

ipc.on('give-userdata', function(event, args) {
    licensedata = args
    $("img.pfp").attr("src",`${licensedata.user.photo_url}`);
    $("span.username").html(`<b>${licensedata.user.discord.tag}</b>`)
});

$("div.gen-button").on("click", async function( event ) {
    $(".menu-item").removeClass("active")
    $(".gen-button").addClass("active")
    $(".sub-panel").css({"display": "none"})
    $(".generator").css({"display": "block"})
})
$(".prox-button").on("click", async function( event ) {
    $(".menu-item").removeClass("active")
    $(".prox-button").addClass("active")
    $(".sub-panel").css({"display": "none"})
    $(".proxies").css({"display": "block"})
})
$(".set-button").on("click", async function( event ) {
    $(".menu-item").removeClass("active")
    $(".set-button").addClass("active")
    $(".sub-panel").css({"display": "none"})
    $(".settings").css({"display": "block"})
})
$(".acc-button").on("click", async function( event ) {
    $(".menu-item").removeClass("active")
    $(".acc-button").addClass("active")
    $(".sub-panel").css({"display": "none"})
    $(".accounts").css({"display": "block"})
    fs.readFile("Accounts.txt", "utf8", function (error, data) {
      $("textarea.accounts-list").val(data)
    });
})
$("div.logout").on("click", function(event){
  fs.readFile('./savedSettings.json', 'utf8', function(err, data) {
    if (err) {
        console.log(`Error reading file, probably doesnt exist yet.`);
    }
    else {
        const savedSettings = JSON.parse(data);
        if (savedSettings.key) {
          savedSettings.key = undefined;
          console.log(savedSettings)
          fs.writeFile('./savedSettings.json', JSON.stringify(savedSettings, null, 4), function(err) {
            if (err) {
                console.log(`Error writing file: ${err}`);
            }
            ipc.send("request-quit")
        });
          
        }
    }
  })
})


$("button.prox-submit").on("click", async function( event ) {
    generatorpreferences.proxies = {};
    const proxyarray = $('textarea.prox-entry').val().split("\n");
    proxyarray.forEach(function(element, i) {
        generatorpreferences.proxies[i] = element
    });
    console.log(generatorpreferences)
})


$("button.webhook-test").on("click", async function( event ) {
const Hook = new webhook.Webhook($('.webhook-url').val());
  const msg = new webhook.MessageBuilder()
    .setText(null)
    .setAvatar("https://cdn.discordapp.com/icons/805056304057942026/dd89d3908741f933b2c9c71da9b35531.webp?size=512")
    .setName(`Chefs EU Account Gen`)
    .setColor("#bb62ff")
    .setTitle(`TEST SUCCESS`)
    .setDescription(`Discord Webhook Test succeeded. **Make sure to save!**`)
    .setTime()
    .setFooter("Chefs EU", "https://cdn.discordapp.com/icons/805056304057942026/dd89d3908741f933b2c9c71da9b35531.webp?size=512");
  Hook.send(msg);
})
$("button.webhook-sub").on("click", async function( event ) {
    generatorpreferences.webhook = $('.webhook-url').val()
})

$('#provSelect').on("change", function() {
  if ($(this).val() == 'getsms') {
    $(".smsfield").css({"display":"none"})
      $(".getsmsDiv").css({"display":"block"})
  }
  if ($(this).val() == 'sms-activate') {
    $(".smsfield").css({"display":"none"})
      $(".sms-activateDiv").css({"display":"block"})
  }
});

$("button.sms-sub").on("click", async function( event ) {
  var savingprovider = $("#provSelect").val()
    if (savingprovider == "getsms") {
      smsemail = $(".getsmsemail").val()
      smstoken = $(".getsmstoken").val()
      console.log(`processing for ${smsemail} with ${smstoken}`)
      await fetch(`http://www.getsmscode.com/vndo.php?action=login&username=${smsemail}&token=${smstoken}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'request'
        }
      }).then(res => res.text())
      .then(function(body){
        if(body != "username is wrong" && body != "token is wrong") {
          console.log(body)
          generatorpreferences.getsmscodeEmail = smsemail
          generatorpreferences.getsmscodeToken = smstoken
          $("span.getsmscode-success").html(`<b>${body}</b>`)
          $("div.getsmscode-success").css({"display": "block"})
          $("div.getsmscode-error").css({"display": "none"})
        }
        else {
          $("div.getsmscode-success").css({"display": "none"})
          $("span.getsmscode-error").html(`<b>${body}</b>`)
          $("div.getsmscode-error").css({"display": "block"})
        }

      });
    }
    if (savingprovider == "sms-activate") {
      smskey = $(".sms-activatekey").val()
      console.log(`processing on sms-activate.ru with ${smskey}`)
      await fetch(`https://sms-activate.ru/stubs/handler_api.php?api_key=${smskey}&action=getBalance`, {
        method: 'GET'
      }).then(res => res.text())
      .then(function(body){
        if(body != "BAD_KEY" && body != "ERROR_SQL") {
          generatorpreferences.smsactivatekey = smskey
          console.log(body)
          const balancemsg = "Your balance is: "+body.split("ACCESS_BALANCE:")[1]+"₽"
          $("span.getsmscode-success").html(`<b>${balancemsg}</b>`)
          $("div.getsmscode-success").css({"display": "block"})
          $("div.getsmscode-error").css({"display": "none"})
        }
        else {
          $("div.getsmscode-success").css({"display": "none"})
          $("span.getsmscode-error").html(`<b>${body}</b>`)
          $("div.getsmscode-error").css({"display": "block"})
        }

      });
    }
    
})


$("input#Catch").on("click", async function( event ) {
  $(".acc-domains").prop("disabled", false)

})
$("input#Provider").on("click", async function( event ) {
  $(".acc-domains").prop("disabled", true).val("");

})
  async function errorfunc(message, time) {
    safeToRun = false
    $(".gen-error").css({"display": "block"});
    $(".gen-error-msg").html(`<b>${message}</b>`)
    if (time == undefined){
      await sleep(2000)
    }
    else {
      await sleep(time)
    }
    $(".gen-error").css({"display": "none"});

  }

$("button.start").on("click", async function( event ) {

  var safeToRun = true
  console.log("START")
  if ($('input[name="display"]:checked').attr("id") !== undefined) {
    generatorpreferences.headless = JSON.parse($('input[name="display"]:checked').attr("id").toLowerCase());
  }
  else{
    errorfunc("Specify 'Headless Mode'")
  }

  if (!generatorpreferences.proxies) {
    errorfunc("Specify 'Input/Save Proxies'")
  }
  if ($('input.acc-quant').val() !== "") {
    generatorpreferences.accquantity = Number($('input.acc-quant').val())
  }
  else{
    errorfunc("Specify 'Quantity of Accounts'")
  }
  if ($('input.acc-quant').val().includes("-")){
    errorfunc("Error: Negative Accounts Specified")
  }


  if ($('input.gen-delay').val() !== "") {
    generatorpreferences.delay = Number($('input.gen-delay').val())
  }
  else{
    errorfunc("Specify 'Delay'")
  }
  if ($('input.btch-limit').val() !== "") {
    generatorpreferences.btchlimit = Number($('input.btch-limit').val())
  }
  else{
    errorfunc("Specify 'Batch Limit'")
  }

  generatorpreferences.activesmsProvider = $("#provSelect").val()

  if (generatorpreferences.activesmsProvider == "getsms") {
    if ($('input.getsmsemail').val() !== "") {
      generatorpreferences.getsmscodeEmail = $('input.getsmsemail').val()
    }
    else{
      errorfunc("Specify 'GetSMScode.com Email'")
    }
    if ($('input.getsmstoken').val() !== "") {
      generatorpreferences.getsmscodeToken = $('input.getsmstoken').val()
    }
    else{
      errorfunc("Specify 'GetSMScode.com Token'")
    }
    if ($('input.getcountry').val() !== "") {
      generatorpreferences.getcountry = $('input.getcountry').val()
    }
    else{
      errorfunc("Specify 'GetSMScode.com Country'")
    }
  }

  if (generatorpreferences.activesmsProvider == "sms-activate") {
    if ($('input.sms-activatekey').val() !== "") {
      generatorpreferences.smsactivatekey = $('input.sms-activatekey').val()
    }
    else{
      errorfunc("Specify 'sms-activate.ru Token'")
    }
    if ($('input.sms-activatekey').val() !== "") {
      generatorpreferences.smsactivatekey = $('input.sms-activatekey').val()
    }
    else{
      errorfunc("Specify 'sms-activate.ru Token'")
    }
    if ($('input.activatecounrty').val() !== "") {
      generatorpreferences.activatecountry = $('input.activatecountry').val()
    }
    else{
      errorfunc("Specify 'sms-activate.ru Country'")
    }
  }



  if (safeToRun == true) {
    $("button.start").css({"display": "none"})
    $("button.stop").css({"display": ""})
    ipc.send('start-generator', generatorpreferences)
    fs.readFile('./savedSettings.json', 'utf8', async function(err, data) {
      if (err) {
          console.log(`Error reading file, probably doesnt exist yet.`);
      }
      else {
          const savedSettings = JSON.parse(data);
          savedSettings.settings = generatorpreferences
          fs.writeFile('./savedSettings.json', JSON.stringify(savedSettings, null, 4), function(err) {
            if (err) {
                console.log(`Error writing file: ${err}`);
            }
        });
      }
    })
  }
  console.log(generatorpreferences)
})

$("button.stop").on("click", async function( event ) {
  $("button.stop").css({"display": "none"})
  $("button.start").css({"display": ""})
  console.log("STOP")

})

$("button.stop").on("click", async function( event ) {
  console.log("kill")
  ipc.send("kill-generator")
})

ipc.on('generator-stopped', function(event, arg) {
  $("button.stop").css({"display": "none"})
  $("button.start").css({"display": ""})
})

ipc.on('generator-error', async function(event, arg) {
  console.log(arg)
  errorfunc(`${arg}`, 10000)
})

$(".trigger_popup_fricc").on("click", function(){
  $('.hover_bkgr_fricc').show();
});
$('.hover_bkgr_fricc').on("click", function(){
   $('.hover_bkgr_fricc').hide();
});
$('.popupCloseButton').on("click", function(){
   $('.hover_bkgr_fricc').hide();
});

// fs.readFile("aco.txt", "utf8", function (error, data) {
//   console.log(data);
// });

ipc.on('update-available', function() {
  console.log("recieved ua")
  ipc.removeAllListeners('update-available');
  $("p#message").html('A new update is available. Downloading now...')
  $("div#notification").removeClass('hidden');
});
ipc.on('update-downloaded', function() {
  console.log("recieved ud")
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