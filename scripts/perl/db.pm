package db; # package name, what package is this? # db.pm, that's this package why do we need to name it? # so we can call it from other files, that's weird isn't it? yes, but that's how it works
use strict;
use warnings;
use DBI;

my $dsn = "dbi:SQLite:dbname=../../db/pomodoro.db"; # data source name

sub get_password_hash {
    my ($username) = @_;
    my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle    
    my $sth = $dbh->prepare("SELECT password FROM users WHERE username = ?");# whats the alternative to using the question mark '?'. 
    $sth->execute($username) or die $sth->errstr;
    my ($stored_hash) = $sth->fetchrow_array; # get the stored hash from the database. whats fetchrow_array? # it's a method that returns the next row of data from the statement handle as an array.
    $dbh->disconnect; # disconnect from the database
    return $stored_hash;
};

sub insert_task {
    my ($description) = @_;
    my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle
    my $sql = "INSERT INTO tasks (task) VALUES (?)";
    my $sth = $dbh->prepare($sql) or die $DBI::errstr;  # $sth is statement handle,. what prepare? # it's a method that prepares the SQL statement for execution by the server and returns a statement handle object.
    $sth->execute($description);
    $dbh->disconnect;
};

1;
 