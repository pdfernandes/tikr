class ChangeColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :funds
  end
end
