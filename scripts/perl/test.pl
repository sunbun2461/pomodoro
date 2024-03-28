#!/usr/bin/perl
use strict;
use warnings;
use lib '.';
use CGI;
use CGI::Session;
use JSON;
use db;
use auth;
my $cgi = CGI->new;

my $json_text = $cgi->param('POSTDATA');
unless ($json_text) {
    # Temporary test data for debugging
    $json_text = '{"username": "testuser", "password": "testpass"}';
}
print $json_text;