#!/usr/bin/perl
use strict;
use warnings;
use lib '.';
use CGI;
use JSON;
use db;


my $cgi = CGI->new;
my $userId = $cgi->param('userId');

unless (defined $userId) {
    print $cgi->header(-type => "application/json", -charset => "utf-8");
    print encode_json({ message => "Missing 'userId' in request" });
    exit;
}

 

my $tasks = eval { db::get_old_tasks($userId) };
if ($@) {
    print $cgi->header(-type => "application/json", -charset => "utf-8");
    print encode_json({ message => "Error fetching tasks: $@" });
    exit;
}

print $cgi->header(-type => "application/json", -charset => "utf-8");
print encode_json($tasks || { message => "No tasks found"});