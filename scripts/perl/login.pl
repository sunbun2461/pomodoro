#!/usr/bin/perl -w
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
my $json = JSON->new;
my $data = $json->decode($json_text); # decode the JSON string
my $username = $data->{'username'}; # get the username from the JSON
my $password = $data->{'password'}; # get the password from the JSON

if (auth::check_password($username, $password)){
    print $cgi->header(-type => 'application/json', -Access_Control_Allow_Origin => '*');
    print encode_json({ message => "Login successful."});
} else {
    print $cgi->header(-type => 'application/json', -Access_Control_Allow_Origin => '*');
    print encode_json({ message => "Invalid username or password."});
}



# use DBI;

# my $dsn = "dbi:SQLite:dbname=../../db/pomodoro.db"; # data source name
# my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle

# my $description = $data->{'description'}; # get the description from the JSON

#   my $sql = "INSERT INTO tasks (task) VALUES (?)";
#     my $sth = $dbh->prepare($sql) or die $DBI::errstr;  # $sth is statement handle
#     $sth->execute($description);

#     print encode_json({ message => "Data inserted: $description" });
# } else {
#     print encode_json({ message => "Hello, world!" });
# }







# use DBI;
# use CGI;
# use JSON;
# use strict;
# use warnings;






# my $dsn = "dbi:SQLite:dbname=../../db/pomodoro.db"; # data source name

# my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle

# # my $sql = "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT)"; # SQL statement
# my $cgi = CGI->new;

# my $json_string = $cgi->param('POSTDATA') || $cgi->param('PUTDATA') || $cgi->param('PATCHDATA');

# my $data = decode_json($json_string); # decode the JSON string

# my $description = $data->{'description'}; # get the description from the JSON

# my $sql = "INSERT INTO tasks (task) VALUES ('$description')" or die $DBI::errstr;
# my $sth = $dbh->do($sql) or die $DBI::errstr;  # $sth is statement handle
# $sth->execute();
# # the db is now in this dir not /db

#!/usr/bin/perl
# use CGI;
# use JSON;

# my $cgi = CGI->new;
# print $cgi->header('application/json');

# if ($cgi->request_method eq 'POST') {
#     my $json_text = $cgi->param('POSTDATA');
#     my $data = decode_json($json_text);
#     print encode_json({ message => "Received data: $data->{description}" });
# } else {
#     print encode_json({ message => "Hello, world!" });
# }