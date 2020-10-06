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

ActiveRecord::Schema.define(version: 2020_10_06_151210) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audiences", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "audiences_guides", force: :cascade do |t|
    t.bigint "audience_id", null: false
    t.bigint "guide_id", null: false
    t.index ["audience_id"], name: "index_audiences_guides_on_audience_id"
    t.index ["guide_id"], name: "index_audiences_guides_on_guide_id"
  end

  create_table "blocks", force: :cascade do |t|
    t.string "blockable_type", null: false
    t.bigint "blockable_id", null: false
    t.integer "weight", null: false
    t.jsonb "data", default: "{}", null: false
    t.string "block_type", default: "summary", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["blockable_type", "blockable_id"], name: "index_blocks_on_blockable_type_and_blockable_id"
    t.index ["weight"], name: "index_blocks_on_weight"
  end

  create_table "comments", force: :cascade do |t|
    t.string "commentable_type", null: false
    t.bigint "commentable_id", null: false
    t.bigint "user_id", null: false
    t.boolean "resolved", default: false, null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
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

  create_table "guide_section_descriptions", force: :cascade do |t|
    t.bigint "guide_section_id", null: false
    t.bigint "description_id", null: false
    t.integer "weight", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["description_id"], name: "index_guide_section_descriptions_on_description_id"
    t.index ["guide_section_id"], name: "index_guide_section_descriptions_on_guide_section_id"
  end

  create_table "guide_sections", force: :cascade do |t|
    t.bigint "guide_id"
    t.text "title"
    t.integer "weight", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guide_id"], name: "index_guide_sections_on_guide_id"
    t.index ["weight"], name: "index_guide_sections_on_weight"
  end

  create_table "guides", force: :cascade do |t|
    t.string "title"
    t.string "background_color", default: "grey", null: false
    t.text "about"
    t.text "purpose"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "looking_for_collaborators", default: "no", null: false
    t.string "complete_or_wip", default: "wip", null: false
    t.string "status", default: "draft", null: false
    t.tsvector "search_vector"
    t.uuid "uuid", null: false
    t.text "background_image"
    t.index ["search_vector"], name: "index_guides_on_search_vector", using: :gin
    t.index ["user_id"], name: "index_guides_on_user_id"
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
