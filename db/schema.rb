# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180507172336) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "fuzzystrmatch"
  enable_extension "pg_trgm"
  enable_extension "uuid-ossp"

  create_table "kudos", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid     "giver_id",   null: false
  end

  create_table "kudos_to_receivers", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.uuid     "kudo_id",     null: false
    t.uuid     "receiver_id", null: false
    t.index ["kudo_id", "receiver_id"], name: "index_kudos_to_receivers_on_kudo_id_and_receiver_id", unique: true, using: :btree
  end

  create_table "likes", force: :cascade do |t|
    t.uuid "giver_id", null: false
    t.uuid "kudo_id",  null: false
  end

  create_table "users", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "email"
    t.string   "avatar"
    t.integer  "old_id"
    t.boolean  "allow_email_notifications", default: true, null: false
    t.boolean  "allow_slack_notifications", default: true, null: false
  end

  add_foreign_key "kudos", "users", column: "giver_id"
  add_foreign_key "kudos_to_receivers", "kudos"
  add_foreign_key "kudos_to_receivers", "users", column: "receiver_id"
  add_foreign_key "likes", "kudos"
  add_foreign_key "likes", "users", column: "giver_id"
end
