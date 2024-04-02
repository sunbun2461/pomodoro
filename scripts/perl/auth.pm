package auth;
use strict;
use warnings;
use Digest::SHA qw(sha256_hex);
use lib '.';
use db;


sub check_password {
    my ($username, $password) = @_;
    my $hashed_password = sha256_hex($password);
    my ($stored_hash, $userId) = db::get_password_hash_and_userId($username); # get the stored hash and userId from the database
    if ($hashed_password eq $stored_hash) {
        return $userId;  # return the userId
    } else {
        return 0;
    }
}

1;