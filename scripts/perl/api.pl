#!/usr/bin/perl
use CGI qw(:standard);
print header('application/json');
print "{ \"message\": \"Hello, world! Yo Yo Yo\" }";