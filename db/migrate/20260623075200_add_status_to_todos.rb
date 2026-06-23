class AddStatusToTodos < ActiveRecord::Migration[8.1]
  def change
    add_column :todos, :status, :string, default: "pending", null: false

    remove_column :todos, :completed, :boolean, default: false, null: false
  end
end