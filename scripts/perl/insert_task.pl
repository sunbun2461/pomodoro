#!/usr/bin/perl
use strict;
use warnings;
use lib '.';
use CGI;
use JSON;
use db;

my $cgi = CGI->new;
print $cgi->header('application/json');

if ($cgi->request_method eq 'POST') {
    my $json_text = $cgi->param('POSTDATA');
    my $data = decode_json($json_text);
    db::insert_task($data->{description});
    print encode_json({ message => "Received data: $data->{description}" });
} else {
    print encode_json({ message => "Hello, world!" });
}

