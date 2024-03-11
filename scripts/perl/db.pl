<<<<<<< HEAD
use DBD::mysql; # load DBD::mysql module
use DBI; # load DBI module
use strict; # use strict module
use warnings; # use warnings module
=======
use DBI;
use strict;
use warnings;
>>>>>>> devel

my $dsn = "dbi:SQLite:dbname=pomodoro.db"; # data source name

my $dbh = DBI->connect($dsn) or die $DBI::errstr; # $dbh is database handle

my $sql = "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT)"; # SQL statement
my $sth = $dbh->do($sql) or die $DBI::errstr;  # $sth is statement handle

# the db is now in this dir not /dbß