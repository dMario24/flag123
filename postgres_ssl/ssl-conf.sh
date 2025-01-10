
# echo ssl setting into pg_hba.conf configuration file
echo 'hostssl all all all cert clientcert=verify-ca' > /var/lib/postgresql/data/pg_hba.conf