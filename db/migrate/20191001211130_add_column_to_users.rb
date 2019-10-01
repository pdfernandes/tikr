class AddColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :funds, :float, :null => false, :default => 0.0
  end
end
