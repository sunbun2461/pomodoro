#!/usr/bin/perl
use strict;
use warnings;
use lib '.';
use CGI;
use JSON;
use signup;

my $cgi = CGI->new;

# Get the username and password from the POST data, JSON is used to pass the data, but perl can't parse it directly, so we use the JSON module to decode it, it is a perl module that is not part of the standard library, so we need to install it using cpan
my $json_text = $cgi->param('POSTDATA');

# Decode the JSON string
my $json = JSON->new;
my $data = $json->decode($json_text);

my $username = $data->{'username'};
my $password = $data->{'password'};

# Use the signup module to create the new user
my $message = signup::create_user($username, $password);

# Send the HTTP response
print $cgi->header(-type => "application/json", -charset => "utf-8");
print "{ \"message\": \"$message\" }";
