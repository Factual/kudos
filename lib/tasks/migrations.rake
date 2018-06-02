# frozen_string_literal: true

S3CMD = "s3cmd --access_key=#{ENV['AWS_ACCESS_KEY']} --secret_key=#{ENV['AWS_SECRET_KEY']}"

S3_BACKUP_PATH = "s3://factual-data/front/kudos/backups/#{Rails.env}"
S3_ARCHIVE_PATH = "s3://factual-data/front/kudos/backups/#{Rails.env}/archive"
S3_RESTORE_PATH = "s3://factual-data/front/kudos/backups/production"

VERSION = ENV['KUDOS_VERSION'] || 'unknown'

db_config = Rails.application.config.database_configuration[Rails.env]

namespace :db do
  desc "Export backup"
  task backup: :environment do
    puts "Dumping database..."

    ENV['PGPASSWORD'] = db_config['password']
    # Dump db using pg_dump to temp local file db.sql.gz
    system(%(pg_dump --verbose --compress=1 --exclude-table=ar_internal_metadata --no-owner -h #{db_config['host']} -p #{db_config['port']} -U #{db_config['username']} #{db_config['database']} -f db.sql.gz))

    # Put new db.sql.gz on S3 and S3 archive
    system("#{S3CMD} put db.sql.gz #{S3_BACKUP_PATH}/#{VERSION}-current.sql.gz")
    system("#{S3CMD} put db.sql.gz #{S3_ARCHIVE_PATH}/#{VERSION}/#{Time.now.utc.iso8601}-db.sql.gz")

    # File cleanup
    system("rm db.sql.gz")
  end

  desc "Restore from backup"
  task restore: :environment do
    puts "Restoring from S3 backup..."

    # Get S3 object key for most recent production database backup
    s3_object_key = `#{S3CMD} ls #{S3_RESTORE_PATH}/ | sort | tail -n 1 | awk '{printf "%s", $4}'`

    puts "Downloading #{s3_object_key}..."
    system("#{S3CMD} get #{s3_object_key}")

    s3_path, filename_gz = parse_file(s3_object_key)
    unzip(filename_gz)
    filename = filename_gz[0, filename_gz.index(".gz")]

    unless File.exist?(filename)
      puts "#{filename} not found, exit"
      exit
    end

    drop_db(db_config['host'], db_config['username'], db_config['database'], db_config['port'])

    # Create database
    system(%(createdb -e #{db_config['database']} --owner=#{db_config['username']} --host=#{db_config['host']} --port=#{db_config['port']} -U #{db_config['username']} --encoding="UTF8")) or abort('FAILED')

    # Restore database using S3 backup
    system("psql -h #{db_config['host']} -U #{db_config['username']} #{db_config['database']} < #{filename}")

    # File cleanup
    system("rm #{filename}")

    if Rails.env.development?
      turn_off_user_notifications(db_config['host'], db_config['username'], db_config['database'], db_config['port'])
    end

    Rake::Task['db:environment:set'].invoke
    puts 'DONE'
  end
end

def unzip(file)
  puts "Unzipping #{file}..."
  system("gunzip #{file}")
end

def parse_file(file)
  [File.dirname(file), File.basename(file)]
end

def drop_db(host, user, database, port = 5432, initial_db = 'template1')
  sql = <<~SQL.gsub("\n", ' ')
    SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity
    WHERE pg_stat_activity.datname = '#{database}'
    AND pid <> pg_backend_pid();
    DROP DATABASE IF EXISTS \\"#{database}\\";
  SQL
  system(%(echo "#{sql}" | psql -h #{host} -p #{port} -U #{user} #{initial_db})) or abort('FAILED')
end

def turn_off_user_notifications(host, user, database, port = 5432)
  sql = <<~SQL.gsub("\n", ' ')
    UPDATE users
    SET allow_email_notifications = 'f', allow_slack_notifications = 'f'
  SQL
  system(%(echo "#{sql}" | psql -h #{host} -p #{port} -U #{user} #{database})) or abort('FAILED')
end
