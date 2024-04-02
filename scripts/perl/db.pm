package db; # package name, what package is this? # db.pm, that's this package why do we need to name it? # so we can call it from other files, that's weird isn't it? yes, but that's how it works
use strict;
use warnings;
use DBI;

my $dsn = "dbi:SQLite:dbname=../../db/pomodoro.db"; # data source name

sub get_password_hash_and_userId {
    my ($username) = @_;
    my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle    
    my $sth = $dbh->prepare("SELECT id, password FROM users WHERE username = ?");# whats the alternative to using the question mark '?'. 
    $sth->execute($username) or die $sth->errstr;
    my ($userId, $stored_hash) = $sth->fetchrow_array; # get the stored hash from the database. whats fetchrow_array? # it's a method that returns the next row of data from the statement handle as an array.
    $dbh->disconnect; # disconnect from the database
    return ($stored_hash, int($userId));
};

sub get_old_tasks {
    my ($userId) = @_;
    my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle
    my $sth = $dbh->prepare("SELECT task FROM tasks WHERE user_id = ?"); # this statement gets the tasks from the tasks table that have the user_id that matches the userId
    $sth->execute($userId) or die $sth->errstr; # execute the statement handle
    my @tasks; # create an empty array
    while (my @row = $sth->fetchrow_array) { # while there are rows to fetch
        push @tasks, $row[0]; # add the task to the tasks array
    }
    $dbh->disconnect; # disconnect from the database
    return \@tasks; # return the tasks array
};

sub insert_task {
    my ($description, $userId) = @_;
    my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle
    my $sql = "INSERT INTO tasks (task, user_id) VALUES (?,?)";
    my $sth = $dbh->prepare($sql) or die $DBI::errstr;  # $sth is statement handle,. what prepare? # it's a method that prepares the SQL statement for execution by the server and returns a statement handle object.
    # print "almost there\n";
    $sth->execute($description, $userId) or die $DBI::errstr; # execute the statement handle
    $dbh->disconnect;
};


sub get_user_details {
    my ($username) = @_;
    my $dbh = DBI->connect($dsn) or die $DBI::errstr;
    my $sth = $dbh->prepare("SELECT * FROM users WHERE username = ?");
    $sth->execute($username) or die $sth->errstr;
    my @user = $sth->fetchrow_array;
    print "User details for $username:\n";
    print "id: $user[0]\n";
    print "username: $user[1]\n";
    print "password: $user[2]\n";
    $dbh->disconnect;
};



1;
 