class AddUniquenessToWatchlists < ActiveRecord::Migration[5.2]
  def change
    remove_index :watchlists, [:user_id, :company_id]
    add_index :watchlists, [:user_id, :company_id], unique: true
  end
end
