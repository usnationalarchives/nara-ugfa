# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_25_170452) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audiences", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "descriptions", force: :cascade do |t|
    t.integer "naid", null: false
    t.string "title", null: false
    t.string "level", null: false
    t.jsonb "data", default: "{}", null: false
    t.jsonb "objects", default: "{}", null: false
    t.tsvector "search_vector"
    t.index ["naid"], name: "index_descriptions_on_naid", unique: true
    t.index ["search_vector"], name: "index_descriptions_on_search_vector", using: :gin
  end

  create_table "finding_aids", force: :cascade do |t|
    t.string "title", null: false
    t.string "background_color"
    t.text "about"
    t.text "purpose"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_finding_aids_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "auth_token", null: false
    t.integer "catalog_id", null: false
    t.jsonb "catalog_attributes", default: "{}", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
