package signup;
use strict;
use warnings;
use DBI;
use Digest::SHA qw(sha256_hex);


# Creates a new user in the database with the provided username and password.
#
# Arguments:
#   $username - The username of the user to be created.
#   $password - The password of the user to be created.
#
# Returns:
#   A string indicating the success of the user creation process.

sub create_user {
    my ($username, $password) = @_;
    die "Username is not defined" unless defined $username;
    die "Password is not defined" unless defined $password;
    my $hashed_password = sha256_hex($password);
    my $dsn = "dbi:SQLite:dbname=/var/www/html/pomodoro/db/pomodoro.db";
    my $dbh = DBI->connect($dsn) or die $DBI::errstr;
    my $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    my $sth = $dbh->prepare($sql) or die $DBI::errstr;
    $sth->execute($username, $hashed_password) or die $DBI::errstr;
    return "User created: $username";
}
1;