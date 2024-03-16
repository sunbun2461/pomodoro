package db; # package name, what package is this? # db.pm, that's this package why do we need to name it? # so we can call it from other files, that's weird isn't it? yes, but that's how it works
use strict;
use warnings;
use DBI;

sub get_password_hash {
    my ($username) = @_;
    my $dsn = "dbi:SQLite:dbname=../../db/pomodoro.db"; # data source name
    my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle    
    my $sth = $dbh->prepare("SELECT password FROM users WHERE username = ?");# whats the alternative to using the question mark '?'. 
    $sth->execute($username) or die $sth->errstr;
    my ($stored_hash) = $sth->fetchrow_array; # get the stored hash from the database. whats fetchrow_array? # it's a method that returns the next row of data from the statement handle as an array.
    $dbh->disconnect; # disconnect from the database
    return $stored_hash;
}

1;

what the fuck?? is there anything wrong with this? 