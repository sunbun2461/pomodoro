use DBD::mysql; # load DBD::mysql module
use DBI; # load DBI module
use strict; # use strict module
use warnings; # use warnings module

my $dsn = "DBI:mysql:database=;host=localhost"; # data source name
my $username = "perl"; # username
my $password = "sunbun2461@"; # password


my $dbh = DBI->connect($dsn, $username, $password) or die "Unable to connect: $DBI::errstr\n"; # $dbh is database handle

my $sql = "CREATE DATABASE pomodoro"; # SQL statement
my $sth = $dbh->do($sql) or die "Unable to create database: $DBI::errstr\n";  # $sth is statement handle