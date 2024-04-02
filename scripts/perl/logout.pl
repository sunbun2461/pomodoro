#!/usr/bin/perl
use strict;
use warnings;
use lib '.';
use CGI;
use CGI::Session;
use JSON;


my $cgi = CGI->new;

my $session = CGI::Session->load() or die CGI::Session->errstr;
if ($session->is_empty) {
    print $cgi->header(-type => 'application/json', -Access_Control_Allow_Origin => '*');
    print encode_json({ message => "No session." });
} else {
    $session->delete();
    print $cgi->header(-type => 'application/json', -Access_Control_Allow_Origin => '*');
    print encode_json({ message => "Session deleted." });
}