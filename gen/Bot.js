const request = require('request');
const fs = require('fs');
const os = require('os');
const webhook = require("webhook-discord");
const { Cluster } = require('puppeteer-cluster');
const useProxy = require('puppeteer-page-proxy');
const { parse, toNamespacedPath } = require('path');
const puppeteerextra = require('puppeteer-extra');
const { createCursor, installMouseHelper, getRandomPagePoint, path } = require("ghost-cursor");

module.exports.mainGenerator = mainGenerator;


const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { exit } = require('process');
const { on } = require('events');
puppeteerextra.use(StealthPlugin())

// const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
// puppeteerextra.use(AdblockerPlugin())


mainGenerator()


async function mainGenerator(settings) {
  try {
  if (settings === undefined) {
    const odinsSettings = require('./odinsSettings.json')
    settings = odinsSettings
  }
  const namesJSON = require('./names.json')
  const days = require('./days.json')
  console.log(settings)
  module.exports.killbrowser = killbrowser;
  function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  };
  const AcceptCookies = '#L2AGLb > div';
  const loginBtn = '#gb > div > div.gb_Me > a';
  const registerBtn = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.daaWTb > div > div > div:nth-child(1) > div > button';
  const accType = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.daaWTb > div > div > div:nth-child(2) > div > ul > li:nth-child(2) > span.VfPpkd-StrnGf-rymPhb-b9t22c';
  const loadingSlider = "#initialView > div.RZBuIb.c8DD0 > div > div.MyvhI.TKVRUb > span"
  const fName = '#firstName';
  const sName = '#lastName';
  const username  = '#username'
  const password = '#passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input';
  const confirmpassword = '#confirm-passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input'
  const showpassword = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div.SdBahf.VxoKGd.OcVpRe.DbQnIe.ia6RDd > div.EcjFDf > div > div.ci67pc > div > div > div.enBDyd > div > input';
  const proceed = '#accountDetailsNext > div > button';
  const mobileentry = '#phoneNumberId'
  const proceed2 = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button';
  const codeentry = '#code';
  const proceed3 = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.qhFLie > div > div > button';
  const day = '#day';
  const month = '#month';
  const year = '#year';
  const gender = '#gender'
  const proceed4 = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button';
  const denymobilethingy = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.daaWTb > div > div > button';
  const personalise = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div > div > div.ci67pc > div > span > div:nth-child(1)';
  const proceed5 = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button';             
  const proceed6 = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3.F8PBrb.NNItQ > div > div.qhFLie > div:nth-child(2) > div > button > div.VfPpkd-Jh9lGc';
  const proceed7 = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button';            
  const successtest = 'body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img';
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function repError(error) {
    if (settings.webhook) {
      const Hook = new webhook.Webhook(settings.webhook);
      const computerName = os.hostname()
      const msg = new webhook.MessageBuilder()
        .setText(null)
        .setAvatar("https://cdn.discordapp.com/icons/805056304057942026/dd89d3908741f933b2c9c71da9b35531.webp?size=512")
        .setName(`Chefs EU Account Gen`)
        .setColor("#ff0000")
        .setTitle(`ERROR`)
        .setDescription(`${error}`)
        .setTime()
        .setFooter("Chefs EU", "https://cdn.discordapp.com/icons/805056304057942026/dd89d3908741f933b2c9c71da9b35531.webp?size=512");
      Hook.send(msg); 
    }
  }
  var executablePath = puppeteerextra.executablePath().replace("app.asar", "app.asar.unpacked")
  var cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: settings.btchlimit,
    puppeteerOptions: { headless: settings.headless, executablePath: executablePath, args: ['--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials'] },
    timeout: 3600000,
    puppeteer: puppeteerextra,
  });
  cluster.on('taskerror', function(err, data) {
    // console.log(`${err}`);
    // repError(err)
  });
  async function killbrowser() {
    while (cluster) {
      cluster.idle();
      await cluster.close();
      cluster = undefined
    } 
  } 
  const fastmode = async function({ page, data: url }) {

    const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36';
    await page.setUserAgent(USER_AGENT);
    await page.setJavaScriptEnabled(true);
    await page.setViewport({
      width: 1280 + Math.floor(Math.random() * 100),
      height: 720 + Math.floor(Math.random() * 100),
      deviceScaleFactor: 1,
      hasTouch: false,
      isLandscape: false,
      isMobile: false,
    });
    await page.evaluateOnNewDocument(function() {
        // Pass chrome check
        window.chrome = {
            runtime: {},
            // etc.
        };
    });
    await page.evaluateOnNewDocument(function() {
        //Pass notifications check
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });
    await page.evaluateOnNewDocument(function() {
        // Overwrite the `languages` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    });
    await page.setExtraHTTPHeaders({
      'Referer': 'https://www.google.com/',
      'SEC-CH-UA': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
    });
    await page.setRequestInterception(true);
    var proxy = randomProperty(settings.proxies)
    console.log(proxy);
    if (proxy !== "localhost") {
      var splitproxies = proxy.split(':')
      var proxyUrl = splitproxies[0] + ':' + splitproxies[1]
      var proxyUser = splitproxies[2]
      var proxyPass = splitproxies[3]
      console.log(splitproxies)
      formattedproxy = `http://${proxyUser}:${proxyPass}@${proxyUrl}`
      console.log(formattedproxy)
    }
    async function randoType(selector, text) {
      const chars = text.split("");
      for (const letter of chars) {
        const timer = Math.floor(Math.random() * (650 - 100) ) + 100; 
        //console.log(`sleep period ${timer}`)
        await sleep(timer)
        await page.type(selector, letter)
      }
    }
    function passwordGenerator(length) {

      var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var lower = 'abcdefghijklmnopqrstuvwxyz'
      var digit = '0123456789'
      var symb = '!$*&#?'
      var all = upper + lower + digit + symb
      function rand (max) {
        return Math.floor(Math.random() * max)
      }
      function random (set) {
        return set[rand(set.length - 1)]
      }
  
      function generate (length, set) {
        var result = []
        while (length--) result.push(random(set))
        return result
      }
  
      function shuffle (arr) {
        var result = []
  
        while (arr.length) {
          result = result.concat(arr.splice(rand[arr.length - 1]))
        }
  
        return result
      }
  
      var result = [] // we need to ensure we have some characters
  
      result = result.concat(generate(1, upper)) // 1 upper case
      result = result.concat(generate(1, lower)) // 1 lower case
      result = result.concat(generate(1, digit)) // 1 digit
      result = result.concat(generate(length - 3, all)) // remaining - whatever
  
      return shuffle(result).join('') // shuffle and make a string
    }

      var fNameVal = randomProperty(namesJSON)
      var sNameVal = randomProperty(namesJSON)
      var emailVal = String(fNameVal + sNameVal + '.' + (Math.floor((Math.random() * 90000) + 10000)))
      var smsProvider = settings.activesmsProvider
      var getsmsEmail = settings.getsmscodeEmail
      var getsmstoken = settings.getsmscodeToken
      var smsactivatekey = settings.smsactivatekey
      var getcountry = settings.getcountry
      var activatecountry = settings.activatecountry
      var passwordVal = passwordGenerator(Math.floor((Math.random() * (14-8)) + 8));
      var dayval = randomProperty(days);
      var genderchoice = String((Math.floor((Math.random() * (3-1)) + 1)))
      
      // const female = '#gender > option:nth-child(2)'
      // const male = '#gender > option:nth-child(3)';
      //#month > option:nth-child(2)
      //#month > option:nth-child(13)
      var monthval = String((Math.floor((Math.random() * (13-1)) + 1)))
      var yearval = String('19'+(Math.floor((Math.random() * (99-55)) + 55)))
      var themessage;
      var info
      var phoneNum;
      var phoneID
      var userpass;
      var veriTimeout

      const cursor = createCursor(page, await getRandomPagePoint(page), false)
      await installMouseHelper(page) // this shows the trace
      try {
        page.on('request', async (request) => {
          if (['image', 'font'].indexOf(request.resourceType()) !== -1) {
              await request.abort();
          } else {
            if (proxy !== "localhost") {
              await useProxy(request, formattedproxy);
            }
            else {
              request.continue()
            }   
        }
        });
        await page.goto('https://www.google.com', {waitUntil: 'domcontentloaded',});
      try {
      await page.waitForTimeout(500)
      await cursor.click(AcceptCookies);
      console.log("Accepted Cookies...");
      } catch(e) {
        console.log(e)
      }
      await page.waitForSelector(loginBtn)
      await page.waitForTimeout(settings.delay)
      await cursor.click(loginBtn)
      console.log("#Login Button Clicked...#")

      await page.waitForSelector(registerBtn, {timeout: 0})
      await page.waitForTimeout(settings.delay)

      await cursor.click(registerBtn);
      console.log("#Register Button Clicked#");

      
      await page.waitForSelector(accType)
      await page.waitForTimeout(settings.delay)
      await cursor.click(accType);
      console.log("#TYPE Button Clicked#");
      await page.waitForNavigation({waitUntil:"domcontentloaded"})

      await page.waitForSelector(fName)
      await cursor.click(fName)
      await randoType(fName, fNameVal);
      await cursor.click(sName)
      await randoType(sName, sNameVal);

      console.log("#email: " + emailVal + '@gmail.com');
      await page.waitForSelector(username)
      await cursor.click(username);
      await page.waitForTimeout(settings.delay / 2)
      const inputValue = await page.evaluate(`document.querySelector("${username}").value`)
      console.log(inputValue+":"+inputValue.length)
      if (inputValue.length !== 0) {
        for (let i = 0; i < inputValue.length; i++) {
          await page.keyboard.press('Backspace');
        }
      }

      await randoType(username, emailVal);
      console.log("#entered email#");

      await cursor.click(password)
      await randoType(password, passwordVal);
      await cursor.click(confirmpassword)
      await randoType(confirmpassword, passwordVal);

      await page.waitForTimeout(settings.delay/2)    
      await cursor.click(proceed)
      
      //////////////////////////////////////////////////
      console.log(`${emailVal}:${passwordVal}`)
      await page.waitForResponse(
        (response) =>
          response.request().method() === 'GET'
      ,{timeout: 0});

      console.log(3)
      await page.waitForSelector(mobileentry)

        console.log(4)
  
      await page.waitForTimeout(settings.delay)
      const verificationneccesary = await page.evaluate('document.querySelector("div.PrDSKc")')
      // if ((await page.content()).includes("For your security")) {
      if (1 !== null) {
        console.log("sms verify required")
        if (smsProvider == "getsms") {
          request({url: 'http://www.getsmscode.com/vndo.php?action=getmobile&username='+getsmsEmail+'&token='+getsmstoken+'&cocode='+getcountry+'&pid=1', headers: {'User-Agent': 'request'}}, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log('http://www.getsmscode.com/vndo.php?action=getmobile&username='+getsmsEmail+'&token='+getsmstoken+'&cocode=uk&pid=1, headers: {User-Agent: request')
              info = body;
            }
          });
          await sleep(5000);
          if(info.includes("balance")){
            console.log("#LOW BALANCE: Add money to your getsmscode account.#");
            repError("LOW BALANCE: Add money to your getsmscode account.")
            await sleep(1000)
            await page.close()
          }
          
          phoneNum = "+"+info
          // 
        }
        if (smsProvider == "sms-activate") {
          await request({url: `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsactivatekey}&action=getNumber&service=go&operator=any&country=${activatecountry}`}, async function(error, response, body) {
            console.log(body)
            if (!error && ["BAD_ACTION","BAD_SERVICE","NO_BALANCE","NO_NUMBERS","BANNED","ERROR_SQL","BAD_KEY","WRONG_EXCEPTION_PHONE","NO_BALANCE_FORWARD"].indexOf(body) == -1) {
              
              console.log("succesful no. grab")
              var reply = body.split(":")
              phoneID = reply[1]
              phoneNum = "+"+reply[2]
            }
            if (["BAD_ACTION","BAD_SERVICE","NO_BALANCE","NO_NUMBERS","BANNED","ERROR_SQL","BAD_KEY","WRONG_EXCEPTION_PHONE","NO_BALANCE_FORWARD"].indexOf(body) !== -1) {
              console.log(body)
              repError(body)
              await sleep(1000)
              await page.close()
            }
            if(body.includes("BALANCE")){
              console.log("#LOW BALANCE: Add money to your sms-activate.ru account.#");
              repError("LOW BALANCE: Add money to your sms-activate.ru account.")
              await sleep(1000)
              await page.close()
            }
          });
          await sleep(5000);
          console.log(phoneID)
        }
        console.log("#Phone number: " + phoneNum);
        await randoType(mobileentry, phoneNum)

        await page.waitForTimeout(settings.delay)
        await cursor.click(proceed2)
        await page.waitForRequest(
          (request) =>
            request.method() === 'POST'
        );
        await page.waitForTimeout(100)
        const googleWarn = await page.evaluate('document.querySelector("div.o6cuMc")')
        console.log(googleWarn)

        if (googleWarn != null && smsProvider == "sms-activate") {
          request({url: `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsactivatekey}&action=setStatus&status=8&id=${phoneID}`, headers: {'User-Agent': 'request'}}, async function(error, response, body) {
            if (!error && ["BAD_ACTION","BAD_SERVICE","NO_BALANCE","NO_NUMBERS","BANNED","ERROR_SQL","BAD_KEY","WRONG_EXCEPTION_PHONE","NO_BALANCE_FORWARD"].indexOf(body) == -1) {
              console.log(`https://sms-activate.ru/stubs/handler_api.php?api_key=${smsactivatekey}&action=setStatus&status=8&id=${phoneID}`)
              if (body == "ACCESS_CANCEL") {
                console.log("CONFIRMED BAN")
                await repError("Number Unavailable to use, may be banned or already used")
                await page.close()

              }
            }
          });
        }
        else if (googleWarn === null) {
          veriTimeout = setTimeout(await verificationCode(), 0)
        }
        
      }
      else {
        console.log("acct created without sms verification needed")
        page.killbrowser().disconnect()
        // await cursor.click(day)
        // await randoType(day, dayval);
        // await cursor.click(month)
        // await randoType(month, monthval);
        // await cursor.click(year)
        // await randoType(year, yearval);
      }
      async function verificationCode() {
        var theMessaging; 
        try {
          await page.waitForTimeout(settings.delay)
          if (smsProvider == "getsms") {
            const requestNumber = phoneNum.slice(1)
            const values = {
              url: 'http://www.getsmscode.com/vndo.php?action=getsms&username='+getsmsEmail+'&token='+getsmstoken+'&pid=1&cocode=uk&mobile='+requestNumber,
              headers: {'User-Agent': 'request'}
            };
            console.log('#http://www.getsmscode.com/vndo.php?action=getsms&username=' + getsmsEmail + '&token=' + getsmstoken + '&pid=1&cocode=uk&mobile=' + requestNumber)
            console.log("#Phone Number: " + phoneNum);
            var endmessage ="msg"
            var positive = false;
            var themessage
            async function callbacktwo(error, response, body) {
              if (!error && response.statusCode == 200) {
                  themessage = body;
                  console.log("Message: " + themessage);
              }
            }
            for (var positive = false; positive == false;) {
                await request(values, callbacktwo);
                await sleep(2500);
                if (themessage.includes("Google")){
                  console.log("#request complete#");
                  endmessage = themessage;
                  break;
                }
                else {
                  console.log("no code yet");
                  await sleep(10000)
                }
            }
            console.log(endmessage)   
      
            if (endmessage.includes("Google")){
              var matches = endmessage.match(/(\d{6})/);
  
              if (matches) {
                  console.log(matches[0]);
                  theMessaging = matches[0]
              }
            }
          }
          if (smsProvider == "sms-activate") {
            const values = {
              url: `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsactivatekey}&action=getStatus&id=${phoneID}`,
              headers: {'User-Agent': 'request'}
            };
            console.log(`#https://sms-activate.ru/stubs/handler_api.php?api_key=${smsactivatekey}&action=getStatus&id=${phoneID}`)
            console.log("#Phone Number: " + phoneNum);
            var endmessage = ""
            var positive = false;
            var themessage
            async function callbacktwo(error, response, body) {
              if (!error && response.statusCode == 200) {
                  themessage = body;
                  console.log("Message: " + themessage);
              }
            }
            for (var positive = false; positive == false;) {
                await request(values, callbacktwo);
                await sleep(1000);
                if (themessage.includes("STATUS_OK")){
                  console.log("#request complete#");
                  theMessaging = themessage.split(":")[1];
                  break;
                }
                if (themessage == "STATUS_CANCEL") {
                  await page.close()
                  clearTimeout(veriTimeout)
                }
                else {
                  console.log("no code yet");
                  await sleep(10000)
                }
            }
            console.log(endmessage)
          }
            await cursor.click(codeentry);
            await randoType(codeentry, theMessaging);
            console.log("#entered phone message#");
            await page.waitForTimeout(settings.delay)
            await cursor.click(proceed3)
            if (smsProvider == "sms-activate") {
              request({url: `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsactivatekey}&action=setStatus&status=6&id=${phoneID}`, headers: {'User-Agent': 'request'}}, async function(error, response, body) {
                if (!error && ["BAD_ACTION","BAD_SERVICE","NO_BALANCE","NO_NUMBERS","BANNED","ERROR_SQL","BAD_KEY","WRONG_EXCEPTION_PHONE","NO_BALANCE_FORWARD"].indexOf(body) == -1) {
                  console.log(`https://sms-activate.ru/stubs/handler_api.php?api_key=${smsactivatekey}&action=setStatus&status=6&id=${phoneID}`)
                  if (body == "ACCESS_ACTIVATION") {
                    console.log("CONFIRMED VERIFICATION")
                  }
                  if (themessage == "STATUS_CANCEL") {
                    await page.close()
                    clearTimeout(veriTimeout)
                  }
                }

              });
            }
            await page.waitForSelector(day)
            await page.waitForTimeout(settings.delay)
            await cursor.click(day)
            await randoType(day, dayval);
            await cursor.click(month)
            await page.waitForTimeout(settings.delay)
            await page.select(month, monthval)
            await cursor.click(year)
            await randoType(year, yearval);
            await cursor.click(gender)
            await page.waitForTimeout(settings.delay)
            await page.select(gender, genderchoice)
            await page.waitForTimeout(settings.delay)
            await cursor.click(proceed4)

            await page.waitForResponse(
              (response) =>
                response.request().method() === 'GET' && response.request().url().startsWith('https://ssl.gstatic.com/accounts/static/_/js/') === true
            ,{timeout: 0});
            await page.waitForTimeout(settings.delay)
            await page.waitForSelector(denymobilethingy)
            await cursor.click(denymobilethingy)



            await page.waitForTimeout(settings.delay)
            await page.waitForSelector(personalise)
            await cursor.click(personalise)
            await page.waitForTimeout(settings.delay)
            await page.waitForSelector(proceed5)
            await cursor.click(proceed5)

            await page.waitForTimeout(settings.delay)
            await page.waitForSelector(proceed6)
            await cursor.click(proceed6)

            
            await page.waitForSelector(proceed7)
            await cursor.click(proceed7)
            await page.waitForTimeout(230)
            await cursor.click(proceed7)
            console.log("#submitted#");
            userpass = (emailVal + "@gmail.com:" + passwordVal);
            console.log(userpass);
            fs.appendFile('Accounts.txt', userpass+'\n', function(err) {  
              if (err) throw err;
              console.log('Added User/Pass To Accounts.txt!');
            });
            let date_ob = new Date();
            let currDate = ("0" + date_ob.getDate()).slice(-2);
            let currMonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let currYear = date_ob.getFullYear();
            const dateFormat = currDate+"-"+currMonth+"-"+currYear;
            console.log(dateFormat)
            var outputDirectory
            if (process.env.ONEDRIVECONSUMER) {
                outputDirectory = process.env.ONEDRIVECONSUMER+'\\documents\\ChefsEUGmailGenerator\\'
            }
            else {
                outputDirectory = process.env.HOMEDRIVE+process.env.HOMEPATH+'\\documents\\ChefsEUGmailGenerator\\'
            }
            if (!(await fs.existsSync(outputDirectory))) {
                await fs.mkdirSync(outputDirectory)
              }
            fs.appendFile(outputDirectory+'GmailAccounts'+dateFormat+'.txt', userpass+'\n', function(err) {  
                if (err) throw err;
                console.log('Added User/Pass To documents');
            });
            if (settings.webhook) {
              const Hook = new webhook.Webhook(settings.webhook);
              const computerName = os.hostname()
              const msg = new webhook.MessageBuilder()
                              .setText(null)
                              .setAvatar("https://cdn.discordapp.com/icons/805056304057942026/dd89d3908741f933b2c9c71da9b35531.webp?size=512")
                              .setName(`Chefs EU Account Gen`)
                              .setColor("#bb62ff")
                              .setTitle(`ACCOUNT GENERATED`)
                              .setDescription(`${userpass}`)
                              .setTime()
                              .setFooter("Chefs EU", "https://cdn.discordapp.com/icons/805056304057942026/dd89d3908741f933b2c9c71da9b35531.webp?size=512");
              Hook.send(msg);
            }
            await sleep(1000);
          await page.close();
          } catch(error) {console.error("Verification: "+error.stack); repError(error);return;}
        }
    } catch(error) {console.error("Fastmode: "+error.stack); repError(error);}
  };
  
  for (let index = 0; index < settings.accquantity; index++) {
    console.log(index+1);
    if (cluster !== undefined) {
      await cluster.queue("https://www.google.com", fastmode)
    }
    
  }
await cluster.idle()
await cluster.close()
} catch(error) {
  console.error("TBO:"+error)
  if (cluster !== undefined) {
    await cluster.close() 
  }
    return;
  }
}

// async function runBotDetectionTest(settings) {
//   const odinsSettings = require('./odinsSettings.json')
//   if (settings === undefined) {
//     settings = odinsSettings
//   }
  
//   module.exports.killbrowser = killbrowser;

// console.log(settings)
  
//   function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }



//   var cluster = await Cluster.launch({
//     concurrency: Cluster.CONCURRENCY_CONTEXT,
//     maxConcurrency: settings.btchlimit,
//     puppeteerOptions: { headless: true, args: ['--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials'] },
//     timeout: 3600000,
//     puppeteer: puppeteerextra,
//   });
//   cluster.on('taskerror', function(err, data) {
//     // console.log(`${err}`);
//     // repError(err)
//   });
//   async function killbrowser() {
//     while (cluster) {
//       cluster.idle();
//       await cluster.close();
//       cluster = undefined
      
//     }
//   } 
//   const fastmode = async function({ page, data: url }) {

//     const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36';
//     await page.setUserAgent(USER_AGENT);
//     await page.setJavaScriptEnabled(true);
//     await page.setViewport({
//       width: 1280 + Math.floor(Math.random() * 100),
//       height: 720 + Math.floor(Math.random() * 100),
//       deviceScaleFactor: 1,
//       hasTouch: false,
//       isLandscape: false,
//       isMobile: false,
//     });
//     await page.evaluateOnNewDocument(function() {
//         // Pass chrome check
//         window.chrome = {
//             runtime: {},
//             // etc.
//         };
//     });
//     await page.evaluateOnNewDocument(function() {
//         //Pass notifications check
//         const originalQuery = window.navigator.permissions.query;
//         return window.navigator.permissions.query = (parameters) => (
//             parameters.name === 'notifications' ?
//                 Promise.resolve({ state: Notification.permission }) :
//                 originalQuery(parameters)
//         );
//     });
//     await page.evaluateOnNewDocument(function() {
//         // Overwrite the `languages` property to use a custom getter.
//         Object.defineProperty(navigator, 'languages', {
//             get: () => ['en-US', 'en'],
//         });
//     });
//     await page.setExtraHTTPHeaders({
//       'Referer': 'https://www.google.com/',
//       'SEC-CH-UA': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
//     });
    
//     const cursor = createCursor(page, await getRandomPagePoint(page), false)
//     await installMouseHelper(page) // this shows the trace
          
//         await page.goto("https://infosimples.github.io/detect-headless")
//         await page.screenshot()
//         await page.close()
//         return false;    
//   };
//   for (let index = 0; index < settings.accquantity; index++) {
//     console.log(index+1);
//     if (cluster !== undefined) {
//       await cluster.queue("https://www.google.com", fastmode)
//     }
    
//   }
// await cluster.idle()
// await cluster.close()
// }
