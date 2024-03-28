#!/usr/bin/perl -w
use strict;
use warnings;
use lib '.';
use CGI;
use CGI::Session;
use JSON;

my $cgi = CGI->new;
my $session = CGI::Session->load() or die CGI::Session->errstr;

if ($session->is_expired) {
    print $cgi->header(-type => 'application/json', -Access_Control_Allow_Origin => '*');
    print encode_json({ message => "Session expired.", isLoggedIn => JSON::false });
} elsif ($session->is_empty) {
    print $cgi->header(-type => 'application/json', -Access_Control_Allow_Origin => '*');
    print encode_json({ message => "No session.", isLoggedIn => JSON::false });
} else {
    my $username = $session->param('username');
    print $cgi->header(-type => 'application/json', -Access_Control_Allow_Origin => '*');
    print encode_json({ message => "Hello, $username", isLoggedIn => JSON::true });
}