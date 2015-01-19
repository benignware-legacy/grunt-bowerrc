/*
 * grunt-bowerrc
 * https://github.com/rafaelnowrotek/grunt-bowerrc
 *
 * Copyright (c) 2015 Rafael Nowrotek
 * Licensed under the MIT license.
 */

'use strict';

var merge = require("deepmerge");
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf').sync;
var chalk = require('chalk');
var shellwords = require('shellwords'); 
var bower = require('bower');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bowerrc', 'Run Bower from .bowerrc files', function() {
    
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });
    
    var argv = process.argv.slice(3);
    
    var root = process.cwd();

    var data = this.data;
    var commands = Object.keys(bower.commands);
    
    var command = options.command || commands.filter(function(command) {
      return typeof grunt.option(command) != 'undefined';
    })[0] || 'install'; 
    
    if (commands.indexOf(command) === -1) {
      console.log(chalk.reset(chalk.red("Error: Unknown command '" + command + "'")));
      return;
    }
    
    
    argv = argv.filter(function(arg) {
      var name = arg.substring(2);
      var value = grunt.option(name);
      if (Object.keys(bower.commands).indexOf(name) === -1 && typeof value !== 'undefined') {
        // Save option flags
        options[name] = value;
      }
      return (arg !== '--' + command);
    });
    argv.unshift(command);
    argv.unshift('bower');
    argv.unshift('node');
    
    
    var value;
    switch (command) {
      case 'update':
      case 'install':
      case 'uninstall':
        value = typeof grunt.option(command) === "string" ? [grunt.option(command)] : "";
        break;
      default:
        value = grunt.option(command);
    }
      
    var done = this.async();
    
    // Iterate through fileset
    this.filesSrc.forEach(function(filepath) {
      
      // Setup filepaths
      var file = data.cwd ? path.join(data.cwd, filepath) : filepath;
      var dir = path.dirname(file);
      
      // Run bower command
      console.log(chalk.reset(chalk.cyan("Run '" + command + "' on " + dir + "...")));

      var bower = require('bower');
      bower.config.cwd = path.resolve(dir);
      
      bower.commands[command](value, options, {cwd: dir})
      
      .on('log', function(result) {
        console.log(chalk.reset(chalk.cyan(result.id + " " + result.message + "...")));
      })
      .on('error', function(e) {
        console.log(chalk.reset(chalk.red(e)));
        done();
      })
      .on('end', function() {
        done();
      });
      
      
    });
    
    // Reset cwd
    process.chdir(root);
    
  });

};

