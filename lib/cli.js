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

var patha = Path.join(cwd, 'README.md');
var pathb = Path.join(cwd, 'README');

var output = parsed.output || (fs.existsSync(patha) ? patha : pathb);

var istanbulPath = require.resolve('istanbul/lib/cli.js');
var execFileSync = require('child_process').execFileSync;

var result = execFileSync(istanbulPath, ['report', '--root', root, report]);
result = result.toString().trim();


var formatters = {};

formatters['text-summary'] = function(body) {
    return body.replace(/(=+)\s*Done$/, '$1');
};


var fn = formatters[report];
result = fn ? fn(result) : result;


var readme = fs.readFileSync(output, 'utf-8');
readme = readme.replace(/^(```coverage)(?:[\s\S]*?)^(```)/m, '$1\n' + result + '\n$2');
fs.writeFileSync(output, readme);

