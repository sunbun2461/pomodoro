package auth;
use strict;
use warnings;
use Digest::SHA qw(sha256_hex);
use lib '.';
use db;

sub check_password {
    my ($username, $password) = @_;
    my $hashed_password = sha256_hex($password);
    my $stored_hash = db::get_password_hash($username); # get the stored hash from the database
    return $hashed_password eq $stored_hash;
}