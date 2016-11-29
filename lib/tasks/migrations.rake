# frozen_string_literal: true

BACKUP_S3_PATH = "s3://factual-data/front/kudos/backups"
ARCHIVE_S3_PATH = "s3://factual-data/front/kudos/backups/archive"

VERSION = ENV['KUDOS_VERSION'] || 'unknown'

db_config = Rails.application.config.database_configuration[Rails.env]

namespace :db do
  desc "Export backup"
  task backup: :environment do
    puts "Dumping database..."

    ENV['PGPASSWORD'] = db_config['password']
    # Dump db using pg_dump to temp local file db.sql
    system(%(pg_dump --exclude-table=ar_internal_metadata --no-owner -h #{db_config['host']} -p #{db_config['port']} -U #{db_config['username']} #{db_config['database']} -f db.sql))

    # Move old db.sql on S3 to archive folder
    system("s3cmd --access_key=#{ENV['AWS_ACCESS_KEY']} --secret_key=#{ENV['AWS_SECRET_KEY']} mv #{BACKUP_S3_PATH}/db.sql #{ARCHIVE_S3_PATH}/#{VERSION}/#{Time.now.to_i}-db.sql")

    # Put new db.sql on S3
    system("s3cmd --access_key=#{ENV['AWS_ACCESS_KEY']} --secret_key=#{ENV['AWS_SECRET_KEY']} put db.sql #{BACKUP_S3_PATH}/#{VERSION}-db.sql")
  end

  desc "Restore from backup"
  task restore: :environment do
    puts "Restoring from S3 backup"

    ENV['PGPASSWORD'] = db_config['password']

    # Get latest db.sql from S3
    system("s3cmd --access_key=#{ENV['AWS_ACCESS_KEY']} --secret_key=#{ENV['AWS_SECRET_KEY']} get #{BACKUP_S3_PATH}/#{VERSION}-db.sql db.sql")

    # Restore from local db.sql
    system("pg_restore --no-owner -h #{db_config['host']} -p #{db_config['port']} -U #{db_config['username']} -cC -d #{db_config['database']} -e -v db.sql")
  end
end
