#!/usr/bin/perl
use strict;
use warnings;
use lib '.';
use CGI;
use signup;

my $cgi = CGI->new;

# Get the username and password from the HTTP request
my $username = $cgi->param('username');
my $password = $cgi->param('password');

# Use the signup module to create the new user
my $message = signup::create_user($username, $password);

# Send the HTTP response
print $cgi->header(-type => "application/json", -charset => "utf-8");
print "{ \"message\": \"$message\" }";
