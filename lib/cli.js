#!/usr/bin/env node

var fs = require('fs');
var Path = require('path');
var nopt = require('nopt');


var knownOpts = {
    'report': String,
    'root': Path,
    'output': Path
};

var shortHands = {};

var parsed = nopt(knownOpts, shortHands, process.argv, 2);
var cwd = process.cwd();

var report = parsed.report || 'text-summary';
var root = parsed.root || cwd;
var output = parsed.output || Path.join(cwd, 'README.md');


var istanbulPath = require.resolve('istanbul/lib/cli.js');
var execFileSync = require('child_process').execFileSync;

var result = execFileSync(istanbulPath, ['report', '--root', root, report]);
result = result.toString();


var readme = fs.readFileSync(output, 'utf-8');
readme = readme.replace(/^(```coverage)(?:[\s\S]*?)^(```)/m, '$1\n' + result.trim() + '\n$2');
fs.writeFileSync(output, readme);


