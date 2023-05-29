// Obfuscate the javascript files inside an asar archive for copy protection



var fs = require('fs');
var path = require('path');
var recursive = require('recursive-readdir');
var rimraf = require('rimraf');
var asar = require('asar');
var javaScriptObfuscator = require('javascript-obfuscator');
const { array } = require('yargs');

// Parse/Get CLI arguments using yargs -> http://yargs.js.org/
const argv = require('yargs')
    .command('$0 <input> [output]', 'Obfuscate <input> ASAR file', (yargs) => {
        yargs
            .positional('input', {
                describe: 'input ASAR file to be obfuscated',
                demandOption: true,
            })
            .option('output', {
                alias: 'o',
                description: 'output ASAR file',
                default: null
            })
}).argv;

// Set parameters from arguments
var asarFullFileName = path.normalize(argv.input);
var outputFullFileName = (argv.output) ? path.normalize(argv.output) : asarFullFileName;
var outputFolder = path.dirname(outputFullFileName);

// Set your resources folder
var resourcesFolder = path.dirname(asarFullFileName);

console.log('\n\nasar package javascript obfuscator\n\n');

console.log('Unpacking archive');
extract()
async function extract() {
    try {
        asar.extractAll(asarFullFileName, outputFolder + '\\this_is_a_temporal_folder');
    }
    catch (error) {
        console.log(error)
        // const path = String(error.path);
        // var matches = path.match(/[^\\]+/g)
        // console.log(matches)
        // var startingPoint
        // matches.forEach((element, i) => {
        //     if (String(element).search("unpacked") !== -1) {
        //         console.log(i)
        //         startingPoint = i
        //     }
        // });
        // var truepath = ""
        // for (let index = startingPoint+1; index < matches.length; index++) {
        //     console.log(matches[index])
        //     if (index == matches.length-1) {
        //         truepath += "/"+matches[index]+"."
        //     }
        //     else {
        //     truepath += "/"+matches[index]
        //     }
        // }
        // console.log(truepath)
        // asar.extractFile(asarFullFileName, "app.asar.unpacked\\node_modules\\puppeteer\\install.js")
    }
}

//console.log('Deleting app.asar');
//fs.unlinkSync(resourcesFolder + '\\app.asar');

//process.exit(0);

// Enter the directories to be ignored
recursive(outputFolder + '\\this_is_a_temporal_folder', ['node_modules', 'app'], function (err, files) {
    files.forEach(file => {
        if (path.extname(file) === '.js') {
            let contents = fs.readFileSync(file, 'utf8');
            /* NOTE: This is a quick filter to bypass some syntaxis currently not supported by javascript-obfuscator
            /*
            if((contents.indexOf("?.") < 0) && (contents.indexOf(".#") < 0)) {
            /* */
            if(true) {
            /* */
                console.log('Protecting ' + file);
                // Change the settings here  -  https://github.com/javascript-obfuscator/javascript-obfuscator
                let ret = String(javaScriptObfuscator.obfuscate(contents, {
                    compact: true
                    , target: 'node'
                    , ignoreRequireImports: true
                    , disableConsoleOutput: false
                    , seed: 0
                    , selfDefending: true
                    , debugProtection: false
                    , stringArray:true
                    , sourceMap: false
                    , rotateStringArray: true
                    , shuffleStringArray: true
                    , stringArrayThreshold: 0.75
                    , stringArrayIndexShift: true
                    , stringArrayIndexesType: ["hexadecimal-number"]
                    , stringArrayWrappersCount: 2
                    , stringArrayWrappersType: "function"
                    , stringArrayWrappersParametersMaxCount: 4
                    , stringArrayWrappersChainedCalls: true
                    , stringArrayEncoding: ["base64"]
                    , splitStrings: true
                    , unicodeEscapeSequence: false
                    , identifierNamesGenerator: "hexadecimal"
                    , renameGlobals: false
                    , renameProperties: false
                    , simplify: true
                    , transformObjectKeys: true
                    , numbersToExpressions: true
                    , controlFlowFlattening: true
                    , controlFlowFlatteningThreshold: 0.2
                    , deadCodeInjection: true
                    , deadCodeInjectionThreshold: 0.4
                }));
                fs.writeFileSync(file, ret);
            }
        }
    });
    console.log('Packing asar archive');
    asar.createPackage(outputFolder + '\\this_is_a_temporal_folder', outputFullFileName)
    .then(() => {
        console.log('Created secure asar archive');
        console.log('Deleting src directory');
        rimraf(outputFolder + '\\this_is_a_temporal_folder', function () {
            console.log('Done! Have fun.');
        });
    });
});
