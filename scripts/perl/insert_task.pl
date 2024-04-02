#!/usr/bin/perl
use strict;
use warnings;
use lib '.';
use CGI;
use JSON;
use db;

my $cgi = CGI->new;
my $json_text = $cgi->param('POSTDATA') || '{}';
my $json = JSON->new;
my $data = eval { $json->decode($json_text) };

if ($@) {
    print $cgi->header(-type => 'application/json', -charset => 'utf-8', -Access_Control_Allow_Origin => '*');
    print encode_json({ message => "Invalid JSON in request: $@" });
    exit;
}

my $description = $data->{'description'};
my $userId = $data->{'userId'};

unless (defined $description && defined $userId) {
    print $cgi->header(-type => "application/json", -charset => "utf-8");
    print encode_json({ message => "Missing 'description' or 'userId' in request" });
    exit;
}

my $message = eval { db::insert_task($description, $userId) };

if ($@) {
    print $cgi->header(-type => 'application/json', -charset => 'utf-8');
    print encode_json({ message => "Database error: $@" });
    exit;
}

print $cgi->header(-type => "application/json", -charset => "utf-8");
print encode_json({ message => $message || "Task inserted successfully" });

